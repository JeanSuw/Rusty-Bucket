
// export default SingleBucket;
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Card, CardContent, Typography, Button, CardHeader } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { QUERY_SINGLE_BUCKET } from '../utils/queries';
import { DELETE_NOTE_FROM_BUCKET, DELETE_BUCKET } from '../utils/mutations';
import { formatDate } from '../utils/formatDate';

const SingleBucket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(QUERY_SINGLE_BUCKET, {
    variables: { bucketId: id },
  });

  const [deleteNote] = useMutation(DELETE_NOTE_FROM_BUCKET);
  const [deleteBucket] = useMutation(DELETE_BUCKET);


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
      window.location.reload();

    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleDeleteBucket = async () => {
    try {
      const { data } = await deleteBucket({
        variables: { deleteBucketId: bucket.id },
      });
      console.log('Deleted bucket:', data.deleteBucket);
      navigate('/profile');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting bucket:', error);
    }
  };
  const bucketId = bucket.id;
  const handleUpdateBucket = () => {
    navigate(`/bucket/update/${bucketId}`);
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


  return (
    <div>
      <Card sx={{ backgroundColor: 'transparent', border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader sx={{ backgroundColor: '#654321' }}
          title={
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: "white" }}>
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

          <Typography variant="h5" component="div" style={{ borderTop: '2px solid brown' }}>
            Notes
          </Typography>
          {/* <button className="custom-button" onClick={handleUpdateBucket}>
            Add Note
          </button> */}
          <Button
            variant="outlined"
            style={{ color: 'green', borderColor: 'green' }}
          >
            Add New Note
          </Button>

          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </CardContent>



      </Card>
      <button className="custom-button" onClick={handleUpdateBucket}>
        Update Bucket
      </button>
      <button className="custom-button" onClick={handleDeleteBucket}>
        Delete Bucket
      </button>
    </div>
  );
};

export default SingleBucket;
