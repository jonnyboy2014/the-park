import * as THREE from "three";

const materials = new Map();

function material(color) {
  if (!materials.has(color)) {
    materials.set(color, new THREE.MeshLambertMaterial({ color }));
  }
  return materials.get(color);
}

function addBox(scene, colliders, width, height, depth, x, y, z, color, collide = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material(color));
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  if (collide) {
    colliders.push({
      box: new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(width, height, depth)
      ),
      enabled: true
    });
  }
  return mesh;
}

function makeKey(scene, interactables, x, y, z, name) {
  const key = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.12, .035, 8, 18), material("#ffd84d"));
  const stem = new THREE.Mesh(new THREE.BoxGeometry(.05, .3, .05), material("#ffd84d"));
  const tooth = new THREE.Mesh(new THREE.BoxGeometry(.14, .05, .05), material("#ffd84d"));
  stem.position.y = -.23;
  tooth.position.set(.07, -.33, 0);
  key.add(ring, stem, tooth);
  key.position.set(x, y, z);
  key.visible = false;
  key.userData = { interactive: true, kind: "key", name, collected: false };
  scene.add(key);
  interactables.push(key);
  return key;
}

function makeCabinet(scene, colliders, interactables, x, z, keyName) {
  const cabinet = new THREE.Group();
  cabinet.position.set(x, 0, z);
  cabinet.userData = { interactive: true, kind: "cabinet", open: false, searched: false };

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, .7), material("#7a4a24"));
  body.position.y = .75;
  body.castShadow = true;
  body.receiveShadow = true;
  cabinet.add(body);

  const opening = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, .06), material("#22160c"));
  opening.position.set(0, .82, .36);
  cabinet.add(opening);

  const door = new THREE.Group();
  door.position.set(-.55, .82, .4);
  const panel = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, .07), material("#a1662f"));
  panel.position.x = .55;
  panel.castShadow = true;
  door.add(panel);
  cabinet.add(door);

  const handle = new THREE.Mesh(new THREE.SphereGeometry(.05), material("#ffd84d"));
  handle.position.set(.9, .82, .47);
  cabinet.add(handle);
  scene.add(cabinet);

  colliders.push({
    box: new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(x, .75, z),
      new THREE.Vector3(1.5, 1.5, .7)
    ),
    enabled: true
  });
  interactables.push(cabinet);
  cabinet.userData.door = door;
  cabinet.userData.key = makeKey(scene, interactables, x, .82, z, keyName);
  return cabinet;
}

function makeDoor(scene, colliders, interactables, x, z, color) {
  const door = new THREE.Group();
  door.position.set(x, 0, z);
  door.userData = { interactive: true, kind: "door", open: false };

  const hinge = new THREE.Group();
  const panel = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.5, .12), material(color));
  panel.position.set(.75, 1.25, 0);
  panel.castShadow = true;
  hinge.add(panel);
  const handle = new THREE.Mesh(new THREE.SphereGeometry(.06), material("#ffd84d"));
  handle.position.set(1.25, 1.2, .1);
  hinge.add(handle);
  door.add(hinge);
  scene.add(door);

  const blocker = {
    box: new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(x + .75, 1.25, z),
      new THREE.Vector3(1.5, 2.5, .25)
    ),
    enabled: true
  };
  colliders.push(blocker);
  interactables.push(door);
  door.userData.hinge = hinge;
  door.userData.blocker = blocker;
  return door;
}

function buildBuilding(scene, colliders, interactables, x, z, wallColor, roofColor, keyName) {
  const width = 7;
  const depth = 6;
  const height = 3.2;
  const frontZ = z + depth / 2;

  addBox(scene, colliders, width, .2, depth, x, .1, z, "#6d6257", false);
  addBox(scene, colliders, width, height, .25, x, height / 2, z - depth / 2, wallColor);
  addBox(scene, colliders, .25, height, depth, x - width / 2, height / 2, z, wallColor);
  addBox(scene, colliders, .25, height, depth, x + width / 2, height / 2, z, wallColor);
  addBox(scene, colliders, 2.4, height, .25, x - 2.3, height / 2, frontZ, wallColor);
  addBox(scene, colliders, 2.4, height, .25, x + 2.3, height / 2, frontZ, wallColor);
  addBox(scene, colliders, 2.2, .7, .25, x, 2.85, frontZ, wallColor);
  addBox(scene, colliders, width + .8, .4, depth + .8, x, height + .2, z, roofColor);

  makeDoor(scene, colliders, interactables, x - .75, frontZ, "#8b5a2b");
  makeCabinet(scene, colliders, interactables, x - 2, z - 1.4, keyName);
}

