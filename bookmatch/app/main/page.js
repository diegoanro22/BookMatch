'use client'
import React, { useState } from 'react';
import Layout from './layout';

function MainPage() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        // logica para cerrar sesion
        console.log("Cerrar sesión");
    };

    return (
        <Layout value={value} handleChange={handleChange}>
            {/* Aquí va el contenido específico de la página principal */}
            <div>Bienvenido a la página principal</div>
        </Layout>
    );
}

export default MainPage;