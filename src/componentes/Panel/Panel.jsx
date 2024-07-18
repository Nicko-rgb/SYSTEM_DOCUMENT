import React, { useState, useEffect } from 'react';
import './panel.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EstadoSesion from '../Login/Sesion';

export const Panel = () => {
    const { userCarrera } = EstadoSesion();
    const [allDocuments, setAllDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [searchDni, setSearchDni] = useState('');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('/api/documents');
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
            // Actualizar el documento en la base de datos
            await axios.patch(`/api/documents/${document._id}`, { leido: true });

            // Actualizar el estado local
            setSelectedDocument(document);
        } catch (error) {
            console.error('Error al marcar el documento como leído:', error);
        }
    };

    const handleSearchDni = (event) => {
        setSearchDni(event.target.value);
    };

    return (
        <div className="panel">
            <nav className="navegador">
                <h2>Bienvenido al Sistema de Envios de Documentos</h2>
                <p>Panel de {userCarrera} </p>
            </nav>
            <main className="main">
                <div className="recibidos mensajes">
                    <div className="cabeza">
                        <h2>Mensajes Nuevos</h2>
                        <input className='buscar' type="text" placeholder='Buscar Documento por DNI' value={searchDni} onChange={handleSearchDni} />
                    </div>
                    <div className='box'>
                        {receivedDocuments.slice().reverse().map((document) => (
                            <div key={document._id} className={`mssg ${!document.leido ? 'nuevo' : ''}`} onClick={() => handleDocumentClick(document)}>
                                <div className={`punto ${document.leido ? 'leido' : ''}`}></div>
                                <h3>Recibido de: {document.emisor}</h3>
                                <p><span>Estd:</span> {document.nombre} {document.apellido} </p>
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
                            </div>
                            <div className="datosAdjunto">
                                {selectedDocument.archivo.filename.endsWith('.png') || selectedDocument.archivo.filename.endsWith('.jpg') || selectedDocument.archivo.filename.endsWith('.jpeg') ? (
                                    <img src={`/${selectedDocument.archivo.path}`} alt="Archivo adjunto" />
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
                    <div className="button">
                        <Link to="/registro">
                            <button>Subir Nuevo</button>
                        </Link>
                    </div>
                </div>
                <div className="enviados mensajes">
                    <div className="cabeza">
                        <h2>Mensajes Enviados</h2>
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
            </main>
        </div>
    );
};

export default Panel;