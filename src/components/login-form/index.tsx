"use client"
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validators";
import { useLoginMutation } from "@/lib/data/axios-client/Query";
import { LoginRequest } from "@/lib/data/axios-client";
import { useSnackbar } from "notistack"
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

const LoginForm = () => {

    const router = useRouter()

    const [userData, setUserData] = useState<userDataType>({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [formCheck, setFormCheck] = useState(false)

    const { mutate, isPending } = useLoginMutation()
    const { enqueueSnackbar } = useSnackbar()
    const signIn = useAuthStore(s => s.signIn)

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormCheck(true)

        if (e.target.checkValidity() && userData.email && validateEmail(userData.email) && userData.password && validatePassword(userData.password)) {
            const vars = new LoginRequest({ email: userData.email, password: userData.password })

            mutate(vars, {
                onError: (error) => {
                    const err = error as AxiosError;
                    const response: any = err.response;
                    // enqueueSnackbar("successful login", { variant: 'success' })
                    console.log(err,'aasem');
                    enqueueSnackbar(response.message! as string, { variant: 'error' });
                },
                onSuccess: (data) => {
                    enqueueSnackbar("successful login", { variant: 'success' })
                    signIn()
                    router.push("/organizations")
                }
            })
        }
    }

    const theme = useTheme()


    return (
        <Box component="form" noValidate onSubmit={handleSubmit} autoComplete="on" autoSave="on" sx={{ mt: 4 }} >
            <TextField
                label={"Email"}
                variant='outlined'
                size="medium"
                fullWidth
                type="email"
                placeholder="john.doe@gmail.com"
                error={formCheck && !validateEmail(userData.email)}
                onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }}
                value={userData.email}
            />
            <Grid display={formCheck && !validateEmail(userData.email) ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main" }} >
                {!userData.email ? "email is required" : null}
                {(!validateEmail(userData.email) && userData.email) ? "Email is invalid" : null}
            </Grid>
            <TextField
                label="Password"
                variant='outlined'
                size="medium"
                autoComplete="off"
                fullWidth
                placeholder="*********"
                type={showPassword ? 'text' : 'password'}
                error={formCheck && !validatePassword(userData.password)}
                onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }}
                value={userData.password}
                sx={{ mt: 2 }}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                onClick={() => { setShowPassword(!showPassword) }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                }}
            />
            <Grid display={formCheck && !validatePassword(userData.password) ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main" }} >
                {!userData.password ? "Password is required" : null}
                {(!validatePassword(userData.password) && userData.password) ? "Password must have at least 8 chars" : null}
            </Grid>
            <Grid mt={2}>
                <FormControlLabel
                    sx={{
                        ".MuiFormControlLabel-label": { fontSize: "14px" },
                        " .MuiCheckbox-colorPrimary": { color: "#B7B7B7" }
                        , "& .Mui-checked": { color: "text.primary" }, mb: 1
                    }}
                    control={<Checkbox size='medium' sx={{ mr: -0.5 }} />}
                    label="Remember me"
                />
            </Grid>
            <Button size="large" variant="contained" fullWidth type="submit"
                endIcon={
                    (isPending ? <CircularProgress style={{ width: "15px", height: "15px", color: "#fff" }} /> : null)
                }
            >
                <Box>Sign in</Box>
            </Button>
        </Box>
    );
}

export default LoginForm;