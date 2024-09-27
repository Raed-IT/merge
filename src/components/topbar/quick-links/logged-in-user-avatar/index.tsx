import { Avatar, Box, Divider, IconButton, Menu, Skeleton, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useCurrentUserQuery } from "@/lib/data/axios-client/Query";
import LoggedInMenuItem from './loggedInMenuItem'
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import SignOutMenuItem from "./signOutMenuItem";

const LoggedInUserAvatar = () => {
    const blockCloseMenu = useRef(false);
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        if (!blockCloseMenu.current) {
            setAnchorEl(null);
        }
    };
    const { data: currentUserData, isPending: currentUserLoading } = useCurrentUserQuery()
    const slug = (currentUserData && currentUserData.firstName && currentUserData.lastName) ? (currentUserData.firstName.charAt(0) + currentUserData.lastName.charAt(0)) : null

    return (
        <Box>
            {
                (slug || currentUserData)
                    ? (
                        <IconButton
                            onClick={handleClick}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : 'false'}
                            sx={{ m: 0, p: 0 }}
                        >
                            <Avatar sx={{ bgcolor: "success.main", width: "26px", height: "26px", fontSize: "12px" }}>{slug}</Avatar>
                        </IconButton>
                    )
                    : currentUserLoading
                        ? <Skeleton variant="circular" width={26} height={26} sx={{ bgcolor: "#fff" }} />
                        : null
            }

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: "200px",
                        textOverflow: 'ellipsis',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box p={1.3}>
                    <Typography>
                        {`${currentUserData?.firstName ?? 'User'} ${currentUserData?.lastName ?? 'Name'}`}
                    </Typography>
                    <Typography color={'gray.main'}>

                        {currentUserData?.email}
                    </Typography>
                </Box>
                <Divider sx={{ height: "2.5px", bgcolor: "gray.light" }} />
                <LoggedInMenuItem icon={SettingsIcon} label="Settings"></LoggedInMenuItem>
                <LoggedInMenuItem icon={PersonIcon} label="Profile"></LoggedInMenuItem>
                <Divider sx={{ height: "2.5px", bgcolor: "gray.light" }} />
                <SignOutMenuItem setBlockCloseMenu={(state: boolean) => {
                    blockCloseMenu.current = state
                }} />
            </Menu >
        </Box >
    );
}

export default LoggedInUserAvatar;