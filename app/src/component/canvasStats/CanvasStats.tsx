import React, { HTMLProps } from "react";
import { styled } from 'styled-components';
import { useAppSelector } from "../../redux/hooks";
import { NodeDrawingStrategy } from "../../draw/strategy/node.draw.strategy";
import { selectStrategy } from "../../redux/reducers/strategy/draw/strategySlice";
import { selectComponentsNumber, selectEdgesNumber, selectVerticesNumber } from "../../redux/reducers/component/componentSlice";

export default function CanvasStats() {
    const modeIdx: NodeDrawingStrategy = useAppSelector(selectStrategy);
    const componentsNumber: number = useAppSelector(selectComponentsNumber);
    const verticesNumber: number = useAppSelector(selectVerticesNumber);
    const edgesNumber: number = useAppSelector(selectEdgesNumber);

    const mode = NodeDrawingStrategy[modeIdx];
    
    return (
        <CanvasStatsPropsContainer>
            <CanvasStatsParagraph>Mode: {mode}</CanvasStatsParagraph>
            <CanvasStatsParagraph>Edges: {edgesNumber}</CanvasStatsParagraph>
            <CanvasStatsParagraph>Vertices: {verticesNumber}</CanvasStatsParagraph>
            <CanvasStatsParagraph>Components: {componentsNumber}</CanvasStatsParagraph>
        </CanvasStatsPropsContainer>
    )
}
const CanvasStatsParagraph = styled.p`
    margin: 1px;
    padding: 1px 2px;
`

const CanvasStatsPropsContainer = styled.div`
    position: absolute;
    color: black;
    font-family: Roboto, Arial;
    font-size: 14px;
    border-style: solid;
    border-width: 1px;
    border-color: white;
    top: 10px;
    left: 15px;
    z-index: 100;
    background-color: rgba(235, 129, 0, 0.15);
    border-radius: 2px;
    padding: 5px 10px;
    width: 110px;

    &:hover {
        background-color: rgba(235, 129, 0, 0.25);
    }
`