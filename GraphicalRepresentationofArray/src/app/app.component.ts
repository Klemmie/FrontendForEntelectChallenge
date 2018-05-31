import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private fileText;
  interpreted = [];
  interpretedRound = [];
  playerData = [];
  start = 0;
  end = 0;
  playerOneHealth;
  playerTwoHealth;
  playerOneEnergy;
  playerTwoEnergy;
  playerOneScore;
  playerTwoScore;
  uploaded = false;
  cell = [];
  images = [];
  rows = 0;
  columns = 0;
  imageRow1 = [];
  imageRow2 = [];
  imageRow3 = [];
  imageRow4 = [];

  fileUpload(event) {
    this.uploaded = true;
    let reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    let me = this;
    reader.onload = function () {
      me.fileText = reader.result;
    }
  }

  loopText(){
    this.interpreted = this.fileText.split("\n");
    for (let i = 0; i < this.interpreted.length; i++) {
      if (this.interpreted[i] === "Starting round 0"){
        this.start = i;
      } else if (this.interpreted[i] === "Starting round 1"){
        this.end = i;
      }
    }
    for (let i = this.start + 5; i < this.end - 1; i++) {
      this.interpretedRound.push(this.interpreted[i]);
    }

    this.playerData = this.interpretedRound[1].split(" ");
    this.playerOneHealth = this.playerData[2].split("=")[1].replace(',','');
    this.playerOneEnergy = this.playerData[3].split("=")[1].replace(',','');
    this.playerOneScore = this.playerData[4].split("=")[1].replace(',','');

    this.playerData = this.interpretedRound[2].split(" ");
    this.playerTwoHealth = this.playerData[2].split("=")[1].replace(',','');
    this.playerTwoEnergy = this.playerData[3].split("=")[1].replace(',','');
    this.playerTwoScore = this.playerData[4].split("=")[1].replace(',','');

    let j = 0;
    for (let i = 3; i < this.interpretedRound.length - 1; i++) {
      this.interpretedRound[i] = this.interpretedRound[i].replace(new RegExp(']\\[', 'g'), '],[');
      this.cell[j] = this.interpretedRound[i].split(',');
      j++;
    }
    this.drawMethod();
    console.log(this.cell);
  }

  drawMethod(){
    for (this.rows = 0; this.rows < this.cell.length; this.rows++) {
      for (this.columns = 0; this.columns < this.cell[this.rows].length; this.columns++) {
        if(this.cell[this.rows][this.columns] === "E"){
          this.images.push("assets/energyDONE.jpg");
        } else if (this.cell[this.rows][this.columns] === "D"){
          this.images.push("assets/defenseDONE.jpg");
        } else if ((this.cell[this.rows][this.columns] === "A") && (this.rows <= 3)){
          this.images.push("assets/attackTowerPLA.jpg");
        } else if ((this.cell[this.rows][this.columns] === "A") && (this.rows > 3)){
          this.images.push("assets/attackTowerOPP.jpg");
        } else if (this.cell[this.rows][this.columns] === ">"){
          this.images.push("assets/missilePLA.jpg");
        } else if (this.cell[this.rows][this.columns] === "<"){
          this.images.push("assets/missileOPP.jpg");
        } else if ((this.cell[this.rows][this.columns] !== '[') && (this.cell[this.rows][this.columns] !== ']')){
          this.images.push("assets/empty.jpg");
        }
      }
    }
    console.log(this.images);
    let j = 0;
    for (let i = 0; i < 8; i++, j++) {
      this.imageRow1[j] = this.images[i];
    }
    for (let i = 8, j = 0; i < 16; i++, j++) {
      this.imageRow2[j] = this.images[i];
    }
    for (let i = 16, j = 0; i < 24; i++, j++) {
      this.imageRow3[j] = this.images[i];
    }
    for (let i = 24, j = 0; i < 32; i++, j++) {
      this.imageRow4[j] = this.images[i];
    }
  }
}
