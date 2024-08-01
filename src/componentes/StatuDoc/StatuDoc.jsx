import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stado.css';

const EstadoDocumento = () => {
    const [allDocuments, setAllDocuments] = useState([]);
    const [searchDni, setSearchDni] = useState('');
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('https://backenddocument-production.up.railway.app/api/documents');
                setAllDocuments(response.data);
            } catch (error) {
                console.error('Error al obtener los documentos:', error);
            }
        };
        fetchDocuments();
    }, []);

    const handleSearchDni = (event) => {
        setSearchDni(event.target.value);
        setSelectedDocument(null); // Reiniciar el documento seleccionado al buscar
        setErrorMessage(''); // Reiniciar el mensaje de error
    };

    const handleFilterDocuments = () => {
        if (!searchDni) {
            setErrorMessage('Rellene el campo'); // Mensaje si el campo está vacío
            setFilteredDocuments([]); // Limpiar resultados anteriores
            return;
        }

        const results = allDocuments.filter(document =>
            document.dni.includes(searchDni)
        );

        if (results.length > 0) {
            setFilteredDocuments(results);
            setSelectedDocument(results[0]); // Seleccionar el primer documento encontrado
            setErrorMessage(''); // Limpiar mensaje de error
        } else {
            setFilteredDocuments([]); // Limpiar resultados si no se encuentra
            setErrorMessage('Documento no encontrado'); // Mensaje si no se encuentra el documento
        }
    };

    const handleDocumentClick = (document) => {
        setSelectedDocument(document);
    };

    return (
        <div className="estado">
            <div className="sub_estado">
                <div className="buscar">
                    <h2>Consultar Estado de Documento</h2>
                    <div>
                        <input
                            type="text"
                            placeholder='Buscar Documento por DNI'
                            value={searchDni}
                            onChange={handleSearchDni}
                        />
                        <button onClick={handleFilterDocuments}>Buscar</button>
                    </div>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error */}
                <div className='box_msg'>
                    {filteredDocuments.length > 0 ? (
                        filteredDocuments.map((document) => (
                            <div key={document._id} className="box" onClick={() => handleDocumentClick(document)}>
                                <p className='dni'>DNI: {document.dni}</p>
                                <p className='nombre'>Nombre: {document.nombre} {document.apellido}</p>
                                <p className='std'>Estado: {document.leido ? 'Leído' : 'No leído'}</p>
                            </div>
                        ))
                    ) : (<></>)}
                </div>
                {/* Detalles del Documento */}
                {/* {selectedDocument && (
                    <div className="content">
                        <h3>Detalles del Documento</h3>
                        <p>Nombre: {selectedDocument.nombre}</p>
                        <p>Apellido: {selectedDocument.apellido}</p>
                        <p>DNI: {selectedDocument.dni}</p>
                        <p>Receptor: {selectedDocument.receptor}</p>
                        <p>Emisor: {selectedDocument.emisor}</p>
                        <p>Motivo: {selectedDocument.motivoArchivo}</p>
                        <p>Estado: {selectedDocument.leido ? 'Leído' : 'No leído'}</p>
                        {selectedDocument.archivo.filename.endsWith('.png') || selectedDocument.archivo.filename.endsWith('.jpg') || selectedDocument.archivo.filename.endsWith('.jpeg') ? (
                            <img src={`http://localhost:5000/${selectedDocument.archivo.path}`} alt="Archivo adjunto" />
                        ) : (
                            <a href={`http://localhost:5000/${selectedDocument.archivo.path}`} target="_blank" rel="noopener noreferrer">
                                Ver archivo adjunto
                            </a>
                        )}
                        <p style={{ whiteSpace: 'pre-wrap' }}>Texto del Archivo: {selectedDocument.txtArchivo}</p>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default EstadoDocumento;