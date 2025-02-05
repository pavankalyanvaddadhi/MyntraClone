import React from 'react';

const CustomButton = ({ 
  text, 
  onClick, 
  variant = 'contained', 
  backgroundColor, 
  width, 
  height,
  color = 'white'
}) => {
  const styles = {
    backgroundColor: backgroundColor || '#e72744',
    color: color,
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    width: width || 'auto',
    height: height || 'auto',
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  return (
    <button style={styles} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;