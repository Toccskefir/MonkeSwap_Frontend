import {useContext, useEffect, useState} from "react";
import NotificationData from "../interfaces/notificationData";
import Notification from "./Notification";
import {HttpContext} from "../providers/HttpProvider";

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
                            className="hover:bg-black hover:text-white py-2 px-4 m-2.5 border hover:border-transparent rounded shadow-md"
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