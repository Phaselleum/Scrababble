let letters = [];

let oldLetters = letters.slice();

const lookupTable = {
    "en": {
    "A": {str: "A", val: 1, freq: 4},
    "B": {str: "B", val: 3, freq: 1},
    "C": {str: "C", val: 3, freq: 1},
    "D": {str: "D", val: 2, freq: 2},
    "E": {str: "E", val: 1, freq: 6},
    "F": {str: "F", val: 4, freq: 1},
    "G": {str: "G", val: 2, freq: 1},
    "H": {str: "H", val: 4, freq: 1},
    "I": {str: "I", val: 1, freq: 4},
    "J": {str: "J", val: 8, freq: 1},
    "K": {str: "K", val: 5, freq: 1},
    "L": {str: "L", val: 1, freq: 2},
    "M": {str: "M", val: 3, freq: 1},
    "N": {str: "N", val: 1, freq: 3},
    "O": {str: "O", val: 1, freq: 4},
    "P": {str: "P", val: 3, freq: 1},
    "Q": {str: "Q", val: 10, freq: 1},
    "R": {str: "R", val: 1, freq: 3},
    "S": {str: "S", val: 1, freq: 2},
    "T": {str: "T", val: 1, freq: 3},
    "U": {str: "U", val: 1, freq: 2},
    "V": {str: "V", val: 4, freq: 1},
    "W": {str: "W", val: 4, freq: 1},
    "X": {str: "N", val: 8, freq: 1},
    "Y": {str: "Y", val: 4, freq: 1},
    "Z": {str: "Z", val: 10, freq: 1},
    "*": {str: ".", val: 0, freq: 1}
},
    "de": {
    "A": {str: "A", val: 1, freq: 2},
    "B": {str: "B", val: 3, freq: 1},
    "C": {str: "C", val: 4, freq: 1},
    "D": {str: "D", val: 1, freq: 2},
    "E": {str: "E", val: 1, freq: 7},
    "F": {str: "F", val: 4, freq: 1},
    "G": {str: "G", val: 2, freq: 1},
    "H": {str: "H", val: 2, freq: 2},
    "I": {str: "I", val: 1, freq: 3},
    "J": {str: "J", val: 6, freq: 1},
    "K": {str: "K", val: 4, freq: 1},
    "L": {str: "L", val: 2, freq: 1},
    "M": {str: "M", val: 3, freq: 2},
    "N": {str: "N", val: 1, freq: 4},
    "O": {str: "O", val: 2, freq: 1},
    "P": {str: "P", val: 4, freq: 1},
    "Q": {str: "Q", val: 10, freq: 1},
    "R": {str: "R", val: 1, freq: 3},
    "S": {str: "S", val: 1, freq: 3},
    "T": {str: "T", val: 1, freq: 3},
    "U": {str: "U", val: 1, freq: 3},
    "V": {str: "V", val: 6, freq: 1},
    "W": {str: "W", val: 3, freq: 1},
    "X": {str: "N", val: 8, freq: 1},
    "Y": {str: "Y", val: 10, freq: 1},
    "Z": {str: "Z", val: 3, freq: 1},
    "Ä": {str: "AE", val: 6, freq: 1},
    "Ö": {str: "OE", val: 8, freq: 1},
    "Ü": {str: "UE", val: 6, freq: 1},
    "*": {str: ".", val: 0, freq: 1}
},
    "es": {
    "A": {str: "A", val: 1, freq: 6},
    "B": {str: "B", val: 3, freq: 1},
    "C": {str: "C", val: 3, freq: 2},
    "D": {str: "D", val: 2, freq: 2},
    "E": {str: "E", val: 1, freq: 6},
    "F": {str: "F", val: 4, freq: 1},
    "G": {str: "G", val: 2, freq: 1},
    "H": {str: "H", val: 4, freq: 1},
    "I": {str: "I", val: 1, freq: 3},
    "J": {str: "J", val: 8, freq: 1},
    "L": {str: "L", val: 1, freq: 2},
    "M": {str: "M", val: 3, freq: 1},
    "N": {str: "N", val: 1, freq: 2},
    "O": {str: "O", val: 1, freq: 4},
    "P": {str: "P", val: 3, freq: 1},
    "Q": {str: "Q", val: 5, freq: 1},
    "R": {str: "R", val: 1, freq: 2},
    "S": {str: "S", val: 1, freq: 3},
    "T": {str: "T", val: 1, freq: 2},
    "U": {str: "U", val: 1, freq: 2},
    "V": {str: "V", val: 4, freq: 1},
    "X": {str: "N", val: 8, freq: 1},
    "Y": {str: "Y", val: 4, freq: 1},
    "Z": {str: "Z", val: 10, freq: 1},
    "CH": {str: "CH", val: 5, freq: 1},
    "LL": {str: "LL", val: 8, freq: 1},
    "RR": {str: "RR", val: 8, freq: 1},
    "Ñ": {str: "NY", val: 8, freq: 1},
    "*": {str: ".", val: 0, freq: 1}
},
    "fr": {
    "A": {str: "A", val: 1, freq: 4},
    "B": {str: "B", val: 3, freq: 1},
    "C": {str: "C", val: 3, freq: 1},
    "D": {str: "D", val: 2, freq: 1},
    "E": {str: "E", val: 1, freq: 7},
    "F": {str: "F", val: 4, freq: 1},
    "G": {str: "G", val: 2, freq: 1},
    "H": {str: "H", val: 4, freq: 1},
    "I": {str: "I", val: 1, freq: 4},
    "J": {str: "J", val: 8, freq: 1},
    "K": {str: "J", val: 6, freq: 1},
    "L": {str: "L", val: 1, freq: 2},
    "M": {str: "M", val: 2, freq: 1},
    "N": {str: "N", val: 1, freq: 3},
    "O": {str: "O", val: 1, freq: 3},
    "P": {str: "P", val: 3, freq: 1},
    "Q": {str: "Q", val: 8, freq: 1},
    "R": {str: "R", val: 1, freq: 3},
    "S": {str: "S", val: 1, freq: 3},
    "T": {str: "T", val: 1, freq: 3},
    "U": {str: "U", val: 1, freq: 3},
    "V": {str: "V", val: 4, freq: 1},
    "W": {str: "V", val: 10, freq: 1},
    "X": {str: "N", val: 10, freq: 1},
    "Y": {str: "Y", val: 10, freq: 1},
    "Z": {str: "Z", val: 10, freq: 1},
    "*": {str: ".", val: 0, freq: 1}
},
    "pl": {
    "A": {str: "A", val: 1, freq: 4},
    "B": {str: "B", val: 3, freq: 1},
    "C": {str: "C", val: 2, freq: 1},
    "D": {str: "D", val: 2, freq: 1},
    "E": {str: "E", val: 1, freq: 3},
    "F": {str: "F", val: 5, freq: 1},
    "G": {str: "G", val: 3, freq: 1},
    "H": {str: "H", val: 3, freq: 1},
    "I": {str: "I", val: 1, freq: 4},
    "J": {str: "J", val: 3, freq: 1},
    "K": {str: "J", val: 2, freq: 1},
    "M": {str: "M", val: 2, freq: 1},
    "N": {str: "N", val: 1, freq: 2},
    "O": {str: "O", val: 1, freq: 3},
    "P": {str: "P", val: 2, freq: 1},
    "R": {str: "R", val: 1, freq: 2},
    "S": {str: "S", val: 1, freq: 2},
    "T": {str: "T", val: 2, freq: 1},
    "U": {str: "U", val: 3, freq: 1},
    "W": {str: "V", val: 1, freq: 2},
    "Y": {str: "Y", val: 2, freq: 2},
    "Z": {str: "Z", val: 1, freq: 2},
    "Ł": {str: "W", val: 3, freq: 1},
    "Ą": {str: "A", val: 5, freq: 1},
    "Ę": {str: "E", val: 5, freq: 1},
    "Ó": {str: "U", val: 5, freq: 1},
    "Ś": {str: "S", val: 5, freq: 1},
    "Ż": {str: "Z", val: 5, freq: 1},
    "Ć": {str: "CI", val: 6, freq: 1},
    "Ń": {str: "NY", val: 7, freq: 1},
    "Ź": {str: "Z", val: 9, freq: 1},
    "*": {str: ".", val: 0, freq: 1}
}, "ga": {
    "A": {str: "A", val: 1, freq: 6},
    "B": {str: "B", val: 10, freq: 1},
    "C": {str: "C", val: 2, freq: 2},
    "D": {str: "D", val: 2, freq: 2},
    "E": {str: "E", val: 1, freq: 3},
    "F": {str: "F", val: 4, freq: 1},
    "G": {str: "G", val: 2, freq: 2},
    "H": {str: "H", val: 1, freq: 5},
    "I": {str: "I", val: 1, freq: 5},
    "L": {str: "L", val: 2, freq: 2},
    "M": {str: "M", val: 3, freq: 1},
    "N": {str: "N", val: 1, freq: 3},
    "O": {str: "O", val: 2, freq: 2},
    "P": {str: "P", val: 10, freq: 1},
    "R": {str: "R", val: 1, freq: 3},
    "S": {str: "S", val: 1, freq: 3},
    "T": {str: "T", val: 2, freq: 2},
    "U": {str: "U", val: 2, freq: 2},
    "Á": {str: "A", val: 4, freq: 1},
    "Í": {str: "I", val: 4, freq: 1},
    "É": {str: "E", val: 8, freq: 1},
    "Ó": {str: "O", val: 8, freq: 1},
    "Ú": {str: "U", val: 8, freq: 1},
    "*": {str: ".", val: 0, freq: 1}
}, "cy": {
    "A": {str: "A", val: 1, freq: 5},
    "B": {str: "B", val: 3, freq: 1},
    "C": {str: "C", val: 2, freq: 1},
    "D": {str: "D", val: 2, freq: 3},
    "E": {str: "E", val: 1, freq: 4},
    "F": {str: "F", val: 5, freq: 1},
    "G": {str: "G", val: 3, freq: 1},
    "H": {str: "H", val: 3, freq: 1},
    "I": {str: "I", val: 1, freq: 3},
    "J": {str: "J", val: 3, freq: 1},
    "L": {str: "L", val: 2, freq: 1},
    "M": {str: "M", val: 2, freq: 1},
    "N": {str: "N", val: 1, freq: 4},
    "O": {str: "O", val: 1, freq: 3},
    "P": {str: "P", val: 2, freq: 1},
    "R": {str: "R", val: 1, freq: 3},
    "S": {str: "S", val: 1, freq: 1},
    "T": {str: "T", val: 2, freq: 1},
    "U": {str: "U", val: 3, freq: 1},
    "W": {str: "V", val: 1, freq: 2},
    "Y": {str: "Y", val: 2, freq: 3},
    "DD": {str: "DD", val: 3, freq: 2},
    "FF": {str: "FF", val: 5, freq: 1},
    "TH": {str: "TH", val: 5, freq: 1},
    "CH": {str: "CH", val: 5, freq: 1},
    "LL": {str: "LL", val: 5, freq: 1},
    "NG": {str: "NG", val: 5, freq: 1},
    "RH": {str: "RH", val: 6, freq: 1},
    "*": {str: ".", val: 0, freq: 1}
}};

