# Robot-Invasion-Game

## Welcome to Robot Invasion!

Please follow the following instructions to install and play the game:

1. Go to the repository on the GitHub page.
2. Fork and clone the repository.
3. Paste the following link to system terminal to clone on to device:
```https://github.com/ddanieela1/Robot-Invasion-Game.git```
4. Open the "Robot-Invasion-Game" directory.
5. Open welcome.html by using "open welcome.html" in the terminal.

## **How to play:**

Robots are taking over space! Avoid all enemies and detroy all robots to win!
Use the ```up``` arrow to shoot the laser.
Use the ```left``` and ```right``` arrow keys to move the character left and right.

## **Approach Taken:**

The game for this project was created with HTML, CSS, and Vanilla JavaScript. I wanted to create a game in which there were enemies or obstacles that moved throughout the screen and the goal of the game is to defeat all the targets to beat the game. To create this scenario, I started by creating a basic HTML page in which I added a grid. The grid is where the basic game components were created and resulted in a game. It was then further separated into 223 squares with a width a height of 40x40. These individual squares were to be used for the enemies and main characters to travel through the grid. I created and array in which the invaders were assigned by index, and these were then attached to a loop. A function was then made and attached to the loop, which moved the enemies in the array throughout the screen as desired. The next goal I had in mind was to add movement to the player and collision detection, these were accomplished by creating functions with conditionals. I wanted to give the player the ability to defeat the enemy of the game, so I added a laser capability using a function as well. The last part of the game was to add a recognition for a win or a loss. This was done by creating a function that would recognize when player and the enemy touch and when the board is cleared resulting in a win or a loss. 

## **Inspiration:**
I was inpired by the game Space Invaders. I wanted to add the feeling of a retro arcade game, so I decided to give the game a pixelated design to give it a mix of old school and modern gaming. I also included 2D animations to add to the style of the game and make it more engaging.


![SpaceInvaders-Gameplay](https://user-images.githubusercontent.com/96893640/183261644-f828b82e-ac32-4a42-9502-5d97deedcf5d.gif)


## **Overview of Functions used:**
![Screen Shot 2022-08-05 at 7 37 50 PM](https://user-images.githubusercontent.com/96893640/183223774-63b322fc-2cc4-43b3-b53f-c4e07ac64ce3.png)


## **Wireframes**


![IMG_465BDE4AE269-1](https://user-images.githubusercontent.com/96893640/183228941-24f1fc05-10c7-4a6c-820f-1c35fa1da735.jpeg)

## **Home Screen:**
![Screen Shot 2022-08-05 at 10 08 45 PM](https://user-images.githubusercontent.com/96893640/183229474-b027ba7d-ab85-40ae-b872-9ec9934dc1af.png)



## **Instructions:**
![Screen Shot 2022-08-05 at 9 59 57 PM](https://user-images.githubusercontent.com/96893640/183229430-6b35bbd6-e613-40c4-b3b3-b4eb53780142.png)


## **Player vs Computer:**

![Screen Shot 2022-08-05 at 10 06 43 PM](https://user-images.githubusercontent.com/96893640/183229410-7d4fe20e-96ac-4819-85ad-9b4756a1553d.png)

## **Player:**
![Screen Shot 2022-08-06 at 2 27 50 PM](https://user-images.githubusercontent.com/96893640/183261491-a58cdf5e-b404-4303-aa68-3f7cd1127bf4.png)

## **Invader:**
![Screen Shot 2022-08-06 at 2 28 03 PM](https://user-images.githubusercontent.com/96893640/183261497-ed5fae93-3029-4768-977a-84e7ed48498f.png)


## **Code Breakdown:**

Since the game takes place inside a grid, this was further broken down into 223 sections which were then assigned to a variable to be called upon later when its time to loop.

```
//create individual squares and append squares to created div
//223 squares fit in the grid
for (let i = 0; i < 223; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

//loop enemies thorugh the created squares/ add class to enemies to call upon later
function draw() {
  for (let i = 0; i < enemies.length; i++) {
    if (!enemiesRemoved.includes(i)) {
      squares[enemies[i]].classList.add("invader");
      backgroundSound.play();
    }
  }
}
draw();
```
Player movement dependend on the location of the shooter in the grid, the function checks the margins on each side of the grid so the player can move, this was attached to an Event Listener that listen for a key pressed.

```
//add movement to the player/shooter
//margin recognition
function moveShooter(e) {
  squares[shooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
    //shooter can move forward as long as edge values are not 0
      if (shooterIndex % width !== 0) shooterIndex -= 1;
      break;
      //if shooter is not right position, then move right
    case "ArrowRight":
      if (shooterIndex % width < width - 1) shooterIndex += 1;
      break;
  }
  squares[shooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);
```
Movement of the enemies was controlled by a function that loops trhough the enemies array and moves each one right to left on the grid going down once each cycle.
```
//add movement to the enemies//recognize margins
function moveInvaders() {
  // calls enemies array, checks for enemies in the left column at 0
  const leftEdge = enemies[0] % width === 0;
  // calls the last enemy in array length where width is -1
  const rightEdge = enemies[enemies.length - 1] % width === width - 1;
  //remove to place in different position
  remove();

  //if at right position go down 1 and change direction to left
  if (rightEdge && goingRight) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i] += width + 1; //+1
      direction = -1;
      goingRight = false;
    }
  }

  //go down 1 and change direction to the right
  if (leftEdge && !goingRight) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i] += width - 1; //-1
      direction = 1;
      goingRight = true;
    }
  }
  ```
This is a continuation of the previous function, (```moveInvaders```), the following continuation has conditionals in the case that the player and enemy touch at the index of the shooter in the square. Towards the end of the functions there is a ```setInterval``` assigned to a variable which will move the invaders every 500 millisecons. This variable will then be called upon again to stop the movement of the invaders in case of a game loss.
```
  //conditional once enemies , shooter touch
  //place values of defeated enemies in empty array
  //variable assigned to enemiesId to halt the game and stop movement
  if (squares[shooterIndex].classList.contains("invader", "shooter")) {
    resultsDisplay.innerHTML = "Game Over!";
    gameOver.play();
    clearInterval(enemiesId);
  }

  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i] > squares.length) {
      resultsDisplay.innerHTML = "Game Over!";
      clearInterval(enemiesId);
    }
  }
  if (enemiesRemoved.length === enemies.length) {
    resultsDisplay.innerHTML = "You Win!";
    clearInterval(enemiesId);
    youWin.play();
  }
}
enemiesId = setInterval(moveInvaders, 500);
```
The following function was used to move the laser acroos the board, conditionals were used to make the laser appear and dissaper, this same method was also use for the "boom" effect. ```clearInterval``` was used to remove the laser after 300 milliseconds, ```setInverval``` was used to control the speed of the laser. An event listener was added for the keydown event to shoot the laser.

```
//create laser and boom effect
//remove boom effect 
function shoot(e) {
  //use laserId variable to call upon later
  let laserId;
  //same indexes assigned to both variable to allow the laser to be released from the same position
  let currentLaserIndex = shooterIndex;
  function moveLaser() {
    if (currentLaserIndex >= 0) {
      squares[currentLaserIndex].classList.remove("laser");
      //move laser across the board
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
      //called variable from before to adjust laser speed
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keydown", shoot);
```
## **Possible Improvements:**
After the completion of this game, I realized that this game still had room for improvement, if more time were avialable for this project I wouldve added a "Frenzy Mode" which would increase the difficulty of the game and contained of variety of robots for the player to defeat. I also considered adding a boss stage after winning the level to make the game more complete. I wouldve also added more animations to make the game more interesting and engaging for the player.
