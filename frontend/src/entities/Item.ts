import Bid from "./Bid";

export default interface Item {
    id : number;
    title : string;
    startPrice: number;
    deadline: string;
    bids: Bid[];
}