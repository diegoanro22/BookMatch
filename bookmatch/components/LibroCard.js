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

const LibroCard = ({ libro, handleReadClick, isRead }) => {
    return (
        <Grid item xs={6} sm={6} md={4} lg={3}>
            <Paper elevation={5}>
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h5">{libro.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <img src="" alt={libro.title} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">{libro.description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Q19.99</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom>
                            Leído
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <IconButton color="primary" aria-label="Leído" onClick={handleReadClick}>
                            {isRead ? <CheckCircleIcon /> : <CheckBoxOutlineBlankIcon />}
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" startIcon={<ThumbUpIcon />}>
                            Me gusta
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" startIcon={<ThumbDownIcon />}>
                            No me gusta
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default LibroCard;