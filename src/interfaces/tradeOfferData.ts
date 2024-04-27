/**
 * Represents the data structure for trade offers.
 */
export default interface TradeOfferData {
    /**
     * The unique identifier of the trade offer.
     */
    id: number;

    /**
     * The unique identifier of the item being offered.
     */
    offeredItem: number;

    /**
     * The unique identifier of the incoming item.
     */
    incomingItem: number;

    /**
     * A comment or message associated with the trade offer.
     */
    comment: string;
}