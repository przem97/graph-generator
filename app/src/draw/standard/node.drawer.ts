import { INodeDrawer } from "./node.drawer.interface";
import Node from '../../model/node';
import { getCanvasCenter } from '../../utils/canvasUtils';

const RADIUS: number = 25;

export default class NodeDrawer implements INodeDrawer {
    drawNode(canvas: HTMLCanvasElement,
             node: Node) {

        const context : CanvasRenderingContext2D | null = canvas.getContext('2d');

        if (context) {
            const { canvasCenterX, canvasCenterY } = getCanvasCenter(canvas);
            const cssCanvasNode = node.toCanvasCssPixels(canvasCenterX, canvasCenterY);

            context.fillStyle = "#e2b881";
            context.beginPath();
            context.arc(cssCanvasNode.x, cssCanvasNode.y, RADIUS, 0, Math.PI * 2);
            context.stroke();
            context.fill();
        }
    }

    drawCanvasNodes(canvas: HTMLCanvasElement, 
                    nodesList: Node[]) {
        for (var i = 0; i < nodesList.length; i++) {
            let node: Node = nodesList[i];
            this.drawNode(canvas, node);
        }
    }
}