const canvas = document.querySelector("#park");
const displayContext = canvas.getContext("2d");
const pixelScale = 2;
const pixelCanvas = document.createElement("canvas");
pixelCanvas.width = canvas.width / pixelScale;
pixelCanvas.height = canvas.height / pixelScale;
const context = pixelCanvas.getContext("2d");

const lobby = document.querySelector("#lobby");
const playButton = document.querySelector("#play-button");
const gameElement = document.querySelector("#game");
const winScreen = document.querySelector("#win-screen");
const againButton = document.querySelector("#again-button");
const keyCount = document.querySelector("#keys");
const statusText = document.querySelector("#status");
const caughtCount = document.querySelector("#caught");
const promptElement = document.querySelector("#prompt");
const messageElement = document.querySelector("#message");

const keysRequired = 4;
let keysFound = 0;
const collectedKeys = new Set();
let paused = true;
let won = false;
let currentTarget = null;
let messageTimer = 0;
let minimapVisible = true;
let playerHidden = false;
let timesCaught = 0;

const player = {
  x: 20,
  y: 542,
  width: 20,
  height: 28,
  speed: 235,
  jumpSpeed: 440,
  velocityX: 0,
  velocityY: 0,
  onGround: false
};

const hidingBushes = [
  { x: 165, y: 535, width: 70, height: 35 },
  { x: 365, y: 535, width: 60, height: 35 },
  { x: 750, y: 535, width: 60, height: 35 }
];

const keeper = {
  x: 560,
  y: 540,
  width: 22,
  height: 30,
  patrolSpeed: 105,
  chaseSpeed: 160,
  sightRange: 210,
  mode: "patrol",
  waypoints: [
    { x: 180 },
    { x: 850 }
  ],
  waypointIndex: 0
};

const input = new Set();
const colliders = [];
const interactables = [];

function addCollider(x, y, width, height, enabled = true) {
  const collider = { x, y, width, height, enabled };
  colliders.push(collider);
  return collider;
}

function addBuilding(x, y, width, height, wallColor, roofColor, keyName, locked = false) {
  const wallSize = 10;
  const doorWidth = 44;
  const doorHeight = 58;
  const doorX = x + width / 2 - doorWidth / 2;
  const doorY = y + height - doorHeight;

  addCollider(x, y, width, wallSize, false);
  addCollider(x, y, wallSize, height, false);
  addCollider(x + width - wallSize, y, wallSize, height, false);

  const door = {
    kind: "door",
    x: doorX,
    y: doorY,
    width: doorWidth,
    height: doorHeight,
    open: false,
    locked,
    unlocked: !locked,
    requiresKey: locked ? "Maintenance Key" : null,
    color: "#8b5a2b"
  };
  door.collider = addCollider(doorX, doorY, doorWidth, doorHeight, false);
  interactables.push(door);

  const cabinet = {
    kind: "cabinet",
    x: x + width - 58,
    y: y + height - 38,
    width: 34,
    height: 28,
    open: false,
    searched: false,
    keyName,
    keyVisible: false
  };
  cabinet.collider = addCollider(cabinet.x, cabinet.y, cabinet.width, cabinet.height, false);
  cabinet.buildingDoor = door;
  interactables.push(cabinet);

  return { x, y, width, height, wallColor, roofColor, wallSize, door, cabinet };
}

const buildings = [
  addBuilding(50, 440, 140, 130, "#c9a76d", "#8d4a3a", "Shed Key"),
  addBuilding(220, 440, 140, 130, "#91b8c9", "#436f8a", "Cabin Key"),
  addBuilding(390, 440, 150, 130, "#a5c98b", "#6c7a4c", "Maintenance Key"),
  addBuilding(590, 440, 150, 130, "#9c9c9c", "#5c5c5c", "Gate Key", true)
];

const gate = {
  kind: "gate",
  x: 920,
  y: 512,
  width: 20,
  height: 58,
  open: false
};
gate.collider = addCollider(gate.x, gate.y, gate.width, gate.height);
interactables.push(gate);

addCollider(0, 0, 10, canvas.height);
addCollider(950, 0, 10, canvas.height);
addCollider(0, 570, canvas.width, 70);
addCollider(830, 500, 70, 16);

function entityBounds(entity, x = entity.x, y = entity.y) {
  return { x, y, width: entity.width, height: entity.height };
}

function playerBounds(x = player.x, y = player.y) {
  return entityBounds(player, x, y);
}

