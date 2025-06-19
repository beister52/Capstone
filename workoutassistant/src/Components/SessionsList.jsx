import React, { useState, useEffect } from 'react';
import RemoveButton from './RemoveButton';
import LogButton from './LogButton';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import Log from './Log';
import api from '../api';

export default function SessionsList() {
    const [sessions, setSessions] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [emptyPage, setEmptyPage] = useState(false)

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await api.get('workouts/test/');
                const workouts = response.data;
                console.log("Fetched workouts:", workouts);

                // Filter workouts to only include those with a weight of 0 for testing
                const filteredWorkouts = workouts.filter(workout => parseFloat(workout.weight) === 0);
                console.log("Filtered workouts:", filteredWorkouts);

                setSessions(filteredWorkouts);

                setEmptyPage(filteredWorkouts.length === 0);

            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };
        fetchSessions();
    }, []);

    const handleLogClick = (workout) => {
        setSelectedWorkout(workout);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedWorkout(null);
    };

    const handleDelete = async (date) => {
        if (!date) {
            console.error("Date is undefined");
            return;
        }
    
        try {
            console.log("Deleting workout with date:", date); // Check if the date is correct
            // Send DELETE request to backend with the date
            await api.delete(`workouts/delete/${date}/`);

            // Optimistically update the UI by removing the workout from the list
            setSessions(sessions.filter(session => session.date !== date));
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    return (
        <>
            {emptyPage ? (
                <Typography 
                    variant="h6" 
                    sx={{ textAlign: 'center', marginTop: '20px', color: 'gray' }}
                >
                    No available sessions to log.
                </Typography>
            ) : (
                <List 
                    sx={{ paddingTop: 0, display: 'flex', flexDirection: 'column', width: '98%', ml: 'auto', mr: 'auto' }}
                >
                    {sessions.map((workout) => (
                        <React.Fragment key={workout.date}>
                            <ListItem>
                                <ListItemText
                                    primary={`Exercise: ${workout.exercise}`}
                                    secondary={`Date: ${workout.date}`}
                                />
                                <LogButton onClick={() => handleLogClick(workout)} />
                                <RemoveButton onClick={() => handleDelete(workout.date)} />
                            </ListItem>
                            <Divider variant="middle" sx={{ borderWidth: 1, borderColor: 'darkgray' }} />
                        </React.Fragment>
                    ))}
                </List>
            )}
    
            {open && (
                <Log isOpen={open} openState={handleClose} session={selectedWorkout} />
            )}
        </>
    );
    
}
