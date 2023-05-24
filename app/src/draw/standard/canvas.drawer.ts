import { IGridDrawer } from "./interface/grid.drawer.interface";

export const initCanvas = (canvasRef: any, canvasDrawer: IGridDrawer) => {
    const canvas : any = canvasRef.current;
    const context : CanvasRenderingContext2D = canvas.getContext('2d');

    // Set display size (css pixels).
    const canvasWidth = window.innerWidth - 70;
    const canvasHeight = window.innerHeight - 50;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio;
    canvas.width = Math.floor(canvasWidth * scale);
    canvas.height = Math.floor(canvasHeight * scale);

    // Normalize coordinate system to use CSS pixels.
    context.scale(scale, scale);

    // START DRAWINGS
    canvasDrawer.draw(canvas);

    // END DRAWINGS
    context.scale(1 / scale, 1 / scale);
}
