
// export default BucketUpdateForm;
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_BUCKET } from '../../utils/mutations';
import { QUERY_SINGLE_BUCKET } from '../../utils/queries';
import { TextField, Button, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { formatDate } from '../../utils/formatDate';

const BucketUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bucketData, setBucketData] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: new Date(),
    priority: '',
  });

  const { loading, error, data } = useQuery(QUERY_SINGLE_BUCKET, {
    variables: { bucketId: id },
  });

  const [updateBucket] = useMutation(UPDATE_BUCKET);

  useEffect(() => {
    if (data) {
      const { title, description, status, dueDate, priority } = data.bucket;
      console.log(dueDate)
      setBucketData({
        title,
        description,
        status,
        dueDate,
        priority,
      });
    }
  }, [data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBucketData({ ...bucketData, [name]: value });
  };

  const handleDateChange = (date) => {
    console.log('Selected Date:', date); // Add this line to check the value
  
    let updatedDate;
    if (typeof date === 'string') {
      updatedDate = new Date(date);
    } else if (date instanceof Date) {
      updatedDate = date;
    } else {
      console.error('Invalid date');
      return;
    }
  
    updatedDate.setHours(0, 0, 0, 0);
    setBucketData({ ...bucketData, dueDate: updatedDate });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!bucketData.dueDate) {
      console.error('Due date is required');
      return;
    }

    try {
      const { data } = await updateBucket({
        variables: {
          updateBucketId: id,
          ...bucketData,
          priority: parseInt(bucketData.priority),
        },
      });

      navigate(`/singleBucket/${data.updateBucket.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="bucket-form-container">
      <Typography variant="h4" align="center" gutterBottom>
        Update Bucket
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
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              label="Status"
              id="status"
              name="status"
              value={bucketData.status}
              onChange={handleInputChange}
              fullWidth
            >
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-field">
          {/* <DatePicker
            selected={bucketData.dueDate}
          //  onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Due Date"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            className="form-control"
            fullWidth
          /> */}
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
          Update
        </Button>
      </form>
    </div>
  );
};

export default BucketUpdateForm;

