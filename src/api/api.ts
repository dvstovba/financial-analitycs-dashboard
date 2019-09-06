import axios from "axios";
const URI = 'http://localhost:8080';

const  getLabels = (query: string | number)=> {
    return axios.get(`${URI}/labels?q=${query}`)
        .then(({data}) => data);
};
const getLabelDataById = (id:string | number)=>{
    return axios.get(`${URI}/labelsData?label_id=${id}&timestamp=${new Date().getTime()}`)
        .then(({data}) => {
        return data.map((dt:{date: string, in: string | number, out: string | number, initial_deposit: number | null, op_cl_price: number }) => ({
                date: dt.date,
                enter: dt['in'],
                out: dt.out,
                initial_deposit: Number(dt.initial_deposit) || 0,
                price:  Number(dt.op_cl_price)
            }));
    });
};
export {getLabels, getLabelDataById}
