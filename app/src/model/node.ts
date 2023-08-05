import { ComponentType } from "./component";
import { getCanvasCenter } from '../utils/canvasUtils';
import { DEFAULT_HEADER_HEIGHT } from '../component/header/Header';
import { DEFAULT_SIDEBAR_WIDTH } from '../component/sidebar/Sidebar';
import { LEADING } from '../draw/standard/grid.drawer';
import { RADIUS } from '../draw/standard/graph.drawer';
import _ from 'lodash';

export type NodeType = {
    ordinal: number;
    x: number,
    y: number
}

export default class Node {
    static create(x: number, y: number, ordinal: number): NodeType {
        return {
            x: x,
            y: y,
            ordinal: ordinal
        }
    }

    static fromClickEvent(targetEventNode: NodeType, components: ComponentType[]): NodeType | null {
        let vertexToRemove: NodeType | null = null;

        for (let i = 0; i < components.length; i++) {
            const component = components[i];
            for (let j = 0; j < component.vertices.length; j++) {
                const currentVertex = component.vertices[j];

                if (Node.intersect(currentVertex, targetEventNode)) {
                    vertexToRemove = currentVertex;
                    break;
                }
            }
        }

        return vertexToRemove;
    }
    static fromCanvasClickEvent(event: PointerEvent, canvas: HTMLCanvasElement): NodeType {
        const { canvasCenterX, canvasCenterY } = getCanvasCenter(canvas);

        const x = (event.clientX - (canvasCenterX + DEFAULT_SIDEBAR_WIDTH)) / (2 * LEADING);
        const y = -(event.clientY - (canvasCenterY + DEFAULT_HEADER_HEIGHT)) / (2 * LEADING);

        return Node.create(x, y, -1);
    }

    static toCanvasCssPixels(node: NodeType, canvasCenterX: number, canvasCenterY: number): NodeType {
        const scale = window.devicePixelRatio;
        
        let newX = scale * (canvasCenterX + 2 * LEADING * node.x);
        let newY = scale * (canvasCenterY - 2 * LEADING * node.y);
        return Node.create(newX, newY, -1);
    }

    static intersect(current: NodeType, target: NodeType): boolean {
        const toRealRadius = (radius: number, leading: number) => radius / (window.devicePixelRatio * 2 * leading);
        
        const radius = toRealRadius(RADIUS, LEADING);
        return Math.pow((current.x - target.x), 2) + Math.pow((current.y - target.y), 2) <= Math.pow(radius, 2);
    };

    static getNextNodeOrdinal(components: ComponentType[]): number {
        let maxOrdinal = 0;

        for (let component of components) {
            let foundNode: NodeType | undefined = _.maxBy(component.vertices, (node: NodeType) => node.ordinal);
            if (foundNode && foundNode.ordinal > maxOrdinal) {
                maxOrdinal = foundNode.ordinal;
            }
        }

        return maxOrdinal + 1;
    }
}