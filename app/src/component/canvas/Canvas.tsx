import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { IGridDrawer, IGraphDrawer } from '../../draw';
import Node, { NodeType } from '../../model/node';
import { ComponentType } from '../../model/component';
import { NodeDrawingStrategy } from '../../draw/strategy/node.draw.strategy';
import { addNode, removeNode, connect } from '../../redux/reducers'
import { NodeUtils } from '../../model/util/nodeUtils';
import { ComponentUtils } from '../../model/util/componentUtils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initCanvas } from '../../draw/standard/canvas.drawer';
import { styled } from 'styled-components';

type CanvasProps = {
  canvasDrawer: IGridDrawer,
  graphDrawer: IGraphDrawer
}

export default function Canvas({ canvasDrawer, graphDrawer } : CanvasProps) {
    const canvasRef = useRef(null);

    const strategy: NodeDrawingStrategy = useAppSelector(state => state.strategyReducer.strategy);
    const components: ComponentType[] = useAppSelector(state => state.componentsReducer.components);

    const dispatch = useAppDispatch();

    const canvasClickEventListener = (strategy: NodeDrawingStrategy) => {
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
    
            if (NodeDrawingStrategy.Connect == strategy) {
                const ordinal = ComponentUtils.findOrdinal(node, components);
                if (ordinal != -1) {
                    dispatch(connect(ordinal));
                }
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
        const callback = canvasClickEventListener(strategy);

        const canvas : any = canvasRef.current
        canvas.addEventListener('click', callback);

        return () => {
            canvas.removeEventListener('click', callback);
        }
    }, [strategy]);

    return (
        <CanvasContainer>
            <canvas ref={canvasRef} id="myCanvas" className="main-canvas">
                Your browser does not support the canvas element.
            </canvas>
        </CanvasContainer>
    )
}

const CanvasContainer = styled.div`
    position: static;
`