var fs = require('fs')

var input = fs.readFileSync("./input.txt", "utf-8").split("\n").slice(0,-1)

var pos = input[0].split(": ")[1].split("").map(x => x === "#" ? 1 : 0)
var neg = []

var rules = ".".repeat(32).split("").map(x => 0)
input.slice(2).map(x => x.split(" => ")).forEach(([k,v]) => {
  var n = 0
  k.split("").map(x => x === "#" ? 1 : 0).forEach((x,i) => {
    n = n * 2 + x
  })

  rules[n] = v === "#" ? 1 : 0
})

//console.log(rules)

let gens = 50000000000
let last = JSON.stringify(neg.concat(pos))
var seen = {}
let offset = 0

for (var k = 0; k < gens; k++) {
//  console.log(JSON.stringify(neg))
 // console.log(JSON.stringify(pos))
  console.log(JSON.stringify(neg.slice().reverse().concat(pos)))
  if (seen[last] && k > 20) {
    offset = gens - k
    break
  }
  seen[last] = true
  var n = 0
  var gg = pos.length + 5
  for (var i = -neg.length; i < gg; i++) {
    n = (n << 1) & 31
    if (i < 0) {
      n |= neg[-i] === 1 ? 1 : 0
    } else {
      n |= pos[i] === 1 ? 1 : 0
    }

    var p = i - 2
    if (p < 0) {
      if (neg[-p] === 1 || rules[n] === 1) {
        neg[-p] = rules[n]
      }
    } else {
      if (pos[p] === 1 || rules[n] === 1) {
        pos[p] = rules[n]
      }
    }
  }

  last = neg.slice().reverse().concat(pos)
  for (var i = 0; i < last.length; i++) {
    if (last[i] === 1) {
      last = last.slice(i)
      break
    }
  }
}

var sum = 0
/*
for (var i = 0; i < neg.length; i++) {
  if (neg[i] === 1) {
    sum -= i
  }
}
*/

for (var i = 0; i < pos.length; i++) {
  if (pos[i] === 1) {
    sum += i + offset
    console.log(sum)
  }
}
console.log(sum)
