import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { IGridDrawer, IGraphDrawer } from '../../draw';
import { NodeType } from '../../model/node';
import { ComponentType } from '../../model/component';
import { NodeDrawingStrategy } from '../../draw/strategy/node.draw.strategy';
import { NodeUtils } from '../../model/util/nodeUtils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initCanvas } from '../../draw/standard/canvas.drawer';
import { styled } from 'styled-components';
import { removeNode } from '../../redux/thunks/vertex/removeNodeThunk';

type CanvasProps = {
  canvasDrawer: IGridDrawer,
  graphDrawer: IGraphDrawer
}

export default function Canvas({ canvasDrawer, graphDrawer } : CanvasProps) {
    const canvasRef = useRef(null);

    const strategy: NodeDrawingStrategy = useAppSelector(state => state.strategyReducer.strategy);
    const components: ComponentType[] = useAppSelector(state => state.componentsReducer.components);

    const dispatch = useAppDispatch();

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
        const canvasClickEventListener = (strategy: NodeDrawingStrategy, components: ComponentType[]) => {
            return (event : PointerEvent) => {
                const canvas : any = canvasRef.current;
                const targetEventNode: NodeType = NodeUtils.fromClickEvent(event, canvas);
    
                if (NodeDrawingStrategy.Remove == strategy) {
                    dispatch(removeNode({ targetEventNode, components }));
                }
            }
        };

        const callback = canvasClickEventListener(strategy, components);

        const canvas : any = canvasRef.current
        canvas.addEventListener('click', callback);

        return () => {
            canvas.removeEventListener('click', callback);
        }
    }, [strategy, components]);

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