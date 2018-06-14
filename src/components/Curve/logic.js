const R = require('ramda')

const threshold = 0.001;
const left = 'left'
const right = 'right'
const long = 'long'
const short = 'short'

const calculateMiddlePoint = ({start, end, lineLength, ratio1, ratio2}) => {
  const angle = Math.atan2(end.y - start.y, end.x - start.x)
  let newAngle = angle - Math.PI / 2

  newAngle = end.d === left ? newAngle : newAngle - Math.PI
  const length = Math.hypot((end.x - start.x), (end.y - start.y))

  const r1 = length * ratio1
  const r2 = length * ratio2

  let a = null;
  let h = null
  if (lineLength === long) {
    a = (r1 * r1 - r2 * r2 + length * length) / (2 * length)
    h = Math.sqrt(r1 * r1 - a * a)
  } else {
    a = (r2 * r2 - r1 * r1 + length * length) / (2 * length)
    h = Math.sqrt(r2 * r2 - a * a)
  }

  const intersection = {
    x: start.x + Math.cos(angle) * a,
    y: start.y + Math.sin(angle) * a
  }

  const point = {
    x: intersection.x + Math.cos(newAngle) * h,
    y: intersection.y + Math.sin(newAngle) * h
  }

  return [{
    x: point.x,
    y: point.y,
    d: left
  }, {
    x: end.x,
    y: end.y,
    d: right
  }]
}

const nextStep = ({path, ratio1, ratio2}) => {
  const newPath = [path[0]]

  for (let i = 1; i < path.length; i++) {
    const start = path[i - 1]
    const end = path[i]
    const lineLength = i % 2 ? long : short

    if (Math.hypot(start.x - end.x, start.y - end.y) > threshold) { 
      newPath.push.apply(newPath,
        calculateMiddlePoint({start, end, lineLength, ratio1, ratio2})
      )
    }
  }

  return newPath
}

const getPaths = ({ratio1, ratio2, steps}) => {
  const t0 = performance.now();

  let paths = [
    [
      {x: 0, y: 0.5, d: left},
      {x: 1, y: 0.5, d: left}
    ]
  ]

  for(let i = 0; i < steps; i++) {
    let lastPath = paths[paths.length - 1]
    paths.push(
      nextStep({path: lastPath, ratio1, ratio2})
    )
  }

  const t1 = performance.now();
  console.log('Paths calculation:', (t1 - t0) / 1000, '[ms]')

  return paths
}


export default {
  getPaths: R.memoize(getPaths)
}
