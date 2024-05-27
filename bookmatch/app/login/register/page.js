"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '../../../lib/functions';
import Modal from '../../../components/Modal';
import bcrypt from 'bcryptjs';

export default function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        username: '',
        email: '',
        password: ''
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', type: '' });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const hashedPassword = await bcrypt.hash(formData.password, 10);
            const userData = { ...formData, password: hashedPassword };
            const user = await createUser(userData);
            console.log('User created successfully:', user);
            setModalContent({ title: 'Éxito', message: 'Usuario creado exitosamente', type: 'success' });
            setModalVisible(true);

        } catch (error) {
            console.error('Error creating user:', error);
            setModalContent({ title: 'Error', message: 'Error creando el usuario', type: 'error' });
            setModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        router.push('/login/login_user'); 
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/noche.ppg)', filter: 'blur(8px)' }}></div>
            <div className="relative z-10 w-full max-w-4xl bg-violet-50 p-16 rounded-lg shadow-lg  backdrop-blur-lg bg-opacity-70 mt-40 mb-20">
                <h2 className="text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 mb-8">
                    Registrarse
                </h2>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <label htmlFor="nombre" className="block text-lg font-medium leading-6 text-gray-900">
                                Nombre
                            </label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                autoComplete="given-name"
                                required
                                value={formData.nombre}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                            />
                        </div>
                        <div>
                            <label htmlFor="apellido" className="block text-lg font-medium leading-6 text-gray-900">
                                Apellido
                            </label>
                            <input
                                id="apellido"
                                name="apellido"
                                type="text"
                                autoComplete="family-name"
                                required
                                value={formData.apellido}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">
                            Nombre de Usuario
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 px-4 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
            <Modal
                show={modalVisible}
                onClose={handleCloseModal}
                title={modalContent.title}
                message={modalContent.message}
                type={modalContent.type}
            />
        </div>
    );
}
