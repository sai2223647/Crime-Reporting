import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CrimeInfo from '../components/CrimeInfo';

function Resources() {
  const [crimes, setCrimes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCrime, setSelectedCrime] = useState(null);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const response = await api.get('/api/crimes');
        setCrimes(response.data);
      } catch (error) {
        console.error('Error fetching crimes:', error);
        setError(error.response?.data?.error || 'Failed to load crime resources. Please try again.');
      }
    };
    fetchCrimes();
  }, []);

  return (
    <div className="component-container">
      <h1>Crime Resources</h1>
      <p>Learn about crime types, prevention tips, and legal actions. Open to all users.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CrimeInfo />
      {/* Optional: Simple CRUD UI for future admin use (read-only for now) */}
      {crimes.length > 0 && (
        <div className="crime-actions">
          <h3>Manage Resources (Admin Only - Read Only for Now)</h3>
          <select onChange={(e) => setSelectedCrime(e.target.value)}>
            <option value="">Select a Crime</option>
            {crimes.map((crime) => (
              <option key={crime._id} value={crime._id}>
                {crime.type}
              </option>
            ))}
          </select>
          {selectedCrime && (
            <div>
              <p>Selected Crime ID: {selectedCrime}</p>
              <button onClick={() => alert('Update not implemented yet - admin required.')}>Update</button>
              <button onClick={() => alert('Delete not implemented yet - admin required.')}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Resources;