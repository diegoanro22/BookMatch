'use client'
import React, { useState, useEffect } from 'react';
import TabPanel from '../../../components/TabPanel';
import GeneroCard from '../../../components/GeneroCard';
import Layout from '../layout';
import Grid from '@mui/material/Grid';
import { obtenerGeneros, relacionGenero, eliminarRelacionGenero, obtenerUserIdDesdeToken } from '../../../lib/functions';
import Cookies from 'js-cookie';

const GenerosPage = () => {
  const [value, setValue] = useState(1);
  const [generos, setGeneros] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const token = Cookies.get('authToken');
        if (token) {
          const username = await obtenerUserIdDesdeToken(token); // Obtener el username del usuario
          if (username) {
            const generosObtenidos = await obtenerGeneros(username);
            setGeneros(generosObtenidos);
          } else {
            throw new Error('No se pudo obtener el username del usuario');
          }
        } else {
          throw new Error('Token no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener los géneros:', error);
      }
    };
    fetchGeneros();
  }, []);

  const handleLikeClick = async (index) => {
    console.log("Click en el índice:", index);
    const newGeneros = [...generos];
    const genero = newGeneros[index];
    
    // Invierte el estado de 'isLiked'
    genero.isLiked = !genero.isLiked;

    try {
      const token = Cookies.get('authToken');
      if (token) {
        const username = await obtenerUserIdDesdeToken(token);
        console.log(username);
        if (username) {
          if (genero.isLiked) {
            await relacionGenero(username, genero.type);
            console.log('Relación creada exitosamente');
          } else {
            await eliminarRelacionGenero(username, genero.type);
            console.log('Relación eliminada exitosamente');
          }
        } else {
          throw new Error('No se pudo obtener el username del usuario');
        }
      } else {
        throw new Error('Token no encontrado');
      }
    } catch (error) {
      console.error('Error al manejar la relación:', error);
      // Opcionalmente revertir el cambio de estado si la creación/eliminación de la relación falla
      genero.isLiked = !genero.isLiked;
    }

    // Actualiza el estado con el nuevo array modificado
    setGeneros(newGeneros);
  };

  return (
    <Layout value={value} handleChange={handleChange}>
      <TabPanel>
        <h1 className="font-Lobster text-white mt-8 mb-3" style={{ textAlign: 'center', fontSize: '42px' }}>Géneros</h1>
        <Grid container spacing={0}>
          {generos.map((genero, index) => (
            <GeneroCard
              key={index}
              genero={genero}
              handleLikeClick={() => handleLikeClick(index)}
              isLiked={genero.isLiked}
              index={index}  // Pasamos el índice como prop adicional
            />
          ))}
        </Grid>
      </TabPanel>
    </Layout>
  );
};

export default GenerosPage;
