import React from "react";
/*
CustomTooltip() custom LegendIcon based on recharts component
@params(Object) props
@return(Element)
*/
const LegendIcon = (props: any) => <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1"
                                 style={{display: "inline-block", verticalAlign: "middle", marginRight: "4px"}}>
    <path strokeWidth="4" fill="none" stroke={props.color} d="M0,16h10.666666666666666A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16H32M21.333333333333332,16A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
          className="recharts-legend-icon"/>
</svg>;
/*
CustomTooltip() custom renderLegend based on recharts component
@params(Object) props
@return(Element)
*/

export const renderLegend:React.FC<any> = props => {
    const { payload } = props;
    return (
        <ul className="recharts-default-legend" style={{padding: 0, margin: 0, textAlign: 'center'}}>
            <li
                className={`recharts-legend-item legend-item-`} style={{display: "inline-block", marginRight: "10px"}}
            >
                <svg className="recharts-surface" width="14" height="28" viewBox="0 0 64 32" version="1.1"
                     style={{display: "inline-block", verticalAlign: "middle", marginRight: "4px"}}>
                    <rect x="0" y="8" rx="0" ry="10" width="64" height="14" fill="rgba(130, 168, 203, 0.3)" stroke="rgba(130, 168, 203, 0.3)"/>
                </svg>
                No investment
            </li>
            <li
                className={`recharts-legend-item legend-item-`} style={{display: "inline-block", marginRight: "10px"}}
            >
                <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1"
                     style={{display: "inline-block", verticalAlign: "middle", marginRight: "4px"}}>
                    <circle r="8" fill="#79ae50" strokeWidth="2" stroke="#79ae50" className="recharts-dot"
                            cx="12" cy="15"/>
                </svg>
                Buy signal
            </li>
            <li
                className={`recharts-legend-item legend-item-`} style={{display: "inline-block", marginRight: "10px"}}
            >
                <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1"
                     style={{display: "inline-block", verticalAlign: "middle", marginRight: "4px"}}>
                    <rect x="8" y="8" rx="0" ry="10" width="14" height="14" fill="#b80607" stroke="#b80607"/>
                </svg>
                Sell signal
            </li>
            {
                payload.map((entry:{color:string,value:string|number}, index:number) => (
                    <li
                        key={`item-${index}`}
                        className={`recharts-legend-item legend-item-${index}`} style={{display: "inline-block", marginRight: "10px"}}
                    >
                        <LegendIcon color={entry.color}/>
                        <span>{entry.value}</span>
                    </li>
                ))
            }
        </ul>
    );
};
