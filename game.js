const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const buildPointsDisplay = document.getElementById('buildPoints');
const enemiesSpawnedDisplay = document.getElementById('enemiesSpawned');


let buildPoints = 100;
let enemiesSpawned = 0;
let gameOver = false;
const baseRadius = 5;

const exclusionRadius = baseRadius + 50;

function drawBase() {
  // Draw exclusion radius
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, exclusionRadius, 0, Math.PI * 2);
  ctx.strokeStyle = 'lightblue';
  ctx.stroke();
  ctx.closePath();

  // Draw base
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, baseRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

canvas.addEventListener('click', (event) => {
  if (buildPoints >= 10) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (tryToAddTower(x, y)) {
      buildPoints -= 10;
      buildPointsDisplay.textContent = `Build Points: ${buildPoints}`;
    }
  }
});

function drawGameOver() {
  ctx.font = '48px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText('GAME OVER', canvas.width / 2 - 130, canvas.height / 2);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBase();
  drawTowers();
  drawEnemies();
  drawProjectiles();

  moveEnemies();
  moveProjectiles();

  if (enemies.some(enemy => distance(enemy.x, enemy.y, canvas.width / 2, canvas.height / 2) <= baseRadius + enemySize)) {
    gameOver = true;
  }

  if (!gameOver) {
    requestAnimationFrame(gameLoop);
  } else {
    drawGameOver();
  }
}

gameLoop();
