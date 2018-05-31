import {Component} from '@angular/core';

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
  start = -1;
  roundStart = -1;
  end = -1;
  roundEnd = -1;
  playerOneHealth;
  playerTwoHealth;
  playerOneEnergy;
  playerTwoEnergy;
  playerOneScore;
  playerTwoScore;
  playerOneName;
  playerTwoName;
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
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    const me = this;
    reader.onload = function () {
      me.fileText = reader.result;
    }
  }

  loopText() {
    this.interpreted = this.fileText.split('\n');
    this.start = this.roundStart;
    this.roundEnd = this.roundStart + 1;
    this.end = this.roundEnd;
    for (let i = 0; i < this.interpreted.length; i++) {
      if (this.interpreted[i] === ('Starting round ' + this.start).toString() ) {
        this.start = i;
      } else if (this.interpreted[i] === ('Starting round ' + this.end).toString() ) {
        this.end = i;
      }
    }

    for (let i = this.start + 5; i < this.end - 1; i++) {
      this.interpretedRound.push(this.interpreted[i]);
    }

    if (this.end !== -1) {
      this.playerData = this.interpretedRound[1].split(' ');
      this.playerOneName = this.playerData[1];
      this.playerOneHealth = this.playerData[2].split('=')[1].replace(',', '');
      this.playerOneEnergy = this.playerData[3].split('=')[1].replace(',', '');
      this.playerOneScore = this.playerData[4].split('=')[1].replace(',', '');

      this.playerData = this.interpretedRound[2].split(' ');
      this.playerTwoName = this.playerData[1];
      this.playerTwoHealth = this.playerData[2].split('=')[1].replace(',', '');
      this.playerTwoEnergy = this.playerData[3].split('=')[1].replace(',', '');
      this.playerTwoScore = this.playerData[4].split('=')[1].replace(',', '');

      let j = 0;
      for (let i = 3; i < this.interpretedRound.length - 1; i++) {
        this.interpretedRound[i] = this.interpretedRound[i].replace(new RegExp(']\\[', 'g'), '],[');
        this.cell[j] = this.interpretedRound[i].split(',');
        j++;
      }
      this.drawMethod();
    }
  }

  drawMethod() {
    for (this.rows = 0; this.rows < this.cell.length; this.rows++) {
      for (this.columns = 0; this.columns < this.cell[this.rows].length; this.columns++) {
        let flag = 0;
        this.images.push('assets/edge.png');
        if ((this.cell[this.rows][this.columns]).includes('<')) {
          this.images.push('assets/missileOPP.jpg');
        } else if ((this.cell[this.rows][this.columns].includes('E')) && (flag === 0)) {
          this.images.push('assets/energyDONE.jpg');
          flag = 1;
        } else if ((this.cell[this.rows][this.columns]).includes('D') && (flag === 0)) {
          this.images.push('assets/defenseDONE.jpg');
          flag = 1;
        } else if ((this.cell[this.rows][this.columns]).includes('A') && (this.columns <= 3) && (flag === 0)) {
          this.images.push('assets/attackDonePLA.jpg');
          flag = 1;
        } else if ((this.cell[this.rows][this.columns]).includes('A') && (this.columns > 3) && (flag === 0)) {
          this.images.push('assets/attackDoneOPP.jpg');
          flag = 1;
        } else if ((this.cell[this.rows][this.columns]).includes('e') && (flag === 0)) {
          this.images.push('assets/energyBUSY.jpg');
          flag = 1;
        } else if ((this.cell[this.rows][this.columns]).includes('d') && (flag === 0)) {
          this.images.push('assets/defenseBUSY.jpg');
          flag = 1;
        } else if ((this.cell[this.rows][this.columns]).includes('a') && (this.columns <= 3) && (flag === 0)) {
          this.images.push('assets/attackBusyPLA.jpg');
          flag = 1;
        } else if ((this.cell[this.rows][this.columns]).includes('a') && (this.columns > 3) && (flag === 0)) {
          this.images.push('assets/attackBusyOPP.jpg');
          flag = 1;
        } else if (flag === 0) {
          this.images.push('assets/empty.jpg');
          flag = 1;
        } else if ((this.cell[this.rows][this.columns]).includes('>')) {
          this.images.push('assets/missilePLA.jpg');
        }
      }
      this.images.push('assets/edge.png');
    }

    let j = 0;
    for (let i = 0; i < 17; i++, j++) {
      this.imageRow1[j] = this.images[i];
    }
    j = 0;
    for (let i = 17; i < 34; i++, j++) {
      this.imageRow2[j] = this.images[i];
    }
    j = 0;
    for (let i = 34; i < 51; i++, j++) {
      this.imageRow3[j] = this.images[i];
    }
    j = 0;
    for (let i = 51; i < 68; i++, j++) {
      this.imageRow4[j] = this.images[i];
    }
  }
}
