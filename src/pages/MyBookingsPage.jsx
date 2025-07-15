import React, { useState, useEffect } from 'react';
import { getBookings } from '../utils/localStorage.js';
import './MyBookingsPage.css';

function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = getBookings();
        setBookings(storedBookings);
    }, []);

    return (
        <div className="my-bookings-container">
            {/* Cypress expects this h1 */}
            <h1 className="page-title" data-testid="my-bookings-title">My Bookings</h1>

            {bookings.length === 0 ? (
                <p className="no-bookings-message">You have no bookings yet.</p>
            ) : (
                <div className="bookings-list">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            {/* Cypress expects this h3 */}
                            <h3 data-testid="hospital-name">{booking.hospitalName}</h3>
                            <ul>
                                <li><strong>Address:</strong> {booking.address}</li>
                                <li><strong>City:</strong> {booking.city}</li> {/* Needed for 'DOTHAN' test */}
                                <li><strong>State:</strong> {booking.state}</li>
                                <li><strong>Zip Code:</strong> {booking.zipCode}</li>
                                <li><strong>Date:</strong> {booking.appointmentDate}</li>
                                <li><strong>Time:</strong> {booking.appointmentTime}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookingsPage;
