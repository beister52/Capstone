import React, { useState } from "react";
import api from "./api";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import DecorPanel from "./Components/FormSidePanel";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import './App.css'

export default function LoginWindow(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post("/token/", { username, password })
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            navigate("/")
        }
        catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return(
        <Box sx={{ display: "flex", width: "100vw", height: "100vh", backgroundColor: "#1976d2"}}>
            <DecorPanel children="Login"></DecorPanel>
            <Box 
                sx={{ 
                    margin: "auto",
                    display: 'flex',   
                    width: '40vw', 
                    height: '70vh', 
                    borderRadius: 10, 
                    backgroundColor: "white"
                }}
            >
                <Stack 
                    sx={{  
                        display: "flex",
                        width: '100%', 
                        height: '100%',
                        paddingTop: 4,
                        paddingLeft: 4,
                        paddingRight: 4
                    }}
                >
                    <Typography fontSize={30}>Welcome to MyoCast!</Typography>
                    <Typography sx={{paddingBottom: 4}} fontSize={18}>Please enter your login information below</Typography>
                    <TextField 
                        label="Email" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ paddingBottom: 4 }}/>
                    <TextField 
                        label="Password" 
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ paddingBottom: 2}}/>
                    <Button 
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit} 
                        sx={{ borderRadius: 3, alignSelf: "flex-end", margin: 2, height: "12%", width: "20%"}}
                    >
                        Login
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}