
// export default BucketList;
import React from 'react';
import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { QUERY_BUCKETS } from '../../utils/queries';

const BucketList = () => {
  const { loading, error, data } = useQuery(QUERY_BUCKETS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const buckets = data.buckets
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10)
    .map(bucket => ({
      ...bucket,
      createdAt: new Date(parseInt(bucket.createdAt)).toLocaleDateString(), // Format createdAt date
    }));

  const columns = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
  ];

  return (
    <div >
      <Typography className="round-corner-form"  variant="h6" align="center" style={{backgroundColor:"#654321", color: "white"}} gutterBottom>
        Top Ten Recent Buckets Add By Users
      </Typography>
      {/* The table color */}
      <div style={{ height: 400, width: '100%'}}>
        {/* The text color */}
        <DataGrid rows={buckets} columns={columns} pageSize={5} style={{border: '2px solid #654321', color: "black", borderRadius: 25}}/>
      </div>
    </div>
  );
};

export default BucketList;
