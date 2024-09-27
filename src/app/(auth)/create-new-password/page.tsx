import Link from "next/link";
import MuiLink from '@mui/material/Link';
import { Box, Typography } from "@mui/material";
import CreatePasswordForm from "@/components/create-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ITM Core | Reset Password",
};

const CreateNewPasswordPage = () => {
    return (
        <>
            <Typography component="h1" variant="h4">Reset Your Password</Typography>
            <CreatePasswordForm/>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 3 }}>
                <Link href="/login" style={{ display: "block", fontSize: "14px" }}>
                    <MuiLink component="span" sx={{ color: "text.primary" }}>Back to Login</MuiLink>
                </Link>
                <Link href="/register" style={{ display: "block", fontSize: "14px" }}>
                    <MuiLink component="span" sx={{ color: "text.primary" }}>{"I don't have an account"}</MuiLink>
                </Link>
            </Box>
        </>
    );
}

export default CreateNewPasswordPage;
