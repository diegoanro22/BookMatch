'use client'
import React, { useState } from 'react';
import TabPanel from '../../../components/TabPanel';
import LibroCard from '../../../components/LibroCard';
import Layout from '../layout';
import Grid from '@mui/material/Grid';

const LibrosPage = () => {
    const [isRead, setIsRead] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [libros, setLibros] = useState([
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        // Más libros
        ]);

    const handleReadClick = (index) => {
        const newLibros = [...libros];
        newLibros[index].isRead =!newLibros[index].isRead;
        setLibros(newLibros);
    };

    return (
        <Layout value={value} handleChange={handleChange}>
            <TabPanel>
                <h1>Libros</h1>
                <Grid container spacing={2}>
                {libros.map((libro, index) => (
        <LibroCard
            key={index}
            libro={libro}
            handleReadClick={() => handleReadClick(index)}
            isRead={libro.isRead}
        />
      ))}
                </Grid>
            </TabPanel>
        </Layout>
    );
};

export default LibrosPage;