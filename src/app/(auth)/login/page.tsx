
import LoginForm from "@/components/login-form";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import MuiLink from '@mui/material/Link';
import OfficeIcon from '@/media/images/office.png'
import Image from "next/image";
import { useInviteUserMutation } from "@/lib/data/axios-client/Query";

export const metadata: Metadata = {
    title: "ITM Core | Login",
};

const LoginPage = () => {
    return (
        <>
            <Typography component="h1" variant="h4">Sign in to ITM</Typography>
            <LoginForm />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 3 }}>
                <Link href="/reset-password" style={{ display: "block", fontSize: "14px" }}>
                    <MuiLink component="span" sx={{ color: "text.primary" }}>Forgot your password?</MuiLink>
                </Link>
                <Link href="/register" style={{ display: "block", fontSize: "14px" }}>
                    <MuiLink component="span" sx={{ color: "text.primary" }}>{"I don't have an account"}</MuiLink>
                </Link>
            </Box>
        </>
    );
}




export default LoginPage;