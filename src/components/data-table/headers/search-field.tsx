import { Box, TextField } from '@mui/material'
import React from 'react'

function SearchFieldComponent({ handleSearchChange }: { handleSearchChange: any }) {
    return (
        <Box sx={{ borderRight: 2, borderColor: '#EEEEEE', pr: { xs: 0, md: 2 } }}>
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                fullWidth
                onChange={handleSearchChange}
            />
        </Box>
    )
}

export default SearchFieldComponent
