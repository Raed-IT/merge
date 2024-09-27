"use client"

import { registerUserDataType } from '@/types'
import { validateEmail, validatePassword, validateRegisterUserForm } from '@/utils/validators'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

interface userFormPropsType {
    userData: registerUserDataType
    setUserData: (orgData: registerUserDataType) => void
    setCurrentForm: (currentForm: string) => void
}


const UserForm = ({ setCurrentForm, userData, setUserData }: userFormPropsType) => {

    const theme = useTheme()
    const [formCheck, setFormCheck] = useState(false)
    const [agree, setAgree] = useState(false)



    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormCheck(true)
        if (e.target.checkValidity() && validateRegisterUserForm(userData) && agree) {
            setCurrentForm('org')
        }
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} autoComplete="on" sx={{ mt: 3 }}>
            <Grid container item columns={12} spacing={2} >
                <Grid item xs={12} lg={6} >
                    <TextField
                        size="medium"
                        variant="outlined"
                        label="First Name"
                        placeholder="ex: Joe"
                        fullWidth
                        className="custom-input"
                        type="text"
                        error={formCheck && !userData.firstName}
                        onChange={(e) => { setUserData({ ...userData, firstName: e.target.value }) }}
                    />
                    <Grid className={formCheck && !userData.firstName ? "register-error-msg" : ""} display={formCheck && !userData.firstName ? "block" : "none"} sx={{ fontSize: "14px", color: theme.palette.error.main }} >first name is required</Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        size="medium"
                        variant="outlined"
                        label="Last Name"
                        placeholder="ex: smith"
                        fullWidth
                        className="custom-input"
                        type="text"
                        error={formCheck && !userData.lastName}
                        onChange={(e) => { setUserData({ ...userData, lastName: e.target.value }) }}
                    />
                    <Grid className={formCheck && !userData.lastName ? "register-error-msg" : ""} display={formCheck && !userData.lastName ? "block" : "none"} sx={{ fontSize: "14px", color: theme.palette.error.main }} >last name is required</Grid>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label={"Email"}
                        variant='outlined'
                        size="medium"
                        fullWidth
                        type="email"
                        placeholder="john.doe@gmail.com"
                        error={formCheck && !validateEmail(userData.userEmail)}
                        onChange={(e) => { setUserData({ ...userData, userEmail: e.target.value }) }}
                        value={userData.userEmail}
                    />
                    <Grid display={formCheck && !validateEmail(userData.userEmail) ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main" }} >
                        {!userData.userEmail ? "email is required" : null}
                        {(!validateEmail(userData.userEmail) && userData.userEmail) ? "Email is invalid" : null}
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label={<Box sx={{ color: "#4C4C4C" }}>Password</Box>}
                        variant='outlined'
                        size="medium"
                        autoComplete="off"
                        fullWidth
                        error={formCheck && !validatePassword(userData.password)}
                        onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }}
                        value={userData.password}
                        type={showPassword ? 'text' : 'password'}
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
                </Grid>
                <Grid item xs={12} mt={0} pt="8px !important">
                    <FormControlLabel
                        sx={{ ".MuiFormControlLabel-label": { fontSize: "14px" }, mb: 1 }}
                        control={<Checkbox size='medium' sx={{ mr: -0.5 }} checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
                        label="I accept terms and conditions"
                    />
                    <Grid display={formCheck && !agree ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main", mt: -2, mb: 2 }}>
                        {"accepting terms and conditions is required"}
                    </Grid>
                </Grid>

            </Grid>
            <Button size="large" variant="contained" fullWidth type="submit"            >
                <Box>GET STARTED</Box>
            </Button>
        </Box>
    )
}

export default UserForm