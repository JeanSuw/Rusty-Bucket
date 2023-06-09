import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn mb-3 text-light "
            // Changing color of the button and make the corners rounder
            style={{backgroundColor: "#654321", borderRadius: 25}}
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 style= {{color: "#654321"}}>
         Tracking Bucket List Made Easy!
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
