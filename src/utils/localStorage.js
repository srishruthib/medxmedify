// Helper functions for interacting with localStorage.
const BOOKINGS_KEY = 'bookings'; // Required localStorage key as per project requirements

// Get all bookings from localStorage
export const getBookings = () => {
    try {
        const bookings = localStorage.getItem(BOOKINGS_KEY);
        // Parse the stored JSON string back into a JavaScript array.
        // If no bookings are found, return an empty array.
        return bookings ? JSON.parse(bookings) : [];
    } catch (error) {
        console.error('Error getting bookings from localStorage:', error);
        return []; // Return an empty array on error to prevent app crash
    }
};

// Save a new booking to localStorage
export const saveBooking = (newBooking) => {
    try {
        const bookings = getBookings(); // Get existing bookings
        // Add a unique ID to the new booking (using Date.now() for simplicity)
        const updatedBookings = [...bookings, { ...newBooking, id: Date.now().toString() }];
        // Store the updated array back into localStorage as a JSON string
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
        return updatedBookings; // Return the updated list of bookings
    } catch (error) {
        console.error('Error saving booking to localStorage:', error);
        return getBookings(); // Return current state if save fails
    }
};

// Update an existing booking in localStorage (useful if booking details can be changed)
export const updateBooking = (updatedBooking) => {
    try {
        const bookings = getBookings();
        const updatedBookings = bookings.map(booking =>
            booking.id === updatedBooking.id ? updatedBooking : booking
        );
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
        return updatedBookings;
    } catch (error) {
        console.error('Error updating booking in localStorage:', error);
        return getBookings();
    }
};

// Delete a booking from localStorage (optional, but good for completeness)
export const deleteBooking = (bookingId) => {
    try {
        const bookings = getBookings();
        const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
        return updatedBookings;
    } catch (error) {
        console.error('Error deleting booking from localStorage:', error);
        return getBookings();
    }
};
