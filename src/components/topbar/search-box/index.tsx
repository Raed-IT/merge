'use client'
import { SearchOutlined } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";

const SearchBox = () => {
    const [search, setSearch] = useState('')
    const searchAction = () => {
        console.log("xxx");
    }

    return (
        <Box minWidth={{ md: "400px" }}>
            <FormControl fullWidth variant="standard">
                <OutlinedInput
                    fullWidth
                    type="text"
                    placeholder="Search"
                    value={search} onChange={(e) => { setSearch(e.target.value) }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            searchAction()
                        }
                    }}
                    sx={{ bgcolor: "#CFD8DC", height: "32px", "& fieldset": { border: "none !important" } }}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton edge="start" onClick={searchAction}>
                                <SearchOutlined />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    );
}

export default SearchBox;