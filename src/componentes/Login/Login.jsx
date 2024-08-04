import './login.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";
import { TbPasswordFingerprint } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { RiMovieLine } from "react-icons/ri";
import axios from 'axios';
import EstadoSesion from './Sesion';
import LogoSuiza from '../IMG/logoSuiza.png'
import { AuthContext } from '../Complementos/Autenticacion';

const Login = () => {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin, handleLogout } = EstadoSesion();
    const [isLoading, setIsLoading] = useState(false)
    const [video, setVideo] = useState(false)
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalColor, setModalColor] = useState('black');
    const [loginAdmin, setLoginAdmin] = useState(false)
    const [msg, setMsg] = useState('')

    const [administrador, setAdministrador] = useState('')
    const [passAdministrador, setPassAdministrador] = useState('')

    useEffect(() => {
        // Clear session state on component mount
        handleLogout(); // This will clear the userCarrera value
    }, [handleLogout]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        showModal("Iniciando sesión...", "black");

        try {

            const response = await axios.post('https://backenddocument-production-128c.up.railway.app/api/login', { admin, password });
            console.log("Inicio de Sesión de usuario Exitoso");
            handleLogin(response.data.carrera, response.data.receivedDocuments, response.data.sentDocuments);
            showModal("Inicio de sesión exitoso", "green");
            navigate('/panel');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            showModal("Error al iniciar sesión. Credenciales incorrecta", "red");
        } finally {
            setIsLoading(false)
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
    const cerrarVideo = () => {
        setVideo(false)
    }
    const verVideo = () => {
        setVideo(true)
    }
    const abrirLoginAdmin = () => {
        setLoginAdmin(true)
        setMsg('')
    }
    const cerrarLoginAdmin = () => {
        setLoginAdmin(false)
        setAdministrador('')
        setPassAdministrador('')
    }
    

    const { setIsAuthenticated } = useContext(AuthContext);

    // Al montar el componente, asegurarse de que el estado de autenticación sea falso
    useEffect(() => {
        setIsAuthenticated(false);
    }, [setIsAuthenticated]);

    const handleAdmin = (e) => {
        e.preventDefault()
        const adminU = 'admin'
        const passU = 'admin'

        if (adminU === administrador && passU === passAdministrador) {
            setIsAuthenticated(true)
            navigate('/register/admin')
        }
        else {
            setAdministrador('')
            setPassAdministrador('')
            setMsg('Credenciales Incorrectas')
        }

    }

    return (
        <div className="login">
            <div className="img">
                <img src={LogoSuiza} alt="" />
                <p>IESTP Suiza</p>
            </div>
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
                    <a href="/reset-password">Olvidaste la Clave?</a>
                    <button type="submit" className="submit-button">
                        {isLoading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
                    </button>
                </form>

            </div>
            <button className="document-status">
                <a href="/document-status"><GrStatusGood className='icon1' /> ¡Ver estado de documento!</a>
            </button>
            {modalVisible && (
                <div className="modal_sesion" style={{ color: modalColor }}>
                    <div className="modal-content">
                        <div className="loader"></div>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )}
            <button className='btn-ver' onClick={verVideo}><RiMovieLine className='ico_movi' /> Ver Tutorial de Uso</button>
            <button className='btn-admin' onClick={abrirLoginAdmin}>  <p><RiAdminLine className="icon" />Administrador</p></button>
            {video && (
                <div className="modal_video" onClick={cerrarVideo}>
                    <div className="video_content" onClick={(e) => e.stopPropagation()}>
                        <h3>El video aún no esta disponible</h3>
                    </div>
                    <IoMdClose className='ico_cerrar' onClick={cerrarVideo} title='Cerrar' />
                </div>
            )}
            {loginAdmin && (
                <div className="modal_login" onClick={cerrarLoginAdmin}>
                    <form onClick={(e) => e.stopPropagation()} onSubmit={handleAdmin}>
                        <h3>Ingrese Datos del Super Admiminstrador</h3>
                        <label>Super Administrador</label>
                        <input type="text" value={administrador} onChange={(e) => setAdministrador(e.target.value)} required />
                        <label>Clave</label>
                        <input type="password" value={passAdministrador} onChange={(e) => setPassAdministrador(e.target.value)} required />
                        <p> {msg} </p>
                        <button type='submit'>Ingresar</button>
                    </form>
                    <button className='closee' onClick={cerrarLoginAdmin}>Cerrar</button>
                </div>
            )}
        </div>
    );
}

export default Login