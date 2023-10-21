import React from 'react';
import logo from './logo.png';

const imageContainerStyle = {
  marginBottom: '20px',
};

const logoImageStyle = {
    width: '100px',
    height: 'auto',
   backgroundColor: 'white',
   position: 'relative',
   left:'45px',
   top:'8px'
  };
  

const LogoImage = () => {
  return (
    <div style={imageContainerStyle}>
      <img src={logo} alt="Logo" style={logoImageStyle} />
    </div>
  );
};

export default LogoImage;

