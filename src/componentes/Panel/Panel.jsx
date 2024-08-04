import React, { useState, useEffect } from 'react';
import './panel.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsFillSendPlusFill } from "react-icons/bs";
import EstadoSesion from '../Login/Sesion';
import Navegador from '../Navegador/Navegador';
import ImageModal from './ModalImg';
import FechaHora from '../Complementos/Fecha'
import PrintFile from '../Complementos/PrintFile';
import { FaBars } from "react-icons/fa";

export const Panel = () => {
    const { userCarrera } = EstadoSesion();
    const [allDocuments, setAllDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [searchDni, setSearchDni] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDoc, setOpenDoc] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    //obtener todos los documentos
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('https://backenddocument-production-128c.up.railway.app/api/documents');
                setAllDocuments(response.data);
            } catch (error) {
                console.error('Error al obtener los documentos:', error);
            }
        };
        fetchDocuments();
    }, []);

    const receivedDocuments = allDocuments.filter(doc => doc.receptor === userCarrera && doc.dni.includes(searchDni));
    const sentDocuments = allDocuments.filter(doc => doc.emisor === userCarrera);

    //actualizar el estado de documento y seleccion de documento
    const handleDocumentClick = async (document) => {
        setOpenDoc(true)
        setMensaje('Cargando Documento...')
        try {
            // Actualizar el documento en el estado local
            setAllDocuments(prevDocuments =>
                prevDocuments.map(doc =>
                    doc._id === document._id ? { ...doc, leido: true } : doc
                )
            );
            // Enviar la actualización al servidor
            await axios.patch(`https://backenddocument-production-128c.up.railway.app/api/documents/${document._id}`, { leido: true });

            // Establecer el documento seleccionado
            setSelectedDocument(document);
            setOpenDoc(false)
            setMensaje('')
        } catch (error) {
            console.error('Error al marcar el documento como leído:', error);
        }
    };

    const handleSearchDni = (event) => {
        setSearchDni(event.target.value);
    };

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    };

    return (
        <div className="panel">
            <Navegador />
            <main className="main">
                <FaBars className='menu-nav'/>
                <FaBars className='menu-recividos'/>
                <div className="recibidos mensajes">
                    <div className="cabeza">
                        <p>Documentos Nuevos</p>
                        <input className='buscar' type="text" placeholder='Buscar Documento por DNI' value={searchDni} onChange={handleSearchDni} />
                    </div>
                    <div className='box'>
                        {receivedDocuments.slice().reverse().map((document) => (
                            <div key={document._id} className={`mssg ${!document.leido ? 'nuevo' : ''}`} onClick={() => handleDocumentClick(document)}>
                                <div className={`punto ${document.leido ? 'leido' : ''}`}></div>
                                <h3>De: {document.emisor}</h3>
                                <p><span>Estd:</span> {document.nombre} {document.apellido} </p>
                                <FechaHora createdAt={document.createdAt} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content">
                    {openDoc ? (
                        <div className="cargando_doc">
                            <div className="loader"></div>
                            <p>{mensaje}</p>
                        </div>
                    ) : (
                        <>
                            {selectedDocument && (
                                <div className='subContent'>
                                    <h3>DETALLES DEL DOCUMENTO</h3>
                                    <div className="datostxt">
                                        <p><span>Nombre:</span> {selectedDocument.nombre}</p>
                                        <p><span>Apellido:</span> {selectedDocument.apellido}</p>
                                        <p><span>DNI:</span> {selectedDocument.dni}</p>
                                        <p><span>Receptor:</span> {selectedDocument.receptor}</p>
                                        <p><span>Emisor:</span> {selectedDocument.emisor}</p>
                                        <p><span>Motivo de Archivo:</span> {selectedDocument.motivoArchivo}</p>
                                        <p className='fecha'> <span>Fecha de Envío:</span> {new Date(selectedDocument.createdAt).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false // Cambiar a true si deseas el formato de 12 horas
                                        })}</p>
                                    </div>
                                    <div className="datosAdjunto">
                                        {selectedDocument.archivo.filename.endsWith('.png') || selectedDocument.archivo.filename.endsWith('.jpg') || selectedDocument.archivo.filename.endsWith('.jpeg') ? (
                                            <div className='sub-adjunto'>
                                                <div className="box-img">
                                                    <img
                                                        src={`https://backenddocument-production-128c.up.railway.app/${selectedDocument.archivo.path}`}
                                                        alt="Archivo adjunto"
                                                        onClick={() => openModal(`https://backenddocument-production-128c.up.railway.app/${selectedDocument.archivo.path}`)}
                                                        style={{ cursor: 'pointer' }} // Cambia el cursor al pasar sobre la imagen
                                                    />
                                                    <PrintFile imageUrl={`https://backenddocument-production-128c.up.railway.app/${selectedDocument.archivo.path}`} />
                                                </div>
                                                <div className="boxTxt">
                                                    <h3>Datos Extraidos</h3>
                                                    <div>
                                                        <p style={{whiteSpace: 'pre-wrap'}}>{selectedDocument.txtArchivo}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <a href={`https://backenddocument-production-128c.up.railway.app/${selectedDocument.archivo.path}`} target="_blank" rel="noopener noreferrer">
                                                Ver archivo adjunto
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className="enviados mensajes">
                    <div className="cabeza">
                        <p>Documentos Enviados</p>
                    </div>
                    <div className="box">
                        {[...sentDocuments].reverse().map((document) => (
                            <div key={document._id} className="mssg">
                                <h3>Enviado a: {document.receptor}</h3>
                                <p>Motivo: {document.motivoArchivo}</p>
                                <FechaHora createdAt={document.createdAt} />
                            </div>
                        ))}
                    </div>
                </div>
                <Link to="/registro" className='button'><BsFillSendPlusFill className='ico_panel' /> Enviar Nuevo Documento </Link>
            </main>
            {isModalOpen && (
                <ImageModal isOpen={isModalOpen} imageSrc={selectedImage} onClose={closeModal} />
            )}
        </div>
    );
};

export default Panel;