import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'; // We'll create this component next
import HomePage from './pages/HomePage.jsx'; // We'll create this page soon
import SearchResultsPage from './pages/SearchResultsPage.jsx'; // We'll create this page soon
import MyBookingsPage from './pages/MyBookingsPage.jsx'; // We'll create this page soon
import './index.css'; // Global CSS imported here for App component

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header component for top navigation - will be created in a later step */}
        <Header />

        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Landing Page */}
          <Route path="/search-results" element={<SearchResultsPage />} /> {/* Page to display search results */}
          <Route path="/my-bookings" element={<MyBookingsPage />} /> {/* My Bookings page - CRUCIAL: exact path as per requirements */}
          {/* Add more routes here as your application grows */}
        </Routes>

        {/* A footer component can be added here if needed later */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
