import './registrodoc.css';
import { useState, useRef, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegCircleCheck } from "react-icons/fa6";
import { BiError } from "react-icons/bi";
import { FaFileSignature } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import Tesseract from 'tesseract.js';
import LoadingModal from '../Modal/Modal';
import EstadoSesion from '../Login/Sesion';
import Navegador from '../Navegador/Navegador';
import { IoArrowBackSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const RegistroDoc = () => {
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false)
    const { userCarrera } = EstadoSesion();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [receptor, setReceptor] = useState('');
    const [motivoArchivo, setMotivoArchivo] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [txtArchivo, setTxtArchivo] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [modalTexto, setModalTexto] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const fileInputRef = useRef(null);

    const emisor = userCarrera;

    const noSesion = useNavigate()
    if (!userCarrera) {
        noSesion('/')
    }
    const abrirModalText = () => {
        setModalTexto(true)
    }
    const cerrrarModaltext = () => {
        setModalTexto(false)
    }

    const isAlpha = (str) => /^[A-Za-z]+$/.test(str);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (!isAlpha(nombre)) {
            setMensaje('El nombre debe contener solo letras');
            setIsLoading(false);
            return;
        }

        if (!isAlpha(apellido)) {
            setMensaje('El apellido debe contener solo letras');
            setIsLoading(false);
            return;
        }

        if (isNaN(dni)) {
            setMensaje('El DNI debe ser solo numérico')
            setIsLoading(false)
            return
        }
        if (!receptor) {
            setMensaje('El receptor no puede estar vacío')
            setIsLoading(false)
            return;
        }

        if (!archivo) {
            setMensaje('El archivo no puede estar vacío')
            setIsLoading(false)
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

            await axios.post('https://backenddocument-production-128c.up.railway.app/api/registrar', formData);
            console.log('Documento enviado');
            setShowSuccessModal(true);
            setMensaje('')
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
        finally {
            setIsLoading(false)
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

    const handleSelectFile = () => {
        fileInputRef.current.click();
    };

    const txtCute = txtArchivo.slice(0, 55);

    const recargar = () => {
        window.location.reload();
    }
    return (
        <div className="registro">
            <Navegador />
            <main className='subRegis'>

                <form onSubmit={handleSubmit} className={`form-no ${isLoading ? 'form-si' : ''}`}>
                    <Link to='/panel'>
                        <IoArrowBackSharp className='volverIco  aaa' title='Volver' />
                    </Link>
                    <AiOutlineReload className='icon_reload aa' onClick={recargar} title='Recargar' />
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
                        <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} required />
                    </div>
                    <div>
                        <label>Enviar a:</label>
                        <select value={receptor} onChange={(e) => setReceptor(e.target.value)}>
                            <option value="">-----------------------------</option>
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
                        <input type='text' value={motivoArchivo} onChange={(e) => setMotivoArchivo(e.target.value)} required />
                    </div>
                    {!archivo && (
                        <div className='div_selec' onClick={handleSelectFile}>
                            <p className="selec_archivo" > <FaFileSignature className='ico_subir' /> Selecciona Archivo</p>
                            <input type="file" className="file" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
                        </div>
                    )}
                    {archivo && (
                        <div>
                            <p style={{color: 'white'}}>Datos Previos</p>
                            <div className="vistaPrevia">
                                <p style={{ whiteSpace: 'pre-wrap' }}>{txtCute}....<span onClick={abrirModalText}> Ver más</span></p>
                            </div>
                        </div>
                    )}
                    <p style={{ color: 'orangered', textAlign: 'center' }}> {mensaje} </p>
                    <button type="submit"><BsFillSendFill />{isLoading ? 'Enviando...' : 'ENVIAR'}</button>
                </form>
            </main>
            <LoadingModal isOpen={loading} onClose={() => setLoading(false)} />
            {showSuccessModal && (
                <div className="success-modal">
                    <div className="success-modal-content">
                        <FaRegCircleCheck className='iconn' />
                        <h3>Registro Exitoso</h3>
                        <p>El documento se ha enviado correctamente.</p>
                    </div>
                </div>
            )}
            {errorModal && (
                <div className="error-modal">
                    <div className="error-modal-content">
                        <BiError className='iconn' />
                        <h3>Error al Registrar Documento</h3>
                        <p>Error al registrar Documento, Intente Nuevamente.</p>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="loading-modal2">
                    <div className="loading-modal-content2">
                        <div className="loader"></div>
                        <p>Registrando...</p>
                    </div>
                </div>
            )}
            {modalTexto && (
                <div className="modal-text" onClick={cerrrarModaltext}>
                    <div className="modal-text-content" onClick={(e) => e.stopPropagation()}>
                        <p style={{ whiteSpace: 'pre-wrap', background: 'white', textAlign: 'justify' }}>{txtArchivo} </p>
                        <IoMdClose className='icon_text_cerrar' onClick={cerrrarModaltext} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistroDoc;