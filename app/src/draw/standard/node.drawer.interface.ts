import Node from '../../model/node';

export interface INodeDrawer {
    drawNode(canvas: HTMLCanvasElement,
             node: Node): void;
}