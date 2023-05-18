import React from 'react';

import { NodeDrawingStrategy } from '../../draw/strategy/node.draw.strategy';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { add, remove, edit } from '../../redux/strategy/draw/drawStrategySlice';

export default function Sidebar() {
    const dispatch = useDispatch();

    const addAction = () => dispatch(add());

    const removeAction = () => dispatch(remove());

    const editAction = () => dispatch(edit());

    return (
        <SidebarContainer>
            <GraphActionContainer>
                <GraphActionButtonContainer id="add-button" onClick={addAction}>
                    <p>Add</p>
                </GraphActionButtonContainer>
            </GraphActionContainer>
            <GraphActionContainer>
                <GraphActionButtonContainer id="remove-button" onClick={removeAction}>
                    <p>Remove</p>
                </GraphActionButtonContainer>
            </GraphActionContainer>
            <GraphActionContainer>
                <GraphActionButtonContainer id="edit-button" onClick={editAction}>
                    <p>Edit</p>
                </GraphActionButtonContainer>
            </GraphActionContainer>
            <div id="like_button_container"></div>
        </SidebarContainer>
    )
}

const SidebarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: flex-start;
    background-color: rgb(232, 199, 156);
    /* background-color: #e2b881; */
    left: 0;
    top: 50px;
    bottom: 0;
    width: 70px;
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

const GraphActionButtonContainer = styled.button`
    height: 90%;
    width: 80%;
    border-radius: 2px;
    border: solid;
    border-width: 1px;
    background-color: rgb(255, 219, 175);
    font-family: Roboto, Arial;
    font-size: 10px;
    transition: background-color 0.15s, 
                font-size 0.15s,
                box-shadow 0.15s;
`