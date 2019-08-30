import React from "react";
interface IProps {
    background?: string;
    height?: string;
    className?: string;
}
export const HorizontalLine: React.FC<IProps> = ({background = '#000', height = '2px', className = "mt-5 mb-3"}) => <div
    style={{background: background, width: '100%', height: height}} className={className}/>;