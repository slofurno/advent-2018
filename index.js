var fs = require('fs')

var lines = fs.readFileSync("./input.txt", "utf-8").split("\n").slice(0, -1)

var width = lines[0].length
var height = lines.length

console.log(width, height)

var track = lines.map(x => x.split(""))
var cars = []

for (var j = 0; j < height; j++ ) {
  for (var i = 0; i < width; i++) {
    switch (track[j][i]) {
      case "^":
        cars.push([i, j, 0, -1, 0])
        track[j][i] = "|"
        break
      case "v":
        cars.push([i, j, 0, 1, 0])
        track[j][i] = "|"
        break
      case ">":
        cars.push([i, j, 1, 0, 0])
        track[j][i] = "-"
        break
      case "<":
        cars.push([i, j, -1, 0, 0])
        track[j][i] = "-"
        break
    }
  }
}



console.log(cars)

let RIGHT = [1, 0]
let DOWN = [0, 1]
let LEFT = [-1, 0]
let UP = [0, -1]

function leftTurn(x) {
  if (x[0] == 1) {
    return UP
  }
  if (x[0] == -1) {
    return DOWN
  }
  if (x[1] == 1) {
    return RIGHT
  }
  if (x[1] == -1) {
    return LEFT
  }
}

function rightTurn(x) {
  if (x[0] == 1) {
    return DOWN
  }
  if (x[0] == -1) {
    return UP
  }
  if (x[1] == 1) {
    return LEFT
  }
  if (x[1] == -1) {
    return RIGHT
  }
}

function drawCar(vx, vy) {
  if (vx == 1) {
    return ">"
  }
  if (vx == -1) {
    return "<"
  }

  if (vy == 1) {
    return "v"
  }

  return "^"
}

/*
let leftTurn = {
  RIGHT: UP,
  DOWN: RIGHT,
  LEFT: DOWN,
  UP: LEFT,
}

let rightTurn = {
  UP: RIGHT,
  RIGHT: DOWN,
  DOWN: LEFT,
  LEFT: UP,
}
*/

console.log("leftutnr")
console.log(leftTurn(RIGHT))



function carOrder(a, b) {
  let [x0, y0, ...r0] = a
  let [x1, y1, ...r1] = b

  if (y0 != y1) {
    return y0 - y1
  }

  return x0 - x1
}

for (;;) {
  //console.log(cars)
  cars.sort(carOrder)

  for (var i = 0; i < cars.length; i++) {
    let [x, y, vx, vy, t] = cars[i]
    let t1 = t
    let vx1 = vx
    let vy1 = vy
    switch (track[y][x]) {
    case "\\":
      vx1 = vy
      vy1 = vx
      break
    case "/":
      vx1 = -vy
      vy1 = -vx
      break
    case "+":
      if (t == 0) {
        [vx1, vy1] = leftTurn([vx, vy])
        t1 = 1
      } else if (t == 1) {
        t1 = 2
        vx1 = vx
        vy1 = vy
      } else {
        [vx1, vy1] = rightTurn([vx, vy])
        t1 = 0
      }
      break
    }
    let x1 = x + vx1
    let y1 = y + vy1
    for (var j = 0; j < cars.length; j++) {
      let [x2, y2, ...rest] = cars[j]
      if (x1 == x2 && y1 == y2) {
        console.log('collide:', x1, y1)
        process.exit(0)
      }
    }
    cars[i] = [x1, y1, vx1, vy1, t1]
  }

  var cur = copy(track)
  for (var i = 0; i < cars.length; i++) {
    let [x, y, vx, vy, t] = cars[i]
    cur[y][x] = drawCar(vx, vy)
  }

  for (var j = 0; j < cur.length; j++) {
    var line = ""
    for (var i = 0; i < cur[j].length; i++){
      line += cur[j][i]
    }
    console.log(line)
  }

  console.log("")
  console.log("")
  console.log("")
}

function copy(x) {
  return JSON.parse(JSON.stringify(x))
}
