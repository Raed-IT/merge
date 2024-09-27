"use client";
import { useState } from "react";
import { Box, TextField, Button, Grid, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useResetPasswordMutation } from "@/lib/data/axios-client/Query";
import { AxiosError } from "axios";
import { ResetPassword } from "@/lib/data/axios-client";
import { useRouter } from "next/navigation";

export default function CreatePasswordForm() {
    const [passwordData, setPasswordData] = useState({
        email: "",
        password: "",
        confirmationCode: "",
    });
    const [showPassword, setShowPassword] = useState(false); 
    const [formCheck, setFormCheck] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { mutate, isPending } = useResetPasswordMutation();

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormCheck(true);
        {
            const request = ResetPassword.fromJS({
                email: passwordData.email,
                password: passwordData.password,
                confirmationCode: passwordData.confirmationCode,
            });

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
                    enqueueSnackbar("Password reset successful", { variant: "success" });
                    router.push("/login");
                },
            });
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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
                value={passwordData.email}
                onChange={(e) => setPasswordData({ ...passwordData, email: e.target.value })}
                error={formCheck && !passwordData.email}
                sx={{ mt: 2 }}
                helperText={formCheck && !passwordData.email ? "Email is required" : ""}
            />

            <TextField
                label="New Password"
                variant="outlined"
                size="medium"
                fullWidth
                type={showPassword ? "text" : "password"} // Toggle between text and password
                value={passwordData.password}
                onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                error={formCheck && !passwordData.password}
                sx={{ mt: 2 }}
                helperText={formCheck && !passwordData.password ? "Password is required" : ""}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                label="Confirmation Code"
                variant="outlined"
                size="medium"
                fullWidth
                value={passwordData.confirmationCode}
                onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmationCode: e.target.value })
                }
                error={formCheck && !passwordData.confirmationCode}
                sx={{ mt: 2 }}
                helperText={
                    formCheck && !passwordData.confirmationCode ? "Confirmation Code is required" : ""
                }
            />

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
                Reset Password
            </Button>
        </Box>
    );
}
