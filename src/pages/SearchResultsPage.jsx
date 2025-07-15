import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Hook to read URL parameters
import { getMedicalCenters } from '../api/medDataApi.js'; // Import API function
import { saveBooking } from '../utils/localStorage.js'; // Import saveBooking function
import LoadingSpinner from '../components/LoadingSpinner.jsx'; // Import the loading spinner
import BookingModal from '../components/BookingModal.jsx'; // Import the BookingModal component
import './SearchResultsPage.css'; // Import the CSS for this page

function SearchResultsPage() {
    const [searchParams] = useSearchParams(); // Get URL search parameters
    const state = searchParams.get('state'); // Extract state from URL
    const city = searchParams.get('city');   // Extract city from URL

    const [medicalCenters, setMedicalCenters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [selectedCenter, setSelectedCenter] = useState(null); // State to store which center is being booked
    const [bookingSuccessMessage, setBookingSuccessMessage] = useState(''); // State for success message after booking

    useEffect(() => {
        // Only fetch if both state and city are present in URL params
        if (state && city) {
            const fetchCenters = async () => {
                setLoading(true); // Start loading
                setError(null); // Clear previous errors
                setMedicalCenters([]); // Clear previous results when fetching new ones
                setBookingSuccessMessage(''); // Clear any old success messages
                try {
                    const data = await getMedicalCenters(state, city);
                    // Filter out any entries that might not have a 'Hospital Name'
                    const filteredData = data.filter(center => center['Hospital Name']);
                    setMedicalCenters(filteredData);
                } catch (err) {
                    setError(`Failed to load medical centers for ${city}, ${state}.`);
                    console.error(err);
                } finally {
                    setLoading(false); // End loading
                }
            };
            fetchCenters();
        } else {
            // If state or city is missing in URL, show an error
            setError('Please select a state and city on the home page to view results.');
        }
    }, [state, city]); // Re-run effect when state or city URL params change

    // Function to open the booking modal
    const handleOpenBookingModal = (center) => {
        setSelectedCenter(center); // Set the medical center for the modal
        setIsModalOpen(true); // Open the modal
    };

    // Function to close the booking modal
    const handleCloseBookingModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedCenter(null); // Clear the selected medical center
    };

    // Function to handle booking appointment and save to localStorage
    const handleBookAppointment = (bookingData) => {
        saveBooking(bookingData); // Save the booking using the localStorage utility function
        setBookingSuccessMessage(`Appointment booked successfully at ${bookingData.hospitalName} on ${bookingData.appointmentDate} at ${bookingData.appointmentTime}!`);
        // You might want to automatically navigate to My Bookings page or show a confirmation
        // For now, we'll just show a success message.
    };

    return (
        <div className="search-results-container">
            {loading && <LoadingSpinner />} {/* Display loading spinner */}
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            {bookingSuccessMessage && <p className="success-message">{bookingSuccessMessage}</p>} {/* Display success message */}

            {medicalCenters.length > 0 ? (
                <>
                    {/* CRUCIAL: h1 tag for search results heading, formatted as per requirements */}
                    <h1 className="results-heading">
                        {medicalCenters.length} medical centers available in {city.toLowerCase()}
                    </h1>
                    <div className="medical-centers-list">
                        {medicalCenters.map((center, index) => (
                            <div key={index} className="medical-center-card">
                                {/* CRUCIAL: h3 tag for hospital name */}
                                <h3>{center['Hospital Name']}</h3>
                                <p>Address: {center['Address']}, {center['City']}, {center['State']} {center['ZIP Code']}</p>
                                <p>Rating: {center['Overall Rating']} / 5</p>
                                {/* Updated button to open the modal and pass the center data */}
                                <button
                                    className="book-button"
                                    onClick={() => handleOpenBookingModal(center)}
                                >
                                    Book FREE Center Visit
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                // Display message if no centers found and not loading/error
                !loading && !error && (state && city ? <p>No medical centers found for {city}, {state}. Try a different selection.</p> : null)
            )}

            {/* Render the BookingModal if it's open and a medical center has been selected */}
            {isModalOpen && selectedCenter && (
                <BookingModal
                    isOpen={isModalOpen}
                    onClose={handleCloseBookingModal}
                    medicalCenter={selectedCenter}
                    onBookAppointment={handleBookAppointment}
                />
            )}
        </div>
    );
}

export default SearchResultsPage;
