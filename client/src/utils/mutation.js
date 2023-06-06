import { gql } from '@apollo/client';


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
