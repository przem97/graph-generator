import { NodeType } from '../../../model/node';
import { ComponentType } from '../../../model/component';

export interface IGraphDrawer {
    drawNode(canvas: HTMLCanvasElement, node: NodeType): void;

    drawNodes(canvas: HTMLCanvasElement, nodesList: NodeType[]): void;

    drawComponents(canvas: HTMLCanvasElement, componentsList: ComponentType[]): void;
}