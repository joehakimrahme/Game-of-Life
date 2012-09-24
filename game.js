var G_MATRIX = {

    config: {

        matsize: 5, // size of the side of the square.
                     // eg: 64 creates a 64x64 matrix.
        
        cellsize: 20,  // size of the side of a single cell
        
        colors: ['black', 'white'], // [background, foreground]

        stroked: false, // if true, will draw the borders of each cells

        start_pos: [0, 10], // Coordinates of the top right corner of the matrix
                           // relative to the beginning of the canvas.

        refresh_rate: 100, // speed of evolution of the game (in ms)
    },

    get_cell_value: function (i, j) {

        if (i<0)
            i += this.config.matsize;

        if (i >= this.config.matsize)
            i -= this.config.matsize;

        if (j < 0)
            j += this.config.matsize;

        if (j >= this.config.matsize)
            j -= this.config.matsize;

        return this.cells[i][j];
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
        
        for (i=0; i <= this.cells.length - 1; ++i) {

            newline = []

            for (j=0; j <= this.cells.length-1; ++j) {

                // gathering the number of live neighbours
                neighbours = this.get_cell_value(i-1, j-1);
                neighbours += this.get_cell_value(i-1, j);
                neighbours += this.get_cell_value(i-1, j+1);
                neighbours += this.get_cell_value(i, j-1);
                neighbours += this.get_cell_value(i, j+1);
                neighbours += this.get_cell_value(i+1, j-1);
                neighbours += this.get_cell_value(i+1, j);
                neighbours += this.get_cell_value(i+1, j+1);            

                // the current value of the cell
                value = this.get_cell_value(i, j);

                // modification of the value according to Conway's laws
                if (value === 1) {
                    if (neighbours < 2) {value = 0;} // underpopulation
                    if (neighbours > 3) {value = 0;} // overcrowding
                    if (neighbours === 2 || neighbours === 3) {value = 1;}
                }
                else {
                    if (neighbours === 3) {value = 1;} // reproduction
                }
                
                newline.push(value);
            }
            newmatrix.push(newline);
        }
        this.cells = newmatrix;
    },

    // helper function that returns a randomly filled matrix
    init: function () {
        var matrix = [];
        for (var i=0; i < this.config.matsize; ++i) {
            line = [];
            for (var j = 0; j < this.config.matsize; ++j) {
                // push random value: 0 or 1.
                line.push(Math.floor(Math.random() * 2));
            }
            matrix.push(line);
        }
        this.cells =  matrix;
    }
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
