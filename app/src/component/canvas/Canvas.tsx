
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import ICanvasDrawer from '../../draw/drawer.interface';
import { NodeDrawingStrategy } from '../../draw/strategy/node.draw.strategy';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, edit, StrategyState } from '../../redux/strategy/draw/drawStrategySlice'

interface CanvasProps {
  drawer: ICanvasDrawer,
}

export default function Canvas({ drawer } : CanvasProps) {
    const canvasRef = useRef(null)
    const strategy = useSelector<StrategyState, NodeDrawingStrategy>(state => state.strategy);
    const dispatch = useDispatch();

    const drawCanvas = () => {
      const canvas : any = canvasRef.current
      const context : CanvasRenderingContext2D = canvas.getContext('2d')

      // Set display size (css pixels).
      const canvasWidth = window.innerWidth - 70;
      const canvasHeight = window.innerHeight - 50;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      // Set actual size in memory (scaled to account for extra pixel density).
      const scale = window.devicePixelRatio;
      canvas.width = Math.floor(canvasWidth * scale);
      canvas.height = Math.floor(canvasHeight * scale);

      // Normalize coordinate system to use CSS pixels.
      context.scale(scale, scale);

      // START DRAWINGS

      drawer.draw(canvas)

      // END DRAWINGS

      context.scale(1 / scale, 1 / scale);
    }

    useLayoutEffect(() => {
      drawCanvas();

      window.addEventListener('resize', drawCanvas);

      return () => {
        window.removeEventListener('resize', drawCanvas);
      }
    }, [])
  
    useEffect(() => {
      console.log('strategy has changed to: ' + NodeDrawingStrategy[strategy]);
      
    }, [strategy]);

    return (
        <canvas ref={canvasRef} id="myCanvas" className="main-canvas">
            Your browser does not support the canvas element.
        </canvas>
    )
}
