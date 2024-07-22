import './login.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiAdminLine } from "react-icons/ri";
import { TbPasswordFingerprint } from "react-icons/tb";
import axios from 'axios'
import EstadoSesion from './Sesion'

const Login = () => {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin, handleLogout } = EstadoSesion();
    const navigate = useNavigate();

    useEffect(() => {
        // Limpiar el estado de sesión al montar el componente
        handleLogout(); // Esto eliminará el valor de userCarrera
      }, [handleLogout]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://192.168.43.190:5000/api/login', { admin, password });
            console.log("Inicio de Sesión de usuario Exitoso");
            handleLogin(response.data.carrera, response.data.receivedDocuments, response.data.sentDocuments);
            navigate('/panel');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert("Error al iniciar sesionnn")
            // if (error.response && error.response.data && error.response.data.message) {
            //     console.log(error.response.data.message);
            // } else {
            //     alert("Error al iniciar sesión, intente nuevamenteeee");
            // }
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label'>Administrador</label>
                        <input required type="text" value={admin} onChange={(e) => setAdmin(e.target.value)} className="input-field" />
                        <RiAdminLine className="icon" />
                    </div>
                    <div>
                        <label className='label'>Clave</label>
                        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
                        <TbPasswordFingerprint className="icon" />
                    </div>
                    <button type="submit" className="submit-button">INGRESAR</button>
                </form>
                <div className="reset">
                    <a href="/reset">Olvidé mi Clave</a>
                </div>
                <div className="document-status">
                    <a href="/document-status">¡Ver estado de documento!</a>
                </div>
            </div>
        </div>
    )
}

export default Login