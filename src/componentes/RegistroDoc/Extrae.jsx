import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';

const Extrae = () => {
    const [extractedText, setExtractedText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            // Extracción de texto de imágenes
            Tesseract.recognize(file, 'eng')
                .then(({ data: { text } }) => {
                    setExtractedText(text);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else if (file.type === 'application/pdf') {
            // Extracción de texto de PDF
            const handlePdfExtraction = async () => {
                const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
                const pages = await pdfDoc.getPages();
                const text = await Promise.all(
                    pages.map(async (page) => {
                        const content = await page.getTextContent();
                        return content.items.map((item) => item.str).join('');
                    })
                );
                setExtractedText(text.join('\n'));
            };
            handlePdfExtraction();
        } else if (
            file.type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            // Extracción de texto de archivos .docx
            mammoth.extractRawText({ buffer: file })
                .then((result) => {
                    setExtractedText(result.value);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            setExtractedText('Tipo de archivo no compatible.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <p>{extractedText}</p>
            <img src={selectedFile} alt="" />
        </div>
    );
};

export default Extrae;