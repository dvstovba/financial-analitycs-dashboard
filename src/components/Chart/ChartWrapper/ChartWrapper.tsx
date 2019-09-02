import React from "react";
import Card from 'react-bootstrap/Card'
/*
ChartWrapper() Chart Wrapper
@params(Object) props
@return(Element)
*/
interface IProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}
const ChartWrapper:React.FC = (props:IProps) => {
  return (
    <Card body className={props.className}>
      {props.title && <div>{props.title}</div>}
      <div>{props.children}</div>
    </Card>
  );
};

export default ChartWrapper;
