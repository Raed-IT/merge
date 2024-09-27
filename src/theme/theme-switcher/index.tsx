"use client"

import { ThemeContext } from "@/theme/ThemeContext";
import { Button, IconButton } from "@mui/material";
import { useContext } from "react";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const ThemeSwitcher = () => {
    const { isDark, setIsDark } = useContext(ThemeContext)!;

    console.log(isDark);


    return (
        <IconButton color="primary"
            onClick={() => { setIsDark((isDark) => !isDark) }}
        >
            {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
    );
}

export default ThemeSwitcher;