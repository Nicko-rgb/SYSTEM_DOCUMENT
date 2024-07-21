import { useState, useEffect } from "react";

const EstadoSesion = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userCarrera, setUserCarrera] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setUserCarrera(localStorage.getItem('userCarrera'));
        }
    }, []);

    const handleLogin = (carrera, receivedDocuments, sentDocuments) => {
        setIsLoggedIn(true);
        setUserCarrera(carrera);
        localStorage.setItem('userCarrera', carrera);
        localStorage.setItem('receivedDocuments', JSON.stringify(receivedDocuments));
        localStorage.setItem('sentDocuments', JSON.stringify(sentDocuments));
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserCarrera('');
        localStorage.removeItem('userCarrera');
        localStorage.removeItem('receivedDocuments');
        localStorage.removeItem('sentDocuments');
    };

    return { userCarrera, isLoggedIn, handleLogin, handleLogout };
};

export default EstadoSesion;