import { getCanvasCenter } from '../../utils/canvasUtils';
import { DEFAULT_HEADER_HEIGHT } from '../../component/header/Header';
import { DEFAULT_SIDEBAR_WIDTH } from '../../component/sidebar/Sidebar';
import { LEADING } from '../../draw/standard/grid.drawer';
import { RADIUS } from '../../draw/standard/graph.drawer';
import Node, { NodeType } from '../node';

export class NodeUtils {
    static fromClickEvent(event: PointerEvent, canvas: HTMLCanvasElement): NodeType {
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
}