export const draw = ({ state, action }) => {
  const newState = {
    ...state,
    curve: {
      ...state.curve,
      ratio1: action.ratio1 || state.curve.ratio1,
      ratio2: action.ratio2 || state.curve.ratio2,
      step: action.step || state.curve.step
    }
  };

  return newState;
};

export const moveKnob = ({ state, action }) => {
  const newState = {
    ...state,
    knob: {
      x: action.x,
      y: action.y
    }
  };

  return newState;
};

export const resize = ({ state, action }) => {
  const newState = {
    ...state,
    canvas: {
      ...state.canvas,
      width: action.width,
      height: action.height
    }
  };

  return newState;
};
