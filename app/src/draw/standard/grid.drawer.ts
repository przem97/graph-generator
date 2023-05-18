import NodeDrawer from "./node.drawer";
import ICanvasDrawer from "../drawer.interface";
import Node from '../../model/node'

const RADIUS: number = 22;
const nodesList: Node[] = [];
const MAIN_AXIS_COLOR: string = "#636363";
const MINOR_AXIS_COLOR: string = "#dedede";
const LEADING: number = 15;
const SQRT_3: number= 1.7320;
const R: number = 10;

export default class GridDrawer implements ICanvasDrawer {

    // constructor(nodeDrawer: NodeDrawer) {
    //     this.nodeDrawer = nodeDrawer;
    // }

    draw(canvas: HTMLCanvasElement) {
        if (canvas) {
            let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
            if (ctx) {
                this.drawCanvasObjects(ctx, canvas);
            }
        }
    }

    drawCanvasNodes(ctx: CanvasRenderingContext2D, 
        planeCenterX: number, 
        planeCenterY: number) {
        for (var i = 0; i < nodesList.length; i++) {
            let node: Node = nodesList[i];
            this.drawNode(ctx, nodesList[i], planeCenterX, planeCenterY);
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
      
    drawNode(ctx: CanvasRenderingContext2D,
        node: Node, 
        planeCenterX: number,
        planeCenterY: number) {

        ctx.fillStyle = "#e2b881";
        ctx.beginPath();
        ctx.arc(node.x + planeCenterX, node.y + planeCenterY, RADIUS, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    
    }
      
    drawCanvasArrows(ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
        planeCenterX: number,
        planeCenterY: number) {

        this.drawArrow(ctx, planeCenterX, (canvas.height / window.devicePixelRatio), planeCenterX, 10);
        this.drawArrow(ctx, 0, planeCenterY, (canvas.width / window.devicePixelRatio) - 10, planeCenterY);
    }
      
    drawCanvasGrid(ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
        planeCenterX: number,
        planeCenterY: number) {
      
        for (let i = planeCenterX; i < (canvas.width / window.devicePixelRatio); i += LEADING) {
            this.drawVerticalLine(ctx, canvas, i, planeCenterX, planeCenterY);
        }
      
        for (let i = planeCenterX; i > 0; i -= LEADING) {
            this.drawVerticalLine(ctx, canvas, i, planeCenterX, planeCenterY);
        }
        
        for (let i = planeCenterY; i < (canvas.height / window.devicePixelRatio); i += LEADING) {
            this.drawHorizontalLine(ctx, canvas, i, planeCenterX, planeCenterY);
        }
      
        for (let i = planeCenterY; i > 0; i -= LEADING) {
            this.drawHorizontalLine(ctx, canvas, i, planeCenterX, planeCenterY);
        }
      
        ctx.beginPath();
        ctx.moveTo(0, planeCenterY);
        ctx.lineTo(canvas.width, planeCenterY);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = MAIN_AXIS_COLOR;
        ctx.stroke();
      
        ctx.beginPath();
        ctx.moveTo(planeCenterX, 0);
        ctx.lineTo(planeCenterX, canvas.height);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = MAIN_AXIS_COLOR;
        ctx.stroke();
      
    }
      
    drawCanvasObjects(ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement) {
        const planeCenterY = Math.floor(canvas.height / (2 * window.devicePixelRatio)); 
        const planeCenterX = Math.floor(canvas.width / (2 * window.devicePixelRatio)); 
      
        this.drawCanvasGrid(ctx, canvas, planeCenterX, planeCenterY);
        this.drawCanvasNodes(ctx, planeCenterX, planeCenterY);
        this.drawCanvasArrows(ctx, canvas, planeCenterX, planeCenterY);
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