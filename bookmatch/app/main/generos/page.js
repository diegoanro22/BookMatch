'use client'
import React, { useState } from 'react';
import TabPanel from '../../../components/TabPanel';
import LibroCard from '../../../components/LibroCard';
import Layout from '../layout';
import Grid from '@mui/material/Grid';

const LibrosPage = () => {
    const [isRead, setIsRead] = useState(false);
    const [value, setValue] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const libros = [
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        { author: 'Autor 3', title: 'Libro 3', genre: 'Género 3', description: 'Descripción 3' },
        { author: 'Autor 4', title: 'Libro 4', genre: 'Género 2', description: 'Descripción 4' },
        { author: 'Autor 5', title: 'Libro 5', genre: 'Género 1', description: 'Descripción 5' },
        { author: 'Autor 6', title: 'Libro 6', genre: 'Género 2', description: 'Descripción 6' },
        // Más libros
    ];

    const handleReadClick = () => {
        setIsRead(!isRead);
    };

    const filteredLibros = libros.filter((libro) => libro.genre === selectedGenre);

    return (
        <Layout value={value} handleChange={handleChange}>
            <TabPanel>
                <h1 style={{ textAlign: 'center', fontSize: '32px', color: 'white' }}>Géneros</h1>
                <select value={selectedGenre} onChange={handleGenreChange} color="black" style={{ backgroundColor: 'transparent' }}>
                    <option value="">Seleccione un género</option>
                    <option value="Género 1">Género 1</option>
                    <option value="Género 2">Género 2</option>
                    <option value="Género 3">Género 3</option>
                    {/* Agrega más opciones para cada género */}
                </select>
                <Grid container spacing={2}>
                {filteredLibros.map((libro, index) => (
                        <LibroCard key={index} libro={libro} handleReadClick={handleReadClick} isRead={isRead} />
                    ))}
                </Grid>
            </TabPanel>
        </Layout>
    );
};

export default LibrosPage;