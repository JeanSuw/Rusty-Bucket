

// // export default Profile;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { DataGrid } from '@mui/x-data-grid';
// import { QUERY_CURRENTUSER } from '../utils/queries';
// import { formatDate } from '../utils/formatDate'; // Import the formatDate function
// import { Button, Typography } from '@mui/material';
// import Auth from '../utils/auth'; // Import the Auth utility

// const Profile = () => {
//   const { loading, error, data } = useQuery(QUERY_CURRENTUSER);
//   const navigate = useNavigate();

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   const user = data.currentUser;

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 150 },
//     { field: 'title', headerName: 'Title', width: 150 },
//     { field: 'description', headerName: 'Description', width: 150 },
//     { field: 'status', headerName: 'Status', width: 150 },
//     { field: 'dueDate', headerName: 'Due Date', width: 150 },
//     { field: 'priority', headerName: 'Priority', width: 150 },
//     { field: 'isOverDue', headerName: 'Is Overdue', width: 150 },
//     { field: 'createdAt', headerName: 'Created At', width: 150 },
//   ];

//   const rows = user.buckets.map((bucket) => ({
//     id: bucket.id,
//     title: bucket.title,
//     description: bucket.description,
//     status: bucket.status,
//     dueDate: formatDate(bucket.dueDate),
//     priority: bucket.priority,
//     isOverDue: bucket.isOverDue ? 'Yes' : 'No', // Convert boolean to "Yes" or "No"
//     createdAt: formatDate(bucket.createdAt),
//   }));

//   const handleCreateBucket = () => {
//     if (Auth.loggedIn()) {
//       navigate('/addBucket');
//     } else {
//       // User is not logged in, handle the authentication flow as needed
//       // For example, display a login/signup modal or redirect to the login page
//       navigate('/login'); // Replace '/login' with your login page URL
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h4" align="center" gutterBottom>
//         Bucket List
//       </Typography>
//       <Button variant="contained" color="primary" fullWidth onClick={handleCreateBucket}>
//         Create New Bucket
//       </Button>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid rows={rows} columns={columns} />
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { QUERY_CURRENTUSER } from '../utils/queries';
import { formatDate } from '../utils/formatDate';
import { Button, Typography } from '@mui/material';
import Auth from '../utils/auth';

//import orange from '@material-ui/core/colors/orange';
//import { css } from '@emotion/css'
//const primary = orange[200];
//import { ThemeProvider, createTheme } from "@material-ui/core/styles";
//import { createTheme } from '@material-ui/core/styles';
// const theme = createTheme({
//   palette: {
//     primary: {
//       light: '#ffd740',
//     },
//   },
// });
// Button color : Gold
// const createMuiTheme = () => {
//   return createTheme({
//     palette: {
//       primary: {
//         main: '#ffd740', 
//       }
//     }
//   })
// };

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
    { field: 'id', headerName: 'ID', width: 150 },
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
      <Button variant="contained" color="primary" fullWidth onClick={handleCreateBucket}>
        Create New Bucket
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
      
    </div>
  );
};

export default Profile;
