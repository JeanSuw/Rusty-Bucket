// // export default SingleBucket;
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery, useMutation } from '@apollo/client';
// import { Card, CardContent, Typography, Button, CardHeader, styled } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { QUERY_SINGLE_BUCKET } from '../utils/queries';
// import { DELETE_NOTE_FROM_BUCKET } from '../utils/mutations';
// import { formatDate } from '../utils/formatDate';

// const SingleBucket = () => {
//   const { id } = useParams();
//   const { loading, error, data } = useQuery(QUERY_SINGLE_BUCKET, {
//     variables: { bucketId: id },
//   });
//   const [deleteNote] = useMutation(DELETE_NOTE_FROM_BUCKET);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   const bucket = data.bucket;

//   const handleDeleteNote = async (noteId) => {
//     try {
//       const { data } = await deleteNote({
//         variables: { bucketId: bucket.id, noteId: noteId },
//       });
//       console.log('Deleted note:', data.deleteNoteFromBucket);
//     } catch (error) {
//       console.error('Error deleting note:', error);
//     }
//   };


//   const columns = [
//     { field: 'id', headerName: 'ID', width: 150 },
//     { field: 'content', headerName: 'Content', width: 150 },
//     { field: 'createdAt', headerName: 'Created At', width: 150 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: (params) => (
//         <Button
//           variant="outlined"
//           color="error"
//           onClick={() => handleDeleteNote(params.row.id)}
//         >
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   const rows = bucket.notes.map((note) => ({
//     id: note.id,
//     content: note.content,
//     createdAt: formatDate(note.createdAt),
//   }));


//   return (
//     <div>
//       <Card sx={{ backgroundColor: 'transparent', border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//         <CardHeader sx={{ backgroundColor: 'goldenrod' }}
//           title={
//             <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
//               Bucket Details
//             </Typography>
//           }
//         />
//         <CardContent>
//           <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
//             Title: <span >{bucket.title}</span>
//           </Typography>
        
//           <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
//             Description: {bucket.description}
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
//             Status: {bucket.status}
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
//             Due Date: {formatDate(bucket.dueDate)}
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
//             Priority: {bucket.priority}
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
//             Is Overdue: {bucket.isOverDue ? 'Yes' : 'No'}
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Created At: {formatDate(bucket.createdAt)}
//           </Typography>
        
//           <Typography variant="h5" component="div" mt={4}>
         
//           Notes
//         </Typography>
//         <div style={{ hight: 300, width: '100%' }}>
//           <DataGrid rows={rows} columns={columns} />
//         </div>
        
     
        
//         </CardContent>
      
//       </Card>



//     </div>
//   );
// };

// export default SingleBucket;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Card, CardContent, Typography, Button, CardHeader, styled, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { QUERY_SINGLE_BUCKET } from '../utils/queries';
import { DELETE_NOTE_FROM_BUCKET } from '../utils/mutations';
import { formatDate } from '../utils/formatDate';

const SingleBucket = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_BUCKET, {
    variables: { bucketId: id },
  });
  const [deleteNote] = useMutation(DELETE_NOTE_FROM_BUCKET);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const bucket = data.bucket;

  const handleDeleteNote = async (noteId) => {
    try {
      const { data } = await deleteNote({
        variables: { bucketId: bucket.id, noteId: noteId },
      });
      console.log('Deleted note:', data.deleteNoteFromBucket);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'content', headerName: 'Content', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteNote(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = bucket.notes.map((note) => ({
    id: note.id,
    content: note.content,
    createdAt: formatDate(note.createdAt),
  }));
  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'darkbrown',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkbrown',
    },
  }));
  return (
    <div>
      <Card sx={{ backgroundColor: 'transparent', border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader sx={{ backgroundColor: 'goldenrod' }}
          title={
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              Bucket Details
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
            Title: <span>{bucket.title}</span>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
            Description: {bucket.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
            Status: {bucket.status}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
            Due Date: {formatDate(bucket.dueDate)}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
            Priority: {bucket.priority}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '5px' }}>
            Is Overdue: {bucket.isOverDue ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Created At: {formatDate(bucket.createdAt)}
          </Typography>

          <Typography variant="h5" component="div" mt={4}>
            Notes
          </Typography>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </CardContent>
      
          {/* <Button variant="contained" sx={{backgroundColor: 'darkbrown',color: 'white','&:hover': { backgroundColor: 'darkbrown' },}} fullWidth>
            Update Bucket
          </Button>
          <Button variant="contained"  sx={{backgroundColor: 'darkbrown',color: 'white','&:hover': { backgroundColor: 'darkbrown' },}} fullWidth>
            Delete Bucket
            </Button>
       */}
     
      
      </Card>
      <button className="custom-button">
          Update Bucket
        </button>
        <button className="custom-button">
          Delete Bucket
        </button>
    </div>
  );
};

export default SingleBucket;
