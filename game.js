var G_MATRIX = {

    config: {

        matsize: 100, // size of the side of the square.
                     // eg: 64 creates a 64x64 matrix.
        
        cellsize: 2,  // size of the side of a single cell
        
        colors: ['black', 'white'], // [background, foreground]

        stroked: false, // if true, will draw the borders of each cells

        start_pos: [0, 0], // Coordinates of the top right corner of the matrix
                           // relative to the beginning of the canvas.

        refresh_rate: 1000 / 60, // speed of evolution of the game (in ms)
    },

    get_cell_value: function (i, j) {

        if (i<0) {
            i += this.config.matsize;
	}

        if (i >= this.config.matsize) {
            i -= this.config.matsize;
	}
	
        if (j < 0) {
            j += this.config.matsize;
	}

        if (j >= this.config.matsize) {
            j -= this.config.matsize;
	}
	

        return this.cells[i + j*this.config.matsize];
    },

    // draw the matrix on the context given in argument
    draw: function (context) {
        var x = this.config.start_pos[0];
        var y = this.config.start_pos[1];
        var line;

        for (var i = 0; i < this.config.matsize; i++) {
            for (var j = 0; j < this.config.matsize; j++) {

                context.beginPath();
                context.rect(x, y, this.config.cellsize, this.config.cellsize);
                context.fillStyle = this.config.colors[this.get_cell_value(j, i)];
                context.fill();

                if (this.config.stroked)
                    context.stroke();

		context.closePath();
                
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
        
        for (i=0; i < this.config.matsize; ++i) {
            for (j=0; j < this.config.matsize; ++j) {

                // gathering the number of live neighbours
                neighbours = this.get_cell_value(j-1, i-1);
                neighbours += this.get_cell_value(j-1, i);
                neighbours += this.get_cell_value(j-1, i+1);
                neighbours += this.get_cell_value(j, i-1);
                neighbours += this.get_cell_value(j, i+1);
                neighbours += this.get_cell_value(j+1, i-1);
                neighbours += this.get_cell_value(j+1, i);
                neighbours += this.get_cell_value(j+1, i+1);            

                // the current value of the cell
                value = this.get_cell_value(j, i);

                // modification of the value according to Conway's laws
                if (value === 1) {
                    if (neighbours < 2) {value = 0;} // underpopulation
                    if (neighbours > 3) {value = 0;} // overcrowding
                    if (neighbours === 2 || neighbours === 3) {value = 1;}
                }
                else {
                    if (neighbours === 3) {value = 1;} // reproduction
                }
                
                newmatrix.push(value);
            }
        }
        this.cells = newmatrix;
    },

    // helper function that returns a randomly filled matrix
    init: function () {
        var matrix = [];
        for (var i=0; i < this.config.matsize; ++i) {
            for (var j = 0; j < this.config.matsize; ++j) {
                // push random value: 0 or 1.
                matrix.push(Math.floor(Math.random() * 2));
            }
        }
        this.cells =  matrix;
    },

    blink: function() {
	this.config.matsize = 5;
	this.config.cellsize = 20;
	var matrix = [0,0,0,0,0,
		      0,0,1,0,0,
		      0,1,0,1,0,
		      0,1,0,1,0,
		      0,0,1,0,0];
	this.cells = matrix;
    }
};


// polyfill to get a RequestAnimationFrame
window.requestAnimFrame = (function(callback) {

    return window.requestAnimationFrame ||
     	window.webkitRequestAnimationFrame ||
    	window.mozRequestAnimationFrame ||
    	window.oRequestAnimationFrame ||
    	window.msRequestAnimationFrame ||
	function(callback) {
            window.setTimeout(callback, G_MATRIX.config.refresh_rate);
	};
})();


function animate (canvas) {

    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    G_MATRIX.draw(context);

    G_MATRIX.next_iteration();

    // request new frame
    requestAnimFrame(function() {
        animate(canvas);
    });
}
    

window.onload = function () {
    var canvas = document.getElementById('myCanvas');

    // random initial state
    //G_MATRIX.blink();
    G_MATRIX.init();

    // launch animation
    animate(canvas);
};
