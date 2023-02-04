const board = document.getElementById("board");
const resetButton = document.getElementById("reset-button");
let turn = "X";

board.addEventListener("click", function(event) {
  if (event.target.tagName === "TD") {
    if (event.target.textContent === "") {
      event.target.textContent = turn;
      if (checkWin(turn)) {
        alert(turn + " wins!");
      } else if (checkDraw()) {
        alert("Draw!");
      } else {
        if (turn === "X") {
          turn = "O";
        } else {
          turn = "X";
        }
      }
    }
  }
});

resetButton.addEventListener("click", reset);

function reset() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board.rows[i].cells[j].textContent = "";
    }
  }
  turn = "X";
}


function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    let row = board.rows[i];
    if (row.cells[0].textContent === player &&
        row.cells[1].textContent === player &&
        row.cells[2].textContent === player) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board.rows[0].cells[i].textContent === player &&
        board.rows[1].cells[i].textContent === player &&
        board.rows[2].cells[i].textContent === player) {
      return true;
    }
  }

  // Check diagonals
  if (board.rows[0].cells[0].textContent === player &&
      board.rows[1].cells[1].textContent === player &&
      board.rows[2].cells[2].textContent === player) {
    return true;
  }

  if (board.rows[0].cells[2].textContent === player &&
      board.rows[1].cells[1].textContent === player &&
      board.rows[2].cells[0].textContent === player) {
    return true;
  }

  return false;
}

function checkDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board.rows[i].cells[j].textContent === "") {
        return false;
      }
    }
  }
  return true;
}

let mode = 'light';

const changeMode = (newMode) => {
  mode = newMode;
  document.body.className = newMode + '-mode';
}

document.getElementById('light-mode-button').addEventListener('click', () => {
  changeMode('light');
});

document.getElementById('dark-mode-button').addEventListener('click', () => {
  changeMode('dark');
});
