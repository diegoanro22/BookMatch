'use client'
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
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Registrarse
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombre
                        </label>
                        <div className="mt-2">
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                autocomplete="given-name"
                                required
                                value={formData.nombre}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
                            Apellido
                        </label>
                        <div className="mt-2">
                            <input
                                id="apellido"
                                name="apellido"
                                type="text"
                                autocomplete="family-name"
                                required
                                value={formData.apellido}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    </div>


                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Correo Electrónico
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombre de Usuario
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Contraseña
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
