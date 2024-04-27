/**
 * Represents the data structure for an item.
 */
export default interface ItemData {
    /**
     * The unique identifier of the item.
     */
    id: number;

    /**
     * The title of the item.
     */
    title: string;

    /**
     * The URL or path to the picture of the item.
     */
    itemPicture: string;

    /**
     * The description of the item.
     */
    description: string;

    /**
     * The category the item belongs to. (Optional)
     */
    category?: string;

    /**
     * The price tier of the item.
     */
    priceTier: number;

    /**
     * The number of views the item has received. (Optional)
     */
    views?: number;

    /**
     * The state of the item, whether it's enabled or disabled. (Optional)
     * Possible values are: 'ENABLED' | 'DISABLED'.
     */
    state?: 'ENABLED' | 'DISABLED';

    /**
     * The unique identifier of the user who owns the item. (Optional)
     */
    userId?: number;
}