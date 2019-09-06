import React from "react";
import {dateFormat} from "../../helpers";
/*
CustomTooltip() custom Axis Tick based on recharts component
@params(Object) props
@return(Element)
*/
interface IProps {
  y: number;
  payload: {
    coordinate: number,
    value: string
  }
}
const CustomizedAxisTick:React.FC<IProps> = props => {
  const { y, payload } = props;
  return (
    <g
      transform={`translate(${payload.coordinate-9} ,${y})`}
    >
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="end"
        fill="#666"
        transform="rotate(-90)"
      >
        {dateFormat(payload.value)}
      </text>
    </g>
  );
};

export default CustomizedAxisTick;
