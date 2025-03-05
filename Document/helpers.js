export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  
  export const validateForm = (data) => {
    const errors = {};
    if (!data.crimeType) errors.crimeType = 'Crime type is required';
    if (!data.location) errors.location = 'Location is required';
    if (!data.time) errors.time = 'Time is required';
    return errors;
  };