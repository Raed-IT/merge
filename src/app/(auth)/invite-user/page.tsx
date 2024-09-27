import InviteNewUser from "@/components/invite-new-user";
import { Container, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ITM Core | Register",
};

const InviteUser = () => {
    return (
        <Container maxWidth="sm">
            <InviteNewUser />
        </Container>
    );
}

export default InviteUser;