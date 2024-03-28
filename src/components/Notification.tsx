import NotificationData from "../interfaces/notificationInterface";

function Notification(notification: NotificationData) {
    const typeBoolean = notification.type === 'WARNING';
    return (
        <div className="w-full">
            <div
                className={`border border-gray-300 rounded-md p-4 m-2.5 flex justify-start shadow-md items-center
                    ${typeBoolean ? 'bg-red-300' : 'bg-white'}`}>
                {typeBoolean ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="red" className="w-12 h-12">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="black" className="w-12 h-12">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"/>
                    </svg>
                }
                <div className={`font-bold text-xl ml-6 ${typeBoolean ? 'text-red-700' : 'text-black'}`}>
                    {notification.message}
                </div>
            </div>
        </div>
    );
}

export default Notification;