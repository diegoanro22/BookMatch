"use client";
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function MainPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const handleLogout = () => {
        // logica para cerrar sesion
        console.log("Cerrar sesión");
    };

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <AppBar position="static" color="primary" sx={{ backgroundColor: 'white' }} >
                    <Toolbar>
                    <Button color="inherit" onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    </Toolbar>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Libros" />
                        <Tab label="Géneros" />
                        <Tab label="Recomendaciones" />
                        <Tab label="Libros leidos"/>
                    </Tabs>
                </AppBar>
                {value === 0 && <TabPanel value={value} index={0}>
                    <LibrosPage />
                </TabPanel>}
                {value === 1 && <TabPanel value={value} index={1}><GenerosPage /></TabPanel>}
                {value === 2 && <TabPanel value={value} index={2}> Contenido de Recomendaciones</TabPanel>}
                {value === 3 && <TabPanel value={value} index={3}><LibroLeidossPage/></TabPanel>}
            </Box>
        </div>
    );
}

function TabPanel(props) {
    const { children } = props;

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs={20}>
                <Typography component="div">
                    {children}
                </Typography>
            </Grid>
        </Grid>
    );
}


export default MainPage;

function LibrosPage() {
    const [isRead, setIsRead] = useState(false);

    const handleReadClick = () => {
        setIsRead(!isRead);
    };
    const libros = [
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2' },
        { author: 'Autor 3', title: 'Libro 3', genre: 'Género 2' },
        { author: 'Autor 4', title: 'Libro 4', genre: 'Género 3' },
        { author: 'Autor 5', title: 'Libro 5', genre: 'Género 3' },
        { author: 'Autor 6', title: 'Libro 6', genre: 'Género 1' },
        { author: 'Autor 7', title: 'Libro 7', genre: 'Género 5' },
        // mas libros
    ];

    return (
        <TabPanel>
            <h1>Libros</h1>
            <Grid container spacing={3}>
                {(() => {
                    const cards = [];
                    for (let i = 0; i < libros.length; i++) {
                        cards.push(
                            <Grid item xs={6} sm={6} md={4} lg={4} key={i}>
                                <Paper elevation={5}>
                                    <Grid container direction="column" alignItems="center">
                                        <Grid item xs={12}>
                                            <Typography variant="h5">{libros[i].title}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <img src="" alt={libros[i].title} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">{libros[i].description}</Typography>
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
                                                {isRead? <CheckCircleIcon /> : <CheckBoxOutlineBlankIcon />}
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
                    }
                    return cards;
                })()}
            </Grid>
        </TabPanel>
    );
    }

    function GenerosPage() {
        const [isRead, setIsRead] = useState(false);
        const [genre, setGenre] = useState('');
        const [libros, setLibros] = useState([]);
    
        const handleReadClick = () => {
            setIsRead(!isRead);
        };
    
        const handleGenreChange = (event) => {
            setGenre(event.target.value);
        };
    
        useEffect(() => {
            // Aquí se supone que se hace una llamada a la API para obtener los libros del género seleccionado
            const librosByGenre = [
                { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1' },
                { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2' },
                { author: 'Autor 3', title: 'Libro 3', genre: 'Género 2' },
                { author: 'Autor 4', title: 'Libro 4', genre: 'Género 3' },
                { author: 'Autor 5', title: 'Libro 5', genre: 'Género 3' },
                { author: 'Autor 6', title: 'Libro 6', genre: 'Género 1' },
                { author: 'Autor 7', title: 'Libro 7', genre: 'Género 4' },
            ];
            setLibros(librosByGenre.filter((libro) => libro.genre === genre));
        }, [genre]);
    
        return (
            <TabPanel>
                <h1>Géneros</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Seleccione un género:</Typography>
                        <Select value={genre} onChange={handleGenreChange}>
                            <MenuItem value="Género 1">Género 1</MenuItem>
                            <MenuItem value="Género 2">Género 2</MenuItem>
                            <MenuItem value="Género 3">Género 3</MenuItem>
                            <MenuItem value="Género 4">Género 4</MenuItem>
                            {/* Agregue más opciones aquí */}
                        </Select>
                    </Grid>
                    {libros.map((libro, index) => (
                        <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
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
                                            {isRead? <CheckCircleIcon /> : <CheckBoxOutlineBlankIcon />}
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
                    ))}
                </Grid>
            </TabPanel>
        );
    }
function LibroLeidossPage() {
        const [isRead, setIsRead] = useState(false);
        const [libros, setLibros] = useState([]);
    
        const handleReadClick = (index) => {
            const newLibros = [...libros];
            newLibros[index].isRead =!newLibros[index].isRead;
            setLibros(newLibros);
        };
    
        useEffect(() => {
            // Aquí se supone que se hace una llamada a la API para obtener los libros
            const libros = [
                { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', isRead: false },
                { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', isRead: false },
                { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', isRead: false },
                { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', isRead: false },
                { author: 'Autor 3', title: 'Libro 3', genre: 'Género 2', isRead: false },
                { author: 'Autor 4', title: 'Libro 4', genre: 'Género 3', isRead: false },
                { author: 'Autor 5', title: 'Libro 5', genre: 'Género 3', isRead: false },
                { author: 'Autor 6', title: 'Libro 6', genre: 'Género 1', isRead: false },
                { author: 'Autor 7', title: 'Libro 7', genre: 'Género 5', isRead: false },
            ];
            setLibros(libros);
        }, []);
    
        return (
            <TabPanel>
                <h1>Libros</h1>
                <Grid container spacing={3}>
                    {libros.map((libro, index) => (
                        <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
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
                                        <IconButton color="primary" aria-label="Leído" onClick={() => handleReadClick(index)}>
                                            {libro.isRead? <CheckCircleIcon /> : <CheckBoxOutlineBlankIcon />}
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
                    ))}
                </Grid>
            </TabPanel>
        );
    }