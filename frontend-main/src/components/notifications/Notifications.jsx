import {
    useEffect,
    useState
} from "react";

import Navbar from "../Navbar";

import {
    fetchNotifications
} from "../../services/userService";

import "./notifications.css";

const Notifications = () => {

    const [
        notifications,
        setNotifications
    ] = useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications =
        async () => {

            const userId =
                localStorage.getItem(
                    "userId"
                );
            console.log("USER ID:", userId);
            const data =
                await fetchNotifications(
                    userId
                );
            console.log("NOTIFICATIONS:", data);

            setNotifications(
                data
            );

        };

    return (

        <>
            <Navbar />

            <div className="notifications-page">

                <h1>
                    Notifications
                </h1>

                {notifications.length === 0 ? (

                    <div className="empty-notifications">
                        No notifications yet 🔔
                    </div>

                ) : (

                    notifications.map((notification) => (

                        <div
                            key={notification._id}
                            className="notification-card"
                        >

                            <div className="notification-user">
                                {notification.sender?.username}
                            </div>

                            <div className="notification-message">
                                {notification.message}
                            </div>

                            <div className="notification-time">
                                {new Date(
                                    notification.createdAt
                                ).toLocaleString()}
                            </div>

                        </div>

                    ))

                )}

            </div>

        </>

    );

};

export default Notifications;