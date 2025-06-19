import React from 'react'
import Button from '@mui/material/Button'

// Styled Remove button, used in SessionList component
const RemoveButton = ({onClick}) => {
    return (
        <Button
            variant='outlined'
            onClick={onClick}
            sx={{
                mr: 0.5,
                height: '36px',
                color: 'salmon',
                borderColor: 'salmon',
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: 'lightgray',
                },
            }}
        >
            Remove
        </Button>
    ); 
};

export default RemoveButton;