function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function blocked(x, y) {
  const bounds = playerBounds(x, y);
  return colliders.some(collider => collider.enabled && overlaps(bounds, collider));
}

function blockedForKeeper(x, y) {
  const bounds = entityBounds(keeper, x, y);
  return colliders.some(collider => collider.enabled && overlaps(bounds, collider));
}

function isPlayerHidden() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  return hidingBushes.some(bush =>
    centerX >= bush.x &&
    centerX <= bush.x + bush.width &&
    centerY >= bush.y &&
    centerY <= bush.y + bush.height
  );
}

function updateHidingStatus() {
  playerHidden = isPlayerHidden();
  statusText.textContent = playerHidden ? "Hiding" : keeper.mode === "chase" ? "Chased" : "Visible";
  caughtCount.textContent = `Caught ${timesCaught}`;
}

function distanceTo(object) {
  const objectCenterX = object.x + object.width / 2;
  const objectCenterY = object.y + object.height / 2;
  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  return Math.hypot(objectCenterX - playerCenterX, objectCenterY - playerCenterY);
}

function updateFocus() {
  currentTarget = null;
  if (paused || won) {
    promptElement.textContent = "";
    return;
  }

  let closestDistance = 60;
  for (const object of interactables) {
    const distance = distanceTo(object);
    if (distance > closestDistance) continue;
    closestDistance = distance;
    currentTarget = object;
  }

  if (!currentTarget) {
    promptElement.textContent = "";
    return;
  }

  if (currentTarget.kind === "door") {
    if (!currentTarget.unlocked) {
      promptElement.textContent = collectedKeys.has(currentTarget.requiresKey)
        ? "E: Unlock with Maintenance Key"
        : "Maintenance Key needed";
    } else {
      promptElement.textContent = currentTarget.open ? "E: Close door" : "E: Open door";
    }
  } else if (currentTarget.kind === "cabinet") {
    promptElement.textContent = !currentTarget.buildingDoor.open
      ? "Open the door first"
      : currentTarget.keyVisible
        ? "E: Take key"
        : currentTarget.open ? "E: Close cabinet" : "E: Search cabinet";
  } else if (currentTarget.kind === "gate") {
    promptElement.textContent = keysFound >= keysRequired ? "E: Unlock gate" : `Gate needs ${keysRequired} keys`;
  }
}

function showMessage(text) {
  messageElement.textContent = text;
  messageElement.style.opacity = 1;
  messageTimer = 2;
}

function updateKeyCount() {
  keyCount.textContent = `${keysFound} / ${keysRequired}`;
}

function interact() {
  if (!currentTarget || paused || won) return;

  if (currentTarget.kind === "door") {
    if (!currentTarget.unlocked) {
      if (!collectedKeys.has(currentTarget.requiresKey)) {
        showMessage(`Find the ${currentTarget.requiresKey} first.`);
        return;
      }
      currentTarget.unlocked = true;
      currentTarget.open = true;
      currentTarget.collider.enabled = false;
      showMessage("The maintenance area is open!");
      return;
    }

    currentTarget.open = !currentTarget.open;
    currentTarget.collider.enabled = false;
    return;
  }

  if (currentTarget.kind === "cabinet") {
    if (!currentTarget.buildingDoor.open) {
      showMessage("Open the door before searching.");
      return;
    }

    if (currentTarget.keyVisible) {
      currentTarget.keyVisible = false;
      keysFound++;
      collectedKeys.add(currentTarget.keyName);
      updateKeyCount();
      showMessage(keysFound >= keysRequired ? "All keys found! Go to the gate." : `${currentTarget.keyName} collected!`);
      return;
    }
    currentTarget.open = !currentTarget.open;
    if (currentTarget.open && !currentTarget.searched) {
      currentTarget.searched = true;
      currentTarget.keyVisible = true;
      showMessage("A key is hidden inside!");
    }
    return;
  }

  if (currentTarget.kind === "gate") {
    if (keysFound < keysRequired) {
      showMessage(`The gate is locked. ${keysFound} / ${keysRequired} keys found.`);
      return;
    }
    currentTarget.open = true;
    currentTarget.collider.enabled = false;
    showMessage("The gate is open! Walk right to escape.");
  }
}

