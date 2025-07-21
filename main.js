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
		clear();
		this.field.forEach (row => console.log (row.join('')));
		
		// console.log(this.field);
	}

	// move direction เงื่อนไขการเดินของผู้เล่น โดยการกำหนดการเคลื่อนที่ ซ้าย ขวา บน ล่าง และเงื่อนไขการเดินตกหลุม แล้ว Gameover 
	move(direction){

	if (direction === "u") this.positionRow-- ;
	else if (direction === "d")this.positionRow++ ;
	else if (direction === "l")this.positionCol-- ;
	else if (direction === "r")this.positionCol++ ;
	else console.log ("❌ not direction please use 'u', 'd', 'l', หรือ 'r'");
	

	// เงื่อนไข check ว่าให้อยู่ใน field
	if (
		this.positionRow < 0 || this.positionRow > this.field.length-1 ||
		this.positionCol < 0 || this.positionCol > this.field[0].length-1
	) {
		console.log("Outside field / Game over");
		this.gameOver = true;
		return this.gameOver;
	}

	const walk = this.field[this.positionRow][this.positionCol];

	if (walk === hole) {
		console.log("💀 You fell into a hole! Game over");
		this.gameOver = true;
		return this.gameOver;
	} else if(walk=== hat ) {
		console.log("🎉 You found the hat! You win!");
		this.gameOver=true;
	} else {
		this.field[this.positionRow][this.positionCol] = "*";
		// this.print();

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

let gameOver = false;


while (!gameOver) {
	newGame.print();

const way = prompt("Which way?(r, l, u, d):");
gameOver = newGame.move(way); }




