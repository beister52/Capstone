import './App.css';
import { Box, Button, styled, Typography } from '@mui/material';
import NavButton from './Components/NavButton';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import App from './App.jsx';
import logo from "./assets/logo.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const [heading, setHeading] = useState("Home")


    useEffect(() => {
        switch (location.pathname) {
            case "/account":
                setHeading("My Account");
                break;
            default:
                setHeading("Home");
                break;
        }
    }, [location.pathname]);

    return(
        <Box className="nav-style">
            <Box sx={{ display: 'flex', width: '13vw', justifyContent: 'flex-start', alignItems: 'center'}}>
                <NavButton onClick={() => {navigate("/login")}}><SettingsIcon fontSize='large'/></NavButton>
                <Typography sx={{ ml: 5, fontSize: 'large'}}>{heading}</Typography>
            </Box>
            <a href='/' className="logo-format">
                <img src={logo} alt="Logo" className='logo-size-nav' />
            </a>
            <Box sx={{ display: 'flex', width: '13vw', justifyContent: 'flex-end', alignItems: 'center' }}>
                <NavButton><PeopleIcon fontSize='large'/></NavButton>
                <NavButton onClick={() => {navigate("/account"); setHeading("My Account")}}><PersonIcon fontSize='large'/></NavButton>
            </Box>
        </Box>
        
    );
}

