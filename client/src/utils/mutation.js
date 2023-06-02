import { gql } from '@apollo/client';
​

export const LOGIN_USER = gql`
  mutation logIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
​


export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
​


export const ADD_BUCKET = gql`
  mutation  createBucket($title: String!, $description: String!, $status: String!, $priority: Int!, $dueDate: String) {
    createBucket(title: $title, description: $description, status: $status, priority: $priority, dueDate: $dueDate) {
      id
      description
      dueDate
      isOverDue
      priority
      status
      title
    }
  }
`;

// delete bucket. need bucket ID // status 200 w deleteBucket: null
// issue: need to add a function for delete bucket in typeDef under Server files

export const DELETE_BUCKET = gql`
mutation deleteBucket($deleteBucketId: ID!) {
  deleteBucket(id: $deleteBucketId) {
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
}
`;

// add note to a bucket. need bucket id. status 200

export const ADD_NOTE_TO_BUCKET = gql`
mutation addNoteToBucket($bucketId: ID!, $content: String!) {
  addNoteToBucket(bucketId: $bucketId, content: $content) {
    id
    content
    createdAt
  }
}
`;

// delete a note from bucket. require bucket ID and note ID (note ID because we're allowing users to add multiple notes to one bucket)
// issue: Note.content cannot return "null". field is non-nullable 
export const DELETE_NOTE_FROM_BUCKET = gql`
mutation DeleteNoteFromBucket($bucketId: ID!, $noteId: ID!) {
  deleteNoteFromBucket(bucketId: $bucketId, noteId: $noteId) {
    id
    content
    createdAt
  }
}
`;

// update bucket but only allows description, due date, title // need authorization token
// issue: how to input variables for title, description and duedate?
export const UPDATE_BUCKET = gql`
mutation UpdateBucket($updateBucketId: ID!) {
  updateBucket(id: $updateBucketId) {
    title
    description
    dueDate
  }
}
`;