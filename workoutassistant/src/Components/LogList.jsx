import { React, useEffect, useState, Fragment } from 'react'
import RemoveButton from './RemoveButton'
import ViewButton from './ViewButton';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material'; 
import api from '../api';

// Component used to list the most recent returned values from the model that
//  Should contain all data returned from the Session with a matching date
//  Should be automatically removed upon the user logging their workout with a matching date

export default function LogList() {

    const [sessions, setSessions] = useState([]);
    const [emptyPage, setEmptyPage] = useState(true)

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await api.get('predictworkouts/');
                const pred_workouts = response.data;
                console.log("Fetched workouts:", pred_workouts);

                setSessions(pred_workouts)
                setEmptyPage(pred_workouts === 0);
                
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };
        fetchSessions();
    }, []);
    console.log(emptyPage)
    return(
        <>
            {emptyPage ? (
                <Typography 
                    variant="h6" 
                    sx={{ textAlign: 'center', marginTop: '20px', color: 'gray' }}
                >
                    No completed sessions. Try logging a workout!
                </Typography>
                
            ) : (
                <List sx={{ paddingTop: 0, display : 'flex', flexDirection : 'column', width : '98%', ml: 'auto', mr: 'auto' }}>
                    {Array.isArray(sessions) && sessions.map((workout) => (
                        <Fragment key={`pred${workout.date}`}>
                            <ListItem>
                                <ListItemText 
                                    primary={"Workout"}
                                    secondary={`Date: ${workout.date}`}
                                />
                                <ViewButton onClick={() => alert('hi')} />
                                <RemoveButton onClick={() => alert('hi')} />
                            </ListItem>
                            <Divider variant='middle' sx={{ borderWidth: 1, borderColor: "darkgray" }} />
                        </Fragment>
                    ))}
                </List>
            )}
        </>
    );
}

