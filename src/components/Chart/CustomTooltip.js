import React, { Fragment } from "react";
import PropTypes from "prop-types";
import uuid from "uuid/v4";
import {dateFormat, withoutCurrency} from "../../helpers";
/*
customTooltipItem() custom Tooltip Item based on recharts component
@params(Object) itemData
@return(Element)
*/
const customTooltipItem = (itemData) => (
  <li
    className="recharts-tooltip-item"
    key={uuid()}
    style={{
      display: "block",
      padding: "4px 0",
      color: '#000'
    }}
  >
    <span className="recharts-tooltip-item-name">{itemData.name || itemData.dataKey}</span>
    <span className="recharts-tooltip-item-separator">:</span>
    <span className="recharts-tooltip-item-value" style={{color: itemData.color}}>
      {` ${withoutCurrency(itemData.value)}`}
    </span>
  </li>
);
/*
CustomTooltip() custom Tooltip based on recharts component
@params(Object) props
@return(Element)
*/
const CustomTooltip = props => {
  const { active, payload, label } = props;
  return (
    <Fragment>
      {active &&
        (payload && payload[0] && payload[0].dataKey) && (
          <div
            className="recharts-default-tooltip"
            style={{
              margin: 0,
              padding: 10,
              backgroundColor: "rgb(255, 255, 255)",
              border: "1px solid rgb(204, 204, 204)",
              whiteSpace: "nowrap"
            }}
          >
            <p className="recharts-tooltip-label" style={{ margin: 0 }}>
                <strong>Value development</strong>
                <br/>
                <span>{dateFormat(label)}</span>
            </p>
            <ul
              className="recharts-tooltip-item-list"
              style={{ padding: 0, margin: 0 }}
            >
              <ul
                className="recharts-tooltip-item-list"
                style={{ padding: 0, margin: 0 }}
              >
                {payload &&
                  payload.length > 0 &&
                  payload.map(p =>
                    customTooltipItem(p)
                  )}
              </ul>
            </ul>
          </div>
        )}
    </Fragment>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  active: PropTypes.bool,
  label: PropTypes.string
};
CustomTooltip.defaultProps = {
  active: false,
  label: ""
};

export default CustomTooltip;
