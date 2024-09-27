import ConfirmResetPasswordForm from "@/components/confirm-password-form";
import { Box, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import MuiLink from '@mui/material/Link';

export const metadata: Metadata = {
    title: "ITM Core | Forgot Password",
};

const ConfirmResetPasswordPage = () => {
    return (
        <>
            <Typography component="h1" variant="h4">Forgot Your Password?</Typography>
            <ConfirmResetPasswordForm />
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

export default ConfirmResetPasswordPage;
