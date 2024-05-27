import React from 'react';
import Navbar from '../../components/Navbar';

const Layout = ({ children, value, handleChange }) => {
    return (
        <div className=''>
            <Navbar value={value} handleChange={handleChange} />
            {children}
        </div>
    );
};

export default Layout;
