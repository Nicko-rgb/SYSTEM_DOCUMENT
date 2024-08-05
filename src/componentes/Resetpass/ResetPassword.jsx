import './reset.css';
import { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Validar que se haya ingresado un correo electrónico
        if (!email) {
            setError('Por favor, ingresa tu correo electrónico.');
            return;
        }

        setMessage('Enviando ...');
        try {
            // Enviar la solicitud para restablecer la contraseña
            const response = await axios.post('https://backenddocument-production-128c.up.railway.app/api/reset-password', { email });
            setMessage('Enlace enviado, revise su Email ✓✓');
        } catch (error) {
            // Manejar errores de la solicitud
            console.error('Error al enviar el enlace:', error); // Agregar registro de error para depuración
            if (error.response) {
                if (error.response.status === 404) {
                    setError('No se encontró un usuario con ese correo electrónico.');
                    setMessage('')
                } else {
                    setError('Error al enviar el enlace. Inténtalo de nuevo.');
                    setMessage('')
                }
            } else {
                setError('Error de red. Por favor, verifica tu conexión.');
            }
        }
    };

    return (
        <div className='reset-password'>
            <h2>Recuperar Clave</h2>
            <form onSubmit={handleSubmit}>
                <label>Correo Electrónico</label>
                <input 
                    type="email" 
                    placeholder='Correo Electrónico' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required // Asegúrate de que el campo sea obligatorio
                />
                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}
                <button type='submit'>Enviar enlace de restablecimiento</button>
            </form>
        </div>
    );
};

export default ResetPassword;
