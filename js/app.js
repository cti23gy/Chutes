let Title = document.getElementsByClassName("title");
TweenLite.from(Title, 
	{ duration: 0.6, x: -100, alpha: 0, delay: 0.1 }
);
let Instructions = document.getElementById("instructions");
TweenLite.from(Instructions, 
	{ duration: 0.6, x: -100, alpha: 0, delay: 0.5 }
);


//define classes
class Tile {
	constructor(x, y, specialNum) {
		this.x = x;
		this.y = y;
		this.specialNum = specialNum;
	}
}

class BadTile extends Tile {
	constructor(x, y, specialNum) {
		super(x, y, specialNum);
	}
	moveBack(subNum) {
		if (whoseTurn == 0) {
			p1_spot += subNum;
		} else if (whoseTurn == 1) {
			p2_spot += subNum;
		}
		document.getElementById("instructions").innerHTML = "Bad Space! -2 to your next spin!";
	}
}

class GoodTile extends Tile {
	constructor(x, y, specialNum) {
		super(x, y, specialNum);
	}
	moveAhead(addNum) {
		if (whoseTurn == 0) {
			p1_spot += addNum;
		} else if (whoseTurn == 1) {
			p2_spot += addNum;
		}
		document.getElementById("instructions").innerHTML = "Good Space! +2 to your next spin!";
	}
}

class Spinner {
	constructor() {
		this.number;
	}
	spin() {
		this.number = Math.floor(Math.random() * 4) + 1; 
		return this.number;
	}
}


//define board tiles, spinner, and turn position
let spinner = new Spinner();
let tiles = [new Tile(25, 75), new Tile(130, 75), new BadTile(235, 75, -2), new Tile(340, 75), new GoodTile(445, 75, 2), new Tile(550, 75), new Tile(655, 75), 
		new BadTile(655, 175, -2), new Tile(550, 175), new Tile(445, 175), new Tile(340, 175), new Tile(235, 175), new Tile(130, 175), new GoodTile(25, 175, 2),
		new Tile(25, 275), new BadTile(130, 275, -2), new GoodTile(235, 275, 2), new Tile(340, 275), new GoodTile(445, 275, 2), new Tile(550, 275), new Tile(655, 275), 
		new Tile(655, 375), new BadTile(550, 375, -2), new GoodTile(445, 375, 2), new Tile(340, 375), new Tile(235, 375), new BadTile(130, 375, -2), new Tile(25, 375)
];

let whoseTurn = 0; // 0 = p1; 1 = p2;
let p1_spot = 0;
let p2_spot = 0;


//stick move in player class!!!!!!!
function taketurn(spin) {
	let SectionClick = document.getElementById('spinner');

	if (whoseTurn == 0) {
		let PlayerPosition = document.getElementById('p1');
		document.getElementById("instructions").innerHTML = "Spin Again!";

		SectionClick.innerHTML = spin;
		p1_spot += spin;
		
		if ((p1_spot-1 >= tiles.length)) // counts final tile as well as overflow 
		{
			console.log("There are no more Tiles!!!");
			whoseTurn = 10;
			TweenLite.to(PlayerPosition, 
				{ duration: 1, x: 0, y: 375 }
			);
		} else {
			//take turn
			let curTile = tiles[p1_spot - 1]; // -1 handles array overflow
			TweenLite.to(PlayerPosition, 
				{ duration: 1, x: curTile.x - 25, y: curTile.y, onComplete: checkSpace(curTile, PlayerPosition)}   
			);		
		}
	} else if (whoseTurn == 1) { //p2 turn
		let PlayerPosition = document.getElementById('p2');
		document.getElementById("instructions").innerHTML = "Spin Again!";

		SectionClick.innerHTML = spin;
		p2_spot += spin;
		
		if ((p2_spot-1 >= tiles.length)) // counts final tile as well as overflow 
		{
			console.log("There are no more Tiles!!!");
			whoseTurn = 10;
			TweenLite.to(PlayerPosition, 
				{ duration: 1, x: 5, y: 375 }
			);
			document.getElementById("instructions").innerHTML = "Game Won!";
		} else {
			//take turn
			let curTile = tiles[p2_spot - 1]; //-1 handles array overflow
			TweenLite.to(PlayerPosition, 
				{ duration: 1, x: curTile.x - 20, y: curTile.y, onComplete: checkSpace(curTile)}   
			);		
		}
	} else {
		document.getElementById("instructions").innerHTML = "Game Won!";
	}

	//switch turns
	if (whoseTurn == 0) {
		whoseTurn = 1;
	} else if (whoseTurn == 1) {
		whoseTurn = 0;
	}

}

//check if tile is special
function checkSpace(curTile) {
	//after turn check for Tile type
	//take a second "turn" of sorts immediately after that is based off of tile type
	if (curTile.specialNum > 0) {
		curTile.moveAhead(curTile.specialNum);
	}
	if (curTile.specialNum < 0) {
		curTile.moveBack(curTile.specialNum);
	}
}



