import React from "react";
import withFixedColumns from "react-table-hoc-fixed-columns";
import Table from "../Table/Table";
import "react-table-hoc-fixed-columns/lib/styles.css";
import {dateFormat, transformData, withoutCurrency} from '../../../helpers'
import {IKpiTableItem} from "../../../models";

const ReactTableFixedColumns = withFixedColumns(Table);

interface IKpiTable {
    data: IKpiTableItem[];
    loading:boolean;
    className?:string;
    initDeposit:number | '0';
}

interface IRow {
    original:{
        key: string;
        name: string;
    }
}
const KpiTable:React.FC<IKpiTable> = props => {
    const {
      loading,
      data,
      initDeposit,
    } = props;

    const dataObj:{[key: string]: IKpiTableItem} = transformData(data);
    /*
    rows array
    */
    const rows:{name:string, key:string}[] = data && data.length ? [
        {name: 'AlphaTrader value development in €', key: 'alphaValue'},
        {name: 'Buy&Hold value development in €', key: 'holdValue'},
        {name: 'Delta value development in €', key: 'delta'},
        {name: 'AlphaTrader rate of return in %', key: 'alphaReturnPercent'},
        {name: 'Buy & Hold rate of return in %', key: 'holdReturnPercent'},
        {name: 'Delta rate of return %', key: 'deltaReturnPercent'},
    ] : [];
    /*
    date columns array
    */
    const dataColumns = Object.keys(dataObj).map(key => ({
      Header: (
        <>
          <p
            style={{
              margin: 0,
              display: `${loading ? "none" : "initial"}`,
            }}
          >
            <strong>{dateFormat(dataObj[key].date)}</strong>
          </p>

        </>
      ),
      headerClassName: "center",
      minWidth: 80,
      values: dataObj[key],
      className: "center",
      Cell: (row:IRow) => {

        //these columns will be displayed with 2 fraction digits
        const fractionDigits = ['alphaReturnPercent', 'holdReturnPercent', 'deltaReturnPercent' ].includes(row.original.key) ? 2 : 0;
        // @ts-ignore
        const value = dataObj[key][row.original.key];
        const color = Number(value) > 0 ? "#79ae50":"#b80607";
        if(row.original.key === 'delta' || row.original.key === 'deltaReturnPercent'){
          return (<p style={{margin:0, color: color}} className="text-center">
            {withoutCurrency(value,fractionDigits)}
          </p>)
        }
        return <p style={{margin:0}} className="text-center">
          {withoutCurrency(value,fractionDigits)}
        </p>;
      },
    }));
    /*
    table columns array
    */
    const columns = [
      {
        Header: <div className="text-left">
          <p style={{margin:0}}><strong>Value development</strong></p>
          <p style={{margin:0}}>{`Initial investment  (€ ${withoutCurrency(initDeposit)})`}</p>
        </div>,
        width: 250,
        fixed: "left",
        Cell: (row:IRow) => {
          if(row.original.key === 'delta' || row.original.key === 'deltaReturnPercent'){
            return <p style={{margin:0}} className="text-left">{row.original.name}</p>
          }
          return <p style={{margin:0}} className="text-left">
             <strong>
              {row.original.name}
            </strong>
          </p>
        },
      },
      ...dataColumns,
    ];

    return (
      <ReactTableFixedColumns
        data={rows}
        columns={columns}
        resizable={false}
        minRows={6}
        showPagination={false}
        sortable={false}
        loading={loading}
        defaultPageSize={100}
      />
    );
};
export default KpiTable;
