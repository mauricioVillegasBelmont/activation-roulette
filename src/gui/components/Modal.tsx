import React, { useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

import './Modal.css';
import Button from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  title?: string;
  text?: string;
  type: 'prize' | 'challenge' | 'miss' | 'retry';
  size?: 'small' | 'medium' | 'large';
  // children?: React.ReactNode;
}
const confettiType = {
  'prize': {
    force: 0.9,
    particleCount: 1000,
    width: 5000,
    colors:[
      '#FFC700',
      '#FF0000',
      '#2E3191',
      '#41BBC7'
    ],
  },
  'challenge': {
    force: 0.8,
    particleCount: 750,
    width: 2500,
    colors:[
      '#FFC700',
      '#FF0000',
      '#2E3191',
      '#41BBC7'
    ],
  },
  'miss': {
    force: 0.5,
    particleCount: 100,
    width: 800,
    colors:[
      '#FFC700',
      '#FF0000',
      '#2E3191',
      '#41BBC7'
    ],
  },
  'retry': {
    force: 0.7,
    particleCount: 500,
    width: 2000,
    colors:[
      '#FFC700',
      '#FF0000',
      '#2E3191',
      '#41BBC7'
    ],
  },
}
const entranceType = {
  'prize': 'animate__tada',
  'challenge': 'animate__backInDown',
  'miss': 'animate__fadeIn',
  'retry': 'animate__backInDown',
}
const Modal: React.FC<ModalProps> = ({
  // children,
  isOpen,
  onClose,
  title,
  text,
  type,
  size = 'large'
}) => {
  // Manejar el cierre con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const closeHandle =() =>{
    onClose();
  }

  const confetyConfig = confettiType[type];


  // No renderizar si no está abierto
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeHandle}>
      <div className="absolute mx-auto my-auto" >
        <ConfettiExplosion
          force={confetyConfig.force}
          particleCount={confetyConfig.particleCount}
          width={confetyConfig.width}
          colors={confetyConfig.colors}
        />
      </div>
      <div
        className={`modal-content modal-${size} modal-${type} animate__animated  ${entranceType[type]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close" onClick={closeHandle}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {text && <p>{text}</p>}

          <Button onClick={closeHandle} className='mt-5'>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;