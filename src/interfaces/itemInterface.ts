export  default interface Item {
    title: string,
    itemPicture: string,
    description: string,
    views: number,
    state: 'ENABLED' | 'DISABLED',
    category: string,
    priceTier: number,
    userId: number,
}