import "./App.css";
import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box, Card, Container, Paper, Stack } from "@mui/material";
import DashContainer from "./Components/DashContainer";
import CustomCalendar from "./CustomCalendar"
import RestoreIcon from '@mui/icons-material/Restore';
import TemplatePage from "./TemplatePage"
import Start from "./StartPage"


export default function Dash() {
    
    const [activeComponent, setActiveComponent] = useState('Start');

    const renderComponent = () => {
        switch(activeComponent) {
            case 'Templates':
                return <TemplatePage/>
            case 'Start':
                return <Start/>
        }
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'row', minWidth: '100%', height: '85vh', alignContent: 'center'}}disableGutters>
            <Paper sx={{ width: '10%', minHeight: '100%', mr: 2 }} elevation={10}></Paper>
            <Stack direction="column" spacing={2 } sx={{ width: '80%'}}>
                <Paper sx={{ border: 2, borderColor: '#a9a9a9', }} elevation={6}>
                    <BottomNavigation
                    sx={{ width: '100%'}}
                        showLabels
                    >
                        <BottomNavigationAction onClick={() => setActiveComponent('Start')} label="Start"></BottomNavigationAction>
                        <BottomNavigationAction onClick={() => setActiveComponent('Templates')} label="Templates"></BottomNavigationAction>
                        <BottomNavigationAction label="Medals"></BottomNavigationAction>
                        <BottomNavigationAction label="Stats"></BottomNavigationAction>
                    </BottomNavigation>
                </Paper>   
                <DashContainer>
                    {renderComponent()}
                </DashContainer>
            </Stack>
            <Paper sx={{ width: '10%', minHeight: 'auto', ml: 2}} elevation={10}></Paper>
        </Container> 
    );
}