let langs = [new URL(window.location.href).searchParams.get("lang0") ?? "en",
    new URL(window.location.href).searchParams.get("lang1") ?? "de"];

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
    for(let i = 0; i < langs.length; i++) {
        dictionary.push({lang: langs[i], words: []});

        $.get("words/dictionary-" + langs[i] + ".txt", function(data) {
            dictionary[i].words = data.split("\n");
            console.log("dictionary loaded. First word: " + dictionary[i].words[0]);
        });
    }
}
loadWords();

function setupLetters() {
    for(let i = 0; i < langs.length; i++) {
        for(let [letter,obj] of Object.entries(lookupTable[langs[i]])) {
            for(let j = 0; j < obj.freq; j++) {
                letters.push(letter);
            }
        }
    }
    shuffle(letters);
    console.log(letters);

    $(".handtile-sample").find(".tile-value").text(langs[0]);
    $(".handtile-sample").find(".tile-alt-value").text(langs[1]);
}
setupLetters();

function draw() {
    $(".handtile").each(function() {
        if($(this).find(".letter").text() === "--") {
            let tile = letters.pop();
            if(tile === undefined) {
                return;
            }
            $(this).find(".letter").text(tile);
            $(this).css("background-color","rgb(238, 220, 170)")
                .addClass("active-handtile").on("click", activeHandTileOnClick)
                .on("mouseenter", activeHandTileOnMouseEnter)
                .on("mouseleave", activeHandTileOnMouseLeave);
            //console.log(lookupTable[tile].val);
            $(this).find(".tile-value").text(lookupTable[langs[0]][tile] ? lookupTable[langs[0]][tile].val : "-");
            $(this).find(".tile-alt-value").text(lookupTable[langs[1]][tile] ? lookupTable[langs[1]][tile].val : "-");
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

    let literal = selectedHandTileObj.find(".letter").text();
    fields[tileX][tileY] = literal; //TODO replace literals at dictionary stage (temporarily). Offer both options upon scoring
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

        if($(".active-handtile").length === 0) {
            endGame();
        }
        uploadState();
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
        uploadState();
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

/**
 * Find all words in the game and check each for validity. Reset the turn on fail.
 */
function findWords() {
    let foundWords = [];

    //find words across
    for(let i = 0; i < 15; i++) {
        let currentWord = "";
        let wordStart = 0;
        for(let j = 0; j < 15; j++) {
            let charstr = fields[j][i];
            if(charstr === "") {
                if(currentWord === "") continue;
                //don't push 1-letter words
                if(currentWord.length > 1) {
                    let wordObj = {
                        word: currentWord,
                        x: wordStart,
                        y: i,
                        end: j,
                        direction: "across",
                        langs: []
                    };
                    foundWords.push(wordObj);
                }
                currentWord = "";
            } else {
                if(currentWord === "") {
                    wordStart = j;
                }
                currentWord += charstr;
            }
        }
    }

    //find words down
    for(let i = 0; i < 15; i++) {
        let currentWord = "";
        let wordStart = 0;
        for(let j = 0; j < 15; j++) {
            let charstr = fields[i][j];
            if(charstr === "") {
                if(currentWord === "") continue;
                //don't push 1-letter words
                if(currentWord.length > 1) {
                    let wordObj = {
                        word: currentWord,
                        x: i,
                        y: wordStart,
                        end: j,
                        direction: "down",
                        langs: []
                    };
                    foundWords.push(wordObj);
                }
                currentWord = "";
            } else {
                if(currentWord === "") {
                    wordStart = j;
                }
                currentWord += charstr;
            }
        }
    }

    console.log(foundWords);
    for(let i = 0; i < foundWords.length; i++) {
        if(!checkWord(foundWords[i])) {
            alert("Word not in dictionary: " + foundWords[i].word);
            return false;
        }
    }
    for(let i = 0; i < foundWords.length; i++) {
        let matchFound = false;
        for(let j = 0; j < listedWords.length; j++) {
            if(listedWords[j].word === foundWords[i].word
                && listedWords[j].x === foundWords[i].x
                && listedWords[j].y === foundWords[i].y) {matchFound = true; break}
        }
        if(!matchFound) listedWords.push(foundWords[i]);
        console.log(listedWords.length);
    }
    $("#found-words").text(foundWords.map(wordObj => wordObj.word).join());
    return true;
}

function checkWord(word) {
    for(let i = 0; i < dictionary.length; i++) {
        const regexp = new RegExp(`^${word.word}$`, "i");
        for(let j = 0; j < dictionary[i].words.length; j++) {
            if(regexp.test(dictionary[i].words[j])) {word.langs.push(langs[i]);}
        }
    }
    word.langs = [...new Set(word.langs)]
    return word.langs.length > 0;
}

function transliterate(word) {
    for(let i = 0; i < word.length; i++) {
        word[i] = lookupTable[langs[0]][word[i]] ? lookupTable[langs[0]][word[i]].str : lookupTable[langs[1]][word[i]].str;
    }
}

function endGame() {
    CurrentGameState = GameState.GAME_OVER;
    alert("Game Over! Find your scores in the Scores section below");
    populateScores();
}

function populateScores() {
    let totalScore = 0;
    let scoresHTML = "";
    console.log(listedWords.length);
    for(let k = 0; k < listedWords.length; k++) {
        let score = wordScore(listedWords[k]);
        scoresHTML += `${listedWords[k].word} (${listedWords[k].langs.join("/")}): ${score}<br>`;
        totalScore += score;
    }
    scoresHTML += `<br>TOTAL: ${totalScore}`;
    $("#word-scores").html(scoresHTML);
}

function wordScore(wordObj) {
    let multiplier = 1;
    let lang0Score = 0;
    let lang1Score = 0;
    if(wordObj.direction === "across") {
        for(let i = wordObj.x; i < wordObj.end; i++) {
            let currentTile = $(`#tile-${i}-${wordObj.y}`);
            let tileLang0Score = parseInt(currentTile.find(".tile-value").text());
            let tileLang1Score = parseInt(currentTile.find(".tile-alt-value").text());
            if(isNaN(tileLang0Score)) tileLang0Score = tileLang1Score;
            if(isNaN(tileLang1Score)) tileLang1Score = tileLang0Score;
            let tileMultiplier = 1;
            if(currentTile.hasClass("double-letter")) tileMultiplier = 2;
            if(currentTile.hasClass("triple-letter")) tileMultiplier = 3;
            if(currentTile.hasClass("double-word")) multiplier = 2;
            if(currentTile.hasClass("triple-word")) multiplier = 3;
            lang0Score += tileLang0Score * tileMultiplier;
            lang1Score += tileLang1Score * tileMultiplier;
        }
    }
    if(wordObj.direction === "down") {
        for(let i = wordObj.y; i < wordObj.end; i++) {
            let currentTile = $(`#tile-${wordObj.x}-${i}`);
            let tileLang0Score = parseInt(currentTile.find(".tile-value").text());
            let tileLang1Score = parseInt(currentTile.find(".tile-alt-value").text());
            if(isNaN(tileLang0Score)) tileLang0Score = tileLang1Score;
            if(isNaN(tileLang1Score)) tileLang1Score = tileLang0Score;
            let tileMultiplier = 1;
            if(currentTile.hasClass("double-letter")) tileMultiplier = 2;
            if(currentTile.hasClass("triple-letter")) tileMultiplier = 3;
            if(currentTile.hasClass("double-word")) multiplier = 2;
            if(currentTile.hasClass("triple-word")) multiplier = 3;
            lang0Score += tileLang0Score * tileMultiplier;
            lang1Score += tileLang1Score * tileMultiplier;
        }
    }
    if(wordObj.langs.length > 1) return Math.min(lang0Score, lang1Score) * multiplier;
    return wordObj.langs[0] === langs[0] ? lang0Score : lang1Score;
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

function uploadState() {
    sendJsonToPhp({
        oldState,
        oldLetters,
        oldFields,
        oldListedWords
    });
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

/**********************
 * NETWORKING LIBRARY *
 **********************/

async function sendJsonToPhp(data, url = 'writeFile.php') {
    try {
        // Convert object to JSON string
        const jsonData = JSON.stringify(data);

        // Send POST request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        });

        // Parse JSON response
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `HTTP ${response.status}`);
        }

        return result;
    } catch (error) {
        throw new Error(`Failed to send JSON: ${error.message}`);
    }
}



/* //remove excess words from list
function downloadFilteredFile(url) {
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