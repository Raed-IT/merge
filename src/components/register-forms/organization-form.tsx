"use client"

import { FullRegistrationDto } from '@/lib/data/axios-client'
import { useFullRegistrationMutation, useSupportedCountriesQuery } from '@/lib/data/axios-client/Query'
import { registerOrgDataType, registerUserDataType } from '@/types'
import { validatePassword, validateRegisterOrgForm } from '@/utils/validators'
import { Box, Button, Grid, Select, TextField, Typography, useTheme, MenuItem, Autocomplete } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'

interface orgFormPropsType {
    userData: registerUserDataType
}

const OrgForm = ({ userData }: orgFormPropsType) => {

    const theme = useTheme()
    const router = useRouter()
    const [formCheck, setFormCheck] = useState(false)
    const [orgData, setOrgData] = useState<registerOrgDataType>({ orgName: '', countryCode: '', orgLocalization: '', position: '', companySize: '', identifier: '', currency: '' })

    const { mutate, isPending } = useFullRegistrationMutation()
    const { enqueueSnackbar } = useSnackbar()
    const { data: supportedCountriesData, isPending: countriesLoading } = useSupportedCountriesQuery()

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormCheck(true)

        if (e.target.checkValidity() && validateRegisterOrgForm(orgData)) {
            const vars = new FullRegistrationDto({
                firstName: userData.firstName!, lastName: userData.lastName!, email: userData.userEmail!,
                password: userData.password!, orgName: orgData.orgName!, countryCode: orgData.countryCode!, identifier: orgData.identifier!,
                currency: orgData.orgLocalization!, companySize: orgData.companySize!, orgLocalization: orgData.orgLocalization!, position: orgData.position!
            })

            mutate(vars, {
                onSuccess: () => {
                    enqueueSnackbar("registered successfully", { variant: 'success' })
                    router.push("/login")
                },
                onError: (error: any) => {
                    console.log("ddd");
                    const err = error as AxiosError;
                    const response: any = err.response;
                    enqueueSnackbar(response.message! as string, { variant: 'error' });
                },
            })
        }
    }

    console.log(orgData);

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} autoComplete="on" autoSave="on" sx={{ mt: 3 }}>
            <Grid container item columns={12} spacing={2} sx={{ maxWidth: "580px" }} >
                <Grid item xs={12} lg={6} >
                    <TextField
                        size="medium"
                        variant="outlined"
                        label="Organization name"
                        fullWidth
                        className="custom-input"
                        type="text"
                        error={formCheck && !orgData.orgName}
                        onChange={(e) => { setOrgData({ ...orgData, orgName: e.target.value }) }}
                    />
                    <Grid className={formCheck && !orgData.orgName ? "register-error-msg" : ""} display={formCheck && !orgData.orgName ? "block" : "none"} sx={{ fontSize: "14px", color: theme.palette.error.main }} >Organization name is required</Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        size="medium"
                        variant="outlined"
                        label="Your position"
                        fullWidth
                        className="custom-input"
                        type="text"
                        error={formCheck && !orgData.position}
                        onChange={(e) => { setOrgData({ ...orgData, position: e.target.value }) }}
                    />
                    <Grid className={formCheck && !orgData.position ? "register-error-msg" : ""} display={formCheck && !orgData.position ? "block" : "none"} sx={{ fontSize: "14px", color: theme.palette.error.main }} >Position name is required</Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={"Identifier"}
                        variant='outlined'
                        size="medium"
                        fullWidth
                        type="text"
                        error={formCheck && !orgData.identifier}
                        onChange={(e) => { setOrgData({ ...orgData, identifier: e.target.value }) }}
                        value={orgData.identifier}
                        sx={{
                            "input": {
                                '&:-webkit-autofill': {
                                    '-webkit-box-shadow': '0 0 0 100px #fff inset',
                                }
                            }
                        }}
                    />
                    <Grid display={formCheck && !orgData.identifier ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main" }} >
                        {!orgData.identifier ? "Identifier is required" : null}
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Autocomplete
                        id="countries"
                        sx={{ width: "100%" }}
                        options={supportedCountriesData!}
                        autoHighlight
                        fullWidth
                        onChange={(event, newValue) => {
                            setOrgData({ ...orgData, countryCode: newValue?.code! });
                        }}
                        getOptionLabel={(option) => option.name!}
                        renderOption={(props, option) => (
                            <Box component="li" key={option.id} value={option.code as string} sx={{ width: "100%" }} >
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose a country"
                                fullWidth
                            />
                        )}
                    />
                    <Grid display={formCheck && !orgData.countryCode ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main" }} >
                        {!orgData.countryCode ? "country is required" : null}
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label={"Currency"}
                        variant='outlined'
                        size="medium"
                        fullWidth
                        type="text"
                        error={formCheck && !orgData.currency}
                        onChange={(e) => { setOrgData({ ...orgData, currency: e.target.value }) }}
                        value={orgData.currency}
                        sx={{
                            "input": {
                                '&:-webkit-autofill': {
                                    '-webkit-box-shadow': '0 0 0 100px #fff inset',
                                }
                            }
                        }}
                    />
                    <Grid display={formCheck && !orgData.currency ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main" }} >
                        {!orgData.currency ? "currency is required" : null}
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label={"Localization"}
                        variant='outlined'
                        size="medium"
                        fullWidth
                        type="text"
                        error={formCheck && !orgData.orgLocalization}
                        onChange={(e) => { setOrgData({ ...orgData, orgLocalization: e.target.value }) }}
                        value={orgData.orgLocalization}
                        sx={{
                            "input": {
                                '&:-webkit-autofill': {
                                    '-webkit-box-shadow': '0 0 0 100px #fff inset',
                                }
                            }
                        }}
                    />
                    <Grid display={formCheck && !orgData.orgLocalization ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main" }} >
                        {!orgData.orgLocalization ? "localization is required" : null}
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label={"Company size"}
                        variant='outlined'
                        size="medium"
                        fullWidth
                        type="text"
                        placeholder="john.doe@gmail.com"
                        error={formCheck && !orgData.companySize}
                        onChange={(e) => { setOrgData({ ...orgData, companySize: e.target.value }) }}
                        value={orgData.companySize}
                        sx={{
                            "input": {
                                '&:-webkit-autofill': {
                                    '-webkit-box-shadow': '0 0 0 100px #fff inset',
                                }
                            }
                        }}
                    />
                    <Grid display={formCheck && !validatePassword(orgData.companySize) ? "block" : "none"} sx={{ fontSize: "14px", color: "error.main" }} >
                        {!orgData.companySize ? "company size is required" : null}
                    </Grid>
                </Grid>
            </Grid>
            <Button size="large" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                <Box>GET STARTED</Box>
            </Button>
        </Box>
    )
}

export default OrgForm