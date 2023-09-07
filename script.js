const container = document.getElementsByClassName("grid-container")[0];
const moves = document.getElementById("moves");

class Game {
  constructor() {
    this.moves = 0;
    this.grid = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, "."],
    ];
    this.randomizeGrid();
    this.populateGrid();
    this.addClickListeners();
    this.render();
  }

  randomizeGrid() {
    let index = 0;
    //randomize the grid...
    const unshuffledOptions = [1, 2, 3, 4, 5, 6, 7, 8, "."];
    const possibleOptions = this.shuffleArray(unshuffledOptions);
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = possibleOptions[index];
        index++;
      }
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //populate the grid
  populateGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        //do something
        const gridDiv = document.createElement("div");
        gridDiv.setAttribute("class", "grid-item");
        gridDiv.setAttribute("data-x", j);
        gridDiv.setAttribute("data-y", i);
        gridDiv.setAttribute("data-item", "item");
        gridDiv.textContent = this.grid[i][j];
        container.appendChild(gridDiv);
      }
    }
  }

  hasWon() {
    return (
      this.grid.toString() ===
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, "."],
      ].toString()
    );
  }

  addClickListeners() {
    const clickableElements = document.querySelectorAll("[data-item]");
    clickableElements.forEach((v) => {
      v.addEventListener("click", (event) => {
        const targetX = parseInt(event.target.dataset.x);
        const targetY = parseInt(event.target.dataset.y);
        console.log("Clicked on ", targetX, targetY);
        if (targetX < 2 && this.grid[targetY][targetX + 1] === ".") {
          alert("Moving item to the right");
          this.move("right", event);
          this.render();
        } else if (targetX > 0 && this.grid[targetY][targetX - 1] === ".") {
          alert("Moving item to the left.");
          this.move("left", event);
          this.render();
        } else if (targetY < 2 && this.grid[targetY + 1][targetX] === ".") {
          alert("Moving your item down");
          this.move("down", event);
          this.render();
        } else if (targetY > 0 && this.grid[targetY - 1][targetX] === ".") {
          alert("Moving your item up");
          this.move("up", event);
          this.render();
        } else {
          alert("Invalid move!");
        }
      });
    });
  }

  render() {
    // Update the grid
    const gridItems = document.querySelectorAll("[data-item]");
    gridItems.forEach((item) => {
      const x = parseInt(item.dataset.x);
      const y = parseInt(item.dataset.y);
      item.textContent = this.grid[y][x];
    });

    // Update the move counter
    moves.textContent = `Moves: ${this.moves}`;
  }

  move(direction, event) {
    // Get the piece at the current position and move it.
    let temp = 0;
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    switch (direction) {
      case "up":
        if (y > 0 && this.grid[y - 1][x] === ".") {
          temp = this.grid[y][x];
          this.grid[y - 1][x] = temp;
          this.grid[y][x] = ".";
          temp = 0;
          this.moves++;
        }
        break;
      case "down":
        if (y < 2 && this.grid[y + 1][x] === ".") {
          temp = this.grid[y][x];
          this.grid[y + 1][x] = temp;
          this.grid[y][x] = ".";
          temp = 0;
          this.moves++;
        }
        break;
      case "left":
        if (x > 0 && this.grid[y][x - 1] === ".") {
          temp = this.grid[y][x];
          this.grid[y][x - 1] = temp;
          this.grid[y][x] = ".";
          temp = 0;
          this.moves++;
        }
        break;
      case "right":
        if (x < 2 && this.grid[y][x + 1] === ".") {
          temp = this.grid[y][x];
          this.grid[y][x + 1] = temp;
          this.grid[y][x] = ".";
          temp = 0;
          this.moves++;
        }
        break;
      default:
        throw "Error, can't do that.";
    }
  }
}
const g = new Game();
