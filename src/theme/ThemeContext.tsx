"use client";
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';
import { Dispatch, SetStateAction, createContext, useMemo, useState } from 'react';
import shadows from '@mui/material/styles/shadows';

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    style: ["italic", "normal"],
    variable: "--roboto",
});

const border = '1px solid #E5E7EB'

const gray = {
    main: '#757575',  // Main gray color
    light: '#E0E0E0', // Lighter shade
    extraLight: '#F5F5F5', // Lighter shade
    dark: '#999999',  // Darker shade
    extraDark: '#4c4c4c'
}
declare module '@mui/material/styles' {
    interface Palette {
        border: typeof border
        gray: typeof gray
    }
}


const lightPalette = {
    type: 'light',
    border: border,
    gray: gray,
    primary: {
        main: '#00796b',
        contrastText: '#ffffff',
        light: '#009688'
    },
    secondary: {
        main: '#191C1C',
        contrastText: '#ffffff',
    },
    background: {
        default: '#ffffff',
        paper: '#FAFAFA',
    },
    text: {
        primary: '#191C1C',
        secondary: '#6F7979',
        hint: '#006A6A',
        disabled: '#bdcbcb',
    },
    error: {
        main: '#EB1C23',
    },
    warning: {
        main: '#CA8A04',
    },
    success: {
        main: '#006A6A',
    },
    info: {
        main: '#6F7979',
    },
    divider: '#F5F5F5',
}

const darkPalette = {
    type: 'dark',
    border: border,
    gray: gray,
    primary: {
        main: '#00B8B8',
        contrastText: '#EEE',
        light: '#009688'

    },
    secondary: {
        main: '#EEE',
        contrastText: '#00B8B8',
    },
    background: {
        default: '#191C1C',
        paper: '#232626',
    },
    text: {
        primary: '#eeeeee',
        secondary: '#BEC9C8',
        hint: '#00B8B8',
        disabled: '#6F7979',
    },
    error: {
        main: '#EB1C23',
        contrastText: '#eeeeee',
    },
    warning: {
        main: '#00796b',
        contrastText: '#eeeeee',
    },
    success: {
        main: '#00B8B8',
        contrastText: '#eeeeee',
    },
    info: {
        main: '#BEC9C8',
        contrastText: '#eeeeee',
    },
    divider: '#6F7979',
}

interface ThemeContextInterface {
    isDark: boolean,
    setIsDark: Dispatch<SetStateAction<boolean>>
    theme: Theme
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

export default function ThemeContextProvider({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    const [isDark, setIsDark] = useState(false);

    const themeOptions = useMemo(() => (
        {
            typography: {
                fontFamily: roboto.style.fontFamily,
            },
            palette: isDark ? darkPalette : lightPalette,
            shape: {
                borderRadius: 6,
                borderColor: "#757575"
            },
            components: {
                MuiTooltip: {
                    styleOverrides: {
                        tooltip: {
                            backgroundColor: isDark ? darkPalette.background.default : lightPalette.background.default,
                            color: isDark ? darkPalette.text.primary : lightPalette.text.primary,
                            boxShadow: shadows[2],
                        },
                        dataGrid: {

                        }
                    },
                },
                MuiDivider: {
                    styleOverrides: {
                        root: {
                            borderColor: isDark ? darkPalette.border : lightPalette.border,
                            borderBottomWidth: "2px",
                        }
                    }
                },
                MuiDataGrid: {
                    styleOverrides: {
                        root: {
                            border: '1px solid #e0e0e0',
                            padding:2, 
                            '& .MuiDataGrid-cell': {
                                cursor:"pointer",
                                borderBottom: '1px solid #e0e0e0',
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                outline: "none",
                                border: "0px",
                                backgroundColor: isDark ? darkPalette.background.paper : lightPalette.background.paper,
                                color: isDark ? darkPalette.text.primary : lightPalette.text.primary,
                            },

                            "& .MuiDataGrid-cell:focus": {
                                outline: 'none',
                                border: '0px',
                                borderBottom: '2px solid #e0e0e0',
                            },
                            "& .MuiDataGrid-columnHeaderTitleContainer:focus  ": {
                                outline: 'none',
                                border: '0px',

                            },
                            "& .MuiDataGrid-columnHeader  ": {
                                backgroundColor: isDark ? darkPalette.background.paper : lightPalette.background.paper,
                            },
                            "& .MuiDataGrid-filler  ": {
                                backgroundColor: isDark ? darkPalette.background.paper : lightPalette.background.paper,
                            },

                            "& .MuiDataGrid-columnHeader:focus  ": {
                                outline: 'none !important',
                                border: '0px !important',
                            },
                            "& .MuiDataGrid-filler:focus  ": {
                                outline: 'none !important',
                                border: '0px !important',
                            },
                            "& .columnHeaderCheckbox:focus  ": {
                                outline: 'none !important',
                                border: '0px !important',
                            },
                            "& .columnHeaderCheckbox   ": {
                                 outline: 'none !important',
                                border: '0px !important',
                            },
                            "& .MuiDataGrid-columnHeaderTitleContainer  ": {
                                justifyContent: 'start !important',

                            }
                        },
                    },
                }
            },
        }
    ), [isDark])

    const theme = createTheme(themeOptions);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark, theme }}>
            {children}
        </ThemeContext.Provider>
    );
}