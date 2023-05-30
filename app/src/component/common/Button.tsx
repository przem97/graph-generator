import { FC, HTMLProps } from 'react';

import { styled } from 'styled-components';

type GraphActionButtonContainerProps = {
    height: string;
    width: string;
};

type CustomApplicationButtonType = HTMLProps<HTMLButtonElement> & GraphActionButtonContainerProps;

export const CustomApplicationButton: FC<CustomApplicationButtonType> = (props) => {
    const { children, height, width} = props;
    const buttonProperties = { width, height };
    return (
        <GraphActionButtonContainer {...buttonProperties}>
            { children }
        </GraphActionButtonContainer>
    );
}

const GraphActionButtonContainer = styled.button<GraphActionButtonContainerProps>`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    border-radius: 2px;
    border: solid;
    border-width: 1px;
    background-color: rgb(255, 219, 175);
    font-family: Roboto, Arial;
    font-size: 10px;
    transition: background-color 0.15s, 
                font-size 0.15s,
                box-shadow 0.15s;
    &:hover {
        background-color: rgb(255, 209, 165);
        font-size: 12px;
        box-shadow: 1px 1px 2px 0px black;
    }
`