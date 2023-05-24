import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { IGridDrawer, INodeDrawer } from '../../draw';
import { NodeType } from '../../model/node';
import { NodeDrawingStrategy } from '../../draw/strategy/node.draw.strategy';
import { addNode, removeNode, editNode } from '../../redux/reducers'
import { NodeUtils } from '../../model/util/nodeUtils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initCanvas } from '../../draw/standard/canvas.drawer';

type CanvasProps = {
  canvasDrawer: IGridDrawer,
  nodeDrawer: INodeDrawer
}

export default function Canvas({ canvasDrawer, nodeDrawer } : CanvasProps) {
    const canvasRef = useRef(null);

    const strategy: NodeDrawingStrategy = useAppSelector(state => state.strategyReducer.strategy);
    const nodes: NodeType[] = useAppSelector(state => state.nodesReducer.nodes);

    const dispatch = useAppDispatch();

    const drawNodeEventListener = (strategy: NodeDrawingStrategy) => {
        return (event : PointerEvent) => {
            const canvas : any = canvasRef.current;
            const node: NodeType = NodeUtils.fromClickEvent(event, canvas);

            if (NodeDrawingStrategy.Add == strategy) {
                dispatch(addNode({ x: node.x, y: node.y }));
            }
    
            if (NodeDrawingStrategy.Remove == strategy) {
                dispatch(removeNode({ x: node.x, y: node.y }));
            }
    
            if (NodeDrawingStrategy.Edit == strategy) {
                dispatch(editNode({ x: node.x, y: node.y }));
            }
        }
    }

    useLayoutEffect(() => {
        initCanvas(canvasRef, canvasDrawer);

        const canvas : any = canvasRef.current;
        nodeDrawer.drawCanvasNodes(canvas, nodes);

        const canvasResizeEvent = () => {
            initCanvas(canvasRef, canvasDrawer);
            const canvas : any = canvasRef.current;
            nodeDrawer.drawCanvasNodes(canvas, nodes);
        };
        
        window.addEventListener('resize', canvasResizeEvent);

        return () => {
            window.removeEventListener('resize', canvasResizeEvent);
        }
    }, [nodes]);

    useEffect(() => {
        const drawNodeCallback = drawNodeEventListener(strategy);

        const canvas : any = canvasRef.current
        canvas.addEventListener('click', drawNodeCallback);

        return () => {
            canvas.removeEventListener('click', drawNodeCallback);
        }
    }, [strategy]);

    return (
        <canvas ref={canvasRef} id="myCanvas" className="main-canvas">
            Your browser does not support the canvas element.
        </canvas>
    )
}
