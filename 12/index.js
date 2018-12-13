var fs = require('fs')

var input = fs.readFileSync("./input.txt", "utf-8").split("\n").slice(0,-1)

var state = input[0].split(": ")[1]

var rules = {}
input.slice(2).map(x => x.split(" => ")).forEach(([k,v]) => rules[k] = v)

let gens = 50000000000

for (var k = 0; k < gens; k++) {
  //console.log(state)
  state = "...." + state + "...."
  let next = state.split("").slice(2,-2)
  for (var i = 0; i < next.length; i++) {
    next[i] = rules[state.slice(i, i+5)]
  }
  state = next.join("")
}

var sum = 0
for (var i = 0, j = -1 * gens; i < state.length; i++, j++) {
  if (state[i] == "#") {
    sum += j
  }
}

console.log(sum)
