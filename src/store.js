import { createStore } from 'redux'

const initialState = {
  canvas: {
    width: 1600,
    height: 900,
    zoom: 1
  },
  curve: {
    ratio1: 0.74274294,
    ratio2: 0.55166708,
    step: 20,
    initialTriangle: true
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'DRAW': {
      const newState = Object.assign({}, state)
      newState.curve = Object.assign(
        {},
        state.curve,
        {
          ratio1: action.ratio1,
          ratio2: action.ratio2,
          step: action.step
        }
      )

      return newState
    }

    default:
      return state
  }
}

export default createStore(reducer, initialState)
