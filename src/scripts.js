var left = 'left'
var right = 'right'
var long = 'long'
var short = 'short'
var path = [
  {x: 200, y: 600, d: left},
  {x: 800, y: 600, d: left}
]
var settingsGolden = {
  r1: 0.74274294,
  r2: 0.55166708
}
var settingsNormal = {
  r1: Math.sqrt(2) / 2,
  r2: Math.sqrt(2) / 2
}
var settingsMy = {
  r1: 1,
  r2: 1
}
var settings = settingsGolden
var iteration = 0
var steps = 18

var devLines = []

function initCanvas() {
  var context = document.querySelector('#canvas').getContext('2d')


  for (var i=0; i<steps; i++) {
    path = newPath(path)
  }

  // drawDevLines(context)
  drawCurve(context, path)
}

function drawDevLines(context) {
  context.beginPath()
  devLines.forEach(function (lines) {
    context.moveTo(lines[0].x, lines[0].y)
    context.lineTo(lines[1].x, lines[1].y)
  })
  context.strokeStyle = '#e0e0e0'
  context.stroke()
}

function newPath(path) {
  iteration++
  var newPath = [path[0]]
  devLines = []

  for (var i=1; i<path.length; i++) {
    var a = path[i-1]
    var b = path[i]
    var l = i%2 ? long : short

    newPath.push.apply(newPath, calculateMiddlePoint(a, b, l))
  }

  return newPath
}

function calculateMiddlePoint (start, end, l) {
  var angle = Math.atan2(end.y - start.y, end.x - start.x)
  var newAngle = angle - Math.PI / 2
  var diffX = (end.x - start.x)
  var diffY = (end.y - start.y)
  var x = (start.x + diffX / 2)
  var y = (start.y + diffY / 2)

  newAngle = end.d === left ? newAngle : newAngle - Math.PI
  var length = Math.hypot((end.x - start.x), (end.y - start.y))

  var r1 = length * settings.r1
  var r2 = length * settings.r2

  var a
  var h
  if (l === long) {
    a = (r1*r1 - r2*r2 + length*length) / (2 * length)
    h = Math.sqrt(r1*r1 - a*a)
  } else {
    a = (r2*r2 - r1*r1 + length*length) / (2 * length)
    h = Math.sqrt(r2*r2 - a*a)
  }

  var intersection = {
    x: start.x + Math.cos(angle) * a,
    y: start.y + Math.sin(angle) * a
  }

  var point = {
    x: intersection.x + Math.cos(newAngle) * h,
    y: intersection.y + Math.sin(newAngle) * h
  }

  devLines.push([intersection, point])
  devLines.push([start, end])

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

function moveTo(context, coords) {
  context.moveTo(coords.x, coords.y)
}

function drawLine(context, coords) {
  context.lineTo(coords.x, coords.y)
}

function drawCurve(context, path) {
  var start = path[0]

  context.beginPath()
  moveTo(context, start)

  for (var i=1; i<path.length; i++) {
    drawLine(context, path[i])
  }

  context.strokeStyle = '#fff'
  context.stroke()
}

document.addEventListener('DOMContentLoaded', initCanvas)
