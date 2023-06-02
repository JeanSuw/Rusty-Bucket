import { gql } from '@apollo/client';
​

//get logged_in user
export const QUERY_CURRENTUSER = gql`
query getCurrentUser {
    currentUser {
      buckets {
        id
        title
        description
        status
        dueDate
        priority
        isOverDue
        notes {
          id
          content
          createdAt
        }
      }
      username
      password
      id
      email
    }
  }
`;

//get all buckets 
​export const QUERY_BUCKETS = gql`
query getBuckets {
    buckets {
      id
      description
      title
      dueDate
      isOverDue
      priority
      status
      notes {
        id
      }
    }
  }
  `;


//get a bucket

export const QUERY_SINGLE_BUCKET = gql`
query getSingleBucket ($bucketId: ID!) {
    bucket(id: $bucketId) {
      description
      dueDate
      priority
      status
      title
      id
      isOverDue
      notes {
        id
      }
    }
  }
`;
​