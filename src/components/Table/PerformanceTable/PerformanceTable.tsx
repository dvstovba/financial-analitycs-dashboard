import React, {useRef} from "react";
import PropTypes from "prop-types";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import Table from "../Table/Table";
import {withoutCurrency} from '../../../helpers';

const ReactTableFixedColumns = withFixedColumns(Table);

const drawCell = (row) => {
    //these columns will be displayed with 2 fraction digits
    const fractionDigits = ['vgInPercentAT', 'vgInPercentBH', 'anRateReturnAT', 'anRateReturnBH', 'capDepAT', 'capDepBH'].includes(row.column.id) ? 2 : 0;
    const color = Number(row.value) > 0 ? "inherit" : "#b80607";
    return (<div className="text-center"
                 style={{color: color}}>{row.value === "-" ? "-" : withoutCurrency(row.value, fractionDigits)}</div>)
};

const PerformanceTable = (props) => {
    const tableParent = useRef(null);
    const {data, loading, className, initDeposit} = props;
    const firstColumnWidth = 218;
    const fullWidth = (tableParent && tableParent.current && tableParent.current.offsetWidth > 1108) ? tableParent.current.width : 1108;
    const subColumnsWidth = (fullWidth - firstColumnWidth) / (5 * 2);
    const columns = [
        {
            Header: <div className="text-left">
                <p style={{margin: 0}}><strong>Performance</strong></p>
            </div>,
            columns: [{
                Header: <div className="text-left">
                    <p style={{margin: 0}}>{`Initial investment  (€ ${withoutCurrency(initDeposit)})`}</p>
                </div>,
                width: firstColumnWidth,
                accessor: 'period'
            }],
            fixed: "left"
        },
        {
            Header: <strong> Value gain in % </strong>,
            columns: [
                {
                    Header: "Alpha Trader",
                    accessor: 'vgInPercentAT',
                    Cell: drawCell,
                    width: subColumnsWidth
                },
                {
                    Header: "Buy & Hold",
                    accessor: 'vgInPercentBH',
                    Cell: drawCell,
                    width: subColumnsWidth
                }
            ]
        },
        {
            Header: <strong> Annual rate of return </strong>,
            columns: [
                {
                    Header: "Alpha Trader",
                    accessor: 'anRateReturnAT',
                    Cell: drawCell,
                    width: subColumnsWidth
                },
                {
                    Header: "Buy & Hold",
                    accessor: 'anRateReturnBH',
                    Cell: drawCell,
                    width: subColumnsWidth
                }
            ]
        },
        {
            Header: <strong> Value gain in euro </strong>,
            columns: [
                {
                    Header: "Alpha Trader",
                    accessor: 'vgInEuAT',
                    Cell: drawCell,
                    width: subColumnsWidth
                },
                {
                    Header: "Buy & Hold",
                    accessor: 'vgInEuBH',
                    Cell: drawCell,
                    width: subColumnsWidth
                }
            ]
        },
        {
            Header: <strong> Final amount in euro </strong>,
            columns: [
                {
                    Header: "Alpha Trader",
                    accessor: 'fAmInEuAt',
                    Cell: drawCell,
                    width: subColumnsWidth
                },
                {
                    Header: "Buy & Hold",
                    accessor: 'fAmInEuBH',
                    Cell: drawCell,
                    width: subColumnsWidth
                }
            ]
        },
        {
            Header: <strong> Capital deployed in %</strong>,
            columns: [
                {
                    Header: "Alpha Trader",
                    accessor: 'capDepAT',
                    Cell: drawCell,
                    width: subColumnsWidth
                },
                {
                    Header: "Buy & Hold",
                    accessor: 'capDepBH',
                    Cell: drawCell,
                    width: subColumnsWidth
                }
            ]
        }
    ];
    return (
        <div ref={tableParent}>
            <ReactTableFixedColumns
                data={data}
                columns={columns}
                loading={loading}
                resizable={false}
                minRows={4}
                showPagination={false}
                className={className}
                sortable={false}
            />
        </div>

    )
}
PerformanceTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()),
    className: PropTypes.string,
    initDeposit: PropTypes.number,
    loading: PropTypes.bool,
};
PerformanceTable.defaultProps = {
    data: [],
    className: "",
    initDeposit: 0,
    loading: false,
};
export default PerformanceTable