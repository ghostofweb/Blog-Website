import React from 'react';

function Logo({ width = "100px" }) {
  return (
    <img 
      src="/logo.png" // This should work if logo.png is in the public folder
      alt="Logo" 
      style={{ width }} // Apply the width prop
    />
  );
}

export default Logo;
