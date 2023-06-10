// export default Profile;
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { QUERY_CURRENTUSER } from '../utils/queries';
import { formatDate } from '../utils/formatDate';
import {  Typography } from '@mui/material';
// Button,
import Auth from '../utils/auth';

const Profile = () => {
  const { loading, error, data } = useQuery(QUERY_CURRENTUSER);
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data.currentUser;

  const columns = [
  //  { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      renderCell: (params) => (
        <Link to={`/singleBucket/${params.row.id}`}>{params.value}</Link>
      ),
    },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'priority', headerName: 'Priority', width: 150 },
    { field: 'isOverDue', headerName: 'Is Overdue', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
  ];

  const rows = user.buckets.map((bucket) => ({
    id: bucket.id,
    title: bucket.title,
    description: bucket.description,
    status: bucket.status,
    dueDate: formatDate(bucket.dueDate),
    priority: bucket.priority,
    isOverDue: bucket.isOverDue ? 'Yes' : 'No',
    createdAt: formatDate(bucket.createdAt),
  }));

  const handleCreateBucket = () => {
    if (Auth.loggedIn()) {
      navigate('/addBucket');
    } else {
      navigate('/login');
    }
  };

  return (
    <div  >
      
      <Typography variant="h4" align="center" gutterBottom>
        Bucket List
      </Typography>
      {/* Change color for the button "Create New Bucket"*/}
      <button className="custom-button" variant="contained" fullWidth onClick={handleCreateBucket}>
        Create New Bucket
      </button>
      <div style={{backgroundColor: 'rgba(245, 245, 245, 0.3)', height: 400, width: '100%'}}>
        {/* Change the color of the text to black and move the table downward */}
        <DataGrid className='my-4' rows={rows} columns={columns} style={{border: '2px solid #654321', color: "black", borderRadius: 25}} />
      </div>
      
    </div>
  );
};

export default Profile;
