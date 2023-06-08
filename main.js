const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const field = "░";
const path = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.x = 0;
    this.y = 0;
  }

  print() {
    this.field.forEach((row) => console.log(row.join(" ")));
  }

  results() {
    if (this.field[this.y]) {
      if (this.field[this.y][this.x] === hat) {
        console.log("You found your hat! Congradulations!");
        return 1;
      } else if (this.field[this.y][this.x] === hole) {
        console.log("You fell into a hole! Game over...");
        return -1;
      } else if (!this.field[this.y][this.x]) {
        console.log(
          "You fell off the edge of the field! Oh noes! Game Over..."
        );
        return -1;
      } else {
        this.field[this.y][this.x] = path;
        return 0;
      }
    } else {
      console.log("You fell off the edge of the field! Oh noes! Game Over...");
      return -1;
    }
  }

  input() {
    let input = prompt("Where would you like to go?");

    switch (input) {
      case "a":
        console.log("You walked left.");
        this.x--;
        break;
      case "d":
        console.log("You walked right.");
        this.x++;
        break;
      case "w":
        console.log("You walked up.");
        this.y--;
        break;
      case "s":
        console.log("You walked down.");
        this.y++;
        break;
      default:
        console.log(
          "Invalid direction chosen. Choose either: \nw for up \na for left \ns for down \nd for right."
        );
    }
  }

  play() {
    let end;
    do {
      this.print();
      this.input();
      end = this.results();
    } while (end !== 1 && end !== -1);
  }

  static generateField(height, width, holes) {
    let newField = [];
    for (let i = 0; i < width; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
        newField[i].push(field);
      };
    };
    newField[0][0] = path;
    let hatX;
    let hatY;
    do {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    } while (hatX === 0 && hatY === 0);
    newField[hatX][hatY] = hat;
    const totalHoles = (height * width) * (holes / 100);
    for (let k = 0; k < totalHoles; k++) {
      let holeX;
      let holeY;
      do {
        do {
          holeX = Math.floor(Math.random() * width);
          holeY = Math.floor(Math.random() * height);
        } while (holeX === 0 && holeY === 0) 
      } while (holeX === hatX && holeY === hatY);
      newField[holeX][holeY] = hole;
    }
    return newField;
  }
}

const newField = Field.generateField(8,6,25);
const myField = new Field(newField);
 myField.play();

//console.log(newField);