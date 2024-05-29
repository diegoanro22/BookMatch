import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const LibroCard = ({ libro, handleReadClick, handleLikeClick, isRead }) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={3} lg={3} sx={{ padding: 1, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={2} sx={{ padding: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#2E4053', maxWidth: 250 }}>
                <div style={{ textAlign: 'center' }}>
                    <Image src={`/Portadaslibros/${libro.image}`} alt={libro.title} style={{ width: '100%', marginBottom: theme.spacing(1) }} width={200} height={300} layout="responsive" />
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>{libro.title}</Typography>
                </div>
                <div style={{ textAlign: 'center', marginBottom: theme.spacing(2) }}>
                    <FormControlLabel
                        control={<Switch checked={libro.isLiked} onChange={() => handleLikeClick(libro.id)} />}
                        label={libro.isLiked ? "Te gusta este libro" : "Me gusta"}
                        sx={{ color: '#FFFFFF' }}
                    />
                    <Typography variant="body2" style={{ color: '#ECF0F1', marginTop: theme.spacing(1) }}>
                        {libro.isLiked ? "Este libro es uno de tus favoritos!" : "Marca si te gusta este libro"}
                    </Typography>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="body2" gutterBottom style={{ color: '#FFFFFF' }}>¿Ya has leído este título antes?</Typography>
                    <FormControlLabel
                        control={<Switch checked={isRead} onChange={() => handleReadClick(libro.id)} />}
                        label=""
                    />
                </div>
            </Paper>
        </Grid>
    );
};

export default LibroCard;
