import Bid from "./Bid";

export default interface Item {
    id : number;
    title : string;
    bids: Bid[];
}