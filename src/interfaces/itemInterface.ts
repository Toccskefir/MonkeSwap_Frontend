import ItemCardData from "./itemCardInterface";

export  default interface ItemData extends ItemCardData{
    views: number,
    state: 'ENABLED' | 'DISABLED',
    category: string,
    userId: number,
}