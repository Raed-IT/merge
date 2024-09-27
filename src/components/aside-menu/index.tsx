"use client"
import { backdropClasses, Box, Divider, Typography, useTheme } from "@mui/material";
import AppMenu from "./app-menu";
import AvatarUser from "./user-avatar/avatar-user";

const AsideMenu = () => {
    const theme = useTheme();


    return (
        <Box
            width={"100%"}
            display={"flex"}
            flexDirection={'column'}
            justifyContent={"space-between"}
            bgcolor="background.paper"
            border={theme.palette.border}
            height="calc(100dvh - 48px)"
            p={1}
        // sx={{ transition: "all 0.2s", }}
        >
            <Box width={"100%"} >
                {/* <Typography px={1} component="h2" fontSize={14} fontWeight={500} color="text.secondary">Pages</Typography> */}
                <AppMenu />
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                marginTop="auto"
            >
                <AvatarUser />
            </Box>
        </Box>
    );
}

export default AsideMenu;
