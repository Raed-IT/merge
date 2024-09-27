"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Switch, FormControlLabel } from '@mui/material';
import { useOrganizationUsersQuery } from "@/lib/data/axios-client/Query";
import { UserListDto } from '@/lib/data/axios-client';

const EditUser = () => {
    const router = useRouter();
    const params = useParams();
    const email = params?.email; // الحصول على البريد الإلكتروني من الـ params

    const { data: users, isLoading, isError, error } = useOrganizationUsersQuery(
        {
            enabled: !!email,
        }
    );

    const user = users?.find(user => user.email === email) as UserListDto;

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (isError || !user) {
        console.error("Error loading user data:", error);
        return <Typography>Error loading user data.</Typography>;
    }

    const handleSave = () => {
        console.log(`Saving changes for user ${email}`);
        router.push('/apps/93cfd07d-3528-4abd-c469-08dca0025cbd/users');
    };
    console.log(users);
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4">Edit User {email}</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Email" type="email" defaultValue={user?.email || ''} />
                <TextField label="Role" defaultValue={user?.role || ''} />
                <TextField label="First Name" defaultValue={user?.name || ''} />
                {/* <FormControlLabel
                    control={<Switch checked={user?.} />}
                    label="Active"
                /> */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    <Button variant="outlined" onClick={() => router.back()}>Cancel</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditUser;
