import { IGraphDrawer } from "./interface/graph.drawer.interface";
import Node, { NodeType } from '../../model/node';
import { ComponentType } from '../../model/component';
import { getCanvasCenter } from '../../utils/canvasUtils';

export const RADIUS: number = 30;

export default class GraphDrawer implements IGraphDrawer {
    drawNode(canvas: HTMLCanvasElement,
             node: NodeType) {

        const context : CanvasRenderingContext2D | null = canvas.getContext('2d');

        if (context) {
            const { canvasCenterX, canvasCenterY } = getCanvasCenter(canvas);
            const cssCanvasNode = Node.toCanvasCssPixels(node, canvasCenterX, canvasCenterY);

            context.fillStyle = "#e2b881";
            context.beginPath();
            context.arc(cssCanvasNode.x, cssCanvasNode.y, RADIUS, 0, Math.PI * 2);
            context.stroke();
            context.fill();
        }
    }

    drawNodes(canvas: HTMLCanvasElement, 
                    nodesList: NodeType[]) {
        for (var i = 0; i < nodesList.length; i++) {
            let node: NodeType = nodesList[i];
            this.drawNode(canvas, node);
        }
    }

    drawComponents(canvas: HTMLCanvasElement, componentsList: ComponentType[]) {
        for (let i = 0; i < componentsList.length; i++) {
            const component = componentsList[i];
            for (let j = 0; j < component.edges.length; j++) {
                const edge = component.edges[j];;
                const nodeFrom: NodeType = component.vertices.filter((node) => node.ordinal === edge.startVertex)[0];
                const nodeTo: NodeType = component.vertices.filter((node) => node.ordinal === edge.endVertex)[0];

                if (nodeFrom && nodeTo) {
                    this.drawEdge(canvas, nodeFrom, nodeTo);
                }
            }
        }

        for (let i = 0; i < componentsList.length; i++) {
            const component = componentsList[i];
            this.drawNodes(canvas, component.vertices);
        }
    }

    drawEdge(canvas: HTMLCanvasElement, from: NodeType, to: NodeType): void {
        const context : CanvasRenderingContext2D | null = canvas.getContext('2d');

        if (context) {
            const { canvasCenterX, canvasCenterY } = getCanvasCenter(canvas);
            const cssCanvasFromNode = Node.toCanvasCssPixels(from, canvasCenterX, canvasCenterY);
            const cssCanvasToNode = Node.toCanvasCssPixels(to, canvasCenterX, canvasCenterY);

            context.fillStyle = "#000000";
            context.beginPath();
            context.moveTo(cssCanvasFromNode.x, cssCanvasFromNode.y);
            context.lineTo(cssCanvasToNode.x, cssCanvasToNode.y);
            context.stroke();
        }
    }
}