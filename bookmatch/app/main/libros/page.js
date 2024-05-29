'use client'
import React, { useState, useEffect } from 'react';
import TabPanel from '../../../components/TabPanel';
import LibroCard from '../../../components/LibroCard';
import Layout from '../layout';
import Grid from '@mui/material/Grid';
import { obtenerLibros } from '../../../lib/functions'; 

const LibrosPage = () => {
    const [isRead, setIsRead] = useState(false);
    const [value, setValue] = useState(0);
    const [libros, setLibros] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const librosObtenidos = await obtenerLibros();
                setLibros(librosObtenidos);
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
        };
        fetchLibros();
    }, []);

    const handleReadClick = (index) => {
        const newLibros = [...libros];
        newLibros[index].isRead = !newLibros[index].isRead;
        setLibros(newLibros);
    };

    return (
        <Layout value={value} handleChange={handleChange}>
            <TabPanel>
                <h1 style={{ textAlign: 'center', fontSize: '32px', color: 'white' }}>Libros</h1>
                <Grid container spacing={1}>
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