function makeTree(scene, colliders, x, z) {
  addBox(scene, colliders, .5, 2.4, .5, x, 1.2, z, "#6b4a2a");
  addBox(scene, colliders, 2.4, 1.5, 2.4, x, 3, z, "#3fa84f", false);
}

function makeGate(scene, colliders, interactables) {
  const gate = new THREE.Group();
  gate.position.set(0, 0, -30);
  gate.userData = { interactive: true, kind: "gate", open: false };

  const frame = new THREE.Mesh(new THREE.BoxGeometry(4.2, .5, .5), material("#4a5560"));
  frame.position.y = 2.8;
  const bars = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.6, .18), material("#7c8792"));
  bars.position.y = 1.3;
  gate.add(frame, bars);
  scene.add(gate);

  const blocker = {
    box: new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(0, 1.3, -30),
      new THREE.Vector3(4, 2.6, .5)
    ),
    enabled: true
  };
  colliders.push(blocker);
  interactables.push(gate);
  gate.userData.blocker = blocker;
  gate.userData.frame = frame;
  gate.userData.bars = bars;
  return gate;
}

export function createWorld(scene) {
  const colliders = [];
  const interactables = [];

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material("#61a35f"));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  addBox(scene, colliders, 7, .06, 62, 0, .04, 0, "#a99a76", false);
  addBox(scene, colliders, 45, .06, 7, -8, .04, 16, "#a99a76", false);
  addBox(scene, colliders, 45, .06, 7, 12, .04, -18, "#a99a76", false);

  addBox(scene, colliders, 100, 2.5, .5, 0, 1.25, -35, "#7b5a3a");
  addBox(scene, colliders, 100, 2.5, .5, 0, 1.25, 35, "#7b5a3a");
  addBox(scene, colliders, .5, 2.5, 70, -50, 1.25, 0, "#7b5a3a");
  addBox(scene, colliders, .5, 2.5, 70, 50, 1.25, 0, "#7b5a3a");

  buildBuilding(scene, colliders, interactables, -12, -8, "#c9a76d", "#8d4a3a", "Shed Key");
  buildBuilding(scene, colliders, interactables, 12, -8, "#91b8c9", "#436f8a", "Cabin Key");
  buildBuilding(scene, colliders, interactables, 0, 14, "#a5c98b", "#6c7a4c", "Kiosk Key");

  makeTree(scene, colliders, -6, 2);
  makeTree(scene, colliders, 7, 5);
  makeTree(scene, colliders, -20, 14);
  makeTree(scene, colliders, 20, 14);
  makeTree(scene, colliders, -22, -18);
  makeTree(scene, colliders, 22, -18);

  addBox(scene, colliders, 1.8, .25, .6, -4, .12, 9, "#8a6238");
  addBox(scene, colliders, 1.8, .25, .6, 4, .12, 9, "#8a6238");
  addBox(scene, colliders, .25, .7, .6, -4.7, .35, 9, "#8a6238");
  addBox(scene, colliders, .25, .7, .6, 4.7, .35, 9, "#8a6238");

  const gate = makeGate(scene, colliders, interactables);

  return {
    colliders,
    interactables,
    gate,
    keysRequired: 3,
    update(delta, elapsed) {
      for (const object of interactables) {
        if (object.userData.kind !== "cabinet" && object.userData.kind !== "door") continue;
        const target = object.userData.open ? -1.15 : 0;
        const hinge = object.userData.door || object.userData.hinge;
        hinge.rotation.y += (target - hinge.rotation.y) * Math.min(1, delta * 8);
      }

      for (const object of interactables) {
        if (object.userData.kind !== "key" || object.userData.collected || !object.visible) continue;
        object.rotation.y = elapsed;
        object.position.y = .82 + Math.sin(elapsed * 3) * .04;
      }

      const barsTarget = gate.userData.open ? 5.5 : 1.3;
      gate.userData.bars.position.y += (barsTarget - gate.userData.bars.position.y) * Math.min(1, delta * 4);
      gate.userData.frame.visible = !gate.userData.open;
    }
  };
}
