import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const GeneroCard = ({ genero, handleLikeClick, isLiked, index }) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{padding: 1 }}>
            <Paper elevation={2} sx={{
                padding: theme.spacing(2),
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#E3F2FD',
                maxWidth: 250
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {genero.type}
                    </Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="body2" gutterBottom>¿Te gusta este género?</Typography>
                    <FormControlLabel
                        control={<Switch checked={isLiked} onChange={() => handleLikeClick(index)} />}
                        label={isLiked ? 'Me gusta' : 'No me gusta'}
                        labelPlacement="top"
                    />
                </div>
            </Paper>
        </Grid>
    );
};

export default GeneroCard;
