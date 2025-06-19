import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api";
import EditUser from "./Components/EditUser";

export default function AccountPage() {
    const navigate = useNavigate();
    const [editOpen, setEditOpen] = useState(false);

    const [age, setAge] = useState(null);
    const [bw, setBw] = useState(null);
    const [exp, setExp] = useState(null);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await api.get('profile/');
                setAge(response.data.age);
                setBw(response.data.bodyweight);
                setExp(response.data.experience);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }

        fetchUserProfile();
    }, []);

    return (
        <>
            <Box display={'flex'}>
                <Button variant="text" sx={{ padding: 4, marginLeft: 1 }} onClick={() => navigate("/")}>Return</Button>
            </Box>
            <Typography fontSize={30} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>User Info</Typography>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                ml: 'auto', 
                mr: 'auto', 
                alignItems: 'center', 
                border: 1, 
                borderRadius: 10, 
                width: '25vw' 
            }}>
                <Typography fontSize={18} sx={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>Keep this updated to ensure accurate results!</Typography>
                <Typography sx={{ paddingBottom: 2 }}>Age: {age !== null ? age : "Not set"}</Typography>
                <Typography sx={{ paddingBottom: 2 }}>Weight: {bw !== null ? bw + " lbs" : "Not set"}</Typography>
                <Typography sx={{ paddingBottom: 2 }}>
                    Experience Level: {exp !== null ? (exp === 0 ? "Beginner" : exp === 1 ? "Intermediate" : "Advanced") : "Not set"}
                </Typography>
                <Button onClick={() => setEditOpen(true)} variant="contained" sx={{
                    margin: 4,
                    padding: 3,
                    backgroundColor: '#1976d2',
                    height: '36px',
                    color: '#fff',
                    borderRadius: '4px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#115293' },
                }}>
                    Edit
                </Button>
            </Box>
            {editOpen && (
                <EditUser 
                    isOpen={editOpen} 
                    openState={setEditOpen}
                    setAge={setAge}
                    setBw={setBw}
                    setExp={setExp}
                />
            )}
        </>
    );
}