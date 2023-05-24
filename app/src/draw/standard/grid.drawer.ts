import { IGridDrawer } from "./interface/grid.drawer.interface";
import { getCanvasCenter } from '../../utils/canvasUtils';

const MAIN_AXIS_COLOR: string = "#636363";
const MINOR_AXIS_COLOR: string = "#dedede";
const SQRT_3: number = 1.7320;
const R: number = 10;
export const LEADING: number = 15;

export default class GridDrawer implements IGridDrawer {

    draw(canvas: HTMLCanvasElement) {
        if (canvas) {
            let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
            if (ctx) {
                this.drawCanvasObjects(ctx, canvas);
            }
        }
    }
 
    drawArrow(context: CanvasRenderingContext2D, 
        fromx: number, 
        fromy: number, 
        tox: number, 
        toy: number) {
        var x_center = tox;
        var y_center = toy;
      
        var angle;
        var x;
        var y;
      
        context.beginPath();
      
        angle = Math.atan2(toy-fromy, tox-fromx)
        
        x = R * Math.cos(angle) + x_center;
        y = R * Math.sin(angle) + y_center;
      
        context.moveTo(x, y);
      
        angle += (1/3) * (2 * Math.PI)
        x = R * Math.cos(angle) + x_center;
        y = R * Math.sin(angle) + y_center;
      
        context.lineTo(x, y);
      
        angle += (1/3) * (2 * Math.PI)
        x = R * Math.cos(angle) + x_center;
        y = R * Math.sin(angle) + y_center;
      
        context.lineTo(x, y);
        context.closePath();
        context.fillStyle = MAIN_AXIS_COLOR;
        context.fill();
    }
      
    drawCanvasArrows(ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement) {
        const { canvasCenterX, canvasCenterY } = getCanvasCenter(canvas);

        this.drawArrow(ctx, canvasCenterX, (canvas.height / window.devicePixelRatio), canvasCenterX, 10);
        this.drawArrow(ctx, 0, canvasCenterY, (canvas.width / window.devicePixelRatio) - 10, canvasCenterY);
    }
      
    drawCanvasGrid(ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement) {
        const { canvasCenterX, canvasCenterY } = getCanvasCenter(canvas);

        for (let i = canvasCenterX; i < (canvas.width / window.devicePixelRatio); i += LEADING) {
            this.drawVerticalLine(ctx, canvas, i, canvasCenterX, canvasCenterY);
        }
      
        for (let i = canvasCenterX; i > 0; i -= LEADING) {
            this.drawVerticalLine(ctx, canvas, i, canvasCenterX, canvasCenterY);
        }
        
        for (let i = canvasCenterY; i < (canvas.height / window.devicePixelRatio); i += LEADING) {
            this.drawHorizontalLine(ctx, canvas, i, canvasCenterX, canvasCenterY);
        }
      
        for (let i = canvasCenterY; i > 0; i -= LEADING) {
            this.drawHorizontalLine(ctx, canvas, i, canvasCenterX, canvasCenterY);
        }
      
        ctx.beginPath();
        ctx.moveTo(0, canvasCenterY);
        ctx.lineTo(canvas.width, canvasCenterY);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = MAIN_AXIS_COLOR;
        ctx.stroke();
      
        ctx.beginPath();
        ctx.moveTo(canvasCenterX, 0);
        ctx.lineTo(canvasCenterX, canvas.height);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = MAIN_AXIS_COLOR;
        ctx.stroke();
      
    }
      
    drawCanvasObjects(ctx: CanvasRenderingContext2D,
                      canvas: HTMLCanvasElement) {
        this.drawCanvasGrid(ctx, canvas);
        this.drawCanvasArrows(ctx, canvas);
    }
      
    drawLine(ctx: CanvasRenderingContext2D,
        startX: number, 
        startY: number, 
        endX: number, 
        endY: number, 
        color: string,
        width: number) {

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
      
    drawVerticalLine(ctx: CanvasRenderingContext2D, 
        canvas: HTMLCanvasElement, 
        i: number, 
        planeCenterX: number, 
        planeCenterY: number) {

        this.drawLine(ctx, i, 0, i, (canvas.height / window.devicePixelRatio), MINOR_AXIS_COLOR, 1);
            
        if ((i - planeCenterX) % (2 * LEADING) === 0 && (planeCenterX !== i) && (i + ((R / 2) * SQRT_3)) < (canvas.width / window.devicePixelRatio)) {
            this.drawLine(ctx, i, planeCenterY - 5, i, planeCenterY + 5, MAIN_AXIS_COLOR, 1.5);
        }
    }
      
    drawHorizontalLine(ctx: CanvasRenderingContext2D, 
        canvas: HTMLCanvasElement, 
        i: number, 
        planeCenterX: number, 
        planeCenterY: number) {

            this.drawLine(ctx, 0, i, (canvas.width / window.devicePixelRatio), i, MINOR_AXIS_COLOR, 1);
      
        if ((i - planeCenterY) % (2 * LEADING) === 0 && (planeCenterY !== i) && (i - ((R / 2) * SQRT_3)) > 0) {
            this.drawLine(ctx, planeCenterX - 5, i, planeCenterX + 5, i, MAIN_AXIS_COLOR, 1.5);
        }
    }
}