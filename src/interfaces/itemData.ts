import ItemCardData from "./itemCardData";

export  default interface ItemData extends ItemCardData{
    views: number,
    state: 'ENABLED' | 'DISABLED',
    category: string,
    userId: number,
}