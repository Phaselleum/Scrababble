let letters = [
    "A", "A", "A", "A",
    "B",
    "C",
    "D", "D",
    "E", "E", "E", "E", "E", "E",
    "F",
    "G",
    "H",
    "I", "I", "I", "I",
    "J",
    "K",
    "L", "L",
    "M",
    "N", "N", "N",
    "O", "O", "O", "O",
    "P",
    "Q",
    "R", "R",
    "S", "S",
    "T", "T",
    "U", "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " "
];

shuffle(letters);

const lookupTable = {
    "A": {str: "A", val: 1},
    "B": {str: "B", val: 3},
    "C": {str: "C", val: 3},
    "D": {str: "D", val: 2},
    "E": {str: "E", val: 1},
    "F": {str: "F", val: 4},
    "G": {str: "G", val: 2},
    "H": {str: "H", val: 4},
    "I": {str: "I", val: 1},
    "J": {str: "J", val: 8},
    "K": {str: "K", val: 5},
    "L": {str: "L", val: 1},
    "M": {str: "M", val: 3},
    "N": {str: "N", val: 1},
    "O": {str: "O", val: 1},
    "P": {str: "P", val: 3},
    "Q": {str: "Q", val: 10},
    "R": {str: "R", val: 1},
    "S": {str: "S", val: 1},
    "T": {str: "T", val: 1},
    "U": {str: "U", val: 1},
    "V": {str: "V", val: 4},
    "W": {str: "W", val: 4},
    "X": {str: "N", val: 8},
    "Y": {str: "Y", val: 4},
    "Z": {str: "Z", val: 10},
    " ": {str: " ", val: 0},
};

let fields = [];
for(let i = 0; i < 15; i++) { fields[i] = []; }

let first_move_flag = false;
let tiles_placed_flag = false;

class GameState {
    static SELECT_HAND_TILE = 0;
    static SELECT_BOARD_TILE = 1;
    static SELECT_REPLACE_TILES = 2;
    static GAME_OVER = 3;
}

let CurrentGameState = GameState.SELECT_HAND_TILE;

function draw() {
    $(".handtile").each(function() {
        if($(this).find(".letter").text() === "--") {
            let tile = letters.pop();
            if(tile === undefined) {
                CurrentGameState = GameState.GAME_OVER;
                alert("Game Over!");
                return;
            }
            $(this).find(".letter").text(tile);
            $(this).css("background-color","rgb(238, 220, 170)")
                .addClass("active-handtile").on("click", activeHandTileOnClick)
                .on("mouseenter", activeHandTileOnMouseEnter)
                .on("mouseleave", activeHandTileOnMouseLeave);
            console.log(lookupTable[tile].val);
            $(this).find(".tile-value").text(lookupTable[tile].val);
        }
    });
    tiles_placed_flag = false;
    $("#redraw-button").removeAttr("disabled");
}

draw();

let selectedHandTile = "";

function activeHandTileOnClick() {

    if(CurrentGameState === GameState.SELECT_REPLACE_TILES) selectReplacementTiles(this);

    if(CurrentGameState !== GameState.SELECT_HAND_TILE
        && CurrentGameState !== GameState.SELECT_BOARD_TILE) return;

    $(".active-handtile").css("background-color", "rgb(238, 220, 170)");
    $(this).css("background-color", "red");
    selectedHandTile = $(this).attr("id");

    CurrentGameState = GameState.SELECT_BOARD_TILE;

}

function activeHandTileOnMouseEnter() {

    if(CurrentGameState !== GameState.SELECT_HAND_TILE
        && CurrentGameState !== GameState.SELECT_BOARD_TILE
        && CurrentGameState !== GameState.SELECT_REPLACE_TILES) return;

    if($(this).css("background-color") === "rgb(255, 0, 0)") return;

    $(this).css("background-color", "rgb(250,208,103)")
        .css("cursor", "pointer");

}

function activeHandTileOnMouseLeave() {

    if(CurrentGameState !== GameState.SELECT_HAND_TILE
        && CurrentGameState !== GameState.SELECT_BOARD_TILE
        && CurrentGameState !== GameState.SELECT_REPLACE_TILES) return;

    if($(this).css("background-color") === "rgb(255, 0, 0)") return;

    $(this).css("background-color", "rgb(238, 220, 170)")
        .css("cursor", "");

}

