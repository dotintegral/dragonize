export const getScaleParams = canvasProps => {
  const { width, height, zoom } = canvasProps;
  const min = Math.min(width, height) * zoom;
  const scale = min / 2;
  const marginTop = min / 4 + (height - min) / 2;
  const marginLeft = min / 4 + (width - min) / 2;

  return {
    scale,
    marginTop,
    marginLeft
  };
};

export const toCurveCoords = canvasProps => ({ x, y }) => {
  const { scale, marginTop, marginLeft } = getScaleParams(canvasProps);

  return {
    x: (x - marginLeft) / scale,
    y: (y - marginTop) / scale
  };
};

export const toCanvasCoords = canvasProps => ({ x, y }) => {
  const { scale, marginTop, marginLeft } = getScaleParams(canvasProps);

  return [x * scale + marginLeft, y * scale + marginTop];
};
