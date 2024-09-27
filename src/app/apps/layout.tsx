import TopBar from "@/components/topbar";
import { Box } from "@mui/material";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <Box>
            <TopBar />

           <Box height={"48px"}></Box>
            <Box component="main">
                {children}
            </Box>
        </Box>
    );
}

export default Layout;