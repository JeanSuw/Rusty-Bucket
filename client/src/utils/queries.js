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

// get bucket by userID
// issue: code return values for email, password, username, but error occures because buckets return as null and this value cannot be null

// export const QUERY_USER_BY_ID = gql`
// query getUserByID($userId: ID!) {
//   user(id: $userId) {
//     email
//     password
//     username
//     buckets {
//       description
//     }
//   }
// }
// `;


// get usersWithBuckets will return ID, username, email and bucket title for any user that has at least one bucket item

export const QUERY_USERSWITHBUCKETS = gql`
uery getUsersWithBuckets {
  usersWithBuckets {
    id
    username
    email
    buckets {
      title
    }
  }
}
`;