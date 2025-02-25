import React from 'react';

const Button = ({ onClick, text, color = '#1E90FF' }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: color,
        color: '#fff', 
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
      }}
    >
      {text}
    </button>
  );
};

export default Button;