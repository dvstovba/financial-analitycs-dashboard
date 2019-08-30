import axios from "axios";
import {URI} from "../config";

const  getLabels = (query)=> {
    return axios.get(`${URI}/labels?q=${query}`)
        .then(({data}) => data);
};
const getLabelDataById = (id)=>{
    return axios.get(`${URI}/labelsData?label_id=${id}&timestamp=${new Date().getTime()}`)
        .then(({data}) => {
        return data.map(dt => ({
                date: dt.date,
                enter: dt['in'],
                out: dt.out,
                initial_deposit: Number(dt.initial_deposit) || 0,
                price:  Number(dt.op_cl_price)
            }));
    });
};
export {getLabels, getLabelDataById}
