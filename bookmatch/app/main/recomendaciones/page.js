'use client'
import React, { useState, useEffect } from 'react';
import TabPanel from '../../../components/TabPanel';
import LibroCard from '../../../components/LibroCard';
import Layout from '../layout';
import Grid from '@mui/material/Grid';
import { obtenerLibros, relacionReadLibro, eliminarRelacionReadLibro, relacionLikeLibro, eliminarRelacionLikeLibro, obtenerUserIdDesdeToken } from '../../../lib/functions'; 
import { obtenerLibrosPorAutor, obtenerLibrosPorGenero, recomendarLibrosBFS } from '../../../lib/recommendation'; 
import Cookies from 'js-cookie';

const RecommendationPage = () => {
    const [value, setValue] = useState(2);
    const [libros, setLibros] = useState([]);
    const [recomendacionesGenero, setRecomendacionesGenero] = useState([]);
    const [recomendacionesAutor, setRecomendacionesAutor] = useState([]);
    const [recomendacionesBFS, setRecomendacionesBFS] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchRecomendaciones = async () => {
            try {
                const token = Cookies.get('authToken');
                if (token) {
                    const username = await obtenerUserIdDesdeToken(token);
                    if (username) {
                        const librosGenero = await obtenerLibrosPorGenero(username);
                        const librosAutor = await obtenerLibrosPorAutor(username);
                        const librosBFS = await recomendarLibrosBFS(username);
                        setRecomendacionesGenero(librosGenero);
                        setRecomendacionesAutor(librosAutor);
                        setRecomendacionesBFS(librosBFS);
                    } else {
                        throw new Error('No se pudo obtener el username del usuario');
                    }
                } else {
                    throw new Error('Token no encontrado');
                }
            } catch (error) {
                console.error('Error al obtener las recomendaciones:', error);
            }
        };
        fetchRecomendaciones();
    }, []);

    const handleReadClick = async (index, libros, setLibros) => {
        const newLibros = [...libros];
        const libro = newLibros[index];
        
        libro.isRead = !libro.isRead;

        try {
            const token = Cookies.get('authToken');
            if (token) {
                const username = await obtenerUserIdDesdeToken(token);
                if (username) {
                    if (libro.isRead) {
                        await relacionReadLibro(username, libro.title);
                        console.log('Relación de leído creada exitosamente');
                    } else {
                        await eliminarRelacionReadLibro(username, libro.title);
                        console.log('Relación de leído eliminada exitosamente');
                    }
                } else {
                    throw new Error('No se pudo obtener el username del usuario');
                }
            } else {
                throw new Error('Token no encontrado');
            }
        } catch (error) {
            console.error('Error al manejar la relación de leído:', error);
            libro.isRead = !libro.isRead; // Revertir si falla la creación/eliminación de la relación
        }

        setLibros(newLibros);
    };

    const handleLikeClick = async (index, libros, setLibros) => {
        const newLibros = [...libros];
        const libro = newLibros[index];
        
        libro.isLiked = !libro.isLiked;

        try {
            const token = Cookies.get('authToken');
            if (token) {
                const username = await obtenerUserIdDesdeToken(token);
                if (username) {
                    if (libro.isLiked) {
                        await relacionLikeLibro(username, libro.title);
                        console.log('Relación de gusto creada exitosamente');
                    } else {
                        await eliminarRelacionLikeLibro(username, libro.title);
                        console.log('Relación de gusto eliminada exitosamente');
                    }
                } else {
                    throw new Error('No se pudo obtener el username del usuario');
                }
            } else {
                throw new Error('Token no encontrado');
            }
        } catch (error) {
            console.error('Error al manejar la relación de gusto:', error);
            libro.isLiked = !libro.isLiked; // Revertir si falla la creación/eliminación de la relación
        }

        setLibros(newLibros);
    };

    return (
        <Layout value={value} handleChange={handleChange}>
            <TabPanel>
                <h1>Recomendaciones</h1>
                <div>
                    <h2>Recomendaciones por género</h2>
                    <Grid container spacing={2}>
                        {recomendacionesGenero.map((libro, index) => (
                            <LibroCard
                                key={index}
                                libro={libro}
                                handleReadClick={() => handleReadClick(index, recomendacionesGenero, setRecomendacionesGenero)}
                                handleLikeClick={() => handleLikeClick(index, recomendacionesGenero, setRecomendacionesGenero)}
                                isRead={libro.isRead}
                            />
                        ))}
                    </Grid>
                </div>
                <div>
                    <h2>Recomendaciones por autor</h2>
                    <Grid container spacing={2}>
                        {recomendacionesAutor.map((libro, index) => (
                            <LibroCard
                                key={index}
                                libro={libro}
                                handleReadClick={() => handleReadClick(index, recomendacionesAutor, setRecomendacionesAutor)}
                                handleLikeClick={() => handleLikeClick(index, recomendacionesAutor, setRecomendacionesAutor)}
                                isRead={libro.isRead}
                            />
                        ))}
                    </Grid>
                </div>
                <div>
                    <h2>Recomendaciones por BFS</h2>
                    <Grid container spacing={2}>
                        {recomendacionesBFS.map((libro, index) => (
                            <LibroCard
                                key={index}
                                libro={libro}
                                handleReadClick={() => handleReadClick(index, recomendacionesBFS, setRecomendacionesAutor)}
                                handleLikeClick={() => handleLikeClick(index, recomendacionesBFS, setRecomendacionesAutor)}
                                isRead={libro.isRead}
                            />
                        ))}
                    </Grid>
                </div>
            </TabPanel>
        </Layout>
    );
};

export default RecommendationPage;
