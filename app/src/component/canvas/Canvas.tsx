import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { IGridDrawer, IGraphDrawer } from '../../draw';
import { NodeType } from '../../model/node';
import { ComponentType } from '../../model/component';
import { NodeDrawingStrategy } from '../../draw/strategy/node.draw.strategy';
import Node from '../../model/node';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { initCanvas } from '../../draw/standard/canvas.drawer';
import { styled } from 'styled-components';
import { removeNode } from '../../redux/thunks/vertex/removeNodeThunk';
import { selectComponents } from '../../redux/reducers/component/componentSlice';
import { connectAccumulatorPush, selectConnectAccumulator } from '../../redux/reducers/edge/edgeSlice';
import { selectStrategy } from '../../redux/reducers/strategy/draw/strategySlice';
import { addEdgeThunk } from '../../redux/thunks/edge/addEdgeThunk';

type CanvasProps = {
  canvasDrawer: IGridDrawer,
  graphDrawer: IGraphDrawer
}

export default function Canvas({ canvasDrawer, graphDrawer } : CanvasProps) {
    const canvasRef = useRef(null);

    const strategy: NodeDrawingStrategy = useAppSelector(selectStrategy);
    const components: ComponentType[] = useAppSelector(selectComponents);
    const connectAccumulator: number[] = useAppSelector(selectConnectAccumulator);

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
        const canvasClickEventListener = (strategy: NodeDrawingStrategy,
                                          components: ComponentType[],
                                          connectAccumulator: number[]) => {
            return (event : PointerEvent) => {
                const canvas : any = canvasRef.current;
                const targetEventNode: NodeType = Node.fromCanvasClickEvent(event, canvas);
    
                if (strategy == NodeDrawingStrategy.Remove) {
                    dispatch(removeNode({ targetEventNode, components }));
                } else if (strategy == NodeDrawingStrategy.Connect) {
                    const node = Node.fromClickEvent(targetEventNode, components);
                    if (node) {    
                        if (connectAccumulator.length == 0) {
                            dispatch(connectAccumulatorPush({ nodeOrdinal: node.ordinal }));
                        } else if (connectAccumulator.length > 0) {
                            const updatedAccumulator = [ ...connectAccumulator, node.ordinal ];
                            dispatch(addEdgeThunk({ connectAccumulator: updatedAccumulator, components }));
                        }
                    }
                }
            }
        };

        const callback = canvasClickEventListener(strategy, components, connectAccumulator);

        const canvas : any = canvasRef.current
        canvas.addEventListener('click', callback);

        return () => {
            canvas.removeEventListener('click', callback);
        }
    }, [strategy, components, connectAccumulator]);

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