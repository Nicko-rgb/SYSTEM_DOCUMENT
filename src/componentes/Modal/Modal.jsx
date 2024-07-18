import './modal.css'
import React, { useState, useEffect } from 'react';

const LoadingModal = ({ isOpen, onClose }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setInterval(() => {
                setProgress((prevProgress) => prevProgress + 1);
            }, 20);

            setTimeout(() => {
                clearInterval(timer);
                onClose();
            }, 2000);
        }

        return () => clearInterval(timer);
    }, [isOpen, onClose]);

    return (
        <div className={`loading-modal ${isOpen ? 'show' : ''}`}>
            <div className="loading-content">
                <div className="loading-spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
                <div className="loading-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingModal;