import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const LibroCard = ({ libro, handleReadClick, handleLikeClick, isRead }) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={3} lg={3} sx={{ padding: 1 }}>
            <Paper elevation={2} sx={{ padding: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFE082', maxWidth: 250 }}>
                <div style={{ textAlign: 'center' }}>
                    <Image src={`/Portadaslibros/${libro.image}`} alt={libro.image} style={{ width: '100%', marginBottom: theme.spacing(1) }} width={200} height={300} layout="responsive" />
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>{libro.title}</Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<ThumbUpIcon fontSize="small" />} 
                        onClick={handleLikeClick}
                        sx={{ marginBottom: theme.spacing(1), fontSize: '0.8rem' }}
                    >
                        Me gusta
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        startIcon={<ThumbDownIcon fontSize="small" />} 
                        onClick={handleLikeClick}
                        sx={{ fontSize: '0.8rem' }}
                    >
                        No me gusta
                    </Button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="body2" gutterBottom>¿Ya has leído este título antes?</Typography>
                    <FormControlLabel
                        control={<Switch checked={isRead} onChange={handleReadClick} />}
                        label=""
                    />
                </div>
            </Paper>
        </Grid>
    );
};

export default LibroCard;