function validTileOnMouseEnter() {

    if(CurrentGameState !== GameState.SELECT_BOARD_TILE) return;

    $(this).css("background-color", "aquamarine")
        .css("cursor", "pointer");

}

function validTileOnMouseLeave() {

    if(CurrentGameState !== GameState.SELECT_BOARD_TILE) return;

    if($(this).css("background-color") === "rgb(238, 220, 170)") return;

    $(this).css("background-color", "")
        .css("cursor", "");

}

function validTileOnClick() {

    if (CurrentGameState !== GameState.SELECT_BOARD_TILE) return;

    let tileId = $(this).attr("id");
    let tileX = tileId.split("-")[1];
    let tileY = tileId.split("-")[2];
    let neighbourTiles = getNeighbours(tileX, tileY);

    let selectedHandTileObj = $("#" + selectedHandTile);

    $(this).css("background-color", "rgb(238, 220, 170)")
        .off("click mouseenter mouseleave")
        .css("cursor", "")
        .removeClass("active-tile")
        .addClass("placed-tile")
        .html(selectedHandTileObj.html());

    unsetHandtile("#" + selectedHandTile);

    $(".active-handtile").css("background-color", "rgb(238, 220, 170)");

    for(let i = 0; i < neighbourTiles.length; i++) {
        if(neighbourTiles[i].hasClass("placed-tile")) continue;
        neighbourTiles[i].addClass("valid-tile")
            .on("click", validTileOnClick)
            .on("mouseenter", validTileOnMouseEnter)
            .on("mouseleave", validTileOnMouseLeave);
    }

    $("#redraw-button").attr("disabled", "disabled");

    CurrentGameState = GameState.SELECT_HAND_TILE;
    first_move_flag = true;
    tiles_placed_flag = true;

}

$(".valid-tile").on("mouseenter", validTileOnMouseEnter)
    .on("mouseleave", validTileOnMouseLeave)
    .on("click", validTileOnClick);

function endTurn() {

    if(CurrentGameState === GameState.SELECT_HAND_TILE
        || CurrentGameState === GameState.SELECT_BOARD_TILE) {
        draw();
        return;
    }

    if(CurrentGameState === GameState.SELECT_REPLACE_TILES) {
        $(".selected-handtile").each(function() {
            letters.push($(this).find(".letter").text());
            unsetHandtile(this);
        });
        shuffle(letters);
        draw();
        $("#redraw-button").css("background-color", "");

        CurrentGameState = GameState.SELECT_HAND_TILE;
        return;
    }
}

function redraw() {

    if(CurrentGameState !== GameState.SELECT_HAND_TILE
        && CurrentGameState !== GameState.SELECT_BOARD_TILE) return;
    if(tiles_placed_flag) return;

    $(".active-handtile").css("background-color", "rgb(238, 220, 170)")
        .removeClass("selected-handtile");

    $("#redraw-button").css("background-color", "red");

    CurrentGameState = GameState.SELECT_REPLACE_TILES;

}

function selectReplacementTiles(obj) {

    if($(obj).css("background-color") === "rgb(255, 0, 0)") {
        $(obj).css("background-color", "")
            .removeClass("selected-handtile");
    } else {
        $(obj).css("background-color", "rgb(255, 0, 0)")
            .addClass("selected-handtile");
    }

}

function unsetHandtile(tile) {
    $(tile).find(".letter").text("--");
    $(tile).css("background-color", "rgb(200,200,200)")
        .css("cursor", "")
        .removeClass("active-handtile")
        .off("click mouseenter mouseleave");
    $(tile).find(".tile-value").text("0");
}

/********************
 * FUNCTION LIBRARY *
 ********************/

function getNeighbours(x, y) {
    let neighbourTiles = [];
    x = parseInt(x);
    y = parseInt(y);

    try {
        neighbourTiles.push($(`#tile-${x - 1}-${y}`));
    } catch (err) {}
    try {
        neighbourTiles.push($(`#tile-${x + 1}-${y}`));
    } catch (err) {}
    try {
        neighbourTiles.push($(`#tile-${x}-${y - 1}`));
    } catch (err) {}
    try {
        neighbourTiles.push($(`#tile-${x}-${y + 1}`));
    } catch (err) {}

    return neighbourTiles;
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}