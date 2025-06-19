import React from 'react'
import Button from '@mui/material/Button'

// Used in the SessionsList component for logging user data
const LogButton = ({onClick}) => {
    return(
        <Button
            variant='contained'
            onClick={onClick}
            sx={{
                mr: 0.5,
                backgroundColor: '#1976d2',
                height: '36px',
                color: '#fff',
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: '#115293',
                },
            }}
        >
            Log
        </Button>
    );
}

export default LogButton;