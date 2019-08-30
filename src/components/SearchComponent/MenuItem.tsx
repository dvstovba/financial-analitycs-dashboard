import React from 'react';
import {ILabelItem} from "../../models";
interface IProps {
    item: ILabelItem
}
/*
CustomTooltip() custom Menu Item based on React Bootstrap Typeahead component
@params(Object) item
@return(Element)
*/
const MenuItem: React.FC<IProps> = ({item}) =>(
    <div  style={{borderBottom: '1px solid #ddd'}}>
        <p style={{margin:0}}><strong>{item.actionname}</strong></p>
        <p style={{margin:0}}>{item.fullname}</p>
    </div>)
;
export default MenuItem;
