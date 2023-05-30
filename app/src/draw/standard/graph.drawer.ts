import { IGraphDrawer } from "./interface/graph.drawer.interface";
import Node, { NodeType } from '../../model/node';
import { getCanvasCenter } from '../../utils/canvasUtils';
import { NodeUtils } from "../../model/util/nodeUtils";

export const RADIUS: number = 30;

export default class GraphDrawer implements IGraphDrawer {
    drawNode(canvas: HTMLCanvasElement,
             node: NodeType) {

        const context : CanvasRenderingContext2D | null = canvas.getContext('2d');

        if (context) {
            const { canvasCenterX, canvasCenterY } = getCanvasCenter(canvas);
            const cssCanvasNode = NodeUtils.toCanvasCssPixels(node, canvasCenterX, canvasCenterY);

            context.fillStyle = "#e2b881";
            context.beginPath();
            context.arc(cssCanvasNode.x, cssCanvasNode.y, RADIUS, 0, Math.PI * 2);
            context.stroke();
            context.fill();
        }
    }

    drawCanvasNodes(canvas: HTMLCanvasElement, 
                    nodesList: NodeType[]) {
        for (var i = 0; i < nodesList.length; i++) {
            let node: NodeType = nodesList[i];
            this.drawNode(canvas, node);
        }
    }
}