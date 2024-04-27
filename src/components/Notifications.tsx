import {useContext, useEffect, useState} from "react";
import NotificationData from "../interfaces/notificationData";
import Notification from "./Notification";
import {HttpContext} from "../providers/HttpProvider";

/**
 * This component makes up the notifications page, where the user gets notifications about all sorts of things.
 * Other than checking out notifications the user also has the ability to delete all of them.
 */
function Notifications() {
    const [notificationList, setNotificationList] = useState<NotificationData[]>([]);
    const [errorMessage, setErrorMessage] = useState('Your notifications will be displayed here');

    const axios = useContext(HttpContext);

    useEffect(() => {
        axios.get('notification')
            .then((response) => {
                setNotificationList(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data);
                }
            });
    }, [axios]);

    function handleDelete() {
        axios.delete('notification')
            .then(() => {
                setNotificationList([]);
            });
    }

    return(
        <div className="font-poppins">
            {notificationList.length === 0 ?
                <div className="text-4xl text-center text-black m-5">
                    {errorMessage}
                </div> :
                <div>
                    <div className="grid justify-items-end">
                        <button
                            className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all w-52 mt-3 mb-2 mr-2.5 py-2 ml-12 rounded-xl bg-red-600
                    text-white text-lg font-bold"
                            onClick={handleDelete}
                        >
                            Delete notifications
                        </button>
                    </div>

                    {notificationList
                        .sort((notificationA, notificationB) => notificationB.id - notificationA.id)
                        .map((notification) => (
                        <Notification key={notification.id} id={notification.id} message={notification.message} type={notification.type}/>
                    ))}
                </div>
            }
        </div>
    );
}

export default Notifications;