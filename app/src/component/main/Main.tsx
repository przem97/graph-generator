import React from 'react';
import Canvas from '../canvas/Canvas';
import GridDrawer from '../../draw/standard/grid.drawer';
import NodeDrawer from '../../draw/standard/node.drawer';
import { IGridDrawer, INodeDrawer } from '../../draw';
import { styled } from 'styled-components';

export default function Main() {
    const drawer: IGridDrawer = new GridDrawer();
    const nodeDrawer: INodeDrawer = new NodeDrawer();

    return (
        <MainContainer>
            <Canvas canvasDrawer={drawer} nodeDrawer={nodeDrawer} />
        </MainContainer>
    )
}

const MainContainer = styled.main`
    background-color: rgb(246, 246, 246);
`