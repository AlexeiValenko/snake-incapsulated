
(function() {
    var rows = 10;
    var cols = 10;
    var myInterval = 0;
//    var snackX = -1;
//    var snackY = -1;
    var score = 0;

    var snack = {
        snackX   : -1,
        snackY   : -1,
        putSnack : function putSnack(){
            do {
                this.snackX = Math.round(10 * Math.random());
                this.snackY = Math.round(10 * Math.random());

            } while (snackX == snake.posX && snackY == snake.posY);

        }
    };

    var snake = {
        posX: 0,
        posY: 0,
        moveTo: function moveTo() {

            if (snake.posX == snack.snackX && snake.posY == snack.snackY) {
                snack.snackX = -1;
                snack.snackY = -1;
                score++;
                $('#score').text(score);
            }
            matrix = initMatrix(rows, cols);

        },
        checkLimits: function checkLimits() {

            if (snake.posX == 10) snake.posX = 0;
            if (snake.posY == 10) snake.posY = 0;
            if (snake.posX == -1) snake.posX = 9;
            if (snake.posY == -1) snake.posY = 9;

        }

    };

    var matrix = initMatrix(rows,cols);



    $(document).ready(function () {
        drawMatrix(rows, cols, matrix);
        $('#score').text(score);
    });

    snake.moveTo(0,0);

    setInterval(function eat() {
        snack.putSnack();
    }, 3000);

    setInterval(function redraw() {
        drawMatrix(rows, cols, matrix);
    }, 50);



    function initMatrix(rows, cols) {
        var matrix = [];
        for (var r = 0; r < rows; r++) {
            var row = [];
            for (var c = 0; c < cols; c++) {
                if (r == snake.posX && c == snake.posY)
                    row.push(1);
                else if (r == snack.snackX && c == snack.snackY) {
                    row.push(2);
                }
                else row.push(0);

            }
            matrix.push(row);
        }
    return matrix;

    }

    function drawMatrix(rows, cols, matrix) {

        var stage = $('#stage').html('');
        for (var r = 0; r < rows; r += 1) {
            var row = $('<div class="row"></div>').appendTo(stage);
            for (var c = 0; c < cols; c += 1) {
                var col = $('<div class="col"></div>').appendTo(row);
                if (matrix[r][c] == 1) {
                    col.addClass('black');
                }
                if (matrix[r][c] == 2) {
                    col.addClass('snack');
                }

            }
        }
    }


    function makeMove(code){

        if (code == 37) {
            snake.posY -= 1;
        }
        if (code == 38) {
            snake.posX -= 1;
        }
        if (code == 39) {
            snake.posY += 1;
        }
        if (code == 40) {
            snake.posX += 1;
        }

        snake.checkLimits();

        snake.moveTo();
    };


    $(window).on('keydown', function (e) {

       if(myInterval) clearInterval(myInterval);
        myInterval = setInterval(function(){makeMove(e.keyCode);},100);

    });

})();