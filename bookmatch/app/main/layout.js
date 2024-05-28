'use client'

import React from 'react';
import Navbar from '../../components/Navbar';

const Layout = ({ children, value, handleChange }) => {
    return (
        <div className='layout-container'>
            <Navbar value={value} handleChange={handleChange} />
            {children}
            <style jsx>{`
                .layout-container {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background-color: #900C3F;
                }
            `}</style>
        </div>
    );
};

export default Layout;

