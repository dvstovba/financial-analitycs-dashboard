import React from 'react';
import PropTypes from "prop-types";
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

import {BLUE_COLOR, YELLOW_COLOR} from "../../config";

const LineChartComponent = props => {
    const {data} = props;
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
                          stroke={BLUE_COLOR}
                          fill={BLUE_COLOR}
                          strokeWidth={2}
                          dot={CustomDot}
                          activeDot={CustomDot}
                    />
                    <Line
                        name="Buy & Hold"
                        dataKey='buyAndHold'
                        stroke={YELLOW_COLOR}
                        fill={YELLOW_COLOR}
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
LineChartComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape())
};
LineChartComponent.defaultProps = {
    data: []
};
export default LineChartComponent;
