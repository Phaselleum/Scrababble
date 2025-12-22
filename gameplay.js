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

function prepBoard()
{
}

function draw() {
    for(let i = 0; i < 7; i++)
    {
        $("#drawn" + i).text(letters[Math.floor(Math.random() * letters.length)])
    }
}

draw();

let selectedHandTile = "";

$("#hand-tiles td").on("click", function() {
    $("#hand-tiles td").css("background-color", "");
    $(this).css("background-color", "red");
    selectedHandTile = $(this).attr("id");
    console.log(selectedHandTile);
});