class GameOfLife {
  constructor() {
    // Size of the side of the square eg: 64 creates a 64x64 matrix.
    this.matsize = 100;

    // Size of the side of a single cell
    this.cellsize = 2;

    // [background, foreground]
    this.colors = ["black", "white"];

    // if true, will draw the borders of each cells
    this.stroked = false;

    // Coordinates of the top right corner of the matrix relative to the beginning of the canvas.
    this.start_pos = [0, 0];

    // speed of evolution of the game (in ms)
    this.refresh_rate = 1000 / 60;

    //Game of life is not running initially
    this.isRunning = false;

    this.initialState = true;
  }

  get_cell_value = (i, j) => {
    if (i < 0) {
      i += this.matsize;
    }

    if (i >= this.matsize) {
      i -= this.matsize;
    }

    if (j < 0) {
      j += this.matsize;
    }

    if (j >= this.matsize) {
      j -= this.matsize;
    }

    return this.cells[i + j * this.matsize];
  };

  // draw the matrix on the context given in argument
  draw = (context) => {
    var x = this.start_pos[0];
    var y = this.start_pos[1];

    for (var i = 0; i < this.matsize; i++) {
      for (var j = 0; j < this.matsize; j++) {
        context.beginPath();
        context.rect(x, y, this.cellsize, this.cellsize);
        context.fillStyle = this.colors[this.get_cell_value(j, i)];
        context.fill();

        if (this.stroked) context.stroke();

        context.closePath();

        x += this.cellsize;
      }

      // beginning of the next line
      x = this.start_pos[0];
      y += this.cellsize;
    }
  };

  // updates the value of 'cells' according to the laws
  // of Conway's Game of Life
  next_iteration = () => {
    const newmatrix = [];
    let neighbours;

    for (let i = 0; i < this.matsize; ++i) {
      for (let j = 0; j < this.matsize; ++j) {
        // gathering the number of live neighbours
        neighbours = this.get_cell_value(j - 1, i - 1);
        neighbours += this.get_cell_value(j - 1, i);
        neighbours += this.get_cell_value(j - 1, i + 1);
        neighbours += this.get_cell_value(j, i - 1);
        neighbours += this.get_cell_value(j, i + 1);
        neighbours += this.get_cell_value(j + 1, i - 1);
        neighbours += this.get_cell_value(j + 1, i);
        neighbours += this.get_cell_value(j + 1, i + 1);

        // the current value of the cell
        let value = this.get_cell_value(j, i);

        // modification of the value according to Conway's laws
        if (value === 1) {
          if (neighbours < 2) {
            value = 0;
          } // underpopulation
          if (neighbours > 3) {
            value = 0;
          } // overcrowding
          if (neighbours === 2 || neighbours === 3) {
            value = 1;
          }
        } else {
          if (neighbours === 3) {
            value = 1;
          } // reproduction
        }

        newmatrix.push(value);
      }
    }
    this.cells = newmatrix;
  };

  // helper function that returns a randomly filled matrix
  init = () => {
    var matrix = [];
    for (var i = 0; i < this.matsize; ++i) {
      for (var j = 0; j < this.matsize; ++j) {
        // push random value: 0 or 1.
        matrix.push(Math.floor(Math.random() * 2));
      }
    }
    this.cells = matrix;
  };
}

const G_MATRIX = new GameOfLife();

const animate = (canvas) => {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  if (G_MATRIX.isRunning) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    G_MATRIX.draw(context);
    G_MATRIX.next_iteration();

    requestAnimationFrame(() => {
      animate(canvas);
    });
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    G_MATRIX.draw(context);
    G_MATRIX.next_iteration();
  }
};

const play = () => {
  if (G_MATRIX.initialState) {
    var canvas = document.getElementById("myCanvas");
    G_MATRIX.init();
    G_MATRIX.isRunning = true;
    animate(canvas);
    G_MATRIX.initialState = false;
  } else {
    var canvas = document.getElementById("myCanvas");
    G_MATRIX.next_iteration();
    G_MATRIX.isRunning = true;
    animate(canvas);
  }
};

const pause = () => {
  var canvas = document.getElementById("myCanvas");
  G_MATRIX.isRunning = false;
  animate(canvas);
};

document.getElementById("playButton").addEventListener("click", play);
document.getElementById("pauseButton").addEventListener("click", pause);
document.getElementById("resetButton").addEventListener("click", function () {
  location.reload();
});
