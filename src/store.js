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
    step: 17,
    initialTriangle: true
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

export default createStore(reducer, initialState)
