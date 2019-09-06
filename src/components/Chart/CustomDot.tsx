import React from "react";
/*
CustomTooltip() custom Dot based on recharts component
@params(Object) props
@return(Element)
*/
interface IProps {
    cx: number;
    cy: number;
    height: number;
    r: number;
    strokeWidth: number;
    key: string;
    payload: {
        enter: boolean,
        out: boolean,
        open: boolean
    }
}
export const CustomDot:React.FC<IProps> = (props)=>{
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
