"use client";
import { useState } from "react";
import { Box, TextField, Button, Grid, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useResetPasswordRequestMutation } from "@/lib/data/axios-client/Query";
import { AxiosError } from "axios";
import { ResetPasswordRequest } from "@/lib/data/axios-client";
import { useRouter } from "next/navigation";

export default function ResetPasswordRequestForm() {
const [email, setEmail] = useState("");
const [formCheck, setFormCheck] = useState(false);
const { enqueueSnackbar } = useSnackbar();
const { mutate, isPending } = useResetPasswordRequestMutation();

const router = useRouter();

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormCheck(true);

    if (e.currentTarget.checkValidity() && email) {
    const request = ResetPasswordRequest.fromJS({ email });

    mutate(request, {
        onError: (error: unknown) => {
        if (error instanceof AxiosError) {
            const errMsg = error.response?.data.message || "An error occurred";
            enqueueSnackbar(errMsg, { variant: "error" });
        } else {
            enqueueSnackbar("An error occurred", { variant: "error" });
        }
        },
        onSuccess: () => {
        enqueueSnackbar("Password reset code sent to your email", {
            variant: "success",
        });
        router.push("/confirm-password");
        },
    });
    }
};

return (
    <Box
    component="form"
    noValidate
    onSubmit={handleSubmit}
    autoComplete="off"
    sx={{ mt: 4 }}
    >
    <TextField
        label="Email"
        variant="outlined"
        size="medium"
        fullWidth
        type="email"
        error={formCheck && !email}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        sx={{ mt: 2 }}
        helperText={formCheck && !email ? "Email is required" : ""}
    />
    <Grid
        display={formCheck && !email ? "block" : "none"}
        sx={{ fontSize: "14px", color: "error.main" }}
    >
        {!email ? "Email is required" : null}
    </Grid>

    <Button
        size="large"
        variant="contained"
        fullWidth
        type="submit"
        endIcon={
        isPending ? (
            <CircularProgress
            style={{ width: "15px", height: "15px", color: "#fff" }}
            />
        ) : null
        }
        sx={{ mt: 3 }}
        disabled={isPending}
    >
        Send Reset Code
    </Button>
    </Box>
);
}
