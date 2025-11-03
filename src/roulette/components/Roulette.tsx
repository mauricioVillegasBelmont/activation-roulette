import React, { useRef, useEffect, useState } from 'react';
// import type{ RouletteOption } from 'roulette/types';
import { useRoulette, type RouletteOption } from 'roulette/index';
import "./Roulette.css"

import clamp from 'utils/clamp';

interface RouletteProps {
  // options: RouletteOption[];
  onSpinEnd: (result: RouletteOption) => void;
  size?: number;
  colorOptions?: {[key:string]: string};
}

const Roulette: React.FC<RouletteProps> = ({
  // options,
  onSpinEnd,
  size = 400,
  colorOptions = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  // const [isSpinning, setIsSpinning] = useState(false);

  const {
    options,
    isSpinning,
    result,
    delayTime,
    stopSpin,
  } = useRoulette();

  // Colores por defecto
  const colors = {...{
    prize: '#4CAF50',
    challenge: '#2196F3',
    miss: '#F44336',
    retry: '#FF9800',
    border: '#000000',
  }, ...colorOptions};

  // Dibujar la ruleta
  const drawRoulette = (rotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Hacer el fondo transparente
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (options.length === 0) return;

    const sliceAngle = (2 * Math.PI) / options.length;

    // Dibujar cada segmento
    options.forEach((option, i) => {
      const startAngle = i * sliceAngle + rotation;
      const endAngle = (i + 1) * sliceAngle + rotation;

      // Determinar color según el tipo
      let color = colors.border;
      switch (option.type) {
        case 'prize':
          color = colors.prize;
          break;
        case 'challenge':
          color = colors.challenge;
          break;
        case 'miss':
          color = colors.miss;
          break;
        case 'retry':
          color = colors.retry;
          break;
      }

      // Dibujar segmento
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Dibujar texto
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${clamp((size / 50),10,22)}px Arial`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      // Ajustar texto para que quepa en el segmento
      let text = option.label;
      const maxWidth = radius * 0.8;
      let textWidth = ctx.measureText(text).width;

      while (textWidth > maxWidth && text.length > 0) {
        text = text.substring(0, text.length - 1);
        textWidth = ctx.measureText(text).width;
      }

      if (text.length > 0) {
        ctx.fillText(text, radius - 20, 5);
      }

      ctx.restore();
    });

    // Dibujar círculo central
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  // Función para girar la ruleta
  const drawSpin = (targetIndex: number) => {
    if (!isSpinning || options.length === 0) return;

    // Calcular rotación para que caiga en el segmento objetivo
    const sliceAngle = (2 * Math.PI) / options.length;
    const targetRotation = 2 * Math.PI * 5 + (2 * Math.PI - targetIndex * sliceAngle - sliceAngle / 2);

    // Animación de giro
    let start: number | null = null;
    const duration = delayTime || 1000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const easeOut = 1 - Math.pow(1 - Math.min(progress / duration, 1), 3);

      const currentRotation = easeOut * targetRotation;
      setRotation(currentRotation);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        // Finalizar giro
        onSpinEnd(result as RouletteOption );
        stopSpin()
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setRotation(
        prevCount => prevCount + .0001
      )
    }
    window.addEventListener('resize', handleWindowResize as EventListener);
    setTimeout(()=>{
      setRotation(
        prevCount => prevCount + .0001
      )
    },125)

    return () => {
      window.removeEventListener('resize', handleWindowResize as EventListener);
    }
  },[])
  useEffect(() => {
    drawRoulette(rotation);
  }, [options, rotation]);

  // Inicializar canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = size;
      canvas.height = size;
    }
  }, [size]);

  useEffect(() => {
    if (isSpinning) {
      const targetIndex = options.findIndex((option) => option.id === result?.id);
      drawSpin(targetIndex);
    }
  },[isSpinning])

  return (
    <div className='roulette-wrapper' >
      <canvas
        ref={canvasRef}
        className='roulette'
      />
      {/* Puntero de la ruleta */}
      <div className='roulette-ponter' />
    </div>
  );
};

export default Roulette;