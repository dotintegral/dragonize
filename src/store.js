import { createStore } from "redux";

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
    width: 1600,
    height: 900,
    zoom: 0.1
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
  switch (action.type) {
    case "DRAW": {
      const newState = Object.assign({}, state);
      newState.curve = Object.assign({}, state.curve, {
        ratio1: action.ratio1 || state.curve.ratio1,
        ratio2: action.ratio2 || state.curve.ratio2,
        step: action.step || state.curve.step
      });

      return newState;
    }

    case "SET_KNOB": {
      const newState = {
        ...state,
        knob: {
          x: action.x,
          y: action.y
        }
      };

      return newState;
    }

    default:
      return state;
  }
}

export default createStore(reducer, initialState);
