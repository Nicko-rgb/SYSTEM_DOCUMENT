import './login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EstadoSesion from './Sesion'

const Login = () => {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin } = EstadoSesion();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('/api/login', { admin, password });
            console.log("Inicio de Sesión de usuario Exitoso");
            handleLogin(response.data.carrera, response.data.receivedDocuments, response.data.sentDocuments);
            navigate('/panel');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            if (error.response && error.response.data && error.response.data.message) {
                console.log(error.response.data.message);
            } else {
                alert("Error al iniciar sesión, intente nuevamenteeee");
            }
        }
    };

    return (
        <div className="login">
            <div>
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <label>Administrador</label>
                    <input required type="text" value={admin} onChange={(e) => setAdmin(e.target.value)} />
                    <label>Clave</label>
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">INGRESAR</button>
                </form>
            </div>
        </div>
    )
}

export default Login