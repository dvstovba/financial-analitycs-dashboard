import React from 'react';
import PropTypes from 'prop-types';
/*
CustomTooltip() custom Menu Item based on React Bootstrap Typeahead component
@params(Object) item
@return(Element)
*/
const MenuItem = ({item}) => (
    <div  style={{borderBottom: '1px solid #ddd'}}>
        <p style={{margin:0}}><strong>{item.actionname}</strong></p>
        <p style={{margin:0}}>{item.fullname}</p>
    </div>
);

MenuItem.propTypes = {
    item: PropTypes.shape({
        actionname: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
    }).isRequired,
};

export default MenuItem;
