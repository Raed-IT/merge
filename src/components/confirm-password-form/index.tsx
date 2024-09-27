"use client"
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useConfirmResetPasswordMutation } from "@/lib/data/axios-client/Query";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ResetPasswordConfirmation } from "@/lib/data/axios-client"; 

const ConfirmResetPasswordForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [formCheck, setFormCheck] = useState(false);
    const { mutate, status } = useConfirmResetPasswordMutation(); 
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormCheck(true);

        if (e.currentTarget.checkValidity() && email && confirmationCode) {
            const request = ResetPasswordConfirmation.fromJS({
                email: email,
                confirmationCode: confirmationCode,
            });

            mutate(request, {
                onError: (error: unknown) => {
                    if (error instanceof AxiosError) {
                        const response = error.response;
                        const errorMessage = response?.data?.message || "An error occurred";
                        enqueueSnackbar(errorMessage, { variant: "error" });
                    } else {
                        enqueueSnackbar("An error occurred", { variant: "error" });
                    }
                },
                onSuccess: () => {
                    enqueueSnackbar("Confirmation successful! Redirecting to reset password...", { variant: "success" });
                    router.push("/create-new-password");
                }
            });
        }
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} autoComplete="off" sx={{ mt: 4 }}>
            <TextField
                label="Email"
                variant='outlined'
                size="medium"
                fullWidth
                type="email"
                placeholder="Enter your email"
                error={formCheck && !email}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                sx={{ mt: 2 }}
                helperText={formCheck && !email ? "Email is required" : ""}
            />
            <TextField
                label="Confirmation Code"
                variant='outlined'
                size="medium"
                fullWidth
                type="text"
                placeholder="Enter the confirmation code"
                error={formCheck && !confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                value={confirmationCode}
                sx={{ mt: 2 }}
                helperText={formCheck && !confirmationCode ? "Confirmation code is required" : ""}
            />
            <Grid display={formCheck && (!email || !confirmationCode) ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main" }}>
                {!email ? "Email is required" : null}
                {!confirmationCode ? "Confirmation code is required" : null}
            </Grid>

            <Button 
                size="large" 
                variant="contained" 
                fullWidth 
                type="submit"
                endIcon={
                    status === "pending" ? <CircularProgress style={{ width: "15px", height: "15px", color: "#fff" }} /> : null
                }
                sx={{ mt: 3 }}
            >
                <Box>Confirm & Continue</Box>
            </Button>
        </Box>
    );
}

export default ConfirmResetPasswordForm;
