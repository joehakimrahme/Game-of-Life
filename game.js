var G_MATRIX = {
    
    matsize: 100, // size of the side of the square. eg: 64 creates a 64x64 matrix.
    cellsize: 5,  // size of the side of a single cell
    colors: ['black', 'white'], // [background, foreground]
    stroked: false, // if true, will draw the borders of each cells
    
    startx: 0, // coordinates of the top right corner of the matrix
    starty: 0, // relative to the position of the canvas

    refresh_rate: 500, // speed of evolution of the game (in ms)
    

    // draw the matrix on the context given in argument
    draw: function (context) {
	var x = this.startx;
	var y = this.starty;
	var line;

	for (var i = 0; i < this.cells.length; i++) {
            line = this.cells[i];

	    for (var j = 0; j < line.length; j++) {
		
		context.beginPath();
		context.rect(x, y, this.cellsize, this.cellsize);
		context.fillStyle = this.colors[line[j]];
		context.fill();

		if (this.stroked)
		    context.stroke();
		
		x += this.cellsize;
            }

	    // beginning of the next line
	    x = this.startx; 
            y += this.cellsize;
	}
    },

    // updates the value of 'cells' according to the laws of Conway's Game of Life
    next_iteration: function() {
	
	newmatrix = [];
	firstline = [];
	lastline = [];

	matrix = this.cells;

	for (_=0; _ < matrix.length; ++_) {
            firstline.push(0);
            lastline.push(0);
	}

	newmatrix.push(firstline);

	for (i=1; i < matrix.length - 1; ++i) {
            newline = [];
            newline.push(0);
            line = matrix[i];
            for (j=1; j < matrix.length - 1; ++j) {
		cell = matrix[i][j];
		neighbours = matrix[i-1][j-1];
		neighbours += matrix[i-1][j];
		neighbours += matrix[i-1][j+1];
		neighbours += matrix[i][j-1];
		neighbours += matrix[i][j+1];
		neighbours += matrix[i+1][j-1];
		neighbours += matrix[i+1][j];
		neighbours += matrix[i+1][j+1];            

		newvalue = cell;
		if (cell === 1) {
                    if (neighbours < 2) {newvalue = 0;}
                    if (neighbours > 3) {newvalue = 0;}
                    if (neighbours === 2 || neighbours === 3) {newvalue = 1;}
		} else {
                    if (neighbours === 3) {newvalue = 1;}
		}
		newline.push(newvalue);
            }
            newline.push(0);
            newmatrix.push(newline);
	}
	newmatrix.push(lastline);
	
	this.cells = newmatrix;
    },
    
};


// helper function that returns a randomly filled matrix.
function random_matrix(width, length) {
    var matrix = [];
    for (i=0; i < length; ++i) {
        line = [];
        for (j = 0; j < width; ++j) {
            line.push(Math.floor(Math.random() * 2));
        }
        matrix.push(line);
    }
    return matrix;
}

function main(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    G_MATRIX.draw(context);
    G_MATRIX.next_iteration();
}

window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    G_MATRIX.cells = random_matrix(G_MATRIX.matsize, G_MATRIX.matsize);

    setInterval(main, G_MATRIX.refresh_rate, context, canvas);
};
