import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
/*
Table() Table based on react-table component
@params(Object) props
@return(Element)
*/

const Table:React.FC<any> = props =>(
    <>
      {props.title && <div className="table__title">{props.title}</div>}
      <ReactTable {...props} />
    </>
);

export default Table;
