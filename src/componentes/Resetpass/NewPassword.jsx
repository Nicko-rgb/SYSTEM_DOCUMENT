import { useState } from 'react';
import './reset.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewPassword = () => {
    const { token } = useParams(); // Obtener el token de la URL
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [redirige, setRedirige] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!newPassword) {
            setError('Debes ingresar una contraseña');
            return;
        }
        if (newPassword.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
        try {
            const response = await axios.post('https://backenddocument-production-128c.up.railway.app/api/new-password', { token, newPassword });
            setSuccess('Contraseña restablecida con éxito.');
            setRedirige(true);
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setError(error.response ? error.response.data.message : 'Error al restablecer la contraseña. Inténtalo de nuevo.');
        }
    };

    return (
        <div className='reset-password'>
            <h2>Restablecer Clave</h2>
            <form onSubmit={handleSubmit}>
                <label>Nueva Clave</label>
                <input type="password" placeholder='Nueva Contraseña' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type='submit'>Restablecer Clave</button>
            </form>
            {redirige && <a href='/'>Click Para Volver</a>}
        </div>
    );
};

export default NewPassword;