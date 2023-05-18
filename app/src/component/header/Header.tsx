import React from 'react';
import { styled } from 'styled-components';

export default function Header() {
    return (
        <HeaderContainer>
            <LeftSectionContainer>
                <AppTitleContainer>
                    <p>Graph Solver Application</p>
                </AppTitleContainer>
            </LeftSectionContainer>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    position: fixed;
    background-color: rgb(189, 145, 88);
    height: 50px;
    top: 0;
    left: 0;
    right: 0;
    justify-content: space-between;
`

const LeftSectionContainer = styled.div`
    display: flex;
    align-items: center;
`

const AppTitleContainer = styled.div`
    margin-left: 20px;
    font-family: Roboto, Arial;
    font-size: 1.3rem;
`
