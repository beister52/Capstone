import {
    Box, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Typography, Divider, Button
} from "@mui/material";
import { useState } from "react";
import "../App.css";
import api from "../api";

export default function Log({ isOpen, openState, session }) {
    const [formData, setFormData] = useState({
        set1_reps: '',
        set2_reps: '',
        set3_reps: '',
        weight: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const workout = {
            user: session?.user,
            exercise: session?.exercise,  // assuming structure is like { exercise: "Squat" }
            session_number: session?.session_number,
            date: session?.date || new Date().toISOString().slice(0, 10),
            set1_reps: parseInt(formData.set1_reps) || 0,
            set2_reps: parseInt(formData.set2_reps) || 0,
            set3_reps: parseInt(formData.set3_reps) || 0,
            weight: parseFloat(formData.weight) || 0
        };

        try {
            console.log('Posting workout:', workout);
            await api.post('workouts/', workout);
        } catch (error) {
            console.error('Error posting workout:', error.response?.data);
        }

        openState(false);
    };

    const handleClose = () => {
        openState(false);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm">
            <DialogTitle>Log your Squat workout</DialogTitle>

            <DialogContent dividers>
                <Divider sx={{ borderWidth: 1, borderColor: "darkgray", mb: 2 }} />
                <Box sx={{ px: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Exercise: {session?.exercise?.exercise || 'Squat'}
                    </Typography>

                    {[1, 2, 3].map(set => (
                        <Box key={set} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography sx={{ width: 100 }}>{`Set ${set} Reps`}</Typography>
                            <TextField
                                size="small"
                                type="number"
                                value={formData[`set${set}_reps`]}
                                onChange={(e) => handleInputChange(`set${set}_reps`, e.target.value)}
                                sx={{ width: 100 }}
                            />
                        </Box>
                    ))}

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Typography sx={{ width: 100 }}>Weight</Typography>
                        <TextField
                            size="small"
                            type="number"
                            value={formData.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                            sx={{ width: 100 }}
                        />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", backgroundColor: 'white' }}>
                <Button
                    variant="contained"
                    sx={{ textTransform: 'none', fontWeight: 'bold', mx: 2, width: '30%' }}
                    onClick={handleSubmit}
                >
                    Log
                </Button>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                        color: 'salmon', borderColor: 'salmon', borderRadius: '4px',
                        textTransform: 'none', fontWeight: 'bold', mx: 2, width: '30%',
                        '&:hover': { backgroundColor: 'lightgray' }
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
