import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/components.css';

function Header() {
  const [safetyTip, setSafetyTip] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSafetyTip = async () => {
      try {
        const response = await api.get('/api/crimes');
        const crimes = response.data;
        if (crimes.length > 0) {
          const randomCrime = crimes[Math.floor(Math.random() * crimes.length)];
          setSafetyTip(randomCrime.prevention);
        } else {
          setSafetyTip('No safety tips available. Please check back later.');
        }
      } catch (error) {
        console.error('Error fetching safety tip:', error);
        setError(error.response?.data?.error || 'Failed to load safety tip. Please try again.');
      }
    };
    fetchSafetyTip();
  }, []);

  return (
    <nav className="header-nav">
      <div className="nav-brand">
        <Link to="/" className="nav-link">Crime Track</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/report" className="nav-link">Report Crime</Link>
        <Link to="/resources" className="nav-link">Resources</Link>
        <Link to="/forum" className="nav-link">Forum</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </div>
      <div className="safety-tip" style={{ color: 'white', padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '4px' }}>
        {error ? <p style={{ color: 'red' }}>{error}</p> : <p>Safety Tip: {safetyTip}</p>}
      </div>
    </nav>
  );
}

export default Header;