import { NodeType } from '../../../model/node';

export interface INodeDrawer {
    drawNode(canvas: HTMLCanvasElement, node: NodeType): void;

    drawCanvasNodes(canvas: HTMLCanvasElement, nodesList: NodeType[]): void;

}