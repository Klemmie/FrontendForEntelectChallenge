import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileText;
  interpreted = [];
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
  cell = [];
  rows = 0;
  columns = 0;
  imageRow1 = [];
  imageRow2 = [];
  imageRow3 = [];
  imageRow4 = [];
  flag = false;
  input = false;
  speed = 500;
  timer;

  fileUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    const me = this;
    reader.onload = function () {
      me.fileText = reader.result;
    }
  }

  loopText() {
    this.interpreted = this.fileText.split('\n');
    let interpretedRound = [];
    this.roundEnd = this.roundStart + 1;
    for (let i = 0; i <= this.interpreted.length; i++) {
      if (this.interpreted[i] === ('Starting round ' + this.roundStart).toString()) {
        this.start = i;
      } else if (this.interpreted[i] === ('Starting round ' + this.roundEnd).toString()) {
        this.end = i;
      } else if (this.end !== i) {
        this.end = this.interpreted.lastIndexOf('=======================================') - 1;
      }
    }

    for (let i = this.start + 5; i < this.end - 1; i++) {
      interpretedRound.push(this.interpreted[i]);
    }

    if (this.end !== -1) {
      this.playerData = interpretedRound[1].split(' ');
      this.playerOneName = this.playerData[1];
      this.playerOneHealth = this.playerData[2].split('=')[1].replace(',', '');
      this.playerOneEnergy = this.playerData[3].split('=')[1].replace(',', '');
      this.playerOneScore = this.playerData[4].split('=')[1].replace(',', '');

      this.playerData = interpretedRound[2].split(' ');
      this.playerTwoName = this.playerData[1];
      this.playerTwoHealth = this.playerData[2].split('=')[1].replace(',', '');
      this.playerTwoEnergy = this.playerData[3].split('=')[1].replace(',', '');
      this.playerTwoScore = this.playerData[4].split('=')[1].replace(',', '');

      let j = 0;
      for (let i = 3; i < interpretedRound.length - 1; i++) {
        interpretedRound[i] = interpretedRound[i].replace(new RegExp(']\\[', 'g'), '],[');
        this.cell[j] = interpretedRound[i].split(',');
        j++;
      }
      this.drawMethod();

      this.flag = true;
    }
  }

  drawMethod() {
    let images = [];
    images = images.splice(0, images.length);

    let end = 1;
    for (this.rows = 0; this.rows < this.cell.length; this.rows++) {
      for (this.columns = 0; this.columns < this.cell[this.rows].length; this.columns++) {
        let addBlank = true;

        if ((this.cell[this.rows][this.columns]).includes('[')) {
          images.push('assets/edge.png');
        }
        if ((this.cell[this.rows][this.columns]).includes('<<')) {
          images.push('assets/missileOPP2.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('<')) {
          images.push('assets/missileOPP.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('0')) {
          images.push('assets/blank.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('1')) {
          images.push('assets/blank.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('2')) {
          images.push('assets/blank.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('3')) {
          images.push('assets/blank.jpeg');
        }
        if (this.cell[this.rows][this.columns].includes('E')) {
          images.push('assets/energyDONE.jpg');
          addBlank = false;
        }
        if ((this.cell[this.rows][this.columns]).includes('D')) {
          images.push('assets/defenseDONE.jpg');
          addBlank = false;
        }
        if ((this.cell[this.rows][this.columns]).includes('A') && (this.columns <= 3)) {
          images.push('assets/attackDonePLA.jpg');
          addBlank = false;
        }
        if ((this.cell[this.rows][this.columns]).includes('A') && (this.columns > 3)) {
          images.push('assets/attackDoneOPP.jpg');
          addBlank = false;
        }
        if ((this.cell[this.rows][this.columns]).includes('e')) {
          images.push('assets/energyBUSY.jpg');
          addBlank = false;
        }
        if ((this.cell[this.rows][this.columns]).includes('d')) {
          images.push('assets/defenseBUSY.jpg');
          addBlank = false;
        }
        if ((this.cell[this.rows][this.columns]).includes('a') && (this.columns <= 3)) {
          images.push('assets/attackBusyPLA.jpg');
          addBlank = false;
        }
        if ((this.cell[this.rows][this.columns]).includes('a') && (this.columns > 3)) {
          images.push('assets/attackBusyOPP.jpg');
          addBlank = false;
        }
        if (((this.cell[this.rows][this.columns]).includes('  ')) && addBlank) {
          images.push('assets/blank.jpeg');
        } else if (((this.cell[this.rows][this.columns]).includes(' ')) && addBlank) {
          images.push('assets/blank.jpeg');
        }
        if ((this.cell[this.rows][this.columns]).includes('>>')) {
          images.push('assets/missilePLA2.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('>')) {
          images.push('assets/missilePLA.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('0')) {
          images.push('assets/blank.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('1')) {
          images.push('assets/blank.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('2')) {
          images.push('assets/blank.jpeg');
        } else if ((this.cell[this.rows][this.columns]).includes('3')) {
          images.push('assets/blank.jpeg');
        }
      }
      images.push('assets/edge.png');
      images.push(end);
      end++;
    }

    let j = 0;
    for (let i = 0; i < images.indexOf(1); i++, j++) {
      this.imageRow1[j] = images[i];
    }
    j = 0;
    for (let i = images.indexOf(1) + 1; i < images.indexOf(2); i++, j++) {
      this.imageRow2[j] = images[i];
    }
    j = 0;
    for (let i = images.indexOf(2) + 1; i < images.indexOf(3); i++, j++) {
      this.imageRow3[j] = images[i];
    }
    j = 0;
    for (let i = images.indexOf(3) + 1; i < images.indexOf(4); i++, j++) {
      this.imageRow4[j] = images[i];
    }
  }

  timerChecker(){
    if (this.input === false){
      this.timerLoop();
    } else if (this.input === true) {
      this.timerStop();
    }
  }

  timerLoop() {
    this.timer = setInterval(() => {
      let val = this.roundStart;
      if ((this.interpreted[this.start]).includes((val++).toString())) {
        this.roundStart++;
        this.loopText();
      }
    }, this.speed);
  }

  timerStop(){
    clearInterval(this.timer);
  }
}
