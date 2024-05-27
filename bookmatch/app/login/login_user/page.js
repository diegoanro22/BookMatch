"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { loginUser } from '../../../lib/functions'; 
import Modal from '../../../components/Modal';
import Cookies from 'js-cookie';

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
            const token = await loginUser(formData);
            Cookies.set('authToken', token, {
                expires: 1, // 1 day
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
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
            router.push('/main/libros');
        } else {
            router.push('/login/login_user');
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/noche.png)', filter: 'blur(8px)' }}></div>
            <div className="relative z-10 flex items-center justify-left w-full ml-44">
                <img src="/lalala.png" alt="Bookmatch Logo" className="h-68" />
            </div>
            <div className="relative z-10 sm:mx-24 w-full max-w-2xl bg-violet-100 p-12 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-70 mt-20">
                <h2 className="text-center text-5xl font-bold leading-9 tracking-tight text-black mb-10">
                    Iniciar sesión en tu cuenta
                </h2>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-black">
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
                                className="block w-full rounded-md border-0 py-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-lg font-medium leading-6 text-black">
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
                                className="block w-full rounded-md border-0 py-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-lg text-black">
                    ¿No tienes cuenta?&nbsp;
                    <Link href="/login/register" className="font-semibold leading-6 text-blue-700 hover:text-indigo-500">
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
