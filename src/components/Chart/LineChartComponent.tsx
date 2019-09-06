import React, {useContext} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceArea
} from 'recharts';
import uuid from 'uuid/v4'
import {CustomDot} from './CustomDot'
import CustomizedAxisTick from "./CustomizedAxisTick";
import {getOpenClose} from "../../helpers";
import CustomTooltip from "./CustomTooltip";
import {renderLegend} from "./renderLegend";
import {EmptyChart} from './EmptyChart'
import {ThemeContext} from "../../ThemeContext";
import {IChartDataItem} from "../../models";
interface IProps {
    data: IChartDataItem[]
}
const LineChartComponent:React.FC<IProps> = props => {
    const theme:{[key:string]:string} = useContext(ThemeContext);
    const {data=[]} = props;
    const areas = data && data.length ? getOpenClose(data) : [];
    return (
        <>
            {(data && data.length > 0) &&
            <ResponsiveContainer width="100%"
                                 height={500}>
                <LineChart data={data}
                           margin={{top: 10, right: 10, left: 0, bottom: 0}}
                           width={730}
                           height={250}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        dataKey="date"
                        height={85}
                        tick={CustomizedAxisTick}
                    />
                    <YAxis
                        tickFormatter={val => val / 1000}
                        label={{value: 'Portfolio (Thousands)', angle: -90, position: 'insideLeft', height: 36}}
                    />
                    <Tooltip
                        content={CustomTooltip}
                    />
                    {!!areas && areas.map(area =>
                        <ReferenceArea
                            key={uuid()}
                            x1={area[0]}
                            x2={area[1]}
                            stroke="rgba(130, 168, 203, 0.3)" fill="rgba(130, 168, 203, 0.3)"
                        />
                    )
                    }
                    <Line name="Alpha Trader"
                          dataKey='summary'
                          stroke={theme.blue}
                          fill={theme.blue}
                          strokeWidth={2}
                          dot={CustomDot}
                          activeDot={CustomDot}
                    />
                    <Line
                        name="Buy & Hold"
                        dataKey='buyAndHold'
                        stroke={theme.yellow}
                        fill={theme.yellow}
                        strokeWidth={2}
                        dot={false}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        content={renderLegend}
                    />
                </LineChart>
            </ResponsiveContainer>
            }
            {(!data || data.length === 0) &&
            <EmptyChart/>
            }
        </>
    );
};

export default LineChartComponent;
