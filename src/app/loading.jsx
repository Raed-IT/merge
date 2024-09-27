import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <Box style={{ minHeight: "100vh", width: "100vw" }} display={'flex'} justifyContent={'center'} alignItems={'center'}  >
            <CircularProgress disableShrink />
        </Box>
    );
}