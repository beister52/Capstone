import React, { useState } from 'react'
import { autocompleteClasses, Button, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import InboxIcon from '@mui/icons-material/Inbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './App.css'
import { red } from '@mui/material/colors';

const programDays = {
    "Ps" : ["Cat", "Dog", "Rat", "elephant"],
    "Pl" : ["One", "Two", "Three", "Four"],
    "Lg" : ["A", "B", "C"]
};

function TemplatePage() {

    const [openIndex, setOpenIndex] = useState({});

    const handleClick = (key) => {
        setOpenIndex((prevState) => ({
            ...prevState,
            [key]: !prevState[key] 
        }));
    };

    return (
        <List sx={{ display : 'flex', flexDirection : 'column', width : '60%', ml: 'auto', mr: 'auto' }}>
            <Typography fontSize={26} sx={{ paddingTop: 0.5, ml: 'auto', mr: 'auto'}}>My Workouts</Typography>
            {Object.entries(programDays).map(([key, values]) => (
                <React.Fragment key={key}>
                    <ListItemButton onClick={() => handleClick(key)}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={key} />
                        {openIndex[key] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openIndex[key]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {values.map((item, index) => (
                                <ListItem key={index} sx={{ pl: 4 }} secondaryAction={
                                    <>
                                        <Button variant='text' sx={{ color : "light blue"}}>
                                            Edit
                                        </Button>
                                        <Button variant='text' sx={{ color : "salmon"}}>
                                            Remove
                                        </Button>
                                    </>
                                    }
                                >
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    );
}

export default TemplatePage;