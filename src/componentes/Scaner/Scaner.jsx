import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

export const Scaner = () => {
    const webcamRef = useRef(null);
    const [scannedDocument, setScannedDocument] = useState(null);
    const [extractedText, setExtractedText] = useState('');

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setScannedDocument(imageSrc);
    };

    const processImage = () => {
        // Implementa la lógica de detección y recorte del documento aquí
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = scannedDocument;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            // Implementa la lógica de detección y recorte del documento aquí
            const croppedDocument = canvas.toDataURL();
            setScannedDocument(croppedDocument);

            Tesseract.recognize(croppedDocument, 'eng')
                .then((result) => {
                    const extractedText = result.data.text;
                    setExtractedText(extractedText);
                    console.log('Extracted text:', extractedText);
                })
                .catch((error) => {
                    console.error('Error extracting text:', error);
                });
        };
    };

    return (
        <div className="scaner">
            <h2>Escaner Documento</h2>
            <Webcam ref={webcamRef} />
            <button onClick={capture}>Capturar imagen</button>
            {scannedDocument && (
                <div>
                    <h3>Documento escaneado:</h3>
                    <img src={scannedDocument} alt="Documento escaneado" />
                    <button onClick={processImage}>Extraer texto</button>
                    {extractedText && (
                        <div>
                            <h3>Texto extraído:</h3>
                            <pre>{extractedText}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Scaner;