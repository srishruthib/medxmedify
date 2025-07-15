import React, { useState, useEffect } from 'react';
import './BookingModal.css'; // Import CSS for the modal

const BookingModal = ({ isOpen, onClose, medicalCenter, onBookAppointment }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [error, setError] = useState(null);

    // Reset state when modal opens/closes or medicalCenter changes
    useEffect(() => {
        if (isOpen) {
            setSelectedDate('');
            setSelectedTime('');
            setError(null);
        }
    }, [isOpen, medicalCenter]);

    if (!isOpen) return null; // Don't render if not open

    const getAvailableDates = () => {
        const dates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day

        for (let i = 0; i < 7; i++) { // Within a week in advance (7 days including today)
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const getAvailableTimeSlots = () => {
        const slots = [];
        // Generate time slots from 9 AM to 5 PM, every 30 minutes
        for (let hour = 9; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour % 12 === 0 ? 12 : hour % 12}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
                slots.push(time);
            }
        }
        return slots;
    };

    const handleBooking = () => {
        if (!selectedDate || !selectedTime) {
            setError('Please select both a date and a time.');
            return;
        }

        // Prepare booking data
        const bookingData = {
            hospitalName: medicalCenter['Hospital Name'],
            address: medicalCenter['Address'],
            city: medicalCenter['City'],
            state: medicalCenter['State'],
            zipCode: medicalCenter['ZIP Code'],
            appointmentDate: selectedDate,
            appointmentTime: selectedTime,
        };

        onBookAppointment(bookingData); // Call parent function to save booking
        onClose(); // Close modal after booking
    };

    const dates = getAvailableDates();
    const timeSlots = getAvailableTimeSlots();

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>&times;</button>
                <h2>Book Appointment at {medicalCenter['Hospital Name']}</h2>

                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label htmlFor="booking-date">Select Date:</label>
                    <select
                        id="booking-date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        <option value="">-- Select Date --</option>
                        {dates.map((dateObj) => {
                            const dateString = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
                            const displayDate = dateObj.toLocaleDateString('en-US', {
                                weekday: 'short', month: 'short', day: 'numeric'
                            });
                            const isToday = new Date().toDateString() === dateObj.toDateString();
                            return (
                                <option key={dateString} value={dateString}>
                                    {isToday ? 'Today' : displayDate}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="booking-time">Select Time:</label>
                    <select
                        id="booking-time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        disabled={!selectedDate}
                    >
                        <option value="">-- Select Time --</option>
                        {/* Display time of day labels */}
                        {selectedDate && (
                            <>
                                <optgroup label="Morning">
                                    {timeSlots.filter(slot => parseInt(slot.split(':')[0]) < 12 || (parseInt(slot.split(':')[0]) === 12 && slot.includes('AM'))).map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="Afternoon">
                                    {timeSlots.filter(slot => parseInt(slot.split(':')[0]) >= 12 && parseInt(slot.split(':')[0]) < 17 && slot.includes('PM')).map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="Evening">
                                    {timeSlots.filter(slot => parseInt(slot.split(':')[0]) >= 17 || (parseInt(slot.split(':')[0]) < 9 && slot.includes('AM'))).map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </optgroup>
                            </>
                        )}
                    </select>
                    {/* CRUCIAL: Use <p> tags for displaying "Today", "Morning", "Afternoon", "Evening" */}
                    {selectedDate && (
                        <div className="time-of-day-labels">
                            <p>Today</p> {/* This label is always shown if a date is selected, not tied to specific time slots */}
                            <p>Morning</p>
                            <p>Afternoon</p>
                            <p>Evening</p>
                        </div>
                    )}
                </div>

                <button onClick={handleBooking} disabled={!selectedDate || !selectedTime}>
                    Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default BookingModal;
