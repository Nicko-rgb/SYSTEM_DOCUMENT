import './navegador.css'

import React from 'react'
import EstadoSesion from '../Login/Sesion'
import { Link } from 'react-router-dom'
import logoSuiza from '../IMG/logoSuiza.png'
import { IoLogOutOutline } from "react-icons/io5";

export const Navegador = () => {
    const { userCarrera, handleLogout } = EstadoSesion()

    return (
        <div className="navegador">
            <div className="logo">
                <img src={logoSuiza} alt="" />
            </div>
            <div className='medio'>
                <h2>{userCarrera} </h2>
                <p>Sistema de Envios de Documentos</p>
            </div>
            <Link to='/' className="boton" onClick={handleLogout}><IoLogOutOutline className="icono" />Cerrrar Sesion</Link>
        </div>
    )
}

export default Navegador