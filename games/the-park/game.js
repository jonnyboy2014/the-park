import * as THREE from "three";
import { createWorld } from "/3d/world.js";

const lobby = document.querySelector("#lobby");
const playButton = document.querySelector("#play-button");
const winScreen = document.querySelector("#win-screen");
const againButton = document.querySelector("#again-button");
const hud = document.querySelector("#hud");
const promptElement = document.querySelector("#prompt");
const messageElement = document.querySelector("#message");
const keyCount = document.querySelector("#keys");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#8fd3ff");
scene.fog = new THREE.Fog("#8fd3ff", 35, 85);

const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, .1, 150);
camera.rotation.order = "YXZ";
camera.position.set(0, 1.65, 25);

const hemiLight = new THREE.HemisphereLight("#bfe8ff", "#4b7a45", 1.1);
scene.add(hemiLight);
const sun = new THREE.DirectionalLight("#fff5d6", 1.2);
sun.position.set(18, 30, 20);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -45;
sun.shadow.camera.right = 45;
sun.shadow.camera.top = 45;
sun.shadow.camera.bottom = -45;
scene.add(sun);

const world = createWorld(scene);
let keysFound = 0;
let currentTarget = null;
let messageTimer = 0;
let won = false;

const player = {
  position: new THREE.Vector3(0, 0, 25),
  verticalVelocity: 0,
  onGround: true
};

const input = new Set();
let yaw = Math.PI;
let pitch = 0;

function playerBox(position) {
  return new THREE.Box3(
    new THREE.Vector3(position.x - .34, position.y + .15, position.z - .34),
    new THREE.Vector3(position.x + .34, position.y + 1.65, position.z + .34)
  );
}

function blocked(position) {
  const bounds = playerBox(position);
  return world.colliders.some(collider => collider.enabled && collider.box.intersectsBox(bounds));
}

function movePlayer(delta) {
  const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
  const move = new THREE.Vector3();

  if (input.has("KeyW") || input.has("ArrowUp")) move.add(forward);
  if (input.has("KeyS") || input.has("ArrowDown")) move.sub(forward);
  if (input.has("KeyD") || input.has("ArrowRight")) move.add(right);
  if (input.has("KeyA") || input.has("ArrowLeft")) move.sub(right);

  if (move.lengthSq() > 0) move.normalize();
  const speed = input.has("ShiftLeft") || input.has("ShiftRight") ? 7.5 : 4.8;
  const nextX = player.position.clone();
  nextX.x += move.x * speed * delta;
  if (!blocked(nextX)) player.position.x = nextX.x;

  const nextZ = player.position.clone();
  nextZ.z += move.z * speed * delta;
  if (!blocked(nextZ)) player.position.z = nextZ.z;

  if (input.has("Space") && player.onGround) {
    player.verticalVelocity = 6.4;
    player.onGround = false;
  }

  player.verticalVelocity -= 16 * delta;
  player.position.y += player.verticalVelocity * delta;
  if (player.position.y <= 0) {
    player.position.y = 0;
    player.verticalVelocity = 0;
    player.onGround = true;
  }

  camera.position.set(player.position.x, player.position.y + 1.65, player.position.z);
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
}

const raycaster = new THREE.Raycaster();
const screenCenter = new THREE.Vector2(0, 0);

function findInteractive(hit) {
  let object = hit.object;
  while (object && !object.userData.interactive) object = object.parent;
  return object;
}

