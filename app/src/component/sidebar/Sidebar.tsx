import React from 'react';

import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { setAddStrategy, setRemoveStrategy, setEditStrategy, setConnectStrategy } from '../../redux/reducers';
import { DEFAULT_HEADER_HEIGHT } from '../header/Header';
import { CustomApplicationButton } from '../common/Button';

export const DEFAULT_SIDEBAR_WIDTH = 70;

export default function Sidebar() {
    const dispatch = useDispatch();

    const addAction = () => dispatch(setAddStrategy())
    const removeAction = () => dispatch(setRemoveStrategy());
    const editAction = () => dispatch(setEditStrategy());
    const connectAction = () => dispatch(setConnectStrategy());

    const sidebarButtonProps = { width: '80%', height: '90%' }
    return (
        <SidebarContainer sidebarwidth={DEFAULT_SIDEBAR_WIDTH} top={DEFAULT_HEADER_HEIGHT}>
            <GraphActionContainer>
                <CustomApplicationButton id="add-button" onClick={addAction} {...sidebarButtonProps}>
                    Add
                </CustomApplicationButton>
            </GraphActionContainer>
            <GraphActionContainer>
                <CustomApplicationButton id="remove-button" onClick={removeAction} {...sidebarButtonProps}>
                    Remove
                </CustomApplicationButton>
            </GraphActionContainer>
            <GraphActionContainer>
                <CustomApplicationButton id="edit-button" onClick={editAction} {...sidebarButtonProps}>
                    Edit
                </CustomApplicationButton>
            </GraphActionContainer>
            <GraphActionContainer>
                <CustomApplicationButton id="connect-button" onClick={connectAction} {...sidebarButtonProps}>
                    Connect
                </CustomApplicationButton>
            </GraphActionContainer>
        </SidebarContainer>
    )
}

type SidebarContainerProps = {
    sidebarwidth: number;
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
    width: ${props => `${props.sidebarwidth}px` || `${DEFAULT_SIDEBAR_WIDTH}px`};
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