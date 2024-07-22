import './registrodoc.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdAddAPhoto } from 'react-icons/md';
import { FaRegCircleCheck } from "react-icons/fa6";
import { BiError } from "react-icons/bi";
import Tesseract from 'tesseract.js';
import LoadingModal from '../Modal/Modal';
import EstadoSesion from '../Login/Sesion';
import Navegador from '../Navegador/Navegador';

const RegistroDoc = () => {
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false)
    const { userCarrera } = EstadoSesion();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [receptor, setReceptor] = useState('Tesoreria');
    const [motivoArchivo, setMotivoArchivo] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [txtArchivo, setTxtArchivo] = useState('');

    const emisor = userCarrera;
    
    const noSesion = useNavigate()
    if(!userCarrera){
        noSesion('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!receptor) {
            alert('Por favor, selecciona un receptor y un motivo de archivo.');
            return;
        }
    
        if (!archivo) {
            alert('Por favor, selecciona un archivo.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('dni', dni);
            formData.append('receptor', receptor);
            formData.append('emisor', emisor)
            formData.append('motivoArchivo', motivoArchivo);
            formData.append('archivo', archivo);
            formData.append('txtArchivo', txtArchivo);

            await axios.post('/api/registrar', formData);
            console.log('Documento enviado');
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
                setNombre('');
                setApellido('');
                setDni('');
                setReceptor('');
                setMotivoArchivo('');
                setArchivo(null);
                setTxtArchivo('');
            }, 2000);
        } catch (error) {
            setErrorModal(true)
            setTimeout(() => {
                setErrorModal(false)
            }, 2000)
            console.error('Error al enviar el documento:', error);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setArchivo(file);
        setLoading(true);

        if (file.type.startsWith('image/')) {
            try {
                const { data } = await Tesseract.recognize(file, 'eng', {
                    logger: (m) => console.log(m),
                });
                setTxtArchivo(data.text);
                setLoading(false);
            } catch (error) {
                console.error('Error al extraer texto:', error);
            }
        } else {
            setTxtArchivo('');
        }
    };

    const txtCute = txtArchivo.slice(0, 100);

    return (
        <div className="registro">
            <Navegador />
            <div className='subRegis'>
                <form onSubmit={handleSubmit}>
                    <h3>FORMULARIO DE REGISTRO DE DOCUMENTO</h3>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                    </div>
                    <div>
                        <label>DNI:</label>
                        <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Enviar a:</label>
                        <select value={receptor} onChange={(e) => setReceptor(e.target.value)}>
                            <option value='Tesoreria'>Tesorería</option>
                            <option value='Dirección'>Dirección</option>
                            <option value='Desarrollo de Sistemas de Información'>Desarrollo de Sistemas de Información</option>
                            <option value="Contabilidad">Contalidad</option>
                            <option value="Administración de Empresas">Administración de Empresas</option>
                            <option value="Asistente Administrativa">Asistente Administrativa</option>
                            <option value="Mecánica Automotriz">Mecánica Automotriz</option>
                            <option value="Manejo Forestal">Manejo Forestal</option>
                            <option value="Enfermeria Técnica">Enfermeria Técnica</option>
                            <option value="Electricidad Industrial">Electricidad Industrial</option>
                            <option value="Construcción Civil">Construcción Civil</option>
                            <option value="Administración de Operaciones Turísticas">Administración de Operaciones Turísticas</option>
                            <option value="Producción Agropecuaria">Producción Agropecuaria</option>
                        </select>
                    </div>
                    <div>
                        <label>Motivo de Documento</label>
                        <input type='text' value={motivoArchivo} onChange={(e) => setMotivoArchivo(e.target.value)} required/>
                    </div>
                    <div>
                        <label>Seleciona Archivo</label>
                        <input type="file" className="file" onChange={handleFileChange} />
                    </div>
                    <div className="vistaPrevia">
                        {archivo && (
                            <p style={{ whiteSpace: 'pre-wrap' }}>{txtCute}....<span> Ver más</span></p>
                        )}
                    </div>
                    <div className="scann">
                        <Link to="/scan/docuement" className="div">
                            <label>Escanea el Documento</label>
                            <MdAddAPhoto className="linkIco" />
                        </Link>
                    </div>
                    <button type="submit">ENVIAR</button>
                </form>
            </div>
            <Link to="/extrae">Extraer</Link>
            <LoadingModal isOpen={loading} onClose={() => setLoading(false)} />
            {showSuccessModal && (
                <div className="success-modal">
                    <div className="success-modal-content">
                        <FaRegCircleCheck className='iconn'/>
                        <h3>Registro Exitoso</h3>
                        <p>El documento se ha enviado correctamente.</p>
                    </div>
                </div>
            )}
            {errorModal && (
                <div className="error-modal">
                <div className="error-modal-content">
                    <BiError  className='iconn'/>
                    <h3>Error al Registrar Documento</h3>
                    <p>Error al registrar Documento, Intente Nuevamente.</p>
                </div>
            </div>  
            )}
        </div>
    );
};

export default RegistroDoc;