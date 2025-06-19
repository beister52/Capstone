import { Box, Typography } from "@mui/material";
import React from "react";
import logo from '../assets/logo.png'
import '../App.css'

function DecorPanel({children}) {
    return(
        <Box
            sx={{
                height: "100%",
                width: "30vw",
                overflow: "hidden",
                backgroundColor: "white"
            }}
        >
            <img src={logo} className="logo-sidepanel"></img>
            <Typography 
                fontSize={40} 
                fontWeight="bold" 
                fontFamily={"sans-serif"} 
                children={"Login"} 
                sx={{ color: "#1976d2", paddingTop: 8, ml: "35%" }}>{children}</Typography>
        </Box>
    );
}

export default DecorPanel