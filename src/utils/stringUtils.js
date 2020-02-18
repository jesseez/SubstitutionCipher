const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getLetterCount(str) {
    var letters = 0;
    var ar = alphabet.split("");
    for (var i=0; i<str.length;i++) {
        if (ar.indexOf(str[i]) > -1) {
            letters = letters + 1;
        }
    }
    return letters;
}

module.exports = {
    getLetterCount
}