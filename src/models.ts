export interface ILabelItem {
    id: string | number;
    actionname: string;
    fullname : string;
}
export interface IDataItem {
    date: string;
    enter: string | number;
    out: string | number;
    initial_deposit : number | null;
    price : number;
}
export interface IChartDataItem {
    date: string;
    enter: string | number;
    out: string | number;
    price : number;
    stockCount: number
    buyAndHoldCount: number;
    deposit: number;
    summary: number,
    buyAndHold: number,
    open: boolean,
}
export interface IKpiTableItem {
    date: string;
    alphaValue: number;
    holdValue: number;
    delta: number;
    alphaReturnPercent: number;
    holdReturnPercent: number;
    deltaReturnPercent: number;
}
export interface IPerformanceTableItem {
    period: string;
    vgInEuAT: string | number;
    vgInEuBH: string | number;
    anRateReturnAT: string | number;
    anRateReturnBH: string | number;
    fAmInEuAt: string | number;
    fAmInEuBH: string | number;
    vgInPercentAT: string | number;
    vgInPercentBH: string | number;
    capDepAT: string | number;
    capDepBH: string | number;
}

