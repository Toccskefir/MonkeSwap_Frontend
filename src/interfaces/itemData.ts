export  default interface ItemData {
    id: number
    title: string,
    itemPicture: string,
    description: string,
    category?: string,
    priceTier: number,
    views?: number,
    state?: 'ENABLED' | 'DISABLED',
    userId?: number,
}