function movePlayer(delta) {
  const direction = input.has("KeyD") || input.has("ArrowRight")
    ? 1
    : input.has("KeyA") || input.has("ArrowLeft") ? -1 : 0;
  player.velocityX = direction * player.speed;

  const jumpPressed = input.has("Space") || input.has("KeyW") || input.has("ArrowUp");
  if (jumpPressed && player.onGround) {
    player.velocityY = -player.jumpSpeed;
    player.onGround = false;
  }

  player.velocityY = Math.min(player.velocityY + 1250 * delta, 750);
  const nextX = player.x + player.velocityX * delta;
  if (!blocked(nextX, player.y)) player.x = nextX;

  const nextY = player.y + player.velocityY * delta;
  if (!blocked(player.x, nextY)) {
    player.y = nextY;
    player.onGround = false;
  } else {
    if (player.velocityY > 0) player.onGround = true;
    player.velocityY = 0;
  }

  if (!blocked(player.x, player.y + 1)) player.onGround = false;

  if (gate.open && player.x + player.width >= 930) {
    won = true;
    paused = true;
    promptElement.textContent = "";
    gameElement.classList.add("hidden");
    winScreen.classList.remove("hidden");
  }
}

function resetAfterCaught() {
  player.x = 20;
  player.y = 542;
  player.velocityX = 0;
  player.velocityY = 0;
  keeper.x = 560;
  keeper.y = 540;
  keeper.mode = "patrol";
  keeper.waypointIndex = 0;
  timesCaught++;
  updateHidingStatus();
  showMessage("The keeper caught you! Try hiding in a bush.");
}

function moveKeeper(delta) {
  const keeperCenterX = keeper.x + keeper.width / 2;
  const playerCenterX = player.x + player.width / 2;
  const distanceToPlayer = Math.abs(playerCenterX - keeperCenterX);

  keeper.mode = !playerHidden && distanceToPlayer <= keeper.sightRange ? "chase" : "patrol";

  const targetX = keeper.mode === "chase"
    ? playerCenterX
    : keeper.waypoints[keeper.waypointIndex].x;
  const deltaX = targetX - keeperCenterX;
  const distance = Math.abs(deltaX);

  if (keeper.mode === "patrol" && distance < 6) {
    keeper.waypointIndex = (keeper.waypointIndex + 1) % keeper.waypoints.length;
    return;
  }

  if (distance === 0) return;
  const speed = keeper.mode === "chase" ? keeper.chaseSpeed : keeper.patrolSpeed;
  const step = Math.min(distance, speed * delta);
  const nextX = keeper.x + Math.sign(deltaX) * step;
  const moved = !blockedForKeeper(nextX, keeper.y);
  if (moved) keeper.x = nextX;

  if ((!moved || distance < 6) && keeper.mode === "patrol") {
    keeper.waypointIndex = (keeper.waypointIndex + 1) % keeper.waypoints.length;
  }

  if (!playerHidden && overlaps(entityBounds(keeper), playerBounds())) {
    resetAfterCaught();
  }
}

function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function drawOutlinedRect(x, y, width, height, fillColor, outlineColor) {
  drawRect(x, y, width, height, outlineColor);
  drawRect(x + 2, y + 2, width - 4, height - 4, fillColor);
}

function drawKey(x, y) {
  context.fillStyle = "#ffd84d";
  context.beginPath();
  context.arc(x, y, 5, 0, Math.PI * 2);
  context.fill();
  context.fillRect(x - 1, y + 4, 2, 10);
  context.fillRect(x, y + 10, 6, 2);
}

function drawBush(bush) {
  drawOutlinedRect(bush.x, bush.y, bush.width, bush.height, "#1f7a3a", "#123c1d");
  drawRect(bush.x + 10, bush.y + 10, bush.width - 20, bush.height - 20, "#2fa14b");
  drawRect(bush.x + 20, bush.y + 12, 18, 12, "#49c464");
}

function drawKeeper() {
  const shirtColor = keeper.mode === "chase" ? "#e8574a" : "#f7d66b";
  drawOutlinedRect(keeper.x, keeper.y, keeper.width, keeper.height, shirtColor, "#171a20");
  drawRect(keeper.x + 4, keeper.y + 13, keeper.width - 8, 7, "#43566b");
  drawRect(keeper.x + 2, keeper.y - 4, keeper.width - 4, 7, "#3c7d43");
  context.fillStyle = "#101820";
  context.fillRect(keeper.x + 5, keeper.y + 6, 3, 3);
  context.fillRect(keeper.x + 12, keeper.y + 6, 3, 3);
  if (keeper.mode === "chase") {
    context.fillStyle = "#ffdc4a";
    context.fillRect(keeper.x + 6, keeper.y - 12, 8, 5);
  }
}

function drawPlayer() {
  context.globalAlpha = playerHidden ? .62 : 1;
  drawOutlinedRect(player.x, player.y, player.width, player.height, "#3b82f6", "#171a20");
  drawRect(player.x + 4, player.y, 12, 11, "#f3c68b");
  drawRect(player.x + 4, player.y + 12, 12, 10, "#3b82f6");
  drawRect(player.x + 5, player.y + 22, 4, 6, "#28466d");
  drawRect(player.x + 11, player.y + 22, 4, 6, "#28466d");
  context.fillStyle = "#101820";
  context.fillRect(player.x + 8, player.y + 4, 3, 3);
  context.fillRect(player.x + 13, player.y + 4, 3, 3);
  context.globalAlpha = 1;
}

function drawMinimap() {
  if (!minimapVisible) return;

  const mapWidth = 220;
  const mapHeight = 84;
  const mapX = canvas.width - mapWidth - 16;
  const mapY = 16;
  const scaleX = mapWidth / canvas.width;
  const scaleY = mapHeight / canvas.height;

  context.save();
  context.globalAlpha = .88;
  drawRect(mapX, mapY, mapWidth, mapHeight, "#0d1b26");
  context.strokeStyle = "#9be7ff";
  context.lineWidth = 2;
  context.strokeRect(mapX, mapY, mapWidth, mapHeight);

  for (const building of buildings) {
    const locked = building.door.locked && !building.door.unlocked;
    context.fillStyle = locked ? "#c94f4f" : building.roofColor;
    context.fillRect(
      mapX + building.x * scaleX,
      mapY + building.y * scaleY,
      building.width * scaleX,
      building.height * scaleY
    );
  }

  context.fillStyle = gate.open ? "#67d06b" : "#7c8792";
  context.fillRect(mapX + gate.x * scaleX, mapY + gate.y * scaleY, gate.width * scaleX, gate.height * scaleY);

  for (const bush of hidingBushes) {
    context.fillStyle = "#2fa14b";
    context.fillRect(mapX + bush.x * scaleX, mapY + bush.y * scaleY, bush.width * scaleX, bush.height * scaleY);
  }

  context.fillStyle = "#3b82f6";
  context.fillRect(mapX + player.x * scaleX - 2, mapY + player.y * scaleY - 2, 5, 6);
  context.fillStyle = keeper.mode === "chase" ? "#ff6b5b" : "#f7d66b";
  context.fillRect(mapX + keeper.x * scaleX - 2, mapY + keeper.y * scaleY - 2, 5, 6);
  context.fillStyle = "#7b5a3a";
  context.fillRect(mapX, mapY + 570 * scaleY, mapWidth, 3);
  context.fillStyle = "#fff";
  context.font = "bold 10px Segoe UI, sans-serif";
  context.fillText("SIDE MAP", mapX + 7, mapY + 13);
  context.restore();
}

