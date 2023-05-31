import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { IGridDrawer, IGraphDrawer } from '../../draw';
import Node, { NodeType } from '../../model/node';
import { ComponentType } from '../../model/component';
import { NodeDrawingStrategy } from '../../draw/strategy/node.draw.strategy';
import { addNode, removeNode } from '../../redux/reducers'
import { NodeUtils } from '../../model/util/nodeUtils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initCanvas } from '../../draw/standard/canvas.drawer';

type CanvasProps = {
  canvasDrawer: IGridDrawer,
  graphDrawer: IGraphDrawer
}

export default function Canvas({ canvasDrawer, graphDrawer } : CanvasProps) {
    const canvasRef = useRef(null);

    const strategy: NodeDrawingStrategy = useAppSelector(state => state.strategyReducer.strategy);
    const components: ComponentType[] = useAppSelector(state => state.componentsReducer.components);

    const dispatch = useAppDispatch();

    const drawNodeEventListener = (strategy: NodeDrawingStrategy) => {
        return (event : PointerEvent) => {
            const canvas : any = canvasRef.current;
            const node: NodeType = NodeUtils.fromClickEvent(event, canvas);

            if (NodeDrawingStrategy.Add == strategy) {
                dispatch(addNode(Node.create(node.x, node.y)));
            }
    
            if (NodeDrawingStrategy.Remove == strategy) {
                dispatch(removeNode(Node.create(node.x, node.y)));
            }
    
            if (NodeDrawingStrategy.Edit == strategy) {
                // TODO
            }
        }
    }

    useLayoutEffect(() => {
        initCanvas(canvasRef, canvasDrawer);

        const canvas : any = canvasRef.current;
        graphDrawer.drawComponents(canvas, components);

        const canvasResizeEvent = () => {
            initCanvas(canvasRef, canvasDrawer);
            const canvas : any = canvasRef.current;
            graphDrawer.drawComponents(canvas, components);
        };
        
        window.addEventListener('resize', canvasResizeEvent);

        return () => {
            window.removeEventListener('resize', canvasResizeEvent);
        }
    }, [components]);

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
