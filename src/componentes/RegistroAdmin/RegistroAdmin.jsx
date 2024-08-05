import './registro.css';
import React, { useContext, useEffect, useState } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Complementos/Autenticacion'; // Ajusta la ruta según tu estructura
import LogoSuiza from '../IMG/logoSuiza.png';

const RegistroAdmin = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // Estados para el formulario
    const [carrera, setCarrera] = useState('');
    const [admin, setAdmin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [carga, setCarga] = useState(false);

    // Verificar si el usuario está autenticado
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirige a la página de inicio si no está autenticado
        }
    }, [isAuthenticated, navigate]);

    // Función para verificar si el email ya está registrado
    const checkEmail = async (email) => {
        const response = await fetch('https://backenddocument-production-128c.up.railway.app/api/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        return response;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarga(true); // Iniciar carga
        setMsg('');

        // Verificar si el correo electrónico ya está registrado
        const emailCheckResponse = await checkEmail(email);
        const emailCheckData = await emailCheckResponse.json();

        if (emailCheckResponse.status === 409) {
            setMsg(emailCheckData.message); // Establecer mensaje de error
            setCarga(false); // Finalizar carga
            return; // Detener el registro si el correo ya existe
        }

        const adminData = { carrera, admin, email, password };

        try {
            const response = await fetch('https://backenddocument-production-128c.up.railway.app/api/register/admins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminData),
            });

            const data = await response.json();
            if (response.ok) {
                setCarrera('');
                setAdmin('');
                setEmail('');
                setPassword('');
                setMsg(data.message); // Mensaje de éxito
            } else {
                setMsg(data.message); // Mensaje de error
            }
        } catch (error) {
            setMsg('Error al registrar el administrador');
        } finally {
            setCarga(false); // Finalizar carga
        }
    };

    return (
        <div className="reg_admin">
            <div className="img">
                <img src={LogoSuiza} alt="" />
                <p>IESTP Suiza</p>
            </div>
            <main>
                <Link to='/'>
                    <IoArrowBackSharp className='volverIco aaa' title='Volver' />
                </Link>
                <form onSubmit={handleSubmit}>
                    <h2>Registrar Nuevo Usuario</h2>
                    <div>
                        <label>Nombre de Entidad o Carrera</label>
                        <input type="text" value={carrera} onChange={(e) => setCarrera(e.target.value)} required />
                    </div>
                    <div>
                        <label>Usuario</label>
                        <input type="text" value={admin} onChange={(e) => setAdmin(e.target.value)} required />
                    </div>
                    <div>
                        <label>Correo de Usuario</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Clave de Usuario</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {msg && <p style={{ color: 'white', textAlign: 'center' }}>{msg}</p>} {/* Mensaje de error o éxito */}
                    <button type='submit' disabled={carga}>
                        {carga ? 'Registrando...' : 'REGISTRAR'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default RegistroAdmin;
