import React from "react";
import PropTypes from 'prop-types';
/*
CustomTooltip() custom Dot based on recharts component
@params(Object) props
@return(Element)
*/
export const CustomDot = (props)=>{
    const {cx, height, cy, r, strokeWidth, key, payload} = props;
    const customStroke = payload.open ? "#79ae50":"#b80607";
    const active = key.indexOf("active")>-1;
    const bottomY = active ? cy : height+10;
    if(!payload.enter && !payload.out && !active) return null;
    if(!payload.enter && !payload.out){
        return (<circle key={key} r={r} fill={customStroke} strokeWidth={strokeWidth} stroke={customStroke} className="recharts-dot" cx={cx} cy={bottomY}/>)
    }
    if(!payload.open){
        return <rect key={key} x={cx - r} y={bottomY-r} rx="0" ry="10" width={r*2} height={r*2} fill={customStroke} stroke={customStroke}/>
    }
    return (<circle key={key} r={r} fill={customStroke} strokeWidth={strokeWidth} stroke={customStroke} className="recharts-dot" cx={cx} cy={bottomY}/>)
};

CustomDot.propTypes = {
    key: PropTypes.string.isRequired,
    r: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    payload: PropTypes.shape({
        open: PropTypes.bool.isRequired,
        out: PropTypes.bool.isRequired,
    }).isRequired,
};
