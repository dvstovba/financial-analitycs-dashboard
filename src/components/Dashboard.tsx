import React, {useState, useEffect, useContext} from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChartWrapper from "./Chart/ChartWrapper/ChartWrapper";
import LineChartComponent from './Chart/LineChartComponent';
import KpiTable from "./Table/KpiTable/KpiTable";
import SearchComponent from "./SearchComponent/SearchComponent";
import PerformanceTable from "./Table/PerformanceTable/PerformanceTable";
import {HorizontalLine} from './HorizontalLine/HorizontalLine'
import {Loading} from "./Loading/Loading";
import {getLabels, getLabelDataById} from '../api/api';
import {
    reselectData,
    reselectTableData,
    reselectPerformanceData,
    filterByDate,
    dateFormat,
    dateFormat2
} from '../helpers'
import {ThemeContext} from "../ThemeContext";
import {IDataItem, IChartDataItem, ILabelItem} from '../models';

const Dashboard: React.FC = () => {
    const theme:{[key:string]:string} = useContext(ThemeContext);
    const [data, setData] = useState<IDataItem[]>([]);
    const [chartData, setChartData] = useState<IChartDataItem[]>([]);
    const [dateFrom, setDateFrom] = useState<Date | string | null>(null);
    const [dateTo, setDateTo] = useState<Date | string | null>(null);
    const [selected, setSelected] = useState<ILabelItem[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (data && data.length && dateFrom && dateTo) {
            const chartData = filterByDate(reselectData(data), dateFrom, dateTo);
            setChartData(chartData);
        }
    }, [data, dateFrom, dateTo]);
    /*
        handleSelect() callback on search result selected
        @param {Array} val
    */
    const handleSelect = (val:ILabelItem[] | [] |undefined) => {
        if (!val || !val.length) return false;
        setSelected(val);
        setLoading(true);
        getLabelDataById(val[0].id).then(data => {
            const chartData = reselectData(data);
            setChartData(chartData);
            if (chartData && chartData.length) {
                setData(data);
                setDateFrom(chartData[0].date);
                setDateTo(chartData[data.length - 1].date);
            }
            setLoading(false);
        })
    };
    const actionName = selected && selected[0] ? selected[0].actionname : "";
    const fullName = selected && selected[0] ? selected[0].fullname : "";
    const initDeposit = chartData && chartData[0] ? chartData[0].deposit : 0;
    const tableData = reselectTableData(chartData);

    return (
        <>
            <Container fluid>
                <Row className="mt-3">
                    <Col xs={12} md={4}>
                        <SearchComponent
                            onSearch={getLabels}
                            onChange={handleSelect}
                            defaultSelected={selected}
                            id="search-stock"
                            labelKey="actionname"
                            filterBy={["actionname", "fullname"]}
                            minLength={1}
                            placeholder="Type here stock name for backtesting"
                        />
                    </Col>
                    <Col xs={12} md={4} className='offset-0 offset-md-4'>
                        <Row >
                            <Col className="mt-3 mt-md-0">
                                <p style={{margin: 0}}>Date From</p>
                                {dateFrom && dateTo &&
                                <DatePicker
                                    selected={dateFormat2(dateFrom)}
                                    onChange={setDateFrom}
                                    minDate={dateFormat2(data[0].date)}
                                    maxDate={dateFormat2(dateTo)}
                                    includeDates={data.map(dt => dateFormat2(dt.date))}
                                    dateFormat="dd.MM.yyyy"/>
                                }
                                {!dateFrom && <DatePicker disabled onChange={()=>{}}/>}
                            </Col>
                            <Col className="mt-3 mt-md-0">
                                <p style={{margin: 0}}>Date To</p>
                                {dateFrom && dateTo &&
                                <DatePicker
                                    selected={dateFormat2(dateTo)}
                                    onChange={setDateTo}
                                    minDate={dateFormat2(dateFrom)}
                                    maxDate={dateFormat2(data[data.length - 1].date)}
                                    includeDates={data.map(dt => dateFormat2(dt.date))}
                                    dateFormat="dd.MM.yyyy"
                                />
                                }
                                {!dateTo && <DatePicker disabled onChange={()=>{}}/>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        {actionName &&
                        <h3 style={{margin: 0}}>
                            <strong><span style={{color: theme.blue}}>{actionName} - {fullName}</span></strong>
                        </h3>
                        }
                        {dateFrom && dateTo && <p style={{margin: 0}}>
                            <strong>
                                {`${dateFormat(dateFrom)} – ${dateFormat(dateTo)}`}
                            </strong>
                        </p>
                        }
                        <ChartWrapper>
                            {loading && <Loading/>}
                            <LineChartComponent data={chartData}/>
                        </ChartWrapper>
                    </Col>
                </Row>
            </Container>
            <HorizontalLine background={theme.blue}/>
            <Container fluid className="mb-5">
                <Row className="mt-3 mb-5">
                    <Col>
                        {actionName &&
                        <h3 style={{margin: 0}}>
                            <strong>KPIs - <span style={{color: theme.blue}}>{actionName} - {fullName}</span></strong>
                        </h3>
                        }

                        {dateFrom && dateTo && <p style={{margin: 0}}>
                            <strong>
                                {`${dateFormat(dateFrom)} – ${dateFormat(dateTo)}`}
                            </strong>
                        </p>}
                        <KpiTable data={tableData} initDeposit={initDeposit} loading={loading}/>
                        <PerformanceTable data={reselectPerformanceData(tableData, chartData, initDeposit)}
                                          initDeposit={initDeposit} className="mt-3" loading={loading}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default Dashboard;