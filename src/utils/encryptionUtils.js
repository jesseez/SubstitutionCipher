function shift(message) {
	let amount = Math.round(Math.random() * 100) % 26;
	// message = message.toLowerCase();
	let alpha = "abcdefghijklmnopqrstuvwxyz";
	var answer = "";
	for(var i = 0; i < message.length; i++){
		let c = message[i].toLowerCase();
		if(alpha.indexOf(c) === -1){
			answer = answer + c;
		} else {
            let isUpper = message[i].isUpper();
            let char = alpha[(alpha.indexOf(c) + 26 + amount)%26];
			answer = answer + (isUpper ? char.toUpperCase() : char);
		}
	}
	return answer;
}

function shiftHalfTest(){
	let amount1 = (Math.round(Math.random() * 100) % 12) + 1;
	let amount2 = (Math.round(Math.random() * 100) % 12) + 1;
	let split = Math.round(Math.random() * 100) % 26;

	console.log(amount1);
	console.log(amount2);
	console.log(split);


	var a = [];
	for(var i = 0; i < 26; i++) {
		a[i] = i;
	}

	for(var i = 0; i < 26; i++) {
		var val = i;
		if(split < 13) {
			if(i < split || i > split + 12) {
				//block1
				val = (val + amount1) % 26;
				if(val >= split && val < split + 13) {
					//in block2
					val = (val + 13) % 26;
				}
			} else {
				//block2
				val = (val + amount2) % 26;
				if(val < split || val > split + 12) {
					val = (val + 13) % 26;
				}
			}
		} else {
			if(i < split && i >= split - 13) {
				//block1
				val = (val + amount1) % 26;
				if(val >= split || val < split - 13) {
					val = (val + 13) %  26;
				}
			} else {
				//block2
				val = (val + amount2) % 26;
				if(val < split && val >= split - 13) {
					val = (val + 13) % 26;
				}
			}
		}
		a[i] = val;
	}

	return a;
}

function shiftHalf(message) {
	message = message.toLowerCase();
	let amount1 = (Math.round(Math.random() * 100) % 12) + 1;
	let amount2 = (Math.round(Math.random() * 100) % 12) + 1;
	let split = Math.round(Math.random() * 100) % 26;

	var map = [];
	for(var i = 0; i < 26; i++) {
		map[i] = i;
	}

	for(var i = 0; i < 26; i++) {
		var val = i;
		if(split < 13) {
			if(i < split || i > split + 12) {
				//block1
				val = (val + amount1) % 26;
				if(val >= split && val < split + 13) {
					//in block2
					val = (val + 13) % 26;
				}
			} else {
				//block2
				val = (val + amount2) % 26;
				if(val < split || val > split + 12) {
					val = (val + 13) % 26;
				}
			}
		} else {
			if(i < split && i >= split - 13) {
				//block1
				val = (val + amount1) % 26;
				if(val >= split || val < split - 13) {
					val = (val + 13) %  26;
				}
			} else {
				//block2
				val = (val + amount2) % 26;
				if(val < split && val >= split - 13) {
					val = (val + 13) % 26;
				}
			}
		}
		map[i] = val;
	}


	let alpha = "abcdefghijklmnopqrstuvwxyz";
	var answer = "";

	for(var i = 0; i < message.length; i++){
		let c = message[i];
		if(alpha.indexOf(c) === -1){
			answer = answer + c;
		} else {
            let isUpper = message[i].isUpper();
            let char = alpha[map[alpha.indexOf(c)]];
			answer = answer + (isUpper ? char.toUpperCase() : char);
		}
	}
	return answer;
}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

String.prototype.isLower = function() {
    let character = this[0];
    if (!isNaN(character * 1)){
        return false;
    } else {
        return character === character.toLowerCase();
    }
}

String.prototype.isUpper = function() {
    let character = this[0];
    if (!isNaN(character * 1)){
        return false;
    } else {
        return character === character.toUpperCase();
    }
}

function randomize(message) {
	message = message.toLowerCase();
	let alpha = "abcdefghijklmnopqrstuvwxyz";
	let rand = alpha.slice().shuffle();
	var answer = "";
	for(var i = 0; i < message.length; i++){
		let c = message[i];
		if(alpha.indexOf(c) === -1){
			answer = answer + c;
		} else {
            let isUpper = message[i].isUpper();
            let char = rand[alpha.indexOf(c)];
			answer = answer + (isUpper ? char.toUpperCase() : char);
		}
	}
	return answer;
}

module.exports = {
    shift, shiftHalf, randomize
};