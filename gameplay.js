const letters = [
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

let first_move_flag = false;

class GameState {
    static SELECT_HAND_TILE = 0;
    static SELECT_BOARD_TILE = 1;
}

let CurrentGameState = GameState.SELECT_HAND_TILE;

    function draw() {
    for(let i = 0; i < 7; i++)
    {
        $("#drawn" + i).text(letters[Math.floor(Math.random() * letters.length)])
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

    if(CurrentGameState !== GameState.SELECT_BOARD_TILE) return;

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

    if(!first_move_flag) {
        $(".playtile").each(function() {
            if($(this).hasClass("placed-tile")) return;
            $(this).addClass("valid-tile")
                .on("click", validTileOnClick)
                .on("mouseenter", validTileOnMouseEnter)
                .on("mouseleave", validTileOnMouseLeave);
        });
    }

    CurrentGameState = GameState.SELECT_HAND_TILE;

    first_move_flag = true;

}

$(".valid-tile").on("mouseenter", validTileOnMouseEnter)
    .on("mouseleave", validTileOnMouseLeave)
    .on("click", validTileOnClick);