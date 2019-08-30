import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card'
/*
ChartWrapper() Chart Wrapper
@params(Object) props
@return(Element)
*/
const ChartWrapper = props => {
  return (
    <Card body className={props.className}>
      {props.title && <div>{props.title}</div>}
      <div>{props.children}</div>
    </Card>
  );
};

ChartWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
};
ChartWrapper.defaultProps = {
  title: "",
  className: ""
};

export default ChartWrapper;
