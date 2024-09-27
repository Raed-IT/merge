"use client"

import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarKey, useSnackbar } from "notistack";

const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey }) => {
    const { closeSnackbar } = useSnackbar();

    return (
        <IconButton sx={{ position: "absolute", right: 4, top: "calc(50% - 20px)" }} onClick={() => closeSnackbar(snackbarKey)}> <CloseIcon fontSize='small' sx={{ color: "#fff" }} /> </IconButton>
    )
}

export default SnackbarCloseButton