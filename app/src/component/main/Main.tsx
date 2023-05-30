import React from 'react';
import Canvas from '../canvas/Canvas';
import GridDrawer from '../../draw/standard/grid.drawer';
import GraphDrawer from '../../draw/standard/graph.drawer';
import { IGridDrawer, IGraphDrawer } from '../../draw';
import { styled } from 'styled-components';

export default function Main() {
    const drawer: IGridDrawer = new GridDrawer();
    const graphDrawer: IGraphDrawer = new GraphDrawer();

    return (
        <MainContainer>
            <Canvas canvasDrawer={drawer} graphDrawer={graphDrawer} />
        </MainContainer>
    )
}

const MainContainer = styled.main`
    background-color: rgb(246, 246, 246);
`