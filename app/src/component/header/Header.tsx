import React from 'react';
import { styled } from 'styled-components';

export const DEFAULT_HEADER_HEIGHT = '50px';

export default function Header() {
    return (
        <HeaderContainer headerHeight={DEFAULT_HEADER_HEIGHT}>
            <LeftSectionContainer>
                <AppTitleContainer>
                    <p>Graph Solver Application</p>
                </AppTitleContainer>
            </LeftSectionContainer>
        </HeaderContainer>
    )
}

type HeaderContainerProps = {
    headerHeight: string;
}

const HeaderContainer = styled.header<HeaderContainerProps>`
    display: flex;
    flex-direction: row;
    position: fixed;
    background-color: rgb(189, 145, 88);
    height: ${props => props.headerHeight || DEFAULT_HEADER_HEIGHT};
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
