import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const gameUrl = 'http://127.0.0.1:3000/doors/';
const outputDirectory = path.resolve('.tmp/the-park-release-trailer');
const framesDirectory = path.join(outputDirectory, 'frames');
const frameRate = 10;
let frameIndex = 0;
const timeline = [];

await mkdir(framesDirectory, { recursive: true });
const pages = await fetch('http://127.0.0.1:9333/json/list').then(response => response.json());
const page = pages.find(item => item.type === 'page' && item.url.startsWith(gameUrl));
if (!page) throw new Error('Open THE PARK in the Chrome recording tab first.');

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let nextId = 1;
const pending = new Map();
const exceptions = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  } else if (message.method === 'Runtime.exceptionThrown') {
    exceptions.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
  }
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}

async function wait(milliseconds) {
  await new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function captureFrame() {
  const image = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
  const filename = `frame-${String(frameIndex).padStart(6, '0')}.png`;
  await writeFile(path.join(framesDirectory, filename), Buffer.from(image.data, 'base64'));
  frameIndex++;
}

async function record(duration) {
  const frames = Math.round(duration * frameRate);
  for (let index = 0; index < frames; index++) {
    const started = Date.now();
    await captureFrame();
    await wait(Math.max(0, 1000 / frameRate - (Date.now() - started)));
  }
}

async function caption(kicker, title, subtitle) {
  await evaluate(`(() => {
    const card = document.querySelector('#trailer-title-card');
    const sceneCaption = document.querySelector('#trailer-caption');
    card.style.display = 'none';
    sceneCaption.style.display = 'block';
    document.querySelector('#trailer-kicker').textContent = ${JSON.stringify(kicker)};
    document.querySelector('#trailer-title').textContent = ${JSON.stringify(title)};
    document.querySelector('#trailer-subtitle').textContent = ${JSON.stringify(subtitle)};
  })()`);
}

async function titleCard(kicker, title, subtitle, footer) {
  await evaluate(`(() => {
    const card = document.querySelector('#trailer-title-card');
    document.querySelector('#trailer-caption').style.display = 'none';
    card.style.display = 'flex';
    document.querySelector('#trailer-card-kicker').textContent = ${JSON.stringify(kicker)};
    document.querySelector('#trailer-card-title').textContent = ${JSON.stringify(title)};
    document.querySelector('#trailer-card-subtitle').textContent = ${JSON.stringify(subtitle)};
    document.querySelector('#trailer-card-footer').textContent = ${JSON.stringify(footer)};
  })()`);
}

async function cleanScene() {
  await evaluate(`(() => {
    paused = true;
    input.clear();
    for (const task of window.__trailerTasks || []) {
      clearTimeout(task);
      clearInterval(task);
    }
    window.__trailerTasks = [];
  })()`);
}

async function room(floor, door, setup = '') {
  await evaluate(`(() => {
    window.__trailerResetScreens();
    currentFloor = ${JSON.stringify(floor)};
    currentDoor = ${door};
    cutsceneSeen = true;
    cutsceneActive = false;
    officeSideRoomActive = false;
    startRoom();
    paused = true;
    player.invulnerableTimer = 999;
    ${setup}
    updateHud();
    drawRoom();
  })()`);
}

async function scene(name, kicker, title, subtitle, duration, setup, fullCard = false) {
  await setup();
  if (!fullCard) await caption(kicker, title, subtitle);
  const start = frameIndex / frameRate;
  await record(duration);
  timeline.push({ name, start, duration: frameIndex / frameRate - start });
  await cleanScene();
  console.log(`${name}: ${duration.toFixed(1)}s`);
}

const savedStorage = await evaluate(`Object.fromEntries(Object.keys(localStorage).map(key => [key, localStorage.getItem(key)]))`);

try {
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  await send('Page.reload', { ignoreCache: true });
  await wait(900);

  await evaluate(`(() => {
    window.__trailerRandom = Math.random;
    Math.random = () => .99;
    window.__trailerTasks = [];
    window.__trailerAfter = (callback, milliseconds) => {
      const task = setTimeout(callback, milliseconds);
      window.__trailerTasks.push(task);
    };
    window.__trailerEvery = (callback, milliseconds) => {
      const task = setInterval(callback, milliseconds);
      window.__trailerTasks.push(task);
    };
    window.__trailerResetScreens = () => {
      lobby.classList.add('hidden');
      badgeScreen.classList.add('hidden');
      floorScreen.classList.add('hidden');
      winScreen.classList.add('hidden');
      gameElement.classList.remove('hidden');
      gardenCutscene.classList.remove('active');
      badgeDescentScreen.hidden = true;
      if (badgeDetailDialog.open) badgeDetailDialog.close();
      won = false;
      messageElement.style.opacity = 0;
      badgeToast.classList.remove('visible');
    };
    window.__trailerAutoRun = () => {
      paused = false;
      player.invulnerableTimer = 999;
      input.add('KeyD');
      window.__trailerEvery(() => {
        input.add('KeyD');
        const obstacle = obstacles
          .filter(item => item.x + item.width > player.x && item.x - player.x < 105)
          .sort((first, second) => first.x - second.x)[0];
        if (!obstacle) {
          input.delete('KeyS');
          input.delete('Space');
          return;
        }
        const lowBeam = ['beam', 'vineBeam', 'fallenLog', 'cableBeam'].includes(obstacle.type);
        if (lowBeam && obstacle.x - player.x < 88) input.add('KeyS');
        else input.delete('KeyS');
        if (!lowBeam && obstacle.x - player.x < 72 && player.onGround) input.add('Space');
        else input.delete('Space');
      }, 60);
    };
    const overlay = document.createElement('div');
    overlay.id = 'trailer-capture-overlay';
    overlay.innerHTML = \`
      <div class="trailer-bar trailer-bar-top"></div>
      <div class="trailer-bar trailer-bar-bottom"></div>
      <div id="trailer-caption">
        <div id="trailer-kicker"></div>
        <div id="trailer-title"></div>
        <div id="trailer-subtitle"></div>
      </div>
      <div id="trailer-title-card">
        <div id="trailer-card-kicker"></div>
        <div id="trailer-card-title">THE PARK</div>
        <div class="trailer-card-rule"></div>
        <div id="trailer-card-subtitle"></div>
        <div id="trailer-card-footer"></div>
      </div>\`;
    const style = document.createElement('style');
    style.textContent = \`
      #trailer-capture-overlay{position:fixed;inset:0;z-index:99999;pointer-events:none;font-family:"Segoe UI",system-ui,sans-serif;color:#fff}
      .trailer-bar{position:absolute;left:0;right:0;height:24px;background:#05080c}
      .trailer-bar-top{top:0}.trailer-bar-bottom{bottom:0}
      #hud{top:30px!important}#message{top:82px!important}#hotbar{bottom:38px!important}#prompt{bottom:38px!important}
      #trailer-caption{position:absolute;left:42px;bottom:52px;max-width:820px;padding:12px 18px;border-left:5px solid #ffd84d;background:linear-gradient(90deg,rgba(5,10,16,.92),rgba(5,10,16,.35));text-shadow:0 3px 8px #000}
      #trailer-kicker,#trailer-card-kicker{color:#9be7ff;font-size:12px;font-weight:900;letter-spacing:4px;text-transform:uppercase}
      #trailer-title{margin-top:3px;font-size:29px;font-weight:900;letter-spacing:.5px;text-transform:uppercase}
      #trailer-subtitle{margin-top:3px;color:#dbeaf5;font-size:14px;font-weight:600}
      #trailer-title-card{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:radial-gradient(circle at 50% 40%,#263b50 0,#101923 42%,#05090f 78%)}
      #trailer-card-title{margin:16px 0 4px;color:#fff;font-size:78px;font-weight:1000;letter-spacing:12px;text-shadow:0 0 35px rgba(155,231,255,.35),0 7px 0 #162c3b}
      .trailer-card-rule{width:180px;height:5px;margin:16px;background:#ffd84d;box-shadow:0 0 20px rgba(255,216,77,.4)}
      #trailer-card-subtitle{max-width:1040px;padding:0 35px;color:#ffd84d;font-size:27px;font-weight:900;letter-spacing:2px;line-height:1.4;text-transform:uppercase;white-space:pre-line}
      #trailer-card-footer{max-width:1000px;margin-top:26px;padding:0 30px;color:#dbeaf5;font-size:16px;font-weight:700;line-height:1.8;white-space:pre-line}
      #backpack-storage{bottom:98px!important}
    \`;
    document.head.append(style);
    document.body.append(overlay);
  })()`);

  await scene('Opening', 'JONAS GAME STUDIO PRESENTS', 'THE PARK', '100 DOORS. EVERY FLOOR. ONE ESCAPE.\nRELEASE DAY - VERSION 1.0', 3.5,
    () => titleCard('JONAS GAME STUDIO PRESENTS', 'THE PARK', '100 DOORS. EVERY FLOOR. ONE ESCAPE.', 'RELEASE DAY - VERSION 1.0'), true);

  await scene('Lobby and floors', 'YOUR ESCAPE BEGINS', 'FOUR FLOORS TO EXPLORE', 'Main Floor, The Cellar, The Garden, and The Office', 4, async () => {
    await evaluate(`(() => {
      window.__trailerResetScreens();
      gameElement.classList.add('hidden');
      lobby.classList.remove('hidden');
      window.__trailerAfter(() => floorsButton.click(), 1500);
    })()`);
  });

  await scene('Main Floor rooms', 'MAIN FLOOR', 'A WORLD BEHIND EVERY DOOR', 'Detailed rooms, wallpaper, furniture, and a new adventurer', 4.5, async () => {
    await room('main', 1, `player.x = 430; player.moving = true;`);
    await evaluate(`(() => {
      const rooms = [1, 16, 21, 41];
      let index = 0;
      window.__trailerEvery(() => {
        index = (index + 1) % rooms.length;
        currentFloor = 'main';
        currentDoor = rooms[index];
        startRoom();
        paused = true;
        player.x = 430;
        player.moving = true;
        player.invulnerableTimer = 999;
        drawRoom();
      }, 1050);
    })()`);
  });

  await scene('Playable stairs', 'GRAND STAIRWELLS', 'REAL STAIRS. REAL EXPLORATION.', 'Walk, jump, climb back up - or press GO DOWN THE STAIRS', 4, async () => {
    await room('main', 5, `paused = false; window.__trailerAfter(() => startMainFloorStairDescent(), 400);`);
  });

  await scene('Elevators', 'MAIN FLOOR SECTIONS', 'THE ELEVATOR IS THE ONLY WAY DOWN', 'Animated rides connect each five-door section', 3.5, async () => {
    await room('main', 7, `
      player.x = mainFloorElevator.x + 30;
      updateTarget();
      window.__trailerAfter(() => { paused = false; interact(); }, 350);
    `);
  });

  await scene('Main chase', 'DOORS 26-33', 'THE PARK MONSTER IS COMING', 'Jump, slide, and race through stairwell chases at Doors 27 and 32', 4, async () => {
    await room('main', 27, `monster.x = -45; window.__trailerAutoRun();`);
  });

  await scene('Reward room', 'CHASE REWARDS', 'SPEED BOOTS AND A FLASHLIGHT', 'Escape the monster and open the reward chest', 2.8, async () => {
    await room('main', 34, `
      player.x = 405;
      player.y = groundY - player.height;
      rewardClaimed = false;
      rewardChest.claimed = false;
      window.__trailerAfter(() => { updateTarget(); interact(); }, 650);
    `);
  });

  await scene('Door 50 boss', 'DOOR 50', 'THE PARK DEMON', 'Three stomps. Two phases. Watch for the charge warning.', 4, async () => {
    await room('main', 50, `
      boss.health = 1;
      boss.phase = 2;
      boss.chargeTimer = 1.2;
      player.x = 390;
      player.y = 292;
      paused = false;
    `);
  });

  await scene('Door 75 boss', 'DOOR 75', 'THE RETURNING MONSTER', 'Four stomps, moving spikes, and an even faster Phase 2', 4, async () => {
    await room('main', 75, `
      boss.health = 2;
      boss.phase = 2;
      boss.chargeTimer = 1.1;
      player.x = 390;
      paused = false;
      window.__trailerEvery(() => {
        if (player.onGround) {
          input.add('Space');
          window.__trailerAfter(() => input.delete('Space'), 160);
        }
      }, 850);
    `);
  });

  await scene('Rocket', 'SPECIAL ENCOUNTER', 'ROCKET IS COMING', 'Five seconds to hide in the closet', 3.5, async () => {
    await room('main', 36, `
      rushActive = true;
      rushWarningTimer = 1.3;
      closetVisible = true;
      player.x = closet.x - 15;
      paused = false;
      window.__trailerAfter(() => {
        player.hidden = true;
        player.x = closet.x + 12;
        player.y = closet.y + closet.height - player.height;
      }, 1350);
    `);
  });

  await scene('Restaurant', 'RARE RESTAURANT ROOM', 'MILKSHAKES AND RARE FINDS', 'Collect items, heal up, and fill your hotbar', 3, async () => {
    await room('main', 2, `
      rareRoomActive = true;
      fantaJugActive = false;
      milkshake.taken = false;
      cabinet.searched = true;
      player.health = 50;
      player.x = 390;
      updateHealthUi();
      window.__trailerAfter(() => {
        updateTarget();
        interact();
        selectHotbarSlot(hotbarSlots.findIndex(item => item?.id === 'milkshake'));
        useSelectedHotbarItem();
      }, 650);
    `);
  });

  await scene('Fanta Jug', '0.5% BASEMENT FIND', 'THE FANTA JUG', 'Restore 100% HP and unleash an eight-second Fanta Rush', 3, async () => {
    await room('main', 2, `
      rareRoomActive = false;
      fantaJugActive = true;
      fantaJug.taken = false;
      cabinet.searched = true;
      player.health = 40;
      player.x = 450;
      updateHealthUi();
      window.__trailerAfter(() => {
        updateTarget();
        interact();
        selectHotbarSlot(hotbarSlots.findIndex(item => item?.id === 'fanta-jug'));
        useSelectedHotbarItem();
      }, 650);
    `);
  });

  await scene('Rift in a Can', 'RARE ITEM', 'RIFT-IN-A-CAN', 'Throw a portable RIFT onto the floor', 3, async () => {
    await room('main', 2, `
      rareRoomActive = false;
      fantaJugActive = false;
      riftCanActive = true;
      riftCan.taken = false;
      cabinet.searched = true;
      player.x = 510;
      window.__trailerAfter(() => {
        updateTarget();
        interact();
        selectHotbarSlot(hotbarSlots.findIndex(item => item?.id === 'rift-can'));
        useSelectedHotbarItem();
      }, 650);
    `);
  });

  await scene('Flow Juice', '3% RARE FIND', 'FLOW JUICE', 'Pink-blue juice. Twelve seconds of low gravity.', 3, async () => {
    await room('main', 2, `
      rareRoomActive = false;
      fantaJugActive = false;
      riftCanActive = false;
      flowJuiceActive = true;
      flowJuice.taken = false;
      cabinet.searched = true;
      player.x = 490;
      window.__trailerAfter(() => {
        updateTarget();
        interact();
        selectHotbarSlot(hotbarSlots.findIndex(item => item?.id === 'flow-juice'));
        useSelectedHotbarItem();
        input.add('Space');
        input.add('KeyD');
      }, 650);
    `);
  });

  await scene('Backpack', 'INVENTORY UPGRADE', 'THE RARE BACKPACK', 'Store items safely and take them back whenever you need them', 3.2, async () => {
    await room('main', 2, `
      rareRoomActive = false;
      fantaJugActive = false;
      riftCanActive = false;
      flowJuiceActive = false;
      backpackActive = true;
      backpackOnTable = false;
      backpack.taken = false;
      backpack.x = 400;
      hasBackpack = false;
      hotbarSlots.fill(null);
      hotbarSlots[0] = { id: 'milkshake', name: 'Milkshake', count: 2 };
      selectedHotbarSlot = 0;
      cabinet.searched = true;
      player.x = 380;
      updateHotbarUi();
      window.__trailerAfter(() => { updateTarget(); interact(); }, 450);
      window.__trailerAfter(() => storeSelectedHotbarItem(), 1250);
      window.__trailerAfter(() => takeBackpackItem(0), 2200);
    `);
  });

  await scene('Cellar', 'THE CELLAR - DOORS 3-8', 'GLOOM CRAWLER', 'Follow the flashlight and jump the glowing charge lane', 3.5, async () => {
    await room('cellar', 3, `
      hasFlashlight = true;
      cellarMonster.x = 520;
      cellarMonster.state = 'warning';
      cellarMonster.timer = 1.1;
      player.x = 260;
      window.__trailerAutoRun();
    `);
  });

  await scene('Underwater chase', 'THE GARDEN - DOORS 25-27', 'SUBMARINE CHASE', 'Bubbles, seaweed, coral, and a tentacled vine flower', 3.5, async () => {
    await room('garden', 25, `vineMonster.x = -45; window.__trailerAutoRun();`);
  });

  await scene('Ground chase', 'THE GARDEN - DOORS 28-32', 'THREE-LEGGED TREE MONSTER', 'Rain, rocks, fallen logs, and no time to slow down', 3.5, async () => {
    await room('garden', 28, `vineMonster.x = -45; window.__trailerAutoRun();`);
  });

  await scene('Office chase', 'THE OFFICE - DOORS 25-32', 'RUNAWAY PRINTING MACHINE', 'Flying paper, ruined desks, and a furious shadow adventurer', 3.5, async () => {
    await room('office', 25, `officeMonster.x = -45; window.__trailerAutoRun();`);
  });

  await scene('Office secrets', 'THE OFFICE', 'STORAGE ROOMS AND TELEPORTERS', 'Explore side rooms, then warp straight to Door 150', 4, async () => {
    await evaluate(`(() => {
      officeSideRoomActive = true;
    })()`);
    await room('office', 15, `officeSideRoomActive = true; startRoom(); player.x = 390;`);
    await evaluate(`(() => {
      window.__trailerAfter(() => {
        officeSideRoomActive = false;
        currentFloor = 'office';
        currentDoor = 2;
        startRoom();
        teleporterActive = true;
        teleporterOnDesk = false;
        teleporter.taken = false;
        cabinet.searched = true;
        player.x = 310;
        paused = true;
      }, 1100);
      window.__trailerAfter(() => {
        updateTarget();
        interact();
        selectHotbarSlot(hotbarSlots.findIndex(item => item?.id === 'teleporter'));
        useSelectedHotbarItem();
      }, 2200);
    })()`);
  });

  await scene('Permanent Rift', 'DOOR 100', 'THE BLUE RIFT', 'Store an item now and retrieve it on a future run', 3.5, async () => {
    await evaluate(`(() => {
      riftItem = null;
      hotbarSlots.fill(null);
      hotbarSlots[0] = { id: 'fanta-jug', name: 'Fanta Jug', count: 1 };
      selectedHotbarSlot = 0;
    })()`);
    await room('main', 100, `
      player.x = 410;
      window.__trailerAfter(() => { updateTarget(); interact(); }, 650);
      window.__trailerAfter(() => { updateTarget(); interact(); }, 2100);
    `);
  });

  await scene('Badge Vault', 'YOUR COLLECTION', 'ULTRA-DETAILED BADGES', 'Descend into the Badge Vault and inspect every collectible medal', 4.5, async () => {
    await evaluate(`(() => {
      window.__trailerResetScreens();
      gameElement.classList.add('hidden');
      lobby.classList.remove('hidden');
      for (const badge of badges.slice(0, 18)) earnedBadges.add(badge.id);
      updateBadgeUi();
      startBadgeDescent();
      window.__trailerAfter(() => showBadgeDetail('fanta-jug-finder'), 3250);
    })()`);
  });

  await scene('Escape', 'ONE HUNDRED DOORS OPENED', 'YOU ESCAPED THE PARK!', 'Your badges, your journey, your victory', 2.5, async () => {
    await evaluate(`(() => {
      window.__trailerResetScreens();
      gameElement.classList.add('hidden');
      winScreen.classList.remove('hidden');
      won = true;
      paused = true;
      updateBadgeUi();
    })()`);
  });

  await scene('Release card', 'RELEASE DAY', 'THE PARK', 'AVAILABLE ON GITHUB OR CHROME', 5.5,
    () => titleCard('THE PARK - VERSION 1.0', 'RELEASE DAY', 'AVAILABLE ON GITHUB OR CHROME', 'github.com/jonnyboy2014/the-park\n127.0.0.1:3000/doors/'), true);

  if (exceptions.length) throw new Error(exceptions.join('\n'));
  await writeFile(path.join(outputDirectory, 'capture.json'), JSON.stringify({ frameRate, frameCount: frameIndex, duration: frameIndex / frameRate, timeline }, null, 2));
  console.log(`Captured ${frameIndex} frames (${(frameIndex / frameRate).toFixed(1)} seconds).`);
} finally {
  await evaluate(`(() => {
    localStorage.clear();
    for (const [key, value] of Object.entries(${JSON.stringify(savedStorage)})) localStorage.setItem(key, value);
    Math.random = window.__trailerRandom || Math.random;
  })()`).catch(() => {});
  await send('Emulation.clearDeviceMetricsOverride').catch(() => {});
  await send('Page.reload', { ignoreCache: true }).catch(() => {});
  socket.close();
}
