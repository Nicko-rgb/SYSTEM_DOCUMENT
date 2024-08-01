import './login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";
import { TbPasswordFingerprint } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import axios from 'axios';
import EstadoSesion from './Sesion';

const Login = () => {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin, handleLogout } = EstadoSesion();
    const navigate = useNavigate();
    
    // State for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalColor, setModalColor] = useState('black');

    useEffect(() => {
        // Clear session state on component mount
        handleLogout(); // This will clear the userCarrera value
    }, [handleLogout]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            showModal("Iniciando sesión...", "black");

            const response = await axios.post('http://localhost:5000/api/login', { admin, password });
            console.log("Inicio de Sesión de usuario Exitoso");
            handleLogin(response.data.carrera, response.data.receivedDocuments, response.data.sentDocuments);
            showModal("Inicio de sesión exitoso", "green");
            navigate('/panel');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            showModal("Error al iniciar sesión", "red");
        }
    };

    const showModal = (message, color) => {
        setModalMessage(message);
        setModalColor(color);
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
        }, 2000);
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
                    {/* <a href="/reset">Olvidé mi Clave</a> */}
                </div>
            </div>
            <div className="document-status">
                <a href="/document-status"><GrStatusGood className='icon1'/> ¡Ver estado de documento!</a>
            </div>

            {modalVisible && (
                <div className="modal_sesion" style={{ color: modalColor }}>
                    <div className="modal-content">
                        <div className="loader"></div>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login