import moment from "moment";
import uuid from "uuid/v4"
import {IDataItem, IChartDataItem, IKpiTableItem, IPerformanceTableItem} from "./models";
/*
roundTo() rounds the value to the specified decimal place, defaults to two
@param {Number} value
@param {Number} to
@return {Number}
 */
const roundTo = (value:number, to:number = 2):number => Number(value.toFixed(to));
/*
dateFormat() formats date in european format
@param {String} date
@return {String}
 */
const dateFormat = (date:Date | string):string => moment(date).format('DD.MM.YYYY');
/*
dateFormat2() converting date to date string
@param {String} date
@return {String} date string
 */
const dateFormat2 = (date:Date | string | number):Date => new Date(moment(date).format());
/*
sortByDate() sort data array by date
@param {Array} dataArr
@return {Array}
 */
const sortByDate = (dataArr:any[]):any[] => dataArr.sort((a, b) => {
    const dateA = moment(a.date).valueOf();
    const dateB = moment(b.date).valueOf();
    if (dateA < dateB) {
        return -1;
    }
    if (dateA > dateB) {
        return 1;
    }
    return 0;
});
/*
 filterByDate() filter by date from & date to
 @param {Array} data
 @param {String} dateFrom
 @param {String} dateTo
 @return {Array}
 */
const filterByDate = (data: any[], dateFrom: string | Date , dateTo: string | Date):any[] => {
    return data.filter(item => {
        return moment(item.date).isSameOrBefore(dateTo, 'day') && moment(item.date).isSameOrAfter(dateFrom, 'day')
    })
};
/*
withoutCurrency() format value to currency format
@param {String or Number} value
@param {Number} digits fractionDigits. default: 0
@return {String}
 */
const withoutCurrency = (value: string | number, digits?:number):string => {
    if (!value) return digits? "0.00" : "0";
    return Number(value)
        .toFixed(digits||0)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
};

/*
reselectData() calculate data for chart and sort by date
@param {Array} notSortedData
@return {Array}
 */
const reselectData = (notSortedData: IDataItem[]):IChartDataItem[] => {
    if (notSortedData && notSortedData.length) {
        const data = sortByDate(notSortedData);
        let stockCount = 0;
        const initialDeposit = data[0].initial_deposit;
        let deposit = initialDeposit;
        let buyAndHoldCount = roundTo(initialDeposit / data[0].price, 0);
        let open = false;
        return data.map((item: IDataItem) => {
            const {date, enter, out, price} = item;
            const buyAndHold = roundTo(buyAndHoldCount * price);
            if (enter && !stockCount) {
                open = true;
                stockCount = roundTo(deposit / price, 0);
            }
            if (out && stockCount) {
                deposit = roundTo(stockCount * price);
                stockCount = 0;
                open = false;
            }

            return {
                date,
                stockCount,
                buyAndHoldCount,
                deposit: roundTo(deposit),
                summary: stockCount ? roundTo(stockCount * price, 0) : roundTo(deposit, 0),
                buyAndHold: roundTo(buyAndHold, 0),
                open,
                enter,
                out,
                price
            }
        });
    }
    return [];
};
/*
reselectTableData() calculate data by years for KPi table
@param {Array} data
@return {Array}
*/

const reselectTableData = (data: IChartDataItem[]) => {
    if (data && data.length) {
        let startYearDeposit = data[0].deposit;
        let startYearHold = data[0].buyAndHold;
        let currentDeposit = data[0].deposit;
        return data.reduce((accum:IKpiTableItem[], current:IChartDataItem, i:number, array:IChartDataItem[]):IKpiTableItem[] => {
            const currentYear = moment(current.date).year();
            currentDeposit = current.deposit;
            if (array[i + 1] && moment(array[i + 1].date).year() > currentYear) {
                currentDeposit = current.open ? roundTo(current.stockCount * current.price) : current.deposit;
                const alphaReturnPercent = (currentDeposit - startYearDeposit) / startYearDeposit * 100;
                const holdReturnPercent = (current.buyAndHold - startYearHold) / startYearHold * 100;
                const deltaReturnPercent = Number(alphaReturnPercent) - Number(holdReturnPercent);
                const item = {
                    date: moment(current.date).endOf('year').format(),
                    alphaValue: currentDeposit,
                    holdValue: current.buyAndHold,
                    delta: currentDeposit - current.buyAndHold,
                    alphaReturnPercent,
                    holdReturnPercent,
                    deltaReturnPercent,
                };
                startYearHold = current.buyAndHold;
                startYearDeposit = currentDeposit;
                return [...accum, item]
            }
            return [...accum]
        }, [])
    }
    return []
};
/*
transformData() transforms an array into an object for the dynamic formation of table columns
@param {Array} data
@return {Object}
 */
