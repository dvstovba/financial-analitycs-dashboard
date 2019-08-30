import React from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";
import "react-table/react-table.css";
/*
Table() Table based on react-table component
@params(Object) props
@return(Element)
*/
const Table = props => {
  return (
    <>
      {props.title && <div className="table__title">{props.title}</div>}
      <ReactTable {...props} />
    </>
  );
};

Table.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
};

Table.defaultProps = {
  title: "",
  data: [],
};

export default Table;
