import { Apps } from "@mui/icons-material";
import { Box, Divider, IconButton } from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AppsMenuList from "./appsMenuList";
import { useTheme } from "@mui/material";

const AppsMenu = () => {
    const pathname = usePathname()
    const show = pathname !== "/apps"
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };
    const theme = useTheme();
    return (
        <> {
            show
                ? (
                    <Box mr="20px" display="inline-flex" alignItems="center">
                        <IconButton sx={{ m: 0, p: 0, cursor: 'pointer' }} onClick={handleClick}>
                            <Apps sx={{
                                cursor: 'pointer !important',
                                fill: open ? theme.palette.primary.main : "#fff",
                                width: "24px",
                                height: "24px",
                                transform: open ? "rotate(-45deg)" : '',
                                "&:hover": {
                                    fill: "#ff6d00",
                                    transform: "rotate(-45deg)",
                                    transition: "all 0.2s ease-in-out"
                                }
                            }} />
                        </IconButton>
                        <Divider orientation="vertical" sx={{ bgcolor: "#fff", width: "1px", height: "24px", ml: "20px" }} />
                    </Box>
                )
                : null
        }
            <AppsMenuList anchorEl={anchorEl} handleClose={handleClose} open={open} />
        </>
    );
}

export default AppsMenu;