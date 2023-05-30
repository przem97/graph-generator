import React, { useId, useState } from 'react';
import { styled } from 'styled-components';
import { CustomApplicationButton } from '../common/Button';
import { useAppDispatch } from '../../redux/hooks';
import { saveComponents } from '../../redux/reducers';
import Component, { ComponentType } from '../../model/component';
import Node, { NodeType } from '../../model/node';
import Edge, { EdgeType } from '../../model/edge';
import axios from 'axios';

export const DEFAULT_HEADER_HEIGHT = 50;

export default function Header() {
    const generateButtonProps = { width: '80px', height: '35px' };

    const [ components, setComponents ] = useState(1); 
    const [ vertices, setVertices ] = useState(3); 
    const [ edges, setEdges ] = useState(1); 

    const componentsInputId = useId();
    const verticesInputId = useId();
    const edgesInputId = useId();

    const dispatch = useAppDispatch();

    const generateGraph = () => axios({
            method: 'post',
            url: 'http://localhost:3000/graph/initialize',
            data: {
                "totalVertices": vertices,
                "totalEdges": edges,
                "totalComponents": components,
                "xAxisLowerBound": -15,
                "xAxisUpperBound": 15,
                "yAxisLowerBound": -11,
                "yAxisUpperBound": 11,
                "edgeWeightLowerBound": -5,
                "edgeWeightUpperBound": -1
            }
          }).then((response) => {
            let components = response.data.graph.components;
            let newComponents: ComponentType[] = [];
            for (let i = 0; i < components.length; i++) {
                let component = components[i];
                const edges: EdgeType[] = [];

                for (let j = 0; j < component.edges.length; j++) {
                    let edge = component.edges[j];
                    edges.push(Edge.create(edge.startVertex, edge.endVertex, edge.weight));
                }

                const nodes: NodeType[] = [];
                for (let j = 0; j < component.vertices.length; j++) {
                    let node = component.vertices[j];
                    nodes.push(Node.create(node.x, node.y, node.ordinal));
                }

                newComponents.push(Component.create(nodes, edges));
            }

            dispatch(saveComponents({components: newComponents}));
          }).catch((error) => {
            console.log('An error occurred during graph generation', error);
          });

    return (
        <HeaderContainer headerheight={DEFAULT_HEADER_HEIGHT}>
            <LeftSectionContainer>
                <AppTitleContainer>
                    <p>Graph Solver Application</p>
                </AppTitleContainer>
            </LeftSectionContainer>
            <MiddleSectionContainer>
                <form>
                    <LabelContainer htmlFor={componentsInputId}>Components:</LabelContainer>
                    <InputContainer id={componentsInputId} type="number" value={components} min="0" 
                        onChange={(e) => setComponents(parseInt(e.target.value, 10))}></InputContainer>
                    <LabelContainer htmlFor={verticesInputId}>Vertices:</LabelContainer>
                    <InputContainer id={verticesInputId} type="number" value={vertices} min="0"
                        onChange={(e) => setVertices(parseInt(e.target.value, 10))}></InputContainer>
                    <LabelContainer htmlFor={edgesInputId}>Edges:</LabelContainer>
                    <InputContainer id={edgesInputId} type="number" value={edges} min="0"
                        onChange={(e) => setEdges(parseInt(e.target.value, 10))}></InputContainer>
                </form>
                <CustomApplicationButton {...generateButtonProps} onClick={generateGraph}>
                    Generate
                </CustomApplicationButton>
            </MiddleSectionContainer>
        </HeaderContainer>
    )
}

type HeaderContainerProps = {
    headerheight: number;
}

const LabelContainer = styled.label`
    width: 50px;
    margin-right: 10px;
`

const InputContainer = styled.input`
    width: 50px;
    margin-right: 10px;
`

const HeaderContainer = styled.header<HeaderContainerProps>`
    display: flex;
    flex-direction: row;
    position: fixed;
    background-color: rgb(189, 145, 88);
    height: ${props => `${props.headerheight}px` || `${DEFAULT_HEADER_HEIGHT}px`};
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
    column-gap: 10px;
`

const AppTitleContainer = styled.div`
    margin-left: 20px;
    font-size: 1.3rem;
`
