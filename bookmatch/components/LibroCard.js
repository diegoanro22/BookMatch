import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useTheme } from '@mui/material/styles';

const LibroCard = ({ libro, handleReadClick, isRead }) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={3} lg={3} sx={{padding: 1 }}>
            <Paper elevation={2} sx={{ padding: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant="h5" gutterBottom>{libro.title}</Typography>
                    <img src="" alt={libro.title} style={{ width: '100%', marginBottom: theme.spacing(2) }} />
                    <Typography variant="body1" gutterBottom>{libro.description}</Typography>
                    <Typography variant="body2">Q19.99</Typography>
                    <Typography variant="body2" gutterBottom>Leído</Typography>
                    <IconButton color="primary" aria-label="Leído" onClick={handleReadClick}>
                        {isRead ? <CheckCircleIcon /> : <CheckBoxOutlineBlankIcon />}
                    </IconButton>
                </div>
                <div>
                    <Button variant="contained" color="primary" startIcon={<ThumbUpIcon />} sx={{ marginBottom: theme.spacing(1) }}>
                        Me gusta
                    </Button>
                    <Button variant="contained" color="secondary" startIcon={<ThumbDownIcon />}>
                        No me gusta
                    </Button>
                </div>
            </Paper>
        </Grid>
    );
};

export default LibroCard;
