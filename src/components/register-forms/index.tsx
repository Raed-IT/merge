'use client'

import { Box } from '@mui/material'
import React, { useState } from 'react'
import UserForm from './user-form'
import OrgForm from './organization-form'
import { registerUserDataType } from '@/types'

const RegisterForms = () => {

    const [currentForm, setCurrentForm] = useState('user')
    const [userData, setUserData] = useState<registerUserDataType>({ firstName: "", lastName: "", userEmail: "", password: "" })

    return (
        currentForm === 'user'
            ?
            <UserForm setCurrentForm={setCurrentForm} setUserData={setUserData} userData={userData} />
            :
            <OrgForm userData={userData} />
    )
}

export default RegisterForms
