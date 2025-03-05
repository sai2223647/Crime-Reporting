import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/components.css';

function CrimeInfo() {
  const [crimes, setCrimes] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const response = await api.get('/api/crimes');
        console.log('Crimes response:', response.data); // Log the response for debugging
        setCrimes(response.data);
      } catch (error) {
        console.error('Error fetching crimes:', error.response ? error.response : error);
        setError(error.response?.data?.error || 'Failed to load crime resources. Please try again.');
      }
    };
    fetchCrimes();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {crimes.length === 0 ? (
        <p>No crime resources available. Please check with the administrator or try again later.</p>
      ) : (
        crimes.map((crime) => (
          <div key={crime._id} className="crime-card">
            <h3>{crime.type}</h3>
            <p><strong>Prevention:</strong> {crime.prevention}</p>
            <p><strong>Legal Actions:</strong> {crime.legalActions}</p>
            <p><strong>Created:</strong> {new Date(crime.createdAt).toLocaleString()}</p>
            <p><strong>Updated:</strong> {new Date(crime.updatedAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CrimeInfo;