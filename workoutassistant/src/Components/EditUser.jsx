// EditUser.jsx
import { Box, Dialog, FormControl, MenuItem, Select, TextField, InputLabel, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import api from "../api";

export default function EditUser({ isOpen, openState, existingData, refreshUserInfo }) {
    const [experience, setExperience] = useState("");
    const [bodyweight, setBodyweight] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        if (existingData) {
            setAge(existingData.age ?? "");
            setBodyweight(existingData.bodyweight ?? "");
            setExperience(existingData.experience ?? "");
        }
    }, [existingData]);

    const handleSubmit = async () => {
        const updatedUserInfo = {
            age: age || null,
            bodyweight: bodyweight || null,
            experience: experience || null,
        };

        try {
            await api.patch('profile/', updatedUserInfo);
            console.log('Success updating user info');
            openState(false);
        } catch (error) {
            console.error('Error submitting user info:', error.response?.data || error.message);
        }
    };

    return (
        <Dialog open={isOpen} onClose={() => openState(false)}>
            <Typography fontSize={24} variant="h6" sx={{ paddingLeft: 2, paddingTop: 2 }}>
                Edit User Data
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                <TextField
                    label="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    sx={{ margin: 1 }}
                />
                <TextField
                    label="Weight"
                    type="number"
                    value={bodyweight}
                    onChange={(e) => setBodyweight(e.target.value)}
                    sx={{ margin: 1 }}
                />
                <FormControl sx={{ minWidth: 130, margin: 1 }}>
                    <InputLabel>Experience</InputLabel>
                    <Select
                        label="Experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        autoWidth
                    >
                        <MenuItem value={0}>Beginner</MenuItem>
                        <MenuItem value={1}>Intermediate</MenuItem>
                        <MenuItem value={2}>Advanced</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        marginRight: 2,
                        marginBottom: 2,
                        padding: 3,
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
                    Submit
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => openState(false)}
                    sx={{
                        marginRight: 3,
                        marginBottom: 2,
                        padding: 3,
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
                    Cancel
                </Button>
            </Box>
        </Dialog>
    );
}
