import React from 'react';
import './LoadingSpinner.css'; // Import the CSS for this component

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading data, please wait...</p> {/* User-friendly loading message */}
        </div>
    );
};

export default LoadingSpinner;
