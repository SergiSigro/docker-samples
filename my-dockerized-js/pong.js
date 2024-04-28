const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: 'RED'
};

const player = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: 'BLUE'
};

const computer = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: 'GREEN'
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = '45px fantasy';
    context.fillText(text, x, y);
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, 'BLACK');
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawText(player.score, canvas.width / 4, canvas.height / 5, 'WHITE');
    drawText(computer.score, 3 * canvas.width / 4, canvas.height / 5, 'WHITE');
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let playerOrComputer = (ball.x < canvas.width / 2) ? player : computer;

    if (collision(ball, playerOrComputer)) {
        let collidePoint = (ball.y - (playerOrComputer.y + playerOrComputer.height / 2));
        collidePoint = collidePoint / (playerOrComputer.height / 2);
        let angleRad = (Math.PI / 4) * collidePoint;
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }

    if (ball.x - ball.radius < 0) {
        computer.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player.score++;
        resetBall();
    }
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
    ball.velocityX = -ball.velocityX;
}

function gameLoop() {
    update();
    render();
}

setInterval(gameLoop, 1000 / 60);
