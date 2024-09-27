import { Box, Container, Grid, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';

type SimpleStatisticsComponentProps = {
    icon: ReactNode,
    label: string,
    count: number,
}
function SimpleStatisticsComponent({ icon, label, count }: SimpleStatisticsComponentProps) {
    return (
        <Container sx={{ p: 1, border: 1, borderColor: '#feebee', borderRadius: 1, backgroundColor: '#fafafa', mt: 3, mb: 2 }} maxWidth={false}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
                <Box display="flex" height="100%" sx={{ borderRight: 2, borderColor: '#EEEEEE' }}>
                    <Grid item xs={1}>
                        <Box sx={{ bgcolor: '#e0e0e0', height: '100%', width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                            <ContentPasteOutlinedIcon sx={{ color: '#616161', }} />
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: '14px' }}>Total salary</Typography>
                            <Typography variant="h6" sx={{ fontSize: '14px', m: '3px' }}>18,277.00</Typography>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box display="flex" height="100%" sx={{ borderRight: 2, borderColor: '#EEEEEE' }}>
                    <Grid item xs={1}>
                        <Box sx={{ bgcolor: '#f1f8e9', height: '100%', width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                            <CheckCircleOutlineIcon sx={{ color: '#4caf50', }} />
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: '14px' }}>Total Open</Typography>
                            <Typography variant="h6" sx={{ color: '#ff1744', fontSize: '14px', m: '3px' }}>18,165.55</Typography>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    </Container>
    )
}

export default SimpleStatisticsComponent
