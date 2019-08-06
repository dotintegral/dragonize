import { createStore } from "redux";

import { draw, moveKnob, resize } from "./reducers";

const predefinedCurves = [
  {
    name: "Classic",
    ratio1: 0.7071,
    ratio2: 0.7071
  },
  {
    name: "Golden ratio",
    ratio1: 0.7427,
    ratio2: 0.5516
  }
];

const initialState = {
  canvas: {
    width: 1000,
    height: 1000,
    zoom: 1
  },
  curve: {
    ratio1: predefinedCurves[0].ratio1,
    ratio2: predefinedCurves[0].ratio2,
    step: 1,
    initialTriangle: true
  },
  knob: {
    x: 100,
    y: 100
  },
  predefinedCurves
};

function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "DRAW": {
      return draw({ state, action });
    }

    case "MOVE_KNOB": {
      return moveKnob({ state, action });
    }

    case "RESIZE": {
      return resize({ state, action });
    }

    default:
      return state;
  }
}

export default createStore(reducer, initialState);
