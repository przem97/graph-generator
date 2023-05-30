import React from 'react';
import { styled } from 'styled-components';
import { CustomApplicationButton } from '../common/Button';

export const DEFAULT_HEADER_HEIGHT = 50;

export default function Header() {
    const generateButtonProps = { width: '100px', height: '40px' };

    return (
        <HeaderContainer headerHeight={DEFAULT_HEADER_HEIGHT}>
            <LeftSectionContainer>
                <AppTitleContainer>
                    <p>Graph Solver Application</p>
                </AppTitleContainer>
            </LeftSectionContainer>
            <MiddleSectionContainer>
                <CustomApplicationButton {...generateButtonProps}>
                    <p>Generate</p>
                </CustomApplicationButton>
            </MiddleSectionContainer>
        </HeaderContainer>
    )
}

type HeaderContainerProps = {
    headerHeight: number;
}

const HeaderContainer = styled.header<HeaderContainerProps>`
    display: flex;
    flex-direction: row;
    position: fixed;
    background-color: rgb(189, 145, 88);
    height: ${props => `${props.headerHeight}px` || `${DEFAULT_HEADER_HEIGHT}px`};
    top: 0;
    left: 0;
    right: 0;
    justify-content: flex-start;
    column-gap: 50px;
`

const LeftSectionContainer = styled.div`
    display: flex;
    align-items: center;
`

const MiddleSectionContainer = styled.div`
    display: flex;
    align-items: center;
`

const AppTitleContainer = styled.div`
    margin-left: 20px;
    font-family: Roboto, Arial;
    font-size: 1.3rem;
`
