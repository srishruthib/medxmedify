import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStates, getCities } from '../api/medDataApi.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import './HomePage.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

function HomePage() {
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStates = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getStates();
                setStates(data);
                console.log('Fetched states in useEffect (should be array):', data);
            } catch (err) {
                setError('Failed to load states. Please try again later.');
                console.error('Error fetching states in HomePage useEffect:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            const fetchCities = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await getCities(selectedState);
                    setCities(data);
                    setSelectedCity('');
                } catch (err) {
                    setError(`Failed to load cities for ${selectedState}.`);
                    console.error('Error fetching cities in HomePage useEffect:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchCities();
        } else {
            setCities([]);
            setSelectedCity('');
        }
    }, [selectedState]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedState && selectedCity) {
            navigate(`/search-results?state=${selectedState}&city=${selectedCity}`);
        } else {
            setError('Please select both a state and a city to search.');
        }
    };

    const carouselItems = [
        { id: 1, title: 'Expert Doctors', description: 'Find highly qualified specialists.', image: 'https://placehold.co/300x200/ADD8E6/000000?text=Doctor' },
        { id: 2, title: 'Top Hospitals', description: 'Access leading medical facilities.', image: 'https://placehold.co/300x200/90EE90/000000?text=Hospital' },
        { id: 3, title: 'Quality Medicines', description: 'Order prescriptions with ease.', image: 'https://placehold.co/300x200/FFB6C1/000000?text=Medicine' },
        { id: 4, title: '24/7 Support', description: 'Always here to help you.', image: 'https://placehold.co/300x200/D3D3D3/000000?text=Support' },
    ];

    return (
        <div className="home-page-container">
            {loading && <LoadingSpinner />}
            <h1 className="page-title">Find Medical Centers</h1>
            <form onSubmit={handleSearch} className="search-form">
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label htmlFor="state-select">Select State:</label>
                    <div id="state" className="dropdown-wrapper">
                        {/* Removed the inline console.log that might have caused syntax issues */}
                        <select
                            id="state-select"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            disabled={loading}
                            data-testid="state-select-dropdown"
                        >
                            <option value="">-- Select State --</option>
                            {states.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="city-select">Select City:</label>
                    <div id="city" className="dropdown-wrapper">
                        <select
                            id="city-select"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={loading || !selectedState}
                            data-testid="city-select-dropdown"
                        >
                            <option value="">-- Select City --</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" id="searchBtn" disabled={loading || !selectedState || !selectedCity}>
                    Search
                </button>
            </form>

            <div className="carousel-section">
                <h2>Featured Services</h2>
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    className="mySwiper"
                >
                    {carouselItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="carousel-item">
                                <img src={item.image} alt={item.title} onError={(e) => e.target.src = 'https://placehold.co/300x200/cccccc/000000?text=Image+Error'} />
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default HomePage;
