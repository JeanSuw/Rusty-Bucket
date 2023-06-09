
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
    dueDate: null,
    priority: '',
  });
  const { loading, error, data } = useQuery(QUERY_SINGLE_BUCKET, {
    variables: { bucketId: id },
  });

  const [updateBucket] = useMutation(UPDATE_BUCKET);

  useEffect(() => {
    if (data) {
      const { title, description, status, dueDate, priority } = data.bucket;
      console.log(dueDate, "due")
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

  let initialDueDate = parseInt(bucketData.dueDate);
  console.log(initialDueDate ,"initial")
  const handleDateChange = (date) => {
    console.log(date, "date pickr date")
    // Create a new Date object with the provided date string
    var date = new Date(date);

    // Get the Unix timestamp by dividing the milliseconds by 1000 and rounding it off
    var unixTimestamp = Math.round(date.getTime() / 1000);

    // Display the Unix timestamp
    console.log(unixTimestamp ,"unix");
    setBucketData({ ...bucketData, dueDate: date });
    initialDueDate = parseInt(unixTimestamp)
    console.log(initialDueDate ,"initial2")
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
  // console.log(bucketData)
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
          <DatePicker
            // selected={parseInt(bucketData.dueDate)}
            selected={initialDueDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Due Date"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            className="form-control"
            fullWidth
          />
          {/* <DatePicker
            selected={bucketData.dueDate}
            onChange={handleDateChange}
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
      {/* {console.log(parseInt(bucketData.dueDate) , "loge bucket")} */}
    </div>
  );
};

export default BucketUpdateForm;

