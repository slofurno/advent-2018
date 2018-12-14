

let target = "360781"
let board = [3, 7]

let i = 0
let j = 1

for (;;) {
  let a = board[i]
  let b = board[j]
  ;("" + (a + b)).split("").forEach(x => board.push(x|0))
  //board = board.concat(("" + (a + b)).split(""))
  //console.log(i, j, a, b, a+b, board)
  i += 1 + a
  j += 1 + b

  i %= board.length
  j %= board.length

  if (board.length > 99999999) {
    break
  }
}

console.log(board.map(x => ""+x).join("").indexOf(target))
