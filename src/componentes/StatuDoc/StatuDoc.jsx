import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EstadoDocumento = () => {
    const [allDocuments, setAllDocuments] = useState([]);
    const [searchDni, setSearchDni] = useState('');
    const [selectedDocument, setSelectedDocument] = useState(null);

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

    const handleSearchDni = (event) => {
        setSearchDni(event.target.value);
        setSelectedDocument(null); // Reiniciar el documento seleccionado al buscar
    };

    const filteredDocuments = allDocuments.filter(document =>
        document.dni.includes(searchDni)
    );

    const handleDocumentClick = (document) => {
        setSelectedDocument(document);
    };

    return (
        <div className="estado-documento">
            <h2>Consultar Estado de Documento</h2>
            <input className='buscar' type="text" placeholder='Buscar Documento por DNI' value={searchDni} onChange={handleSearchDni}
            />
            <div className='box'>
                {searchDni && filteredDocuments.length > 0 ? (
                    filteredDocuments.map((document) => (
                        <div key={document._id} className="mssg" onClick={() => handleDocumentClick(document)}>
                            <h3>DNI: {document.dni}</h3>
                            <p>Nombre: {document.nombre} {document.apellido}</p>
                            <p>Estado: {document.leido ? 'Leído' : 'No leído'}</p>
                        </div>
                    ))
                ) : (
                    searchDni && <p>Documento no encontrado</p>
                )}
            </div>
            {selectedDocument && (
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
                        <img src={`/${selectedDocument.archivo.path}`} alt="Archivo adjunto" />
                    ) : (
                        <a href={`http://localhost:5000/${selectedDocument.archivo.path}`} target="_blank" rel="noopener noreferrer">
                            Ver archivo adjunto
                        </a>
                    )}
                    <p style={{ whiteSpace: 'pre-wrap' }}>Texto del Archivo: {selectedDocument.txtArchivo}</p>
                </div>
            )}
        </div>
    );
};

export default EstadoDocumento;