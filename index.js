let tries = 0;
const cells = document.querySelectorAll(".cell");

let draggedCell = null;
let draggedEndCell = null;

let img1 = null;
let img2 = null;

let activeCell = null;
let swapCell = null;
let startX = 0;
let startY = 0;

cells.forEach((cell, i) => {
  //tough events
  cell.addEventListener("touchstart", handleTouchStart);
  cell.addEventListener("touchmove", handleTouchMove);
  cell.addEventListener("touchend", handleTouchEnd);

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

  function isWinner() {
    let count = 0;
    document.querySelectorAll(".cell").forEach((cell, i) => {
      if (
        cell.querySelector("img").getAttribute("src") ===
        `imgX${mode}/${i + 1}.png`
      ) {
        count++;
      }
    });
    if (count === mode * mode && tries > 1) {
      document.getElementById(
        "msg"
      ).innerText = `You have won in ${tries} tries`;
      tries = 0;
    }
  }
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

    isWinner();
  });

  function handleTouchEnd(event) {
    if (!activeCell) return;
    activeCell.classList.add("active");
    if (swapCell) {
      const activeImg = activeCell.querySelector("img");
      const swapImg = swapCell.querySelector("img");

      if (
        `imgX${mode}/${swapCell.getAttribute("id").replace("cell", "")}.png` ===
        activeCell.querySelector("img").getAttribute("src")
      ) {
        activeCell.appendChild(swapImg);
        swapCell.appendChild(activeImg);
      } else {
        document.getElementById("msg").innerHTML = `Wrong move, Try again!`;
        setTimeout(() => {
          document.getElementById("msg").innerText = "";
        }, 2500);
      }
    }
    activeCell = null;
    swapCell = null;
    setTimeout(() => {
      cells.forEach((cell) => (cell.style.transform = ""));
      cells.forEach((cell) => cell.classList.remove("active", "swap"));
      setTimeout(() => {
        cells.forEach((cell) => (cell.querySelector("img").style.opacity = 1));
      }, 300);
    }, 300);
    isWinner();
  }
});

function handleTouchStart(event) {
  tries++;
  activeCell = event.target.closest(".cell");
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (!activeCell) return;
  event.preventDefault();
  const currentX = event.touches[0].clientX;
  const currentY = event.touches[0].clientY;
  const diffX = currentX - startX;
  const diffY = currentY - startY;
  activeCell.style.transform = `translate(${diffX}px, ${diffY}px)`;
  cells.forEach((cell) => {
    if (cell === activeCell) return;
    const rect = cell.getBoundingClientRect();
    if (
      currentX > rect.left &&
      currentX < rect.right &&
      currentY > rect.top &&
      currentY < rect.bottom
    ) {
      swapCell = cell;
      swapCell.classList.add("swap");
    } else {
      cell.classList.remove("swap");
    }
  });
}

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
