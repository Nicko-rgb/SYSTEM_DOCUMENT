import React from 'react';

const FechaHora = ({ createdAt }) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    // Comparamos las fechas sin la hora
    const isSameDay = createdDate.toDateString() === currentDate.toDateString();

    return (
        <div className="fecha_hora">
            <p className='fecha'>
                {isSameDay ? (
                    // Si es el mismo día, mostrar solo la hora
                    createdDate.toLocaleString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false // Cambiar a true si deseas el formato de 12 horas
                    })
                ) : (
                    // Si es otro día, mostrar fecha y hora
                    createdDate.toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false // Cambiar a true si deseas el formato de 12 horas
                    })
                )}
            </p>
        </div>
    );
};

export default FechaHora;