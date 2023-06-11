
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { QUERY_CURRENTUSER } from '../utils/queries';
import { formatDate } from '../utils/formatDate';
import { Typography, Button,LinearProgress} from '@mui/material';
import Auth from '../utils/auth';

const Profile = () => {
  const { loading, error, data } = useQuery(QUERY_CURRENTUSER);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <LinearProgress sx={{ height: 50, backgroundColor: 'gold', '& .MuiLinearProgress-bar': { backgroundColor: '#654321' } }} /> 
      </div>
    );
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data.currentUser;

  const columns = [
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
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Bucket List
      </Typography>
      <Button
        className="custom-button"
        variant="contained"
        onClick={handleCreateBucket}
        style={{ backgroundColor: '#654321', color: 'white' }}
      >
        Create New Bucket
      </Button>
      <div
        style={{
          backgroundColor: 'rgba(245, 245, 245, 0.3)',
          height: 600,
          width: '100%',
          marginTop: '20px',
          border: '2px solid #654321',
          borderRadius: '25px',
        }}
      >
        <DataGrid rows={rows} columns={columns} style={{ color: 'black' }} />
      </div>
      
    </div>
  );
};

export default Profile;
