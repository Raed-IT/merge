"use client"
import { Box, IconButton } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import LoggedInUserAvatar from "./logged-in-user-avatar";
import AppsMenu from "../apps-menu";

const QuickLinks = () => {
    return (
        <Box display="flex" alignItems="center" >
            <AppsMenu />
            <IconButton sx={{ m: 0, p: 0, mr: "20px" }}>
                <CalendarTodayIcon sx={{ fill: "#fff" }} />
            </IconButton>
            <IconButton sx={{ m: 0, p: 0, mr: "20px" }}>
                <NotificationsActiveOutlinedIcon sx={{ fill: "#fff" }} />
            </IconButton>
            <IconButton sx={{ m: 0, p: 0, mr: "20px" }}>
                <InboxOutlinedIcon sx={{ fill: "#fff" }} />
            </IconButton>
            <LoggedInUserAvatar />
        </Box>
    );
}

export default QuickLinks;