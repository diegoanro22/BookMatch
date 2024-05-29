'use client'
import React, { useState, useEffect } from 'react';
import TabPanel from '../../../components/TabPanel';
import LibroCard from '../../../components/LibroCard';
import Layout from '../layout';
import Grid from '@mui/material/Grid';
import { obtenerLibros, relacionReadLibro, eliminarRelacionReadLibro, relacionLikeLibro, eliminarRelacionLikeLibro, obtenerUserIdDesdeToken, obtenerLibrosLeidos } from '../../../lib/functions'; 
import Cookies from 'js-cookie';

const LibrosPage = () => {
    const [value, setValue] = useState(3);
    const [libros, setLibros] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const token = Cookies.get('authToken');
                if (token) {
                    const username = await obtenerUserIdDesdeToken(token);
                    if (username) {
                        const librosObtenidos = await obtenerLibrosLeidos(username);
                        setLibros(librosObtenidos);
                    } else {
                        throw new Error('No se pudo obtener el username del usuario');
                    }
                } else {
                    throw new Error('Token no encontrado');
                }
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
        };
        fetchLibros();
    }, []);

    const handleReadClick = async (index) => {
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

    const handleLikeClick = async (index) => {
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
                <h1 className="font-Lobster text-white mt-8 mb-3" style={{ textAlign: 'center', fontSize: '42px' }}>Libros leídos</h1>
                <Grid container spacing={1}>
                    {libros.map((libro, index) => (
                        <LibroCard
                            key={index}
                            libro={libro}
                            handleReadClick={() => handleReadClick(index)}
                            handleLikeClick={() => handleLikeClick(index)}
                            isRead={libro.isRead}
                        />
                    ))}
                </Grid>
            </TabPanel>
        </Layout>
    );
};

export default LibrosPage;
