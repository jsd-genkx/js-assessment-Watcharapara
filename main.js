"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// เกมส์นี้ต้องการให้ผู้เล่น"*"ตามหาหมวก"^"" จากจุดเริ่มต้นที่ 0 โดยมีอุปสรรคเป็นหลุม "0"
// เริ่มต้น -> สร้าง field -> print field->  move function -> game conditions ->win or fault.

class Field {
	constructor(field = [[]]) {
		this.field = field;
		this.positionRow = 0;
		this.positionCol = 0;
		this.gameOver = false;
		this.field[this.positionRow][this.positionCol] = pathCharacter;
	}

	// Print field //
	print() {
		this.field.forEach(row => console.log (row.join('')));

		console.log(this.field);
	}

	// move direction เงื่อนไขการเดินของผู้เล่น โดยการกำหนดการเคลื่อนที่ ซ้าย ขวา บน ล่าง และเงื่อนไขการเดินตกหลุม แล้ว Gameover 
	move(direction){
	let newX = this.playerX;
	let newY = this.playerY;
	if (direction === "up") newY-- ;
	else if (direction === "down")newY++ ;
	else if (direction === "left")newX-- ;
	else if (direction === "right")newX++ ;
	
	//เงื่อนไข
	if (
		newY < 0 || newY > this.field.length ||
		newX < 0 || newX > this.field.[0].length
	){
		console.log("Outside field / Game over");
		this.gameOver = true;
		return;
	}

	const walk = this.field[this.newX][this.newY];
	if (walk === "0") {
		console.log("Game over");
		this.gameOver = true;
	} else if(walk=== "^" ) {
		console.log("Win");
		this.gameOver=true;
	} else {
		this.playerX = newX;
		this.playerY = newY;
		this.field[this.newX][this.newY] = "*";
		this.print();

	}
	}
}



// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
const newGame = new Field([
	["░", "░", "O"],
	["░", "O", "░"],
	["░", "^", "░"],
]);
newGame.print();
