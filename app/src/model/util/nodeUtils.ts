import { getCanvasCenter } from '../../utils/canvasUtils';
import { DEFAULT_HEADER_HEIGHT } from '../../component/header/Header';
import { DEFAULT_SIDEBAR_WIDTH } from '../../component/sidebar/Sidebar';
import { LEADING } from '../../draw/standard/grid.drawer';
import Node, { NodeType } from '../node';

export class NodeUtils {
    static fromClickEvent(event: PointerEvent, canvas: HTMLCanvasElement): NodeType {
        const { canvasCenterX, canvasCenterY } = getCanvasCenter(canvas);

        const x = (event.clientX - (canvasCenterX + DEFAULT_SIDEBAR_WIDTH)) / (2 * LEADING);
        const y = -(event.clientY - (canvasCenterY + DEFAULT_HEADER_HEIGHT)) / (2 * LEADING);
        console.log(event.clientX, event.clientY);
        return Node.create(x, y);
    }

    static toCanvasCssPixels(node: NodeType, canvasCenterX: number, canvasCenterY: number): NodeType {
        const scale = window.devicePixelRatio;
        
        let newX = scale * (canvasCenterX + 2 * LEADING * node.x);
        let newY = scale * (canvasCenterY - 2 * LEADING * node.y);
        return Node.create(newX, newY);
    }
}