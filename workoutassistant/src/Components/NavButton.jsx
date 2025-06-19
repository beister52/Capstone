import React from 'react';
import Button from '@mui/material/Button'

const NavButton = ({ children, onClick, variant = 'contained'}) => {
    return (
      <Button
        onClick={onClick}
        variant={variant}
        sx={{
          backgroundColor: '#1976d2',
          height: '68px',
          color: '#fff',
          padding: '4px 4px 4px 4px',
          margin: 1,
          borderRadius: '4px',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#115293',
          },
        }}
      >
        {children}
      </Button>
    );
};
  
  export default NavButton;