function draw() {
  context.save();
  context.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
  context.scale(1 / pixelScale, 1 / pixelScale);

  drawRect(0, 0, canvas.width, 190, "#7fc9f5");
  drawRect(0, 190, canvas.width, 180, "#a8e0fb");
  drawRect(0, 370, canvas.width, 120, "#c8f0c8");
  drawRect(0, 490, canvas.width, 80, "#dcf4c8");

  drawOutlinedRect(820, 50, 64, 64, "#fff07a", "#f0c832");
  drawRect(836, 66, 32, 32, "#fff5c2");

  for (const cloud of [[110, 80], [390, 55], [680, 110]]) {
    context.fillStyle = "rgba(255,255,255,.9)";
    drawRect(cloud[0] - 50, cloud[1] - 10, 100, 20, "rgba(255,255,255,.9)");
    drawRect(cloud[0] - 30, cloud[1] - 24, 60, 18, "rgba(255,255,255,.9)");
    drawRect(cloud[0] - 62, cloud[1] + 2, 124, 10, "rgba(255,255,255,.9)");
  }

  drawRect(0, 500, 410, 70, "#8fcf8a");
  drawRect(50, 480, 300, 20, "#8fcf8a");
  drawRect(110, 465, 180, 15, "#8fcf8a");
  drawRect(420, 500, 480, 70, "#84c584");
  drawRect(480, 480, 340, 20, "#84c584");
  drawRect(550, 465, 200, 15, "#84c584");

  for (const tree of [[20, 470], [390, 470], [555, 470], [930, 470]]) {
    drawRect(tree[0] - 8, tree[1] - 10, 16, 110, "#6b4a2a");
    drawOutlinedRect(tree[0] - 40, tree[1] - 65, 80, 60, "#39a84f", "#1d5f2a");
    drawRect(tree[0] - 28, tree[1] - 80, 56, 18, "#48bf58");
  }

  drawRect(0, 570, canvas.width, 70, "#6dbd67");
  drawRect(0, 570, canvas.width, 10, "#5aa556");

  for (const building of buildings) {
    drawOutlinedRect(building.x, building.y, building.width, building.height, building.wallColor, "#3d2b20");
    drawRect(
      building.x + building.wallSize,
      building.y + building.wallSize,
      building.width - building.wallSize * 2,
      building.height - building.wallSize * 2,
      "#d8c9a8"
    );
    drawRect(building.x - 10, building.y - 4, building.width + 20, 14, building.roofColor);
    drawRect(building.x + 15, building.y - 16, building.width - 30, 14, building.roofColor);
    drawRect(building.x + 40, building.y - 26, building.width - 80, 12, building.roofColor);

    const door = building.door;
    context.globalAlpha = door.open ? .3 : 1;
    drawRect(door.x, door.y, door.width, door.height, door.color);
    context.globalAlpha = 1;

    const cabinet = building.cabinet;
    drawRect(cabinet.x, cabinet.y, cabinet.width, cabinet.height, "#7a4a24");
    drawRect(cabinet.x + 4, cabinet.y + 5, cabinet.width - 8, cabinet.height - 10, cabinet.open ? "#22160c" : "#a1662f");
    if (cabinet.keyVisible) drawKey(cabinet.x + cabinet.width / 2, cabinet.y - 4);
  }

  for (const bush of hidingBushes) {
    drawBush(bush);
  }

  context.globalAlpha = gate.open ? .25 : 1;
  drawOutlinedRect(gate.x, gate.y, gate.width, gate.height, "#7c8792", "#2f3742");
  context.globalAlpha = 1;
  drawRect(gate.x, gate.y, gate.width, 4, "#4a5560");

  drawRect(830, 500, 70, 16, "#8a6238");
  drawRect(830, 488, 70, 8, "#a97446");
  drawRect(0, 490, 10, 90, "#7b5a3a");
  drawRect(950, 490, 10, 90, "#7b5a3a");

  if (currentTarget) {
    context.strokeStyle = "rgba(255, 216, 77, .95)";
    context.lineWidth = 3;
    context.strokeRect(currentTarget.x - 3, currentTarget.y - 3, currentTarget.width + 6, currentTarget.height + 6);
  }

  drawKeeper();
  drawPlayer();
  drawMinimap();

  context.restore();
  displayContext.imageSmoothingEnabled = false;
  displayContext.clearRect(0, 0, canvas.width, canvas.height);
  displayContext.drawImage(
    pixelCanvas,
    0,
    0,
    pixelCanvas.width,
    pixelCanvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
}

function startGame() {
  paused = false;
  lobby.classList.add("hidden");
  gameElement.classList.remove("hidden");
}

playButton.addEventListener("click", startGame);
againButton.addEventListener("click", () => window.location.reload());

document.addEventListener("keydown", event => {
  input.add(event.code);
  if (event.code === "KeyE") interact();
  if (event.code === "KeyM") minimapVisible = !minimapVisible;
  if (event.code === "Escape" && !won) {
    paused = true;
    gameElement.classList.add("hidden");
    lobby.classList.remove("hidden");
    playButton.textContent = "Resume";
  }
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) {
    event.preventDefault();
  }
});

document.addEventListener("keyup", event => input.delete(event.code));

updateKeyCount();

let lastTime = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const delta = Math.min(.05, (now - lastTime) / 1000);
  lastTime = now;

  if (!paused && !won) {
    movePlayer(delta);
    updateHidingStatus();
    moveKeeper(delta);
    updateFocus();
  }

  if (messageTimer > 0) {
    messageTimer -= delta;
    if (messageTimer <= 0) messageElement.style.opacity = 0;
  }

  draw();
}

requestAnimationFrame(animate);
