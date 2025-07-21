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
	constructor(field = [[]]) 
{
	this.field = field;
	this.positionRow = 0;
	this.positionCol = 0;
	this.gameOver = false;
	this.field[this.positionRow][this.positionCol] = pathCharacter;
}

// Print field //

print() 
{
	clear();
	console.log("Current Field:");
	this.field.forEach(row => console.log(row.join("")));
}

	moveUp() 
	{
	this.moveTo(this.positionCol, this.positionRow - 1);
	}

	moveDown() 
	{
    this.moveTo(this.positionCol, this.positionRow + 1);
	}

  	moveLeft() 
	{
    this.moveTo(this.positionCol - 1, this.positionRow);
  	}

  	moveRight() 
	{
    this.moveTo(this.positionCol + 1, this.positionRow);
  	}

  moveTo(x, y) {
    // เงื่อนไข check ว่าให้อยู่ใน field ไหม ไม่อยู่ Game over
    if (y < 0 || y >= this.field.length || x < 0 || x >= this.field[0].length) {
      console.log("🚫 You went out of bounds! Game over.");
      this.gameOver = true;
      return;
    }


	// move direction เงื่อนไขการเดินของผู้เล่น โดยการกำหนดการเคลื่อนที่ ซ้าย ขวา บน ล่าง และเงื่อนไขการเดินตกหลุม แล้ว Gameover 
    const walk = this.field[y][x];

    if (walk === hole) {
      console.log("💀 You fell into a hole! Game over");
      this.gameOver = true;
    } else if (walk === hat) {
      console.log("🎉 You found the hat! You win!");
      this.gameOver = true;
    } else {
      this.positionCol= x;
      this.positionRow = y;
      this.field[y][x] = pathCharacter;
      this.print();
    }
  }



// Game Mode ON
// Remark: Code example below should be deleted and use your own code.

  playGame() {
    this.print();

    while (!this.gameOver) {
      const input = prompt("Which way? (u/d/l/r): ").toLowerCase();
      switch (input) {
        case "u":
          this.moveUp();
          break;
        case "d":
          this.moveDown();
          break;
        case "l":
          this.moveLeft();
          break;
        case "r":
          this.moveRight();
          break;
        default:
          console.log("❌ not command /must use: u / d / l / r only");
      }
    }
  }

//สร้าง Field แบบสุ่มได้

 static generateField(height, width, holePercentage = 0.2) {
    const field = [];

    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        row.push(Math.random() < holePercentage ? hole : fieldCharacter);
      }
      field.push(row);
    }
    field[0][0] = pathCharacter;

    let hatX, hatY;
    do {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    } while (hatX === 0 && hatY === 0);

    field[hatY][hatX] = hat;
    return field;
  }
}

// เกมโดยสุ่มสนาม พร้อมหลุม 
const myField = new Field(Field.generateField(10, 10, 0.1));
myField.playGame();














// const newGame = new Field([
// 	["░", "░", "O"],
// 	["░", "O", "░"],
// 	["░", "^", "░"],
// ]);

// let gameOver = false;


// while (!gameOver) {
// 	newGame.print();

// const way = prompt("Which way?(r, l, u, d):");
// gameOver = newGame.move(way);}




