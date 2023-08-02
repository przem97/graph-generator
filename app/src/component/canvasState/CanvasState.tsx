import React, { HTMLProps } from "react";
import { styled } from 'styled-components';
import { useAppSelector } from "../../redux/hooks";
import { NodeDrawingStrategy } from "../../draw/strategy/node.draw.strategy";

export default function CanvasStateStats() {
    const modeIdx: NodeDrawingStrategy = useAppSelector((state) => state.strategyReducer.strategy);
    const mode = NodeDrawingStrategy[modeIdx];
    
    return (
        <CanvasStateStatsPropsContainer>
            <span>Mode: {mode}</span>
        </CanvasStateStatsPropsContainer>
    )
}

const CanvasStateStatsPropsContainer = styled.div`
    position: absolute;
    color: white;
    font-family: Roboto, Arial;
    font-size: 14px;
    border-style: solid;
    border-width: 1px;
    border-color: white;
    top: 10px;
    left: 15px;
    z-index: 100;
    background-color: rgb(235, 129, 0);
    border-radius: 2px;
    padding: 5px 10px;
`