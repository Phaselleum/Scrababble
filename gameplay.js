let letters = [
    "A", "A", "A", "A", "A", "A", "A", "A", "A",
    "B", "B",
    "C", "C",
    "D", "D", "D", "D",
    "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
    "F", "F",
    "G", "G", "G",
    "H", "H",
    "I", "I", "I", "I", "I", "I", "I", "I", "I",
    "J",
    "K",
    "L", "L", "L", "L",
    "M", "M",
    "N", "N", "N", "N", "N", "N",
    "O", "O", "O", "O", "O", "O", "O", "O",
    "P", "P",
    "Q",
    "R", "R", "R", "R", "R", "R",
    "S", "S", "S", "S",
    "T", "T", "T", "T", "T", "T",
    "U", "U", "U", "U",
    "V", "V",
    "W", "W",
    "X",
    "Y", "Y",
    "Z",
    " ", " "
];

shuffle(letters);

let fields = [];

for(let i = 0; i < 15; i++) {
    fields[i] = [];
}

let first_move_flag = false;

class GameState {
    static SELECT_HAND_TILE = 0;
    static SELECT_BOARD_TILE = 1;
}

let CurrentGameState = GameState.SELECT_HAND_TILE;

    function draw() {
    for(let i = 0; i < 7; i++)
    {
        $("#drawn" + i).text(letters.pop())
            .css("background-color","rgb(238, 220, 170)")
            .addClass("active-handtile");
    }
}

draw();

let selectedHandTile = "";

function activeHandTileOnClick() {

    if(CurrentGameState !== GameState.SELECT_HAND_TILE
        && CurrentGameState !== GameState.SELECT_BOARD_TILE) return;

    $(".active-handtile").css("background-color", "rgb(238, 220, 170)");
    $(this).css("background-color", "red");
    selectedHandTile = $(this).attr("id");

    CurrentGameState = GameState.SELECT_BOARD_TILE;

}

function activeHandTileOnMouseEnter() {

    if(CurrentGameState !== GameState.SELECT_HAND_TILE && CurrentGameState !== GameState.SELECT_BOARD_TILE) return;

    $(this).css("background-color", "rgb(250,208,103)")
        .css("cursor", "pointer");

}

function activeHandTileOnMouseLeave() {

    if($(this).css("background-color") === "rgb(255, 0, 0)") return;

    $(this).css("background-color", "rgb(238, 220, 170)")
        .css("cursor", "");

}

$(".active-handtile").on("click", activeHandTileOnClick)
    .on("mouseenter", activeHandTileOnMouseEnter)
    .on("mouseleave", activeHandTileOnMouseLeave);

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

    selectedHandTileObj.text("--")
        .css("background-color", "rgb(200,200,200)")
        .css("cursor", "")
        .removeClass("active-handtile")
        .off("click mouseenter mouseleave");
    $(".active-handtile").css("background-color", "rgb(238, 220, 170)");

    for(let i = 0; i < neighbourTiles.length; i++) {
        if(neighbourTiles[i].hasClass("placed-tile")) continue;
        neighbourTiles[i].addClass("valid-tile")
            .on("click", validTileOnClick)
            .on("mouseenter", validTileOnMouseEnter)
            .on("mouseleave", validTileOnMouseLeave);
    }

    CurrentGameState = GameState.SELECT_HAND_TILE;

    first_move_flag = true;

}

$(".valid-tile").on("mouseenter", validTileOnMouseEnter)
    .on("mouseleave", validTileOnMouseLeave)
    .on("click", validTileOnClick);

function getNeighbours(x, y)
{
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