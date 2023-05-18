import { getCanvasCenter } from '../utils/canvasUtils';
import { DEFAULT_HEADER_HEIGHT } from '../component/header/Header';
import { DEFAULT_SIDEBAR_WIDTH } from '../component/sidebar/Sidebar';
import { LEADING } from '../draw/standard/grid.drawer';

export default class Node {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static fromClickEvent(event: PointerEvent, canvas: HTMLCanvasElement): Node {
        const { canvasCenterX, canvasCenterY } = getCanvasCenter(canvas);

        const x = (event.clientX - (canvasCenterX + DEFAULT_SIDEBAR_WIDTH)) / (2 * LEADING);
        const y = -(event.clientY - (canvasCenterY + DEFAULT_HEADER_HEIGHT)) / (2 * LEADING);
        console.log(event.clientX, event.clientY);
        return new Node(x, y);
    }

    toCanvasCssPixels(canvasCenterX: number, canvasCenterY: number): Node {
        const scale = window.devicePixelRatio;
        
        let newX = scale * (canvasCenterX + 2 * LEADING * this.x);
        let newY = scale * (canvasCenterY - 2 * LEADING * this.y);
        return new Node(newX, newY);
    }
}