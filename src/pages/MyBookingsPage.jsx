import React, { useState, useEffect } from 'react';
import { getBookings } from '../utils/localStorage.js'; // Import the localStorage utility function
import './MyBookingsPage.css'; // Import the CSS for this page

function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);

    // Effect to load bookings from localStorage when the component mounts
    useEffect(() => {
        const storedBookings = getBookings();
        setBookings(storedBookings);
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="my-bookings-container">
            {/* CRUCIAL: h1 tag for My Bookings heading as per requirements */}
            <h1 className="page-title">My Bookings</h1>
            {bookings.length === 0 ? (
                <p className="no-bookings-message">You have no bookings yet.</p>
            ) : (
                <div className="bookings-list">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            {/* Display booking details */}
                            <h3>{booking.hospitalName}</h3>
                            <p>Address: {booking.address}, {booking.city}, {booking.state} {booking.zipCode}</p>
                            <p>Date: {booking.appointmentDate}</p>
                            <p>Time: {booking.appointmentTime}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookingsPage;
