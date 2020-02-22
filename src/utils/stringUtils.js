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

function isLetter(string) {
    if(string && string.length > 0) {
        return alphabet.includes(string[0]);
    }
    return false;
}

module.exports = {
    getLetterCount,
    isLetter
}