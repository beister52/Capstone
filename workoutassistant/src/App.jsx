import { Box, Divider } from '@mui/material';
import Dash from './Dash.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AccountPage from './AccountPage.jsx';
import LoginWindow from './Login.jsx';
import Register from './Register.jsx';
import NotFound from './NotFound.jsx';
import { React, useEffect } from 'react'
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import ProtectedLayout from './Components/ProtectedLayout.jsx';

function Logout() {
    localStorage.clear()
    return <Navigate to="/login"/>
}

function RegisterAndLogout() {
    localStorage.clear()
    return <Register/>
}

function AppLayout() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Box>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <Dash/>
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/account" 
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <AccountPage/>
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<LoginWindow/>}/>
                <Route path="/register" element={<Register/>}/> 
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Box>
    );
}

function App() {
    return(
        <Router>
            <AppLayout/>
        </Router>
    )
}

export default App
