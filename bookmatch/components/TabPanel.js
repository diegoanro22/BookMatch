import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const TabPanel = ({ children }) => {
    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <Typography component="div">
                    {children}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default TabPanel;