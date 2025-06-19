import Navbar from "../Navbar";
import { Divider, Box } from "@mui/material";

function ProtectedLayout({children}) {
    return(
        <Box>
            <Navbar/>
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} orientation="horizontal" variant="fullWidth" />
            {children}
        </Box>
    );
}

export default ProtectedLayout