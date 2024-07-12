import './login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí puedes agregar la lógica para validar el usuario y la contraseña
        // Por ejemplo, puedes comparar con datos almacenados en una base de datos o en variables
        if (user === 'ruber' && password === '123') {
            navigate('/panel')
        } else {
            setUser('')
            setPassword('')
            alert('Usuario o contraseña incorrectos')
        }
    }

    return (
        <div className="login">
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>Administrador</label>
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <label>Clave</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">INGRESAR</button>
                </form>
            </div>
        </div>
    )
}

export default Login