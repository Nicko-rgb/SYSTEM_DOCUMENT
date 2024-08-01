import React, { useState, useEffect } from 'react';
import './panel.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsFillSendPlusFill } from "react-icons/bs";
import EstadoSesion from '../Login/Sesion';
import Navegador from '../Navegador/Navegador';
import ImageModal from './ModalImg';

export const Panel = () => {
    const { userCarrera } = EstadoSesion();
    const [allDocuments, setAllDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [searchDni, setSearchDni] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/documents'); // Asegúrate de que esta URL sea correcta
                console.log('Documentos obtenidos:', response.data); // Verifica los datos
                setAllDocuments(response.data);
            } catch (error) {
                console.error('Error al obtener los documentos:', error);
            }
        };
        fetchDocuments();
    }, []);

    const receivedDocuments = allDocuments.filter(doc => doc.receptor === userCarrera && doc.dni.includes(searchDni));
    const sentDocuments = allDocuments.filter(doc => doc.emisor === userCarrera);

    const handleDocumentClick = async (document) => {
        try {
            // Actualizar el documento en el estado local
            setAllDocuments(prevDocuments =>
                prevDocuments.map(doc =>
                    doc._id === document._id ? { ...doc, leido: true } : doc
                )
            );

            // Enviar la actualización al servidor
            await axios.patch(`http://localhost:5000/api/documents/${document._id}`, { leido: true });

            // Establecer el documento seleccionado
            setSelectedDocument(document);
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
                <div className="recibidos mensajes">
                    <div className="cabeza">
                        <h2>Documentos Nuevos</h2>
                        <input className='buscar' type="text" placeholder='Buscar Documento por DNI' value={searchDni} onChange={handleSearchDni} />
                    </div>
                    <div className='box'>
                        {receivedDocuments.slice().reverse().map((document) => (
                            <div key={document._id} className={`mssg ${!document.leido ? 'nuevo' : ''}`} onClick={() => handleDocumentClick(document)}>
                                <div className={`punto ${document.leido ? 'leido' : ''}`}></div>
                                <h3>De: {document.emisor}</h3>
                                <p><span>Estd:</span> {document.nombre} {document.apellido} </p>
                                {/* Mostrar la fecha de creación */}
                                <p>{new Date(document.createdAt.$date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content">
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
                                {/* Mostrar la fecha de creación en los detalles */}
                                <p><span>Fecha de </span> {new Date(selectedDocument.createdAt.$date).toLocaleString()}</p>
                            </div>
                            <div className="datosAdjunto">
                                {selectedDocument.archivo.filename.endsWith('.png') || selectedDocument.archivo.filename.endsWith('.jpg') || selectedDocument.archivo.filename.endsWith('.jpeg') ? (
                                    <img
                                        src={`http://localhost:5000/${selectedDocument.archivo.path}`}
                                        alt="Archivo adjunto"
                                        onClick={() => openModal(`http://localhost:5000/${selectedDocument.archivo.path}`)}
                                        style={{ cursor: 'pointer' }} // Cambia el cursor al pasar sobre la imagen
                                    />
                                ) : (
                                    <a href={`http://localhost:5000/${selectedDocument.archivo.path}`} target="_blank" rel="noopener noreferrer">
                                        Ver archivo adjunto
                                    </a>
                                )}
                                {selectedDocument.txtArchivo && (
                                    <div className="boxTxt">
                                        <h3>TEXTO DEL ARCHIVO</h3>
                                        <div>
                                            <p>{selectedDocument.txtArchivo} </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="enviados mensajes">
                    <div className="cabeza">
                        <h2>Documentos Enviados</h2>
                    </div>
                    <div className="box">
                        {[...sentDocuments].reverse().map((document) => (
                            <div key={document._id} className="mssg">
                                <h3>Enviado a: {document.receptor}</h3>
                                <p>Motivo: {document.motivoArchivo}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Link to="/registro" className='button'><BsFillSendPlusFill className='ico_panel'/> Enviar Documento </Link>
            </main>
            {isModalOpen && (
                <ImageModal
                    isOpen={isModalOpen}
                    imageSrc={selectedImage}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Panel;