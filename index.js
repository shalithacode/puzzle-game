let tryCount = 0;
let continuing = true;

const swapSquares = (sq1, sq2) => {
  [
    document.getElementById(sq1).className,
    document.getElementById(sq2).className,
  ] = [
    document.getElementById(sq2).className,
    document.getElementById(sq1).className,
  ];
  isWon();
};
const isWon = () => {
  let count = 1;
  for (let row = 1; row <= mode; row++) {
    for (let column = 1; column <= mode; column++) {
      if (
        document.getElementById(`img_${row}${column}`).className ===
        `square${count}`
      ) {
        count++;
      } else {
        break;
      }
    }
    if (count === mode * mode + 1) {
      document.getElementById(
        "msg"
      ).innerHTML = `You have won <br> in ${tryCount} tries`;
      tryCount = 0;
    }
  }
};

const onSquare = (row, column) => {
  document.getElementById("msg").innerHTML = "";
  tryCount++;
  if (
    document.getElementById(`img_${row}${column}`).className !==
    `square${mode * mode}`
  ) {
    const adjacentSquares = [
      { row: row, column: column - 1 },
      { row: row, column: column + 1 },
      { row: row - 1, column: column },
      { row: row + 1, column: column },
    ];
    for (const { row: adjRow, column: adjCol } of adjacentSquares) {
      if (adjRow >= 1 && adjRow <= mode && adjCol >= 1 && adjCol <= mode) {
        const adjacentSquare = document.getElementById(
          `img_${adjRow}${adjCol}`
        );
        if (adjacentSquare.className === `square${mode * mode}`) {
          swapSquares(`img_${row}${column}`, `img_${adjRow}${adjCol}`);
          return;
        }
      }
    }
  }
};

const onReset = () => {
  document.getElementById("msg").innerHTML = "";
  tryCount = 0;
  for (let row = 1; row <= mode; row++) {
    for (let column = 1; column <= mode; column++) {
      let row2 = Math.floor(Math.random() * mode + 1);
      let column2 = Math.floor(Math.random() * mode + 1);
      swapSquares(`img_${row}${column}`, `img_${row2}${column2}`);
    }
  }
};

// onReset();

const onMode = (m) => {
  mode = m;
};
