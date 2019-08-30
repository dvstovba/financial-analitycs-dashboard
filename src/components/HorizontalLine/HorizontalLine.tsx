import React from "react";

export const HorizontalLine = ({background = '#000', height = '2px', className = "mt-5 mb-3"}) => <div
    style={{background: background, width: '100%', height: height}} className={className}/>;