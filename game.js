var G_MATRIX = {
    
    matsize: 100,
    cellsize: 5,
    refresh_rate: 100,
    colors: ['red', 'white'],
    stroked: false,
    
};


function draw_matrix(context, matrix, startx, starty, cellsize) {
    var x = startx;
    var y = starty;
    var line;

    for (var i = 0; i < matrix.length; i++) {
        line = matrix[i];

	for (var j = 0; j < line.length; j++) {
	    
            context.beginPath();
            context.rect(x, y, G_MATRIX.cellsize, G_MATRIX.cellsize);
            context.fillStyle = G_MATRIX.colors[line[j]];
            context.fill();

	    if (G_MATRIX.stroked)
		context.stroke();
            
            x += G_MATRIX.cellsize;
        }

	// beginning of the next line
	x = startx; 
        y += G_MATRIX.cellsize;
    }
}

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

function next_matrix(matrix) {
    newmatrix = [];
    firstline = [];
    lastline = [];

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
    
    return newmatrix;
}


function artistic() {
    var matrix = [];
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    matrix.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

    return matrix;
}


var matrix = random_matrix(G_MATRIX.matsize, G_MATRIX.matsize);
//var matrix = artistic();

function main(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw_matrix(context, matrix, 0, 0, G_MATRIX.cellsize);  
    matrix = next_matrix(matrix);
}

window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    setInterval(main, G_MATRIX.refresh_rate, context, canvas);
    };
