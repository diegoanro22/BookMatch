import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const GeneroCard = ({ genero, isLiked, handleLikeClick, index }) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ padding: 3, margin: '10px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#2E4053', maxWidth: 350 }}>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                        {genero.type}
                    </Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="body1" gutterBottom style={{ color: '#FFFFFF', marginBottom: '10px' }}>¿Te gusta este género?</Typography>
                    <FormControlLabel
                        control={<Switch checked={isLiked} onChange={() => handleLikeClick(index)} />}
                        label=""
                    />
                </div>
            </Paper>
        </Grid>
    );
};

export default GeneroCard;
