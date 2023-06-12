import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Login = (props) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.signIn.token);
      console.log(data.signIn.token);

       if (data) {
        // window.location.reload(true);
       // navigate('/'); // Redirect to the profile page
        setTimeout(() => {
          navigate('/profile');
        }, 500); 
       }
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        {/* Changing the background color of the body under header */}
        <div className="card round-corner-form" >
          {/* Changing the background color of the Login header */}
          <h4 className="card-header p-2 round-corner-heading" style={{ backgroundColor: "#654321" }}>Login</h4>
          <div className="card-body" >

            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="custom-button"
                // Changing the background color of the button
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
              </button>
            </form>


            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;