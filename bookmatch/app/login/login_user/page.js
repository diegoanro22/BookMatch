"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { loginUser } from '../../../lib/functions'; 
import Modal from '../../../components/Modal';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
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
            const user = await loginUser(formData);
            setModalContent({ title: 'Éxito', message: 'Inicio de sesión exitoso', type: 'success' });
            setModalVisible(true);
        } catch (error) {
            console.error('Error logging in:', error);
            setModalContent({ title: 'Error', message: 'Error al iniciar sesión', type: 'error' });
            setModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        if (modalContent.type === 'success') {
            router.push('/main');
        } else {
            router.push('./login_user');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-between px-6 py-12 bg-cover bg-center" style={{ backgroundImage: 'url(/Background.jpg)' }}>
            <div className="flex items-start justify-start w-full ml-24">
                <img src="/bookmatch.png" alt="Bookmatch Logo" className="h-72" />
            </div>
            <div className="sm:mx-48 sm:w-full sm:max-w-md bg-violet-100 p-8 rounded-lg shadow-lg border border-indigo-600 ml-4" style={{ minHeight: '75vh' }}>
                <h2 className="text-center text-4xl font-bold leading-9 tracking-tight text-black mb-5 mt-64">
                    Iniciar sesión en tu cuenta
                </h2>

                <form className="space-y-6 mt-30" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
                            Usuario
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="current-username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                                Contraseña
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-black">
                    ¿No tienes cuenta?&nbsp;
                    <Link href="/login/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Registrarse
                    </Link>
                </p>
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
