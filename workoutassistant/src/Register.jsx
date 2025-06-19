import { React, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import DecorPanel from "./Components/FormSidePanel";
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { useNavigate } from "react-router-dom";
import './App.css'

function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log("Hello")

        try {
            if (password == confirmPassword && password !== "") {
                const res = await api.post("/user/register/", { username, password })
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/login")
            } else {
                alert("Passwords do not match. Please try again.")
            }
        }
        catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return(
        <Box sx={{ display: "flex", width: "100vw", height: "100vh", backgroundColor: "#1976d2"}}>
            <DecorPanel children="Register"></DecorPanel>
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
                    <Typography sx={{paddingBottom: 4}} fontSize={18}>To create an account, enter the required information below</Typography>
                    <TextField 
                        label="Email" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ paddingBottom: 2 }}/>
                    <TextField 
                        label="Password" 
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ paddingBottom: 2}}/>
                    <TextField 
                        label="Confirm Password" 
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ paddingBottom: 2}}/>
                    <Button 
                        variant="contained" 
                        type="submit"
                        onClick={handleSubmit}
                        sx={{ borderRadius: 4, alignSelf: "flex-end", marginRight: 2, marginTop: 2, height: "12%", width: "20%"}}
                    >
                        Register
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={() => navigate("/login")}
                        sx={{ marginTop: 2, borderRadius: 4, alignSelf: "flex-end", marginRight: 2, height: "12%", width: "20%"}}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default Register