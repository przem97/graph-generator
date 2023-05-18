export const getCanvasCenter = (canvas: HTMLCanvasElement) => {
  const canvasCenterX = Math.floor(canvas.width / (2 * window.devicePixelRatio));
  const canvasCenterY = Math.floor(canvas.height / (2 * window.devicePixelRatio));

  return { canvasCenterX, canvasCenterY };
}