let tries = 0;
const cells = document.querySelectorAll(".cell");

let draggedCell = null;
let draggedEndCell = null;

let img1 = null;
let img2 = null;
cells.forEach((cell, i) => {
  cell.addEventListener("touchstart", () => {
    draggedCell = cell;
    setTimeout(() => {
      cell.classList.add("dragging");
    }, 0);
  });

  cell.addEventListener("touchend", () => {
    draggedEndCell = cell.id;
    if (img1.outerHTML.split(".")[0].slice(-1) !== draggedEndCell.slice(-1)) {
      draggedCell.appendChild(img1);
      cell.appendChild(img2);
      document.getElementById("msg").innerHTML = `Wrong move, Try again!`;
      setTimeout(() => {
        document.getElementById("msg").innerText = "";
      }, 2500);
    }
    draggedCell = null;
    cell.classList.remove("dragging");
  });

  cell.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  cell.addEventListener("touchmove", (e) => {
    e.preventDefault();
    cell.classList.add("hovered");
  });

  cell.addEventListener("touchleave", () => {
    cell.classList.remove("hovered");
  });

  cell.addEventListener("touchend", () => {
    tries++;
    if (draggedCell !== null) {
      img1 = draggedCell.querySelector("img");
      img2 = cell.querySelector("img");

      if (img1 !== img2) {
        draggedCell.appendChild(img2);
        cell.appendChild(img1);
      } else {
        alert("Can't swap");
      }
    } else {
      alert("Can't drop here!");
    }

    let count = 0;
    document.querySelectorAll(".cell").forEach((cell, i) => {
      // console.log(`imgX3/${i + 1}.png`);
      // console.log(cell.querySelector("img").getAttribute("src"));
      if (
        cell.querySelector("img").getAttribute("src") ===
        `imgX${mode}/${i + 1}.png`
      ) {
        count++;
        // console.log("hi");
      }
    });
    if (count === mode * mode) {
      document.getElementById(
        "msg"
      ).innerText = `You have won in ${tries} tries`;
      tryCount = 0;
      console.log(`pass in ${tries}`);
    }
  });

  ////////////////////////////////////////
  cell.addEventListener("dragstart", () => {
    draggedCell = cell;
    setTimeout(() => {
      cell.classList.add("dragging");
    }, 0);
  });

  cell.addEventListener("dragend", () => {
    draggedEndCell = cell.id;
    if (img1.outerHTML.split(".")[0].slice(-1) !== draggedEndCell.slice(-1)) {
      draggedCell.appendChild(img1);
      cell.appendChild(img2);
      document.getElementById("msg").innerHTML = `Wrong move, Try again!`;
      setTimeout(() => {
        document.getElementById("msg").innerText = "";
      }, 2500);
    }
    draggedCell = null;
    cell.classList.remove("dragging");
  });

  cell.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  cell.addEventListener("dragenter", (e) => {
    e.preventDefault();
    cell.classList.add("hovered");
  });

  cell.addEventListener("dragleave", () => {
    cell.classList.remove("hovered");
  });

  cell.addEventListener("drop", () => {
    tries++;
    if (draggedCell !== null) {
      img1 = draggedCell.querySelector("img");
      img2 = cell.querySelector("img");

      if (img1 !== img2) {
        draggedCell.appendChild(img2);
        cell.appendChild(img1);
      } else {
        alert("Can't swap");
      }
    } else {
      alert("Can't drop here!");
    }

    let count = 0;
    document.querySelectorAll(".cell").forEach((cell, i) => {
      // console.log(`imgX3/${i + 1}.png`);
      // console.log(cell.querySelector("img").getAttribute("src"));
      if (
        cell.querySelector("img").getAttribute("src") ===
        `imgX${mode}/${i + 1}.png`
      ) {
        count++;
        // console.log("hi");
      }
    });
    if (count === mode * mode) {
      document.getElementById(
        "msg"
      ).innerText = `You have won in ${tries} tries`;
      tryCount = 0;
      console.log(`pass in ${tries}`);
    }
  });
});
function shuffleImages() {
  document.getElementById("msg").innerText = "";
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    let randomIndex = Math.floor(Math.random() * cells.length);
    let randomCell = cells[randomIndex];
    let img1 = cell.querySelector("img");
    let img2 = randomCell.querySelector("img");
    if (img1 !== img2) {
      cell.appendChild(img2);
      randomCell.appendChild(img1);
    }
  });
}
