//Jeu par Fallard Yanis

var canvas = document.querySelector("#snake");
var ctx = canvas.getContext("2d");
var box = 32; // 32 pixel par carré ( patterne de la map repris sur une image google)
var highestScore = 0;
var snake = [];
snake[0] = { // paterne repris sur https://www.youtube.com/watch?v=QTcIXok9wNY
    x: 9 * box,
    y: 10 * box
};
var foodImg = new Image();
var terrain = new Image();
foodImg.src = "food.png";
terrain.src = "Terrain.png";
var food = { // on positionne aléatoirement une pomme sur la map
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
var score = 0; //score quoi dire de plus @_@
var directionSnake;
var game = setInterval(draw, 100); // appelle la fonction draw sur une interval de 100ms

document.addEventListener("keydown", direction);

// Detection d'une perssion de touche / le joueur ne peut aller dans son opposé 
function direction(e) {
    var key = e.keyCode;
    if (key == 40 && directionSnake != 'UP') {
        console.log('DOWN')
        directionSnake = 'DOWN';
    } else if (key == 38 && directionSnake != 'DOWN') {
        console.log('UP')
        directionSnake = "UP";
    } else if (key == 37 && directionSnake != 'RIGHT') {
        console.log('LEFT')
        directionSnake = 'LEFT';
    } else if (key == 39 && directionSnake != 'LEFT') {
        console.log('RIGHT')
        directionSnake = "RIGHT";
    }
}

function collision(tete, corps) { // detection d'une collision
    for (var i = 0; i < corps.length; i++) {
        if (tete.x == corps[i].x && tete.y == corps[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {

    ctx.drawImage(terrain, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    console.log(snakeX)
    console.log(snakeY)

    // Tracer du serpent
    if (directionSnake == "UP") snakeY -= box;
    if (directionSnake == "DOWN") snakeY += box;
    if (directionSnake == "LEFT") snakeX -= box;
    if (directionSnake == "RIGHT") snakeX += box;
    // detection si le joueurs mange une pomme sur les meme coordonées
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box, // on replace une pomme sur la map
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop();
    }

    // fin de partie

    var tete = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(tete, snake)) {
        clearInterval(game);
        console.log('MORT')
        highestScore = score;
        return highestScore

    }

    snake.unshift(tete);

    ctx.fillStyle = "White";
    ctx.font = "30px Arial";
    ctx.fillText('Score : ', 1, 50)
    ctx.fillText(score, 100, 50);
    ctx.fillText('Highest Score : ', 300, 50)
    ctx.fillText(highestScore, 510, 50);


}
