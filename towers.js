const towerSize = 10;

let towers = [];

function distance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function isOverlappingBase(x, y) {
  const baseCenterX = canvas.width / 2;
  const baseCenterY = canvas.height / 2;
  const exclusionRadius = baseRadius + towerSize / 2 + 50;
  return distance(x, y, baseCenterX, baseCenterY) < exclusionRadius;
}

function tryToAddTower(x, y) {
  if (!isOverlappingTower(x, y) && !isOverlappingBase(x, y)) {
    towers.push({ x: x - towerSize / 2, y: y - towerSize / 2 });
    return true;
  }
  return false;
}

function drawTowers() {
  towers.forEach(tower => {
    ctx.beginPath();
    ctx.rect(tower.x, tower.y, towerSize, towerSize);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
  });
}
