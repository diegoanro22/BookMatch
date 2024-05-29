'use client'
import React, { useState } from 'react';
import TabPanel from '../../../components/TabPanel';
import LibroCard from '../../../components/LibroCard';
import Layout from '../layout';
import Grid from '@mui/material/Grid';

const LibrosPage = () => {
    const [isRead, setIsRead] = useState(false);
    const [value, setValue] = useState(3);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const libros = [
        { author: 'Autor 1', title: 'Libro 1', genre: 'Género 1', description: 'Descripción 1' },
        { author: 'Autor 2', title: 'Libro 2', genre: 'Género 2', description: 'Descripción 2' },
        // Más libros
    ];

    const handleReadClick = () => {
        setIsRead(!isRead);
    };

    const filteredLibros = libros.filter(libro => libro.isRead === isRead);

    return (
        <Layout value={value} handleChange={handleChange}>
            <TabPanel>
                <h1 className="font-Lobster text-white mt-8 mb-8" style={{ textAlign: 'center', fontSize: '42px' }}>Libros leídos</h1>
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