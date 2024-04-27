/**
 * Represents the data structure for notifications.
 */
export default interface NotificationData {
    /**
     * The unique identifier of the notification.
     */
    id: number;

    /**
     * The message content of the notification.
     */
    message: string;

    /**
     * The type of notification, indicating whether it's a regular notification or a warning.
     * Possible values are: 'NOTIFICATION' | 'WARNING'.
     */
    type: 'NOTIFICATION' | 'WARNING';
}