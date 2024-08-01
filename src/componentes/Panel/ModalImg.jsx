import './modal.css'

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <img src={imageSrc} alt="Imagen ampliada" />
            </div>
        </div>
    );
};
export default ImageModal
