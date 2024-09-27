import { Box, Button, ButtonGroup, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import ViewCozyOutlinedIcon from "@mui/icons-material/ViewCozyOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { SectionDto } from "@/lib/data/axios-client";

interface ActionTableGroupProps {
    showCardComponent: boolean;
    showTableComponent: boolean;
    handleCardClick: () => void;
    handleTableClick: () => void;
    section: SectionDto;
    searchValue: string;
}

const ActionTable: React.FC<ActionTableGroupProps> = ({
    showCardComponent,
    showTableComponent,
    handleCardClick,
    handleTableClick,
    section,
    searchValue
}) => {
    const [searchInput, setSearchInput] = useState(searchValue);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} md={8}>
                    <Box sx={{ borderRight: 2, borderColor: '#EEEEEE', pr: { xs: 0, md: 2 } }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search"
                            fullWidth
                            value={searchInput}
                            onChange={handleSearchChange}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={3} md={3}>
                            {/* <ActionTableSortFilters /> */}
                        </Grid>
                        <Grid item xs={3} md={3}>
                            {/* <ActionTableSortColumns key={section.id} section={section} /> */}
                        </Grid>
                        <Grid item xs={3} md={3}></Grid>
                        <Grid item xs={3} md={3}>
                            <ButtonGroup
                                disableElevation
                                variant="contained"
                                aria-label="View Toggle Button Group"
                                fullWidth
                                sx={{ border: 1, borderColor: '#9E9E9E' }}
                            >
                                <Button
                                    sx={{
                                        backgroundColor: showCardComponent ? "green" : "transparent",
                                        '&:hover': {
                                            backgroundColor: showCardComponent ? "green" : "transparent",
                                        },
                                    }}
                                    onClick={handleCardClick}
                                >
                                    <ViewCozyOutlinedIcon sx={{ color: showCardComponent ? '#ffffff' : '#000000' }} />
                                </Button>
                                <Button
                                    sx={{
                                        backgroundColor: showTableComponent ? "green" : "transparent",
                                        '&:hover': {
                                            backgroundColor: showTableComponent ? "green" : "transparent",
                                        },
                                    }}
                                    onClick={handleTableClick}
                                >
                                    <FormatListBulletedIcon sx={{ color: showTableComponent ? '#ffffff' : '#000000' }} />
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ActionTable;