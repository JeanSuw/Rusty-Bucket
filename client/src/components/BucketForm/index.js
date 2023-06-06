

// export default BucketForm;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BUCKET } from '../../utils/mutations';
import { TextField, Button, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const BucketForm = () => {
  const [bucketData, setBucketData] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: null,
    priority: '',
  });

  const [addBucket, { error }] = useMutation(ADD_BUCKET);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBucketData({ ...bucketData, [name]: value });
  };

  const handleDateChange = (date) => {
    setBucketData({ ...bucketData, dueDate: date });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if the due date is null or empty
    if (!bucketData.dueDate) {
      // Display an error message or handle the validation error as desired
      console.error('Due date is required');
      return;
    }

    try {
      await addBucket({
        variables: {
          ...bucketData,
          priority: parseInt(bucketData.priority) // Convert to integer
        },
      });
      // Reset form data
      setBucketData({
        title: '',
        description: '',
        status: '',
        dueDate: null,
        priority: '',
      });
      // Redirect to profile page
      navigate('/profile');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bucket-form-container">
      <Typography variant="h4" align="center" gutterBottom>
        Create New Bucket
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <div className="form-field">
          <TextField
            label="Title"
            id="title"
            name="title"
            value={bucketData.title}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="form-field">
          <TextField
            label="Description"
            id="description"
            name="description"
            value={bucketData.description}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="form-field">
          <TextField
            label="Status"
            id="status"
            name="status"
            value={bucketData.status}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="form-field">
          <DatePicker
            selected={bucketData.dueDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Due Date"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            className="form-control"
            fullWidth
          />
        </div>
        <div className="form-field">
          <TextField
            label="Priority"
            id="priority"
            name="priority"
            value={bucketData.priority}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BucketForm;
