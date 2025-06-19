import React from "react";
import { Card, Paper, rgbToHex } from "@mui/material";


const DashContainer = ({children}) => {
    return (
      <Paper
        sx={{
          height: '100%',
          overflow : 'auto',
          border: 2,
          borderColor: '#a9a9a9',
        }}
        elevation={6}
      >
        {children}
      </Paper>
    );
  }
  
  export default DashContainer;