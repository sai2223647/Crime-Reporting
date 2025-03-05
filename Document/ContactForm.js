import React, { useState } from 'react';
import api from '../services/api';
import '../styles/components.css';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setError(null);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response : error);
      setError(error.response?.data?.error || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="component-container">
      <h1>Contact Us</h1>
      <p>Send us your feedback or report issues anonymously.</p>
      {success && <p style={{ color: 'green' }}>Thank you for your message!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          placeholder="Your Name (Optional)"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Your Email (Optional)"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;