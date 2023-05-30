import React from 'react';

import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { setAddStrategy, setRemoveStrategy, setEditStrategy } from '../../redux/reducers/strategy/draw/strategySlice';
import { DEFAULT_HEADER_HEIGHT } from '../header/Header';
import { CustomApplicationButton } from '../common/Button';

export const DEFAULT_SIDEBAR_WIDTH = 70;

export default function Sidebar() {
    const dispatch = useDispatch();

    const addAction = () => dispatch(setAddStrategy());
    const removeAction = () => dispatch(setRemoveStrategy());
    const editAction = () => dispatch(setEditStrategy());

    const sidebarButtonProps = { width: '80%', height: '90%' }
    return (
        <SidebarContainer sidebarWidth={DEFAULT_SIDEBAR_WIDTH} top={DEFAULT_HEADER_HEIGHT}>
            <GraphActionContainer>
                <CustomApplicationButton id="add-button" onClick={addAction} {...sidebarButtonProps}>
                    <p>Add</p>
                </CustomApplicationButton>
            </GraphActionContainer>
            <GraphActionContainer>
                <CustomApplicationButton id="remove-button" onClick={removeAction} {...sidebarButtonProps}>
                    <p>Remove</p>
                </CustomApplicationButton>
            </GraphActionContainer>
            <GraphActionContainer>
                <CustomApplicationButton id="edit-button" onClick={editAction} {...sidebarButtonProps}>
                    <p>Edit</p>
                </CustomApplicationButton>
            </GraphActionContainer>
        </SidebarContainer>
    )
}

type SidebarContainerProps = {
    sidebarWidth: number;
    top: number;
}
  
const SidebarContainer = styled.nav<SidebarContainerProps>`
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: flex-start;
    background-color: rgb(232, 199, 156);
    /* background-color: #e2b881; */
    left: 0;
    top: ${props => `${props.top}px` || '50px'};
    bottom: 0;
    width: ${props => `${props.sidebarWidth}px` || `${DEFAULT_SIDEBAR_WIDTH}px`};
`

const GraphActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    -items: center;
    height: 60px;
    margin: 0;
    margin-top: 10px;
`