import React from 'react';
import Canvas from '../canvas/Canvas';
import GridDrawer from '../../draw/standard/grid.drawer'
import IGridDrawer from '../../draw/drawer.interface';
import { styled } from 'styled-components';

export default function Main() {
    const drawer: IGridDrawer = new GridDrawer();

    return (
        <MainContainer>
            <Canvas drawer={drawer} />
        </MainContainer>
    )
}

const MainContainer = styled.main`
    background-color: rgb(246, 246, 246);
`