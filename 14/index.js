

let target = "360781"
let board = "37"

let i = 0
let j = 1

for (;;) {
  let a = board[i]|0
  let b = board[j]|0
  board += "" + (a + b)
  //console.log(i, j, a, b, a+b, board)
  i = (i + 1 + a)%board.length
  j = (j + 1 + b)%board.length

  if (board.length >= 360781+11) {
    break
  }
}

console.log(board)
console.log(board.slice(360781).slice(0,10))
