const enemySize = 3;
let spawnRate = 1000;
let enemySpeed = 1;

let enemies = [];
let enemiesSpawnedEnemies = 0;

// The rest of your code remains unchanged

function isOverlappingTower(x, y) {
  return towers.some(tower => distance(x, y, tower.x + towerSize / 2, tower.y + towerSize / 2) < towerSize / 2 + enemySize);
}

function spawnEnemy() {
  if (gameOver) {
    return;
  }

  let angle = Math.random() * Math.PI * 2;
  let x = Math.cos(angle) * (canvas.width / 2) + canvas.width / 2;
  let y = Math.sin(angle) * (canvas.height / 2) + canvas.height / 2;

  if (!isOverlappingTower(x, y)) {
    enemies.push({ x, y, angle });
    enemiesSpawnedEnemies++;
    enemiesSpawnedDisplay.textContent = `Enemies: ${enemiesSpawnedEnemies}`;

  }

  // Schedule the next enemy spawn using the updated spawn rate
  setTimeout(spawnEnemy, spawnRate);

  spawnRate *= 0.99; // speed up enemy spawning
  enemySpeed *= 1.01; // speed up enemy speed
}

function drawEnemies() {
  enemies.forEach(enemy => {
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemySize, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  });
}

function moveEnemies() {
  enemies.forEach(enemy => {
    const dx = canvas.width / 2 - enemy.x;
    const dy = canvas.height / 2 - enemy.y;
    const angle = Math.atan2(dy, dx);

    const x = enemy.x + Math.cos(angle) * enemySpeed;
    const y = enemy.y + Math.sin(angle) * enemySpeed;

    if (isOverlappingTower(x, y)) {
      enemy.x += Math.random() * 4 - 2;
      enemy.y += Math.random() * 4 - 2;
    } else {
      enemy.x = x;
      enemy.y = y;
    }
  });
}

// Start the first enemy spawn
setTimeout(spawnEnemy, spawnRate);
