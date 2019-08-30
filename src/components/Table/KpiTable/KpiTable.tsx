import React from "react";
import PropTypes from "prop-types";
import withFixedColumns from "react-table-hoc-fixed-columns";
import Table from "../Table/Table";
import "react-table-hoc-fixed-columns/lib/styles.css";
import {dateFormat, transformData, withoutCurrency} from '../../../helpers'
const ReactTableFixedColumns = withFixedColumns(Table);

const KpiTable = props => {
    const {
      loading,
      data,
      initDeposit,
    } = props;

    const dataObj = transformData(data);
    /*
    rows array
    */
    const rows = data && data.length ? [
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
              visibility: `${loading ? "hidden" : "visible"}`,
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
      Cell: row => {

        //these columns will be displayed with 2 fraction digits
        const fractionDigits = ['alphaReturnPercent', 'holdReturnPercent', 'deltaReturnPercent' ].includes(row.original.key) ? 2 : 0;
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
        Cell: row => {
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
KpiTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  loading: PropTypes.bool,
  initDeposit: PropTypes.number,
};

KpiTable.defaultProps = {
  data: [],
  loading: false,
  initDeposit: 0,
};
export default KpiTable;
