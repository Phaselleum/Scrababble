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
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
    "E": "E",
    "F": "F",
    "G": "G",
    "H": "H",
    "I": "I",
    "J": "J",
    "K": "K",
    "L": "L",
    "M": "M",
    "N": "N",
    "O": "O",
    "P": "P",
    "Q": "Q",
    "R": "R",
    "S": "S",
    "T": "T",
    "U": "U",
    "V": "V",
    "W": "W",
    "X": "X",
    "Y": "Y",
    "Z": "Z",
    " ": " "
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
        if($(this).text() === "--") {
            let tile = letters.pop();
            if(tile === undefined) {
                CurrentGameState = GameState.GAME_OVER;
                alert("Game Over!");
                return;
            }
            $(this).text(tile)
                .css("background-color","rgb(238, 220, 170)")
                .addClass("active-handtile").on("click", activeHandTileOnClick)
                .on("mouseenter", activeHandTileOnMouseEnter)
                .on("mouseleave", activeHandTileOnMouseLeave);
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
        .text(selectedHandTileObj.text());

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
            letters.push($(this).text());
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
    $(tile).text("--")
        .css("background-color", "rgb(200,200,200)")
        .css("cursor", "")
        .removeClass("active-handtile")
        .off("click mouseenter mouseleave");
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