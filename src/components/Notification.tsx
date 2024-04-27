import NotificationData from "../interfaces/notificationData";
import {FaBell} from "react-icons/fa";
import {IoWarningOutline} from "react-icons/io5";

/**
 * This component serves the basic layout, elements of a notification in the notifications tab.
 */
function Notification(notification: NotificationData) {
    const typeBoolean = notification.type === 'WARNING';
    return (
        <div className="w-full">
            <div
                className={`border border-gray-300 rounded-md p-4 m-2.5 flex justify-start shadow-md items-center
                    ${typeBoolean ? 'bg-red-300' : 'bg-white'}`}>
                {typeBoolean ?
                    <IoWarningOutline className="h-12 w-12 text-red-600"/> :
                    <FaBell className="h-12 w-12 text-black"/>
                }
                <div className={`font-bold text-xl ml-6 ${typeBoolean ? 'text-red-700' : 'text-black'}`}>
                    {notification.message}
                </div>
            </div>
        </div>
    );
}

export default Notification;