function updateFocus() {
  if (document.pointerLockElement !== renderer.domElement || won) {
    currentTarget = null;
    promptElement.textContent = "";
    return;
  }

  raycaster.setFromCamera(screenCenter, camera);
  raycaster.far = 3.4;
  const hits = raycaster.intersectObjects(world.interactables, true);
  currentTarget = null;

  for (const hit of hits) {
    const object = findInteractive(hit);
    if (!object) continue;
    if (object.userData.kind === "key" && !object.visible) continue;
    currentTarget = object;
    break;
  }

  if (!currentTarget) {
    promptElement.textContent = "";
    return;
  }

  const kind = currentTarget.userData.kind;
  if (kind === "door") promptElement.textContent = currentTarget.userData.open ? "E: Close door" : "E: Open door";
  if (kind === "cabinet") {
    const key = currentTarget.userData.key;
    if (currentTarget.userData.open && key.visible && !key.userData.collected) {
      promptElement.textContent = "E: Take key";
    } else {
      promptElement.textContent = currentTarget.userData.open ? "E: Close cabinet" : "E: Search cabinet";
    }
  }
  if (kind === "key") promptElement.textContent = "E: Take key";
  if (kind === "gate") {
    promptElement.textContent = keysFound >= world.keysRequired ? "E: Unlock gate" : "Gate needs 3 keys";
  }
}

function showMessage(text) {
  messageElement.textContent = text;
  messageElement.style.opacity = 1;
  messageTimer = 2.2;
}

function updateKeyCount() {
  keyCount.textContent = `${keysFound} / ${world.keysRequired}`;
}

function interact() {
  if (!currentTarget || won) return;
  const data = currentTarget.userData;

  if (data.kind === "door") {
    data.open = !data.open;
    data.blocker.enabled = !data.open;
    return;
  }

  if (data.kind === "cabinet") {
    if (data.open && data.key.visible && !data.key.userData.collected) {
      data.key.userData.collected = true;
      data.key.visible = false;
      keysFound++;
      updateKeyCount();
      showMessage(keysFound >= world.keysRequired ? "All keys found! Go to the gate." : `${data.key.userData.name} collected!`);
      return;
    }

    data.open = !data.open;
    if (data.open && !data.searched) {
      data.searched = true;
      data.key.visible = true;
      showMessage("A key is hidden inside!");
    }
    if (!data.open && !data.key.userData.collected) data.key.visible = false;
    return;
  }

  if (data.kind === "key" && !data.collected) {
    data.collected = true;
    currentTarget.visible = false;
    keysFound++;
    updateKeyCount();
    showMessage(keysFound >= world.keysRequired ? "All keys found! Go to the gate." : `${data.name} collected!`);
    return;
  }

  if (data.kind === "gate") {
    if (keysFound < world.keysRequired) {
      showMessage(`The gate is locked. ${keysFound} / ${world.keysRequired} keys found.`);
      return;
    }
    data.open = true;
    data.blocker.enabled = false;
    won = true;
    setTimeout(() => {
      document.exitPointerLock();
      hud.classList.add("hidden");
      winScreen.classList.remove("hidden");
    }, 1100);
  }
}

function enterPark() {
  renderer.domElement.requestPointerLock();
}

playButton.addEventListener("click", enterPark);
againButton.addEventListener("click", () => window.location.reload());

document.addEventListener("pointerlockchange", () => {
  const locked = document.pointerLockElement === renderer.domElement;
  if (locked) {
    lobby.classList.add("hidden");
    winScreen.classList.add("hidden");
    hud.classList.remove("hidden");
    return;
  }

  promptElement.textContent = "";
  if (!won) {
    hud.classList.add("hidden");
    lobby.classList.remove("hidden");
    playButton.textContent = "Resume";
  }
});

document.addEventListener("keydown", event => {
  input.add(event.code);
  if (event.code === "KeyE") interact();
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
    event.preventDefault();
  }
});

document.addEventListener("keyup", event => input.delete(event.code));

document.addEventListener("mousemove", event => {
  if (document.pointerLockElement !== renderer.domElement) return;
  yaw -= event.movementX * .0023;
  pitch -= event.movementY * .0023;
  pitch = Math.max(-1.35, Math.min(1.35, pitch));
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

updateKeyCount();

let lastTime = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const delta = Math.min(.05, (now - lastTime) / 1000);
  const elapsed = now / 1000;
  lastTime = now;

  if (document.pointerLockElement === renderer.domElement && !won) movePlayer(delta);
  world.update(delta, elapsed);
  updateFocus();

  if (messageTimer > 0) {
    messageTimer -= delta;
    if (messageTimer <= 0) messageElement.style.opacity = 0;
  }

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
