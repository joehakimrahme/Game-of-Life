var G_MATRIX = {

    config: {

	matsize: 50, // size of the side of the square.
	             // eg: 64 creates a 64x64 matrix.
	
	cellsize: 3,  // size of the side of a single cell
	
	colors: ['black', 'white'], // [background, foreground]

	stroked: false, // if true, will draw the borders of each cells

	start_pos: [0, 10], // Coordinates of the top right corner of the matrix
			   // relative to the beginning of the canvas.

	refresh_rate: 150, // speed of evolution of the game (in ms)
    },
    

    // draw the matrix on the context given in argument
    draw: function (context) {
	var x = this.config.start_pos[0];
	var y = this.config.start_pos[1];
	var line;

	for (var i = 0; i < this.cells.length; i++) {
            line = this.cells[i];

	    for (var j = 0; j < line.length; j++) {

		context.beginPath();
		context.rect(x, y, this.config.cellsize, this.config.cellsize);
		context.fillStyle = this.config.colors[line[j]];
		context.fill();

		if (this.config.stroked)
		    context.stroke();
		
		x += this.config.cellsize;
            }

	    // beginning of the next line
	    x = this.config.start_pos[0];
	    y += this.config.cellsize;

        }
    },

    // updates the value of 'cells' according to the laws
    // of Conway's Game of Life
    next_iteration: function() {
	
	newmatrix = [];
	firstline = [];
	lastline = [];

	matrix = this.cells;

	// first and last lines are all 0s (until I solve edge cases).
	for (_=0; _ < matrix.length; ++_) {
            firstline.push(0);
            lastline.push(0);
	}

	newmatrix.push(firstline); // first line is 0s (edge case)

	
	for (i=1; i < matrix.length - 1; ++i) {
            newline = [];

	    newline.push(0); // first column is 0 (edge case)

	    line = matrix[i];

	    for (j=1; j < matrix.length-1; ++j) {

		old_value = matrix[i][j];
		neighbours = matrix[i-1][j-1];
		neighbours += matrix[i-1][j];
		neighbours += matrix[i-1][j+1];
		neighbours += matrix[i][j-1];
		neighbours += matrix[i][j+1];
		neighbours += matrix[i+1][j-1];
		neighbours += matrix[i+1][j];
		neighbours += matrix[i+1][j+1];            

		newvalue = old_value;

		if (old_value === 1) {
                    if (neighbours < 2) {newvalue = 0;}
                    if (neighbours > 3) {newvalue = 0;}
                    if (neighbours === 2 || neighbours === 3) {newvalue = 1;}
		}
		else {
                    if (neighbours === 3) {newvalue = 1;}
		}
		
		newline.push(newvalue);
            }
            newline.push(0); // last column is 0 (edge case)
            newmatrix.push(newline);
	}

	newmatrix.push(lastline); // last line is 0s (edge case)
	
	this.cells = newmatrix;
    },

    // helper function that returns a randomly filled matrix
    init: function () {
	var matrix = [];
	for (var i=0; i < this.config.matsize; ++i) {
            line = [];
            for (var j = 0; j < this.config.matsize; ++j) {

		line.push(Math.floor(Math.random() * 2));
            }
            matrix.push(line);
	}
	this.cells =  matrix;
    },
};


window.onload = function () {
    var canvas = document.getElementById('myCanvas');

    // random initial state
    G_MATRIX.init();

    // infinite loop drawing the successive states of the matrix
    setInterval(function() {

	var context = canvas.getContext('2d');

	context.clearRect(0, 0, canvas.width, canvas.height);
	G_MATRIX.draw(context);
	G_MATRIX.next_iteration();
	
    }, G_MATRIX.config.refresh_rate);

};

