import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import the main App component
import './index.css'; // Import global styles

// Create the root for your React application and render the App component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
