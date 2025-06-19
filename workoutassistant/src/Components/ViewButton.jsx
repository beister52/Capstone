import React from 'react'
import Button from '@mui/material/Button'

// Styled Remove button, used in SessionList component
const ViewButton = ({onClick}) => {
    return (
        <Button
            variant='outlined'
            onClick={onClick}
            sx={{
                mr: 0.5,
                height: '36px',
                color: '#1976d2',
                borderColor: '#1976d2',
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: 'lightgray',
                },
            }}
        >
            View
        </Button>
    ); 
};

export default ViewButton;