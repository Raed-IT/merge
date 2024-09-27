'use client'
import { Box, Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const AuthRegisterLoginRedirectLink = () => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        pathname === '/register'
            ?
            <Box>
                <Box mr={2} component="span" fontSize={14}>Already have an account?</Box>
                <Button variant="outlined" color="secondary" size="small" onClick={() => { router.push('/login') }}>LOG IN</Button>
            </Box>
            :
            null
    );
}

export default AuthRegisterLoginRedirectLink;