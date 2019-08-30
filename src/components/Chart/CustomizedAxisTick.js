import React from "react";
import PropTypes from "prop-types";
import {dateFormat} from "../../helpers";
/*
CustomTooltip() custom Axis Tick based on recharts component
@params(Object) props
@return(Element)
*/
const CustomizedAxisTick = props => {
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

CustomizedAxisTick.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
CustomizedAxisTick.defaultProps = {
  payload: [],
  y: 0,
};
export default CustomizedAxisTick;
