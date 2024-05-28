'use client'
import React, { useState, useEffect } from 'react';
import TabPanel from '../../../components/TabPanel';
import Layout from '../layout';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { obtenerGeneros } from '../../../lib/functions';

const LibrosPage = () => {
    const [isRead, setIsRead] = useState(false);
    const [value, setValue] = useState(0);
    const [libros, setLibros] = useState([]);
    const [generos, setGeneros] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const generosObtenidos = await obtenerGeneros();
        console.log('Géneros obtenidos:', generosObtenidos);
        setGeneros(generosObtenidos);
      } catch (error) {
        console.error('Error al obtener los géneros:', error);
      }
    };
    fetchGeneros();
  }, []);

  const handleReadClick = (index) => {
    const newGenero = [...generos];
    newGenero[index].isRead =!newGenero[index].isRead;
    setGeneros(newGenero);
  };

  const allGeneros = generos.map(genero => genero.nombre).join(', ');

  return (
    <Layout value={value} handleChange={handleChange}>
      <TabPanel>
        <h1>Selecione los géneros</h1>
        <List>
          {generos.map((genero, index) => (
            <ListItem key={index} button onClick={() => handleReadClick(index)}>
              <ListItemText primary={genero.nombre} />
            </ListItem>
          ))}
        </List>
        <h2>Todos los géneros: {allGeneros}</h2>
      </TabPanel>
    </Layout>
  );
};

export default LibrosPage;