
// export default SingleBucket;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
// import { Card, CardContent, Typography, Button, CardHeader, TextField } from '@mui/material';
import { Card, CardContent, Typography, Button, CardHeader, TextField, Grid, Autocomplete } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { QUERY_SINGLE_BUCKET } from '../utils/queries';
import { DELETE_NOTE_FROM_BUCKET, DELETE_BUCKET, ADD_NOTE_TO_BUCKET } from '../utils/mutations';
import { formatDate } from '../utils/formatDate';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const SingleBucket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(QUERY_SINGLE_BUCKET, {
    variables: { bucketId: id },
  });

  const [deleteNote] = useMutation(DELETE_NOTE_FROM_BUCKET);
  const [deleteBucket] = useMutation(DELETE_BUCKET);
  const [addNoteToBucket] = useMutation(ADD_NOTE_TO_BUCKET);

  const [newNote, setNewNote] = useState('');

  const handleAddNote = async () => {
    try {
      const { data } = await addNoteToBucket({
        variables: { bucketId: id, content: newNote },
        update: (cache, { data }) => {
          // Get the current bucket data from the cache
          const cachedData = cache.readQuery({
            query: QUERY_SINGLE_BUCKET,
            variables: { bucketId: id },
          });
  
          // Update the bucket's notes array with the new note data
          cache.writeQuery({
            query: QUERY_SINGLE_BUCKET,
            variables: { bucketId: id },
            data: {
              bucket: {
                ...cachedData.bucket,
                notes: [...cachedData.bucket.notes, data.addNoteToBucket],
              },
            },
          });
        },
      });
  
      console.log('Added note:', data.addNoteToBucket);
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
  
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
        update: (cache) => {
          // Get the current bucket data from the cache
          const cachedData = cache.readQuery({
            query: QUERY_SINGLE_BUCKET,
            variables: { bucketId: id },
          });
  
          // Remove the deleted note from the notes array
          const updatedNotes = cachedData.bucket.notes.filter(
            (note) => note.id !== noteId
          );
  
          // Update the cache with the updated notes array
          cache.writeQuery({
            query: QUERY_SINGLE_BUCKET,
            variables: { bucketId: id },
            data: {
              bucket: {
                ...cachedData.bucket,
                notes: updatedNotes,
              },
            },
          });
        },
      });
  
      console.log('Deleted note:', data.deleteNoteFromBucket);
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
    { field: 'content', headerName: 'Content', width: 800, wrapText: true },
    { field: 'createdAt', headerName: 'Created At', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleDeleteNote(params.row.id)}>
          <DeleteIcon />
        </IconButton>
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
      <Card sx={{ backgroundColor: 'transparent', border: '1px solid #654321', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
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

          <Typography variant="h5" component="div" style={{ borderTop: '2px solid #654321' }}>
            Notes
          </Typography>

          <Card sx={{ backgroundColor: 'rgba(245, 245, 245, 0.5)', marginTop: '10px', marginBottom: '10px', border: '1px solid #654321' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    label="New Note"
                    multiline
                    rows={1}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} justifyContent="flex-end">

                    <Grid item>
                      <Button
                        variant="outlined"
                        style={{ color: 'green', borderColor: 'green', marginBottom: '10px' }}
                        onClick={handleAddNote}
                      >
                        Create New Note
                      </Button>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <div style={{ height: '300px', width: '100%', marginBottom: '20px', overflow: 'auto', border: '1px solid #654321' }}>
            <DataGrid rows={rows} columns={columns} autoHeight sx={{ backgroundColor: 'rgba(245, 245, 245, 0.5)' }} />
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
