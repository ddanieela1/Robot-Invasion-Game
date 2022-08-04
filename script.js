const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
let currentShooterIndex = 202; //202
let width = 15; //15
let direction = 1;
let enemiesId;
let goingRight = true;
let enemiesRemoved = [];
let results = 0;
let sound = new Audio("./Misc_Lasers/Fire-1.mp3");
let backgroundSound = new Audio("./music/stage2.ogg");
let explosion = new Audio("./explosions/explosion_6");
let gameOver = new Audio("./music/GameOver.wav");
let youWin = new Audio("./music/round_end.wave");

sound.volume = 0.5;
backgroundSound.volume = 0.5;
explosion.volume = 0.6;
youWin.volume = 1;


//create individual squares and append to created div
for (let i = 0; i < 223; i++) {
  //225
  const square = document.createElement("div");
  grid.appendChild(square);
}

//create array and select created divs inside grid
const squares = document.querySelectorAll(".grid div");
grid.setAttribute(
  "style",
  'background-image:url("360_F_259161577_CESOycx2KteeRGI7VUUBLDjz76x6MILO.jpeg")'
  );
  
  const enemies = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
  40,41,42,43,44,45,46,47,48,49,
  50,51,52,53,54,55,56,57,58,59,
];

//loop and add class to enemies
function draw() {
  for (let i = 0; i < enemies.length; i++) {
    if (!enemiesRemoved.includes(i)) {
      squares[enemies[i]].classList.add("invader");
      // backgroundSound.play();
    }
  }
}

draw();

function remove() {
  for (let i = 0; i < enemies.length; i++) {
    squares[enemies[i]].classList.remove("invader");
  }
}

//create shooter with a class , use index to locate in grid
squares[currentShooterIndex].classList.add("shooter");

//add movement to the player/shooter
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

//add movement to the enemies
function moveInvaders() {
  const leftEdge = enemies[0] % width === 0;
  const rightEdge = enemies[enemies.length - 1] % width === width - 1;
  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i] += width + 1; //+1
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i] += width - 1; //-1
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i] += direction;
  }

  draw();
  //conditional once enemies , shooter touch
  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    resultsDisplay.innerHTML = "Game Over";
    gameOver.play();
    clearInterval(enemiesId);
  }

  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i] > squares.length) {
      resultsDisplay.innerHTML = "Game Over";
      clearInterval(enemiesId);
    }
  }
  if (enemiesRemoved.length === enemies.length) {
    resultsDisplay.innerHTML = "You Win";
    youWin.play();
    clearInterval(enemiesId);
  }
}
enemiesId = setInterval(moveInvaders, 500);

//create laser

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;
  function moveLaser() {
    if (currentLaserIndex >= 0) {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");

      if (squares[currentLaserIndex].classList.contains("invader")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("invader");
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          300
        );
        clearInterval(laserId);

        const alienRemoved = enemies.indexOf(currentLaserIndex);
        enemiesRemoved.push(alienRemoved);
        results++;
        resultsDisplay.innerHTML = results;
        console.log(enemiesRemoved);
      }
    }
  }
  switch (e.key) {
    case "ArrowUp":
      sound.play();
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keydown", shoot);
// let audioplay = document.getElementById('audio')
// audio.addEventListener(audioplay, shoot)

// toggleScreen(id,toggle){
//   let element = document.getElementById(id);
//   let display = (toggle) ? 'block' : 'none';
//   element.style.display = display;
// }

