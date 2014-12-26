var log = document.getElementById("log");
var table = document.getElementById("mytable");
var rowheight = table.rows[0].offsetHeight;
var columnwidth = table.rows[0].cells[1].offsetWidth;
var tableheight = $(table).css("height");
var tablewidth = $(table).css("width");
var posleft = $(table).position().left;
var postop = $(table).position().top;
var rows, cols, newrow, newcolumn, newcell,
	k = 0, noofrows = 0, noofcols = 0,
	oldY = "unchanged", newY = "unchanged", oldX = "unchanged", newX = "unchanged";

/* Set initial CSS */

$("#draggabley").css({
  'top': postop + rowheight,
  'left': posleft,
  'width': tablewidth
});

$("#draggablex").css({
  'top': postop + "px",
  'left': posleft + Number(tablewidth.substring(0,tablewidth.length-2)) + "px",
  'height': tableheight
});

updateLog(oldX, oldY, newX, newY);


/*
 * function for adding a row
 */

function addRow() {
    rows = table.rows.length;
    cols = table.rows[0].cells.length;
    newrow = table.insertRow(rows);

    for (var i = 0; i < cols; i++, k++) {
        newcell = newrow.insertCell(i);
        newcell.innerHTML = k;
        if (i == cols - 1) {
            newcell.innerHTML = '<button type="button" class="removerow"> &times </button>';
        }
    };
}


/*
 * function for adding a column
 */

function addColumn() {
    rows = table.rows.length;
    cols = table.rows[0].cells.length;

    for (var i = 0; i < rows; i++,k++) {
        newcell = table.rows[i].insertCell(cols);
        newcell.innerHTML = k;
		if (i == 0) {
            newcell.innerHTML = '<button type="button" class="removecolumn"> &times </button>';
        }
    };

    var tablewidth = $(table).css("width");
}



/*
 * function for deleting a row
 */

$(document).on('click', 'button.removerow', function() {
    
    $(this).closest('tr').remove();
    
    updateDraggableYPosition();
    updateDraggableXPosition();
    return false;
});



/*
 * function for deleting a column
 */

$(document).on('click', 'button.removecolumn', function() {

    rows = table.rows.length;
    var index = $(this).closest('tr').children().index($(this).closest('td'));

    for (var i = 0; i < rows; i++) {
        table.rows[i].deleteCell(index);
    };

    updateDraggableYPosition();
    updateDraggableXPosition();
    return false;
});



/*
 * Add Rows On drag
 */

$(function() {

    $("#draggabley").draggable({

        axis: "y",
        scroll: true,
        scrollbarSensetivity: 1,
        scrollSpeed: 100,
        start: function() {
            updateDraggableYPosition();
            updateLog(oldX, oldY, newX, newY);
        },

        drag: function() {

            newY = $("#draggabley").offset().top;
            updateLog(oldX, oldY, newX, newY);

            var noofrows = Math.round((newY - oldY) / rowheight);

            if (newY > oldY) {
                for (var i = 0; i < noofrows; i++) {
                    addRow();
                    updateDraggableYPosition();
                };

            } else if (newY < oldY) {
                $('#draggabley').css({
                    top: oldY + 'px'
                });
            }
        },

        stop: function() {
            updateDraggableYPosition();
            updateLog(oldX, oldY, newX, newY);
        }

    });
});

/*
 * Update Position of Draggable Y and Change the height of Draggable X
 */

function updateDraggableYPosition() {
    tableheight = Number($(table).css("height").substring(0,$(table).css("height").length-2));
    tablewidth = $(table).css("width");

    $("#draggabley").css({
        'top': tableheight + postop + "px",
        'width' : tablewidth
    });

    $("#draggablex").css({
        'height' : tableheight + "px",
        'line-height' : tableheight + "px"
    });

    oldY = $("#draggabley").offset().top;
}


/*
 * Add Columns On drag
 */

$(function() {

    $("#draggablex").draggable({

        axis: "x",
        scroll: true,
        scrollbarSensetivity: 1,
        scrollSpeed: 100,
        start: function() {
            updateDraggableXPosition();
            updateLog(oldX, oldY, newX, newY);
        },

        drag: function() {

            newX = $("#draggablex").offset().left;
            updateLog(oldX, oldY, newX, newY);

            var noofcols = Math.round((newX - oldX) / columnwidth);

            if (newX > oldX) {
                for (var i = 0; i < noofcols; i++) {
                    addColumn();
                    updateDraggableXPosition();
                };

            } else if (newX < oldX) {
                $('#draggablex').css({
                    left: oldX + 'px'
                });
            }
        },

        stop: function() {
            updateDraggableXPosition();
            updateLog(oldX, oldY, newX, newY);
        }

    });
});


/*
 * Update Position of Draggable X and Change the width of Draggable Y
 */

function updateDraggableXPosition() {
    tablewidth = Number($(table).css("width").substring(0,$(table).css("width").length-2));
    tableheight = $(table).css("height");

    $("#draggablex").css({
        'left': tablewidth + posleft + "px",
        'height' : tableheight
    });

    $("#draggabley").css({
        'width' : tablewidth,
    });

    oldX = $("#draggablex").offset().left;
}


function updateLog(oldX, oldY, newX, newY) {
	log.innerHTML="oldX = " + oldX + " | oldY = " + oldY + " | newX = " + newX + " | newY = " + newY;
}