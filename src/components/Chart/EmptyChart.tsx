import React, {useContext} from 'react';
import {Label, Line, LineChart, ReferenceArea, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {ThemeContext} from "../../ThemeContext";
/*
CustomTooltip() Empty Chart based on recharts components
@return(Element)
*/
interface IProps {
    labelY?: string;
    text?: string;
}
export const EmptyChart: React.FC<IProps> = ({labelY='Portfolio (Thousands)', text= 'No data found'}) => {
    const theme:{[key:string]:string} = useContext(ThemeContext);
    const empty = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 3}];
    return (
        <ResponsiveContainer width="100%"
                             height={500}>
            <LineChart data={empty}
                       margin={{top: 10, right: 10, left: 0, bottom: 0}}
                       width={730}
                       height={250}
            >
                <XAxis
                    dataKey="x"
                    height={85}
                    tickFormatter={() => ""}
                />
                <YAxis
                    label={{value: labelY, angle: -90, position: 'insideLeft', height: 36}}
                    tickFormatter={() => ""}
                />
                <ReferenceArea
                    x1={1}
                    x2={2}
                    y1={1}
                    y2={2}
                    stroke="rgba(130, 168, 203, 0.3)"
                    fill="rgba(130, 168, 203, 0.3)"
                >
                    <Label>{text}</Label>
                </ReferenceArea>
                <Line
                    dataKey='x'
                    stroke={theme.blue}
                    fill={theme.blue}
                    strokeWidth={0}
                    dot={false}
                    activeDot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
};