const transformData = (data:any[]) => {
    const temp:{[key:string]:any} = {};
    data.forEach((item:any) => {
        temp[uuid().replace('-', '')] = item
    });
    return temp
};
/*
getOpenClose() gets an array of gaps not in position [[from,to]...]
@param {Array} dt
@return {Array}
*/
const getOpenClose = (dt:IChartDataItem[]) => {
    let closed = (dt && !dt[0].open) ? dt[0].date : 0;
    let openCloseArr:[string | number, string | number][] = [];
    dt.forEach((d, i) => {
        if ((closed && d.open) || (closed && !d.open && dt.length - 1 === i)) {
            openCloseArr = [...openCloseArr, [closed, d.date]];
            closed = 0;
        } else if (!closed && !d.open) {
            closed = d.date;
        }
    });
    return openCloseArr
};
/*
getDiffDates() gets the difference from the beginning to the end of the period in the specified units, based on momentjs
@param {String} start
@param {String} end
@param {String} unit
@return {Number}
*/
const getDiffDates = (start: string, end: moment.Moment | string, unit: "days" = 'days') => Math.abs(moment(start).diff(end, unit));
/*
getCapitalDeployed() calculate Capital Deployed
@param {Array} dFA
@param {String} start
@param {String} end
@return {Number}
 */
const getCapitalDeployed =(dFA:IChartDataItem[], start:string, end:string)=>{
    let notInPositionStart:string | null = null;
    const daysInPeriodCount = getDiffDates(start, end);
    const daysNotInPositionCount = dFA.reduce((accum, current, i, arr)=>{
        const {open, out, date} = current;
        if(i===0 && open && !out){
            return getDiffDates(date, moment(date).startOf('year'));
        }
        if (!open && out && !notInPositionStart){
            notInPositionStart = date;
            let summ = accum;
            const next = arr[i+1];
            if(!next){
                summ = accum + getDiffDates(date, moment(date).endOf('year'))
            }
            return summ;
        }
        if (open && !out && notInPositionStart){
            const daysCountNotInPosition = getDiffDates(date, notInPositionStart);
            notInPositionStart = null;
            return accum + daysCountNotInPosition;
        }
        return accum
    },0);
    return (daysInPeriodCount - daysNotInPositionCount)/daysInPeriodCount*100
};
/*
getVg() calculate "Value gain in %"
@param {Array} data
@param {String} strategy
@param {Number} initInvestment
@return {Number}
 */
const getVg = (data:IKpiTableItem[], initInvestment:number, strategy:string='alpha')=>{
    const S = data.reduce((accum:number, current:{[key:string]:any})=> {
        return accum + accum*(current[`${strategy}ReturnPercent`]/100);
    }, initInvestment)-initInvestment;
    return S / initInvestment * 100;
};
/*
getAn() calculate "Annual rate of return"
@param {Array} data
@param {String} strategy
@param {Number} period
@return {Number}
 */
const getAn = (data:{[key: string]:any}[], period:number, strategy:string='alpha') => {
    if(period === 1) return data[0][`${strategy}ReturnPercent`];
    return (data.reduce((accum, current) => accum + current[`${strategy}ReturnPercent`], 0) - 1) / period
};
/*
reselectPerformanceData() calculate data for Performance table
@param {Array} data
@param {Array} dataFromAll
@param {Number} initInvestment
@return {Array}
 */
const reselectPerformanceData = (data: IKpiTableItem[], dataFromAll: IChartDataItem[], initInvestment=0):IPerformanceTableItem[] => {
    if (data && data.length) {
        const dataObj = transformData(data);
        const temp = Object.values(dataObj).map(val => val).reverse();
        const periods = [1, 3, 5, 10];
        const lastYears = (d:IKpiTableItem[], period:number) => {
            const ln = period;
            const dt = d.slice(0, ln);
            let vgInPercentAT:string|number = "-";
            let vgInPercentBH:string|number = "-";
            let anRateReturnAT:string|number = "-";
            let anRateReturnBH:string|number = "-";
            let vgInEuAT:string|number = "-";
            let vgInEuBH:string|number = "-";
            let fAmInEuAt:string|number = "-";
            let fAmInEuBH:string|number = "-";
            let capDepAT:string|number = "-";
            let capDepBH:string|number = "-";

            if (dt.length === ln) {
                const dtReverced = [...dt].reverse();
                const endPeriod  =  moment(dt[0].date).endOf('year').format();
                const startPeriod = moment(dt[ln - 1].date).startOf('year').format();
                const fullDt = filterByDate(dataFromAll, startPeriod, endPeriod);
                vgInPercentAT = getVg(dtReverced, initInvestment);
                vgInPercentBH = getVg(dtReverced, initInvestment, 'hold');
                anRateReturnAT = getAn(dtReverced, ln);
                anRateReturnBH = getAn(dtReverced, ln, 'hold');
                vgInEuAT = initInvestment * (vgInPercentAT / 100);
                vgInEuBH = initInvestment * (vgInPercentBH / 100);
                fAmInEuAt = initInvestment + vgInEuAT;
                fAmInEuBH = initInvestment + vgInEuBH;
                capDepAT = getCapitalDeployed(fullDt, startPeriod, endPeriod);
                capDepBH = 100
            }
            return {
                vgInEuAT,
                vgInEuBH,
                anRateReturnAT,
                anRateReturnBH,
                fAmInEuAt,
                fAmInEuBH,
                vgInPercentAT,
                vgInPercentBH,
                capDepAT,
                capDepBH
            }
        };
        return periods.map(pr => ({period: `${pr} ${pr > 1 ? 'years' : 'year'}`, ...lastYears(temp, pr)}))
    }
    return [];
};
export {
    reselectData,
    reselectTableData,
    transformData,
    reselectPerformanceData,
    filterByDate,
    getOpenClose,
    dateFormat,
    dateFormat2,
    withoutCurrency
}
