import React, { useState } from 'react';
import axios from 'axios';
import { IoBuildOutline } from "react-icons/io5";

const ImageReconstructor = ({ imageUrl }) => {
    const [reconstructedImage, setReconstructedImage] = useState('');

    const reconstructImage = async () => {
        try {
            const response = await axios.post('/reconstruct-image', {
                image: await fetch(imageUrl).then((res) => res.blob()),
            });

            setReconstructedImage(URL.createObjectURL(response.data));
        } catch (error) {
            console.error('Error al reconstruir la imagen:', error);
        }
    };

    return (
        <div>
            <button onClick={reconstructImage}><IoBuildOutline className='ico' /> Reconstruir Imagen</button>
            {reconstructedImage && (
                <img src={reconstructedImage} alt="Imagen reconstruida" />
            )}
        </div>
    );
};

export default ImageReconstructor;
