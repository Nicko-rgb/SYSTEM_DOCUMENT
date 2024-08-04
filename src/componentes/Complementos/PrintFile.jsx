// PrintFile.jsx
import React from 'react';
import { FaPrint } from "react-icons/fa6";

const PrintFile = ({ imageUrl }) => {
  const handlePrintImage = () => {
    const printWindow = window.open('', '_blank');

    if (printWindow) {
      // Escribir el contenido del documento
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir Imagen</title>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: white;
              }
              img {
                max-width: 100%;
                max-height: 100%;
              }
            </style>
          </head>
          <body>
            <img src="${imageUrl}" alt="Archivo adjunto" />
          </body>
        </html>
      `);

      // Cerrar el documento para que se renderice
      printWindow.document.close();

      // Esperar a que el contenido se cargue y luego imprimir
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close(); // Cerrar la ventana después de imprimir
      };
    } else {
      alert('No se pudo abrir la ventana de impresión. Asegúrate de que las ventanas emergentes no estén bloqueadas.');
    }
  };

  return (
    <button onClick={handlePrintImage}><FaPrint className='ico' /> Imprimir Archivo</button>
  );
};

export default PrintFile;
