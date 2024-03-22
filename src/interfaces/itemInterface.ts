import ItemCardData from "./itemCardInterface";

export  default interface Item extends ItemCardData{
    views: number,
    state: 'ENABLED' | 'DISABLED',
    category: string,
    userId: number,
}