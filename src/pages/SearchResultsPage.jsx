import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getMedicalCenters } from '../api/medDataApi.js';
import { saveBooking } from '../utils/localStorage.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import BookingModal from '../components/BookingModal.jsx';
import './SearchResultsPage.css';

function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const state = searchParams.get('state');
    const city = searchParams.get('city');

    const [medicalCenters, setMedicalCenters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState(null);

    useEffect(() => {
        if (state && city) {
            const fetchCenters = async () => {
                setLoading(true);
                setError(null);
                setMedicalCenters([]);
                try {
                    const data = await getMedicalCenters(state, city);
                    const filteredData = data.filter(center => center['Hospital Name']);
                    setMedicalCenters(filteredData);
                } catch (err) {
                    setError(`Failed to load medical centers for ${city}, ${state}.`);
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchCenters();
        } else {
            setError('Please select a state and city on the home page to view results.');
        }
    }, [state, city]);

    const handleOpenBookingModal = (center) => {
        setSelectedCenter(center);
        setIsModalOpen(true);
    };

    const handleCloseBookingModal = () => {
        setIsModalOpen(false);
        setSelectedCenter(null);
    };

    const handleBookAppointment = (bookingData) => {
        saveBooking(bookingData);
        navigate('/my-bookings'); // Redirect to bookings page
    };

    return (
        <div className="search-results-container">
            {loading && <LoadingSpinner />}
            {error && <p className="error-message">{error}</p>}

            {medicalCenters.length > 0 ? (
                <>
                    <h1 className="results-heading">
                        {medicalCenters.length} medical centers available in {city.toLowerCase()}
                    </h1>
                    <ul className="medical-centers-list">
                        {medicalCenters.map((center, index) => (
                            <li key={index} className="medical-center-item">
                                <span className="city-label">{center['City']}</span>
                                <div className="medical-center-card">
                                    <h3>{center['Hospital Name']}</h3>
                                    <p>Address: {center['Address']}, {center['City']}, {center['State']} {center['ZIP Code']}</p>
                                    <p>Rating: {center['Overall Rating']} / 5</p>
                                    <button
                                        className="book-button"
                                        onClick={() => handleOpenBookingModal(center)}
                                    >
                                        Book FREE Center Visit
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                !loading && !error && (state && city ? <p>No medical centers found for {city}, {state}. Try a different selection.</p> : null)
            )}

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
