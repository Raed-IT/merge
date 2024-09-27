import RegisterForms from "@/components/register-forms";
import { Container, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ITM Core | Register",
};

const RegisterPage = () => {
    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h4">Create your account</Typography>
            <Typography component="p" sx={{ fontSize: "14px", mb: 4, color: "GrayText" }}>Welcome to our app</Typography>
            <RegisterForms />
        </Container>
    );
}

export default RegisterPage;