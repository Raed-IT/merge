import React from 'react';
import { Grid, Card, CardMedia, Typography, Box, Divider } from '@mui/material';

const attachmentsData = [
    { src: 'https://www.ahaleel.com/uploads/posts/222291443168115787411.jpg', title: 'Attachment 1' },
    { src: 'https://www.ahaleel.com/uploads/posts/1140775_BmZpD2Pu16793968966728237.jpg', title: 'Attachment 2' },
    { src: 'https://www.ahaleel.com/uploads/posts/6699006_2oVX8CGF16793968967146644.jpg', title: 'Signature' }
];

function Attachments() {
    return (
        <>
            <Box sx={{ maxWidth: 600, margin: 'auto', backgroundColor: '#fafafa', borderRadius: 3, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Attachments
                </Typography>
                <Grid container spacing={2}>
                    {attachmentsData.slice(0, 2).map((item, index) => (
                        <Grid item xs={6} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.src}
                                    alt={item.title}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <hr style={{marginTop:'15px'}}/>
                <Typography variant="h6" gutterBottom sx={{ mt: 0.7 }}>
                    Signature
                </Typography>
                <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image={attachmentsData[2].src}
                        alt={attachmentsData[2].title}
                    />
                </Card>
            </Box>
        </>
    );
}

export default Attachments;
