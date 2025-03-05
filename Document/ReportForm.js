import React, { useState } from 'react';
import api from '../services/api';
import '../styles/components.css';

function ReportForm() {
  const [report, setReport] = useState({
    crimeType: '',
    location: '',
    time: '',
    evidence: '',
    witnesses: '',
    name: '', // New, optional
    age: '', // New, optional
    phoneNumber: '', // New, optional
  });
  const [error, setError] = useState(null); // Add error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedReport = {
      ...report,
      time: new Date(report.time).toISOString(), // Ensure time is an ISO string
      age: report.age ? parseInt(report.age, 10) : null, // Convert age to number or null
    };
    try {
      const response = await api.post('/api/reports', formattedReport);
      console.log('Response from backend:', response.data); // Log the response for debugging
      alert('Crime reported successfully!');
      setReport({
        crimeType: '',
        location: '',
        time: '',
        evidence: '',
        witnesses: '',
        name: '',
        age: '',
        phoneNumber: '',
      });
      setError(null); // Clear any previous errors
      window.location.reload(); // Refresh the page to show updated content or navigate back to home
    } catch (error) {
      console.error('Error reporting crime:', error.response ? error.response : error);
      const errorMessage = error.response?.data?.error || 'Failed to report crime. Please try again.';
      setError(errorMessage);
      console.log('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        requestUrl: error.response?.config?.url, // Log the request URL for debugging
      }); // Log detailed error for debugging
    }
  };

  return (
    <form onSubmit={handleSubmit} className="report-form">
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <input
        type="text"
        placeholder="Crime Type (e.g., Harassment, Theft)"
        value={report.crimeType}
        onChange={(e) => setReport({ ...report, crimeType: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={report.location}
        onChange={(e) => setReport({ ...report, location: e.target.value })}
        required
      />
      <input
        type="datetime-local"
        value={report.time}
        onChange={(e) => setReport({ ...report, time: e.target.value })}
        required
      />
      <textarea
        placeholder="Evidence or Description"
        value={report.evidence}
        onChange={(e) => setReport({ ...report, evidence: e.target.value })}
      />
      <textarea
        placeholder="Witnesses (if any)"
        value={report.witnesses}
        onChange={(e) => setReport({ ...report, witnesses: e.target.value })}
      />
      <input
        type="text"
        placeholder="Your Name (Optional)"
        value={report.name}
        onChange={(e) => setReport({ ...report, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Your Age (Optional)"
        value={report.age}
        onChange={(e) => setReport({ ...report, age: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Your Phone Number (Optional)"
        value={report.phoneNumber}
        onChange={(e) => setReport({ ...report, phoneNumber: e.target.value })}
      />
      <button type="submit">Submit Report</button>
    </form>
  );
}

export default ReportForm;