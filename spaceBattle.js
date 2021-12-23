const showScore = () => {
    newDiv(`You have ${myShip.hull} hit points left`);
    newDiv(`Your current enemy is ${randomEnemy.name}.`);
    newDiv(`${randomEnemy.name} has ${randomEnemy.hull} hit points left`)
  }
// Game Start
  const startGame = () => {
    updates();
    showScore();
    newDiv(`What would you like to do? Attack ${randomEnemy.name}, retreat or restart?`);
  }
  

  const battle = () => {
    if (myShip.hull <= 0) {
      alert(`Game Over! You Lost.`);
      return;
    } else if (myShip.victories === 6) {
      alert(`You WIN!`);
      return;
    } else {
    $('#game-text').html('')
    myShip.fight(randomEnemy);
  randomEnemy.fight(myShip);
  newDiv(`Will you attack, or run?`)
  }
  updates();
}
const randomizer = () => {
    let random = enemyArray[Math.floor(Math.random() * enemyArray.length)];
    randomEnemy = random;
  }

   enemyArray
const randomizer = () => {
  let random = enemyArray[Math.floor(Math.random() * enemyArray.length)];
  randomEnemy = random;

  const newDiv = (input) => {
    let divCreate = document.createElement("DIV");
    let addText = document.createTextNode(input);
    divCreate.appendChild(addText);

    $('#game-text').append(divCreate);
}
//Function to retreat;
const retreat = () => {
  $('#game-text').html('')

  newDiv(`You retreat. Game over.`);
  newDiv(`Press restart to try again`);
  updates();
}

const restart = () => {
    $('#game-text').html('');

    myShip.victories = 0;
    myShip.hull = 20;
    randomizer();
    updates();
    newDiv(`Welcome to SpaceBattle!`);
  }


  const updates = () => {
    $('#victory-score').html(myShip.victories);


    $('#hitpoints').html(myShip.hull);
    $('#enemy-health').html(randomEnemy.hull);
    $('#enemy-name').html(randomEnemy.name);
  }
  const myShip = {
    name: 'USS Titan',
    victories: 0,
    hull: 20,
    firepower: 5,
    accuracy: .7,
    fight: (ship) => {
      let myHits = Math.random();
      let hitPower = myShip.firepower;
      if (myHits <= myShip.accuracy) {
        newDiv(`${myShip.name} has hit ${ship.name} for ${hitPower} damage!`);
        ship.hull -= hitPower;
        newDiv(`${ship.name} has ${ship.hull} hit points left!`);
        if (ship.hull <= 0) {
          myShip.victories += 1;
          newDiv(`You have destroyed ${ship.name}! You have ${myShip.victories} victories!`);
        }
      } else {
        newDiv(`${myShip.name} misses ${ship.name}!`);
      }
    }
  }

  class AlienShip {
    constructor(name) {
      this.name = name;
      this.hull = Math.floor(Math.random() * 4) + 3;
      this.firepower = Math.floor(Math.random() * 3) + 2;
      this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
    }
    fight(ship) {
      let myHits = Math.random();
      let hitPower = this.firepower;
      if (this.hull <= 0) {
        randomizer();
        newDiv(`A new enemy arrives: ${randomEnemy.name}`);
        return;
      } if (myHits <= this.accuracy) {
        newDiv(`${this.name} has hit ${ship.name} for ${hitPower} damage!`);
        ship.hull -= hitPower;
        newDiv(`${ship.name} has ${ship.hull} hit points left!`);
      } else {
        newDiv(`${this.name} misses ${ship.name}!`);
      }
    }
  }
  const alien1 = new AlienShip('MF Doom');
const alien2 = new AlienShip('Gorgu')
const alien3 = new AlienShip('Mando');
const alien4 = new AlienShip('Venom')
const alien5 = new  AlienShip('Death star');

let randomEnemy = alien1
const enemyArray = [alien2, alien3, alien4, alien5]

$('#start').click(startGame);
$('#attack').click(battle);
$('#retreat').click(retreat);
$('#restart').click(restart);