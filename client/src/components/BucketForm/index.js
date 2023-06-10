
// export default BucketForm;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BUCKET } from '../../utils/mutations';
import { TextField, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';

//import { css } from '@emotion/css'

const BucketForm = () => {
  const [bucketData, setBucketData] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: null,
    priority: '',
  });

  const [addBucket] = useMutation(ADD_BUCKET);
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
      // Display validtion error
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
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Color of the forms for addBucket Page can be change in line 70
    <div className="bucket-form-container" style={{ color:"black"}}>
      <Typography className='round-corner-heading' variant="h4" align="center" style={{backgroundColor: "#654321", color:"white"}} gutterBottom>
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

{/* issue: to prevent users from adding past dates */}
        <div className="form-field">
        <FormControl fullWidth>
        <InputLabel id="status-label"> Status </InputLabel>
        <Select
          label="Status"
          id="status"
          name="status"
          value={bucketData.status}
          onChange={handleInputChange}
          fullWidth
        >
          <MenuItem value="Not Started"> Not Started </MenuItem>
          <MenuItem value="In Progress"> In Progress </MenuItem>
          <MenuItem value="Completed"> Completed </MenuItem>
        </Select>
      </FormControl>
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
        {/* Color of the Submit Button for Create New Bucket */}
        <button className="custom-button" type="submit" variant="contained" style={{ color:"white", width: "20rem"}}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default BucketForm;
