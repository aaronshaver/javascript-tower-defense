const projectileSize = 2;
const projectileOffset = towerSize / 2 + projectileSize;
const shootRate = 100;

let projectiles = [];

function isOutsideGameArea(x, y) {
  return x < 0 || x > canvas.width || y < 0 || y > canvas.height;
}

function shootProjectile(tower) {
  const nearestEnemy = enemies.reduce((nearest, enemy) => {
    const dist = distance(tower.x, tower.y, enemy.x, enemy.y);
    return dist < canvas.width / 2 && (!nearest || dist < nearest.dist)
      ? { dist, enemy }
      : nearest;
  }, null);

  if (nearestEnemy) {
    const dx = nearestEnemy.enemy.x - tower.x;
    const dy = nearestEnemy.enemy.y - tower.y;
    const angle = Math.atan2(dy, dx);

    const x = tower.x + towerSize / 2 + Math.cos(angle) * projectileOffset;
    const y = tower.y + towerSize / 2 + Math.sin(angle) * projectileOffset;

    projectiles.push({ x, y, angle });
  }
}

function drawProjectiles() {
  projectiles.forEach(projectile => {
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectileSize, 0, Math.PI * 2);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
  });
}

function isProjectileOverlappingBase(x, y) {
  const baseCenterX = canvas.width / 2;
  const baseCenterY = canvas.height / 2;
  return distance(x, y, baseCenterX, baseCenterY) < baseRadius + projectileSize;
}

function moveProjectiles() {
  projectiles = projectiles.map(projectile => {
    const speed = 4;
    const x = projectile.x + Math.cos(projectile.angle) * speed;
    const y = projectile.y + Math.sin(projectile.angle) * speed;
    return { x, y, angle: projectile.angle };
  });

  projectiles = projectiles.filter(projectile => {
    if (isOutsideGameArea(projectile.x, projectile.y) || isProjectileOverlappingBase(projectile.x, projectile.y) || isOverlappingTower(projectile.x, projectile.y)) {
      return false;
    }
    const hitEnemyIndex = enemies.findIndex(enemy => distance(projectile.x, projectile.y, enemy.x, enemy.y) < enemySize + projectileSize);
    if (hitEnemyIndex >= 0) {
      enemies.splice(hitEnemyIndex, 1);
      let morePoints = 1 + Math.floor(enemiesSpawnedEnemies / 10)
      buildPoints = buildPoints + morePoints;
      buildPointsDisplay.textContent = `Build Points: ${buildPoints}`;
      return false;
    }
    return true;
  });
}

setInterval(() => {
  towers.forEach(shootProjectile);
}, shootRate);
