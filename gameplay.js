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
    "*"
];

shuffle(letters);
let oldLetters = letters.slice();

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
    "*": {str: ".", val: 0},
};

let dictionary = [{lang: "en", words: []}];

let listedWords = [];
let oldListedWords = [];

let fields = [];
let oldFields = [];
for(let i = 0; i < 15; i++) {
    fields[i] = [];
    for(let j = 0; j < 15; j++) {fields[i][j] = "";}
    oldFields[i] = fields[i].slice();
}


let first_move_flag = false;
let tiles_placed_flag = false;

let score = 0;

class GameState {
    static SELECT_HAND_TILE = 0;
    static SELECT_BOARD_TILE = 1;
    static SELECT_REPLACE_TILES = 2;
    static GAME_OVER = 3;
}

let CurrentGameState = GameState.SELECT_HAND_TILE;

let oldState = $("#game-wrapper").html();

function loadWords() {
    $.get("words/dictionary-en.txt", function(data) {
        dictionary[0].words = data.split("\n");
        console.log("dictionary loaded. First word: " + dictionary[0].words[0]);
    });
}
loadWords();

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
            //console.log(lookupTable[tile].val);
            $(this).find(".tile-value").text(lookupTable[tile].val);
        }
    });
    tiles_placed_flag = false;
    $("#redraw-button").removeAttr("disabled");
    oldState = $("#game-wrapper").html();
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
        .addClass("new-tile")
        .html(selectedHandTileObj.html());

    fields[tileX][tileY] = lookupTable[selectedHandTileObj.find(".letter").text()].str;
    //console.log("vtoc: " + fields[tileX][tileY]);
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

        //check for word validity, else reset the turn

        if(!findWords()) resetTurn();

        oldState = $("#game-wrapper").html();
        oldLetters = letters.slice();
        for(let i = 0; i < 15; i++) oldFields[i] = fields[i].slice();
        oldListedWords = listedWords.slice();

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

function updateScore() {
    $("#score").text(score);
}

function findMultipliers(tileId) {
    ///WIP
    let multiplicator = 1;

    let tileX = tileId.split("-")[1];
    let tileY = tileId.split("-")[2];

    for(let i = tileX + 1; i < 15; i++) {
        if(fields[i][tileY] === "") break;
        if($(`#tile-${i}-${tileY}`).hasClass("double-word")) multiplicator *= 2;
        if($(`#tile-${i}-${tileY}`).hasClass("triple-word")) multiplicator *= 3;
    }

    for(let i = tileX - 1; i >= 0; i--) {
        if(fields[i][tileY] === "") break;
        if($(`#tile-${i}-${tileY}`).hasClass("double-word")) multiplicator *= 2;
        if($(`#tile-${i}-${tileY}`).hasClass("triple-word")) multiplicator *= 3;
    }

    for(let i = tileY + 1; i < 15; i++) {
        if(fields[tileX][i] === "") break;
        if($(`#tile-${tileX}-${i}`).hasClass("double-word")) multiplicator *= 2;
        if($(`#tile-${tileX}-${i}`).hasClass("triple-word")) multiplicator *= 3;
    }

    for(let i = tileX - 1; i >= 0; i--) {
        if(fields[i][tileY] === "") break;
        if($(`#tile-${i}-${tileY}`).hasClass("double-word")) multiplicator *= 2;
        if($(`#tile-${i}-${tileY}`).hasClass("triple-word")) multiplicator *= 3;
    }

    return multiplicator;
}

/**
 * Find all words in the game and check each for validity. Reset the turn on fail.
 */
function findWords() {
    let foundWords = [];

    //find words across
    for(let i = 0; i < 15; i++) {
        let currentWord = "";
        for(let j = 0; j < 15; j++) {
            let charstr = fields[j][i];
            if(charstr === "") {
                if(currentWord === "") continue;
                //don't push 1-letter words
                if(currentWord.length > 1) {
                    foundWords.push(currentWord);
                }
                currentWord = "";
            } else {
                currentWord += charstr;
            }
        }
    }

    //find words down
    for(let i = 0; i < 15; i++) {
        let currentWord = "";
        for(let j = 0; j < 15; j++) {
            let charstr = fields[i][j];
            if(charstr === "") {
                if(currentWord === "") continue;
                //don't push 1-letter words
                if(currentWord.length > 1) {
                    foundWords.push(currentWord);
                }
                currentWord = "";
            } else {
                currentWord += charstr;
            }
        }
    }

    console.log(foundWords);
    for(let i = 0; i < foundWords.length; i++) {
        if(!checkWord(foundWords[i])) {
            alert("Word not in dictionary: " + foundWords[i]);
            return false;
        }
    }
    return true;
}

function checkWord(word) {
    for(let i = 0; i < dictionary.length; i++) {
        const regexp = new RegExp(`^${word}$`, "i");
        for(let j = 0; j < dictionary[i].words.length; j++) {
            if(regexp.test(dictionary[i].words[j])) {console.log(dictionary[i].words[j]);return true;}
        }
    }
    return false;
}

/**
 * Check a given word object for matched in already found words. Add to listedWords or replace where appropriate
 * @param newWord word object with .word, .x, .y and .direction
 */
function checkListedWordDuplicate(newWord) {
    for(let i = 0; i < listedWords.length; i++) {
        if(newWord.direction === listedWords[i].direction
            && (newWord.x === listedWords[i].x || newWord.y === listedWords[i].y)
            && newWord.word.includes(listedWords[i].word)) {
            listedWords[i] = newWord;
            return;
        }
    }
    listedWords.push(newWord);
}

function resetTurn() {

    $("#game-wrapper").html(oldState);
    letters = oldLetters.slice();
    for(let i = 0; i < 15; i++) fields[i] = oldFields[i].slice();
    listedWords = oldListedWords.slice();

    $(".valid-tile").on("mouseenter", validTileOnMouseEnter)
        .on("mouseleave", validTileOnMouseLeave)
        .on("click", validTileOnClick);

    $(".active-handtile").on("mouseenter", activeHandTileOnMouseEnter)
        .on("mouseleave", activeHandTileOnMouseLeave)
        .on("click", activeHandTileOnClick);


    CurrentGameState = GameState.SELECT_HAND_TILE;
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



/*function downloadFilteredFile(url) {
    let outputFilename = url;
    $.get("words/" + url, function (data) {
        // Split into lines (handles \r\n and \n)
        const lines = data.split(/\r?\n/);

        // Filter lines between 2 and 15 characters
        const filtered = lines.filter(function (line) {
            const len = line.length;
            return len >= 2 && len <= 15;
        });

        // Join back to a single string
        const result = filtered.join('\n');

        // Create a Blob and trigger download
        const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        const urlObject = URL.createObjectURL(blob);

        link.href = urlObject;
        link.download = outputFilename;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(urlObject);
    }, 'text');
}*/