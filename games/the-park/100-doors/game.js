const canvas = document.querySelector('#doors');
const displayContext = canvas.getContext('2d');
const pixelScale = 2;
const pixelCanvas = document.createElement('canvas');
pixelCanvas.width = canvas.width / pixelScale;
pixelCanvas.height = canvas.height / pixelScale;
const context = pixelCanvas.getContext('2d');
const lightingCanvas = document.createElement('canvas');
lightingCanvas.width = canvas.width;
lightingCanvas.height = canvas.height;
const lightingContext = lightingCanvas.getContext('2d');

const totalDoors = 100;
const monsterStartDoor = 26;
const chaseLength = 8;
const monsterEndDoor = monsterStartDoor + chaseLength - 1;
const rewardDoor = monsterEndDoor + 1;
const bossDoor = 50;
const bossReturnDoor = 75;
const bossImageId = 204734852;
const totalGardenDoors = 50;
const totalOfficeDoors = 150;
const totalCellarDoors = 70;
const cellarEntranceDoor = 40;
const officeChaseStartDoor = 25;
const officeChaseEndDoor = 32;
const gardenChaseStartDoor = 25;
const gardenChaseEndDoor = 27;
const gardenGroundChaseStartDoor = 28;
const gardenGroundChaseEndDoor = 32;
const groundY = 560;
const unlockedDoorChance = .7;
const rareRoomChance = .015;
const backpackSpawnChance = .013;
const teleporterSpawnChance = .015;
const fantaJugSpawnChance = .005;
const bossStompsStorageKey = '100-doors-boss-stomps';
const fantaRushDuration = 8;
const fantaRushSpeedMultiplier = 1.6;
const riftCanSpawnChance = .008;
const flowJuiceSpawnChance = .03;
const flowJuiceDuration = 12;
const flowJuiceGravityMultiplier = .45;
const rushChance = .12;
const riftStorageKey = '100-doors-rift-item';
const riftItemNames = {
  milkshake: 'Milkshake',
  backpack: 'Rare Backpack',
  teleporter: 'Teleporter',
  'fanta-jug': 'Fanta Jug',
  'rift-can': 'Rift-in-a-Can',
  'flow-juice': 'Flow Juice'
};
let unlockedDoors = new Set();
let rareRoomActive = false;
let backpackActive = false;
let backpackOnTable = false;
let teleporterActive = false;
let teleporterOnDesk = false;
let fantaJugActive = false;
let fantaRushTimer = 0;
let riftCanActive = false;
let thrownRiftActive = false;
let flowJuiceActive = false;
let elevatorRideActive = false;
let elevatorRideTimer = 0;
let elevatorRideOrigin = 1;
let elevatorRideDestination = 0;
let elevatorRideArrived = false;
let stairDescentActive = false;
let encounterFlashTimer = 0;
let encounterFlashColor = '255,77,94';
let encounterShakeTimer = 0;
let flowJuiceTimer = 0;
let closetVisible = false;
let rushActive = false;
let rushWarningTimer = 0;
let ragebaitCloseCall = false;
let currentFloor = 'main';
let vineMonsterActive = false;
let gardenChaseActive = false;
let submarineActive = false;
let mountainChaseActive = false;
let officeSideRoomActive = false;
let officeSideRoomReturnDoor = 1;
let officeChaseActive = false;
let cellarMonsterActive = false;

const lobby = document.querySelector('#lobby');
const startButton = document.querySelector('#start-button');
const badgesButton = document.querySelector('#badges-button');
const trailerButton = document.querySelector('#trailer-button');
const badgeScreen = document.querySelector('#badge-screen');
const backButton = document.querySelector('#back-button');
const badgeIndexCount = document.querySelector('#badge-index-count');
let gardenCutscene;
let cutsceneCaption;
let cutsceneContinue;
let floorsButton;
let floorScreen;
let mainFloorButton;
let gardenFloorButton;
let cellarFloorButton;
let officeFloorButton;
let floorBackButton;
const gameElement = document.querySelector('#game');
const winScreen = document.querySelector('#win-screen');
const againButton = document.querySelector('#again-button');
const doorNumber = document.querySelector('#door-number');
const modeText = document.querySelector('#mode');
const promptElement = document.querySelector('#prompt');
const stairsDownButton = document.querySelector('#stairs-down-button');
const messageElement = document.querySelector('#message');
const badgeList = document.querySelector('#badge-list');
const winBadgeList = document.querySelector('#win-badges');
const badgeCount = document.querySelector('#badge-count');
const badgeToast = document.querySelector('#badge-toast');
const badgeDetailDialog = document.querySelector('#badge-detail-dialog');
const badgeDetailClose = document.querySelector('#badge-detail-close');
const badgeDetailArt = document.querySelector('#badge-detail-art');
const badgeDetailKicker = document.querySelector('#badge-detail-kicker');
const badgeDetailName = document.querySelector('#badge-detail-name');
const badgeDetailDescription = document.querySelector('#badge-detail-description');
const badgeDetailStatus = document.querySelector('#badge-detail-status');
const badgeDetailProgress = document.querySelector('#badge-detail-progress');
const badgeDescentScreen = document.querySelector('#badge-descent-screen');
const badgeDescentSkip = document.querySelector('#badge-descent-skip');
const hotbarElement = document.querySelector('#hotbar');
const backpackStorageElement = document.querySelector('#backpack-storage');
const healthNumber = document.querySelector('#health-number');
const healthFill = document.querySelector('#health-fill');
const fantaJugChanceElement = document.querySelector('#fanta-jug-chance');
const flowJuiceChanceElement = document.querySelector('#flow-juice-chance');
const riftCanChanceElement = document.querySelector('#rift-can-chance');

const badges = [
  { id: 'game-starter', name: 'Game Starter', popup: 'You entered the game!', section: 'main', icon: 'door' },
  { id: 'first-key', name: 'First Key', section: 'main', icon: 'key' },
  { id: 'chase-survivor', name: 'Chase Complete', popup: 'You completed the chase!', section: 'main', icon: 'run', difficult: true },
  { id: 'speed-boots', name: 'Speed Boots', section: 'main', icon: 'boot' },
  { id: 'demon-slayer', name: 'Demon Slayer', section: 'main', icon: 'sword', difficult: true },
  { id: 'monster-slayer', name: 'Monster Slayer', section: 'main', icon: 'skull', difficult: true },
  { id: 'restaurant-finder', name: 'Restaurant Finder', popup: 'You found the rare Restaurant Room!', section: 'main', icon: 'milkshake' },
  { id: 'fanta-jug-finder', name: 'Fanta Jug Finder', popup: 'You found the rare yellow Fanta Jug!', section: 'main', icon: 'fantaJug' },
  { id: 'flow-juice-finder', name: 'Flow Juice Finder', popup: 'You found the pink-blue Flow Juice!', section: 'main', icon: 'flowJuice' },
  { id: 'rift-can-finder', name: 'Rift Can Finder', popup: 'You found Rift-in-a-Can!', section: 'main', icon: 'riftCan' },
  { id: 'rocket-survivor', name: 'Rocket Survivor', popup: 'You survived Rocket!', section: 'main', icon: 'rocket' },
  { id: 'maximum-ragebaiter', name: 'Maximum Ragebaiter', popup: 'You hid from Rocket at the last second!', section: 'main', icon: 'clock', difficult: true },
  { id: 'all-doors', name: '100 Doors', section: 'main', icon: 'hundred', difficult: true },
  { id: 'outside-person', name: 'Outside Person', popup: 'You entered THE GARDEN!', section: 'garden', icon: 'tree' },
  { id: 'submarine-pilot', name: 'Submarine Pilot', popup: 'You survived the submarine chase!', section: 'garden', icon: 'submarine', difficult: true },
  { id: 'mountain-runner', name: 'Mountain Runner', popup: 'You survived the 5-door ground chase!', section: 'garden', icon: 'mountain', difficult: true },
  { id: 'touched-grass', name: 'Touched Grass', popup: 'You beat THE GARDEN!', section: 'garden', icon: 'flower', difficult: true },
  { id: 'cellar-explorer', name: 'Cellar Explorer', popup: 'You found the hidden stairs!', section: 'cellar', icon: 'stairsDown' },
  { id: 'cellar-clear', name: 'Cellar Clear', popup: 'You escaped the dark cellar!', section: 'cellar', icon: 'stairsUp' },
  { id: 'office-worker', name: 'Office Worker', popup: 'You entered THE OFFICE!', section: 'office', icon: 'desk' },
  { id: 'storage-explorer', name: 'Storage Explorer', popup: 'You found a storage sideroom!', section: 'office', icon: 'box' },
  { id: 'teleporter-finder', name: 'Teleporter Finder', popup: 'You found the rare Teleporter!', section: 'office', icon: 'teleport' },
  { id: 'office-chase-survivor', name: 'Office Chase Survivor', popup: 'You escaped the printing machine!', section: 'office', icon: 'printer', difficult: true },
  { id: 'overtime-champion', name: 'Overtime Champion', popup: 'You cleared all 150 Office doors!', section: 'office', icon: 'hundredFifty', difficult: true },
  { id: 'slide-legend', name: 'Slide Legend', popup: 'You slid 25 times!', section: 'fun', icon: 'slide' },
  { id: 'jump-machine', name: 'Jump Machine', popup: 'You jumped 50 times!', section: 'fun', icon: 'jump' },
  { id: 'closet-camper', name: 'Closet Camper', popup: 'You hid 5 times!', section: 'fun', icon: 'closet' },
  { id: 'snack-time', name: 'Snack Time', popup: 'Milkshake power activated!', section: 'fun', icon: 'milkshake' },
  { id: 'shortcut-specialist', name: 'Shortcut Specialist', popup: 'You used the Teleporter!', section: 'fun', icon: 'lightning' },
  { id: 'boss-bouncer', name: 'Boss Bouncer', popup: 'You bounced on 10 boss heads!', section: 'fun', icon: 'crown', difficult: true },
  { id: 'no-hit-wonder', name: 'No Hit Wonder', popup: 'You finished a floor without damage!', section: 'fun', icon: 'heart', difficult: true },
  { id: 'paper-chaser', name: 'Paper Chaser', popup: 'You explored 3 storage siderooms!', section: 'fun', icon: 'paper' },
  { id: 'rain-dancer', name: 'Rain Dancer', popup: 'You danced in the Garden rain!', section: 'fun', icon: 'rain' },
  { id: 'submarine-surfer', name: 'Submarine Surfer', popup: 'Underwater chase, zero hits!', section: 'fun', icon: 'submarine', difficult: true },
  { id: 'mountain-goat', name: 'Mountain Goat', popup: 'Mountain chase, zero hits!', section: 'fun', icon: 'mountain', difficult: true },
  { id: 'office-olympian', name: 'Office Olympian', popup: 'Office chase, zero hits!', section: 'fun', icon: 'medal', difficult: true },
  { id: 'badge-collector', name: 'Badge Collector', popup: 'You earned 10 badges!', section: 'fun', icon: 'badges' },
  { id: 'completionist', name: 'Completionist', popup: 'You earned every other badge!', section: 'fun', icon: 'trophy', difficult: true }
];

const badgeIcons = {
  riftCan: '<rect x="14" y="10" width="20" height="31" rx="3"/><path d="M17 10V5h14v5M18 5V2h12v3M17 18h14"/><ellipse cx="24" cy="28" rx="7" ry="5"/><path d="m20 19 8 18"/>',
  flowJuice: '<path d="M17 14h14v22a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5Z"/><path d="M20 14V8h8v6M18 8V4h12v4M17 23h14"/>',
  fantaJug: '<path d="M14 12h20l3 7v17l-3 6H14l-3-6V19Z"/><path d="M13 5h22v7H13ZM12 19h24M11 34h26M16 24h16v9H16Z"/>',
  door: '<rect x="13" y="7" width="22" height="34" rx="2"/><circle cx="29" cy="25" r="1.5" fill="currentColor" stroke="none"/><path d="M9 41h30"/>',
  key: '<circle cx="16" cy="18" r="7"/><path d="m21 23 17 17m-6-6 4-4m-9 9 4-4"/>',
  run: '<g stroke="#171a20" stroke-width="1.2"><rect x="16" y="19" width="7" height="12" fill="#7a4a24"/><rect x="23" y="5" width="13" height="5" fill="#4a2f1d"/><rect x="23" y="8" width="5" height="8" fill="#4a2f1d"/><rect x="25" y="8" width="11" height="10" fill="#f3c68b"/><rect x="20" y="18" width="15" height="14" fill="#3b82f6"/><rect x="20" y="28" width="15" height="4" fill="#1f2937"/><rect x="32" y="19" width="5" height="11" fill="#2563eb" transform="rotate(-24 34 20)"/><rect x="17" y="22" width="5" height="10" fill="#2563eb" transform="rotate(28 19 24)"/><rect x="21" y="31" width="6" height="10" fill="#1e3a8a" transform="rotate(25 24 31)"/><rect x="28" y="31" width="6" height="9" fill="#1e3a8a" transform="rotate(-35 31 31)"/><rect x="15" y="39" width="10" height="5" fill="#5c4028"/><rect x="32" y="36" width="10" height="5" fill="#5c4028"/><rect x="32" y="11" width="2" height="3" fill="#171a20" stroke="none"/></g>',
  boot: '<path d="M15 7v20l-7 6v8h30v-6l-13-8V7Z"/><path d="M9 33h16"/>',
  sword: '<path d="m12 36 24-24m-2-4 6-2-2 6M10 30l8 8m-11 3 5-5m-3 8 5-5"/>',
  skull: '<path d="M10 23a14 14 0 0 1 28 0c0 7-4 9-7 11v7H17v-7c-3-2-7-4-7-11Z"/><circle cx="18" cy="23" r="3"/><circle cx="30" cy="23" r="3"/><path d="m24 29-3 5h6ZM20 41v-5m8 5v-5"/>',
  milkshake: '<path d="M13 15h22l-3 27H16ZM11 15h26M19 10h14M29 10l5-7"/><path d="M17 24c4-3 10 3 15 0"/>',
  rocket: '<path d="M14 8h20l4 8v14l-5 5v5h-4v5h-5v-4h-4v3h-4v-6l-5-5V16Z"/><path d="m13 19 10 2v8l-9 1-3-6Zm12 2 10-2 2 5-3 6-9-1ZM24 27l-3 6h6Z"/><path d="M15 33h18m-16 0v6m4-6v6m4-6v6m4-6v6m4-6v6M18 10l3 5-2 4m11-9-3 5 2 4"/>',
  clock: '<circle cx="24" cy="25" r="16"/><path d="M24 15v11l8 5M17 4h14m-7 0v5"/>',
  hundred: '<rect x="6" y="6" width="36" height="36" rx="4"/><text x="24" y="30" text-anchor="middle" font-size="15" font-weight="900" fill="currentColor" stroke="none">100</text>',
  tree: '<path d="M24 41V27m-7 14h14"/><path d="M24 5 12 20h7L9 31h30l-10-11h7Z"/>',
  submarine: '<path d="M6 27c0-7 8-11 19-11s19 4 19 11-8 10-19 10S6 34 6 27Z"/><path d="M20 16V9h10v7M9 27H3m42 0h-6"/><circle cx="19" cy="26" r="3"/><circle cx="31" cy="26" r="3"/>',
  mountain: '<path d="m4 39 14-25 8 12 6-9 12 22Z"/><path d="m13 23 5 4 4-5m5 4 5 3 3-4"/>',
  flower: '<circle cx="24" cy="20" r="5"/><circle cx="24" cy="10" r="6"/><circle cx="34" cy="20" r="6"/><circle cx="24" cy="30" r="6"/><circle cx="14" cy="20" r="6"/><path d="M24 36v7m0-5-7-4m7 6 7-4"/>',
  stairsDown: '<path d="M5 12h9v9h9v9h9"/><path d="M35 8v28m-6-6 6 6 6-6"/>',
  stairsUp: '<path d="M5 36h9v-9h9v-9h9"/><path d="M35 40V12m-6 6 6-6 6 6"/>',
  desk: '<path d="M6 20h36v8H6ZM10 28v13m28-13v13M18 28v7h12v-7M15 20V9h18v11"/>',
  box: '<path d="m7 15 17-9 17 9v21l-17 8-17-8Z"/><path d="m7 15 17 9 17-9M24 24v20m-7-33 17 9"/>',
  teleport: '<ellipse cx="24" cy="24" rx="17" ry="9"/><ellipse cx="24" cy="24" rx="9" ry="17" transform="rotate(45 24 24)"/><path d="m24 13 4 7-4 4-4-4Z"/>',
  printer: '<path d="M13 18V6h22v12M13 34H7V18h34v16h-6M13 28h22v14H13Z"/><path d="M18 34h12m-12 4h9"/><circle cx="35" cy="23" r="1.5" fill="currentColor" stroke="none"/>',
  hundredFifty: '<rect x="6" y="6" width="36" height="36" rx="4"/><text x="24" y="30" text-anchor="middle" font-size="15" font-weight="900" fill="currentColor" stroke="none">150</text>',
  slide: '<g stroke="#171a20" stroke-width="1.2"><rect x="10" y="23" width="8" height="13" fill="#7a4a24"/><rect x="27" y="10" width="13" height="5" fill="#4a2f1d"/><rect x="27" y="13" width="4" height="8" fill="#4a2f1d"/><rect x="28" y="14" width="12" height="10" fill="#f3c68b"/><rect x="15" y="22" width="21" height="13" fill="#3b82f6"/><rect x="15" y="31" width="21" height="4" fill="#1f2937"/><rect x="31" y="23" width="6" height="10" fill="#2563eb"/><rect x="12" y="34" width="10" height="6" fill="#1e3a8a"/><rect x="23" y="34" width="10" height="6" fill="#1e3a8a"/><rect x="7" y="36" width="11" height="6" fill="#5c4028"/><rect x="25" y="37" width="11" height="6" fill="#5c4028"/><rect x="36" y="17" width="2" height="3" fill="#171a20" stroke="none"/></g>',
  jump: '<g stroke="#171a20" stroke-width="1.2"><rect x="13" y="18" width="7" height="13" fill="#7a4a24"/><rect x="20" y="3" width="15" height="6" fill="#4a2f1d"/><rect x="19" y="6" width="5" height="9" fill="#4a2f1d"/><rect x="21" y="8" width="13" height="11" fill="#f3c68b"/><rect x="18" y="18" width="17" height="14" fill="#3b82f6"/><rect x="18" y="28" width="17" height="4" fill="#1f2937"/><rect x="12" y="10" width="6" height="14" fill="#2563eb" transform="rotate(-18 15 17)"/><rect x="33" y="9" width="6" height="14" fill="#2563eb" transform="rotate(18 36 16)"/><rect x="18" y="31" width="7" height="9" fill="#1e3a8a" transform="rotate(20 21 31)"/><rect x="28" y="31" width="7" height="8" fill="#1e3a8a" transform="rotate(-20 31 31)"/><rect x="13" y="37" width="11" height="6" fill="#5c4028"/><rect x="29" y="36" width="11" height="6" fill="#5c4028"/><rect x="30" y="11" width="2" height="3" fill="#171a20" stroke="none"/></g>',
  closet: '<rect x="10" y="5" width="28" height="37" rx="1"/><path d="M24 5v37M19 24h2m6 0h2M7 42h34"/>',
  lightning: '<path d="m27 4-15 23h11l-3 17 16-24H25Z"/>',
  crown: '<path d="m7 15 9 8 8-14 8 14 9-8-4 24H11Z"/><path d="M12 33h24"/>',
  heart: '<path d="M24 40S7 30 7 18c0-9 12-12 17-4 5-8 17-5 17 4 0 12-17 22-17 22Z"/><path d="M13 25h7l4-9 5 16 4-7h7"/>',
  paper: '<path d="M12 5h17l8 8v30H12Z"/><path d="M29 5v9h8M18 23h13m-13 7h13m-13 7h8"/>',
  rain: '<path d="M12 28a8 8 0 0 1 2-16 11 11 0 0 1 21 3 6 6 0 0 1 1 13Z"/><path d="m15 34-3 7m14-7-3 7m14-7-3 7"/>',
  medal: '<circle cx="24" cy="28" r="12"/><path d="m16 18-5-14 9 5m12 9 5-14-9 5M24 22v7m-4-3h8"/>',
  badges: '<circle cx="18" cy="20" r="10"/><circle cx="31" cy="28" r="10"/><path d="m12 29-2 14 8-5 7 4-2-13m12 8 2 7 5-4 5 2-4-9"/>',
  trophy: '<path d="M14 6h20v12c0 9-4 14-10 14s-10-5-10-14ZM24 32v8m-9 3h18M14 10H6v5c0 6 4 9 10 9m18-14h8v5c0 6-4 9-10 9"/>'
};

const badgeIconDetails = {
  riftCan: '<rect x="14" y="10" width="20" height="31" rx="3" fill="#2456a6"/><path d="M17 5h14v5H17Zm1-3h12v3H18Z" fill="#d9e2e8"/><path d="M16 17h16v4H16Zm0 19h16v4H16Z" fill="#3b82f6"/><ellipse cx="24" cy="28" rx="7" ry="5" fill="#72e3ff"/><ellipse cx="24" cy="28" rx="4" ry="7" fill="#8750a5"/><ellipse cx="24" cy="28" rx="2" ry="3" fill="#d8f7ff"/>',
  flowJuice: '<path d="M17 14h14v22a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5Z" fill="#e8f4ff"/><path d="M19 24h5v14h-2a3 3 0 0 1-3-3Z" fill="#ff8fd8"/><path d="M24 24h5v11a3 3 0 0 1-3 3h-2Z" fill="#79dfff"/><path d="M23 24h3v14h-3Z" fill="#b8a5ff"/><path d="M18 4h12v5H18Z" fill="#d9e2e8"/>',
  fantaJug: '<path d="M14 12h20l3 7v17l-3 6H14l-3-6V19Z" fill="#ffd84d"/><path d="M13 5h22v7H13Z" fill="#d9e2e8"/><path d="M12 18h24v4H12Zm-1 14h26v4H11Z" fill="#7c8792"/><path d="M16 24h16v9H16Z" fill="#fff8dc"/><path d="m24 24 2 4 4 2-4 2-2 4-2-4-4-2 4-2Z" fill="#e88912"/>',
  door: '<rect x="13" y="7" width="22" height="34" rx="2" fill="#8f4e2c"/><rect x="17" y="11" width="14" height="10" rx="1" fill="#d99b52"/><rect x="17" y="25" width="14" height="11" rx="1" fill="#c47b3d"/>',
  key: '<circle cx="16" cy="18" r="6" fill="#ffe779"/><path d="M22 24 37 39" fill="none" stroke="#ffe779" stroke-width="5"/><circle cx="16" cy="18" r="2.5" fill="#fff7c2"/>',
  run: '<path d="M3 15h12v3H3Zm0 9h9v2H3Z" fill="#d8f7ff" opacity=".45"/><ellipse cx="26" cy="44" rx="18" ry="2" fill="#171a20" opacity=".25"/>',
  boot: '<path d="M15 7v20l-7 6v8h30v-6l-13-8V7Z" fill="#5cc9e8"/><rect x="17" y="12" width="8" height="5" rx="1" fill="#ffd84d"/><path d="M9 34h28v6H9Z" fill="#337a9b"/>',
  sword: '<path d="M13 34 35 12l3-5 1 1-4 6-22 22Z" fill="#d8f7ff"/><path d="m9 31 8 8-3 3-8-8Z" fill="#ffd84d"/>',
  skull: '<path d="M10 23a14 14 0 0 1 28 0c0 7-4 9-7 11v7H17v-7c-3-2-7-4-7-11Z" fill="#f1e6c8"/><circle cx="18" cy="23" r="3" fill="#37424b"/><circle cx="30" cy="23" r="3" fill="#37424b"/><path d="m24 29-3 5h6Z" fill="#67707a"/>',
  milkshake: '<path d="M13 15h22l-3 27H16Z" fill="#9be7ff"/><path d="M16 20h16l-2 18H18Z" fill="#f7a8c4"/><circle cx="19" cy="14" r="5" fill="#fff3d4"/><circle cx="27" cy="13" r="6" fill="#fff3d4"/>',
  rocket: '<path d="M14 8h20l4 8v14l-5 5v5h-4v5h-5v-4h-4v3h-4v-6l-5-5V16Z" fill="#eee2cf"/><path d="M14 10h20l2 5H12Z" fill="#fff8e8" opacity=".65"/><path d="m13 19 10 2v8l-9 1-3-6Zm12 2 10-2 2 5-3 6-9-1Z" fill="#150703"/><path d="M24 27l-3 6h6Z" fill="#150703"/><rect x="15" y="23" width="6" height="5" rx="1" fill="#ff4a00"/><rect x="28" y="23" width="6" height="5" rx="1" fill="#ff4a00"/><rect x="17" y="24" width="2" height="2" fill="#ffd166"/><rect x="30" y="24" width="2" height="2" fill="#ffd166"/><path d="M15 33h18v6H15Z" fill="#241b16"/><path d="M16 33h3v5h-3Zm5 0h3v6h-3Zm5 0h3v6h-3Zm5 0h2v5h-2Z" fill="#e5d7c1"/><path d="M25 40h4v5h-5Z" fill="#ff7a18"/><path d="M16 38h3v5h-3Z" fill="#d9c8ad"/>',
  clock: '<circle cx="24" cy="25" r="15" fill="#e3aa32"/><circle cx="24" cy="25" r="12" fill="#fffdf0"/><rect x="17" y="3" width="14" height="4" rx="2" fill="#9be7ff"/>',
  hundred: '<rect x="6" y="6" width="36" height="36" rx="4" fill="#343d78"/><rect x="10" y="10" width="28" height="28" rx="2" fill="#4f5ca3"/><path d="m11 7 2 3 3 1-3 2-1 3-1-3-3-2 3-1Zm26 26 2 3 3 1-3 2-1 3-1-3-3-2 3-1Z" fill="#ffe779"/>',
  tree: '<path d="M20 26h8v16h-8Z" fill="#8b5a2b"/><path d="M24 5 12 20h7L9 31h30l-10-11h7Z" fill="#4e9f50"/><path d="M24 8 16 19h6l-7 8h10Z" fill="#79c76a"/>',
  submarine: '<path d="M6 27c0-7 8-11 19-11s19 4 19 11-8 10-19 10S6 34 6 27Z" fill="#f2c84b"/><path d="M20 16V9h10v7Z" fill="#e0a936"/><circle cx="19" cy="26" r="2.5" fill="#9be7ff"/><circle cx="31" cy="26" r="2.5" fill="#9be7ff"/><path d="M11 32c8 4 21 4 28-1-5 5-23 8-28 1Z" fill="#d89d28"/>',
  mountain: '<path d="m4 39 14-25 8 12 6-9 12 22Z" fill="#718397"/><path d="m12 23 6-9 5 8-5-3-3 4Zm15 3 5-9 7 13-6-5-3 4Z" fill="#f4f0df"/><path d="M4 36c10-4 26 3 40-1v6H4Z" fill="#67a35b"/>',
  flower: '<circle cx="24" cy="10" r="5.5" fill="#f7a8c4"/><circle cx="34" cy="20" r="5.5" fill="#ff8fb3"/><circle cx="24" cy="30" r="5.5" fill="#f7a8c4"/><circle cx="14" cy="20" r="5.5" fill="#ff8fb3"/><circle cx="24" cy="20" r="4.5" fill="#ffe779"/><path d="m16 34 8 4-8 3Zm16 0-8 4 8 3Z" fill="#67b66b"/>',
  stairsDown: '<path d="M5 12h9v9h9v9h9v9H5Z" fill="#617d8c"/><path d="m32 31 3 5 3-5 3 5 3-5Z" fill="#9be7ff"/>',
  stairsUp: '<path d="M5 36h9v-9h9v-9h9V8h9v34H5Z" fill="#617d8c"/><path d="m29 14 6-6 6 6-6-2Z" fill="#ffd84d"/>',
  desk: '<path d="M6 20h36v8H6Z" fill="#a1663f"/><path d="M15 20V9h18v11Z" fill="#37424b"/><rect x="18" y="11" width="12" height="7" fill="#9be7ff"/><path d="M18 28h12v7H18Z" fill="#80502f"/>',
  box: '<path d="m7 15 17-9 17 9v21l-17 8-17-8Z" fill="#c99558"/><path d="m7 15 17 9 17-9-17 5Z" fill="#e4b873"/><path d="m20 10 8-4 8 5-8 4Z" fill="#ffe0a0"/>',
  teleport: '<circle cx="24" cy="24" r="8" fill="#8750a5"/><circle cx="24" cy="24" r="4" fill="#9be7ff"/><circle cx="8" cy="24" r="2" fill="#9be7ff"/><circle cx="40" cy="24" r="2" fill="#9be7ff"/>',
  printer: '<path d="M7 18h34v16h-6v8H13v-8H7Z" fill="#b8c4cc"/><path d="M13 6h22v12H13Z" fill="#fff8df"/><path d="M16 30h16v11H16Z" fill="#fff8df"/><rect x="32" y="21" width="5" height="4" rx="1" fill="#67d06b"/>',
  hundredFifty: '<rect x="6" y="6" width="36" height="36" rx="4" fill="#24556f"/><rect x="10" y="10" width="28" height="28" rx="2" fill="#357aa0"/><path d="m11 7 2 3 3 1-3 2-1 3-1-3-3-2 3-1Zm26 26 2 3 3 1-3 2-1 3-1-3-3-2 3-1Z" fill="#9be7ff"/>',
  slide: '<path d="M2 15h12v3H2Zm0 8h8v2H2Z" fill="#e0ccff" opacity=".45"/><ellipse cx="24" cy="44" rx="20" ry="2" fill="#171a20" opacity=".3"/>',
  jump: '<path d="M5 34h8v3H5Zm30-24h8v3h-8Z" fill="#b8f7c1" opacity=".55"/><ellipse cx="24" cy="44" rx="15" ry="2" fill="#171a20" opacity=".25"/>',
  closet: '<rect x="10" y="5" width="28" height="37" rx="1" fill="#9a6038"/><rect x="13" y="9" width="9" height="13" fill="#c58a4c"/><rect x="26" y="9" width="9" height="13" fill="#c58a4c"/><rect x="13" y="26" width="9" height="12" fill="#b87942"/><rect x="26" y="26" width="9" height="12" fill="#b87942"/>',
  lightning: '<path d="m27 4-15 23h11l-3 17 16-24H25Z" fill="#ffe44d"/><path d="m29 8-9 15h7l-3 10 9-14h-8Z" fill="#fff7c2"/>',
  crown: '<path d="m7 15 9 8 8-14 8 14 9-8-4 24H11Z" fill="#ffd84d"/><path d="M12 32h24v7H12Z" fill="#e4a92c"/><circle cx="24" cy="26" r="3" fill="#ef5b6c"/><circle cx="15" cy="28" r="2" fill="#9be7ff"/><circle cx="33" cy="28" r="2" fill="#9be7ff"/>',
  heart: '<path d="M24 40S7 30 7 18c0-9 12-12 17-4 5-8 17-5 17 4 0 12-17 22-17 22Z" fill="#ef5b6c"/><path d="M12 17c1-5 6-6 9-3-6 0-7 4-9 3Z" fill="#ff9daf"/>',
  paper: '<path d="M12 5h17l8 8v30H12Z" fill="#fff8df"/><path d="M29 5v9h8Z" fill="#b8d8e8"/><path d="M17 22h14v3H17Zm0 7h14v3H17Zm0 7h9v3h-9Z" fill="#68a9c7"/>',
  rain: '<path d="M12 28a8 8 0 0 1 2-16 11 11 0 0 1 21 3 6 6 0 0 1 1 13Z" fill="#8ca7b8"/><path d="M15 15c5-7 14-5 17 1-7-3-12 1-17-1Z" fill="#c2d5df"/><path d="m15 34-3 7h4l2-7Zm11 0-3 7h4l2-7Zm11 0-3 7h4l2-7Z" fill="#9be7ff"/>',
  medal: '<circle cx="24" cy="28" r="11" fill="#ffd84d"/><circle cx="24" cy="28" r="7" fill="#fff0a6"/><path d="m16 18-5-14 9 5 3 10Zm16 0 5-14-9 5-3 10Z" fill="#58b7e8"/>',
  badges: '<circle cx="18" cy="20" r="9" fill="#ffd84d"/><circle cx="31" cy="28" r="9" fill="#9be7ff"/><path d="m12 29-2 14 8-5 7 4-2-13Z" fill="#ef5b6c"/><path d="m35 37 2 7 5-4 5 2-4-9Z" fill="#8750a5"/>',
  trophy: '<path d="M14 6h20v12c0 9-4 14-10 14s-10-5-10-14Z" fill="#ffd84d"/><path d="M18 9h6v13c0 3 2 5 4 6-7 1-10-4-10-10Z" fill="#fff0a6"/><path d="M15 39h18v4H15Z" fill="#9a6038"/>'
};

const badgeMicroDetails = {
  riftCan: '<path d="M18 7h12m-11 2h10" stroke="#ffffff" stroke-width=".7" opacity=".8"/><path d="M17 14h14m-14 23h14" stroke="#9be7ff" stroke-width=".65"/><path d="M18 22v12m12-12v12" stroke="#d8f7ff" stroke-width=".55" opacity=".6"/><text x="24" y="18" text-anchor="middle" font-size="3.2" font-weight="900" fill="#fff8d0" stroke="none">RIFT</text><path d="m8 22 1 2 2 1-2 1-1 2-1-2-2-1 2-1Zm32 8 .8 1.6 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8Z" fill="#d8f7ff" stroke="none"/>',
  flowJuice: '<path d="M20 17v5m2-5v3" stroke="#ffffff" stroke-width="1" opacity=".85"/><circle cx="21" cy="29" r="1.2" fill="#fff0fa" stroke="none"/><circle cx="27" cy="33" r="1.5" fill="#d8f7ff" stroke="none"/><circle cx="22" cy="36" r=".8" fill="#ffffff" stroke="none"/><path d="M19 6h10m-9 2h8" stroke="#7c8792" stroke-width=".65"/><path d="m37 5 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z" fill="#fff0fa" stroke="none"/>',
  fantaJug: '<path d="M16 13v5m4-5v4m8-4v4m4-4v5M16 37v4m4-4v5m8-5v5m4-5v4" stroke="#b87516" stroke-width=".65"/><path d="M18 7h12" stroke="#ffffff" stroke-width="1" opacity=".75"/><g fill="#fff3a6" stroke="#6d541d" stroke-width=".35"><circle cx="14" cy="20" r="1"/><circle cx="34" cy="20" r="1"/><circle cx="13" cy="34" r="1"/><circle cx="35" cy="34" r="1"/></g><text x="24" y="31.5" text-anchor="middle" font-size="4" font-weight="900" fill="#b96b12" stroke="none">F</text>',
  door: '<path d="M15 9v30m18-30v30M19 13c3 2 6-2 10 0m-10 6c4-2 7 2 10 0m-10 9c3 2 6-2 10 0m-10 5c4-2 7 2 10 0" stroke="#6f351f" stroke-width=".65" opacity=".8"/><path d="M12 13h3m-3 18h3" stroke="#e3aa32" stroke-width="1.4"/><circle cx="29" cy="25" r=".7" fill="#fff8d0" stroke="none"/><text x="24" y="18" text-anchor="middle" font-size="5" font-weight="900" fill="#6f351f" stroke="none">1</text>',
  key: '<circle cx="16" cy="18" r="4.2" stroke="#d69a1c" stroke-width=".8"/><path d="m23 25 13 13m-9-9 3-3m-7 7 3-3" stroke="#fff3a6" stroke-width="1.1"/><path d="m33 35 4-4 3 3-4 4m-7-1 3-3" stroke="#d69a1c" stroke-width=".8"/><path d="m5 8 1 2 2 1-2 1-1 2-1-2-2-1 2-1Zm34 3 .7 1.5 1.5.7-1.5.7-.7 1.5-.7-1.5-1.5-.7 1.5-.7Z" fill="#fff8d0" stroke="none"/>',
  run: '<path d="M22 20h9m-8 3h8m-7 9 3 2 3-2" stroke="#9be7ff" stroke-width=".7"/><path d="M17 40h7m9-2h7" stroke="#fff8df" stroke-width=".7"/><path d="M3 31h10m-8 4h7M4 9h9" stroke="#fff0a6" stroke-width=".8" opacity=".7"/><circle cx="8" cy="40" r="2" fill="#d8c49a" stroke="none" opacity=".45"/><circle cx="4" cy="43" r="1.2" fill="#d8c49a" stroke="none" opacity=".35"/>',
  boot: '<path d="m17 20 7 4m-7 0 7 4m-7 0 6 4" stroke="#fff8df" stroke-width=".85"/><path d="M12 36h23m-21 3h19" stroke="#9be7ff" stroke-width=".65"/><path d="m29 11 7-4-2 6 7-1-8 7-6-1Z" fill="#fff0a6" stroke="#d69a1c" stroke-width=".65"/><path d="M3 29h10M1 33h9" stroke="#d8f7ff" stroke-width=".8" opacity=".7"/>',
  sword: '<path d="m15 33 19-19" stroke="#ffffff" stroke-width=".8"/><path d="m20 27 2 2m2-6 2 2m2-6 2 2" stroke="#7ba7bd" stroke-width=".55"/><path d="m8 34 6 6m-4-8 6 6" stroke="#8b4a24" stroke-width="1"/><path d="m35 4 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" fill="#ffffff" stroke="none"/><path d="M7 12c3-5 7-5 10 0M5 16h12" stroke="#ff8d66" stroke-width=".7" opacity=".6"/>',
  skull: '<path d="m23 9-2 6 3 3-2 5m7-13-3 4 2 3" stroke="#a99b83" stroke-width=".7"/><path d="M18 35v5m4-5v6m4-6v6m4-6v5" stroke="#a99b83" stroke-width=".65"/><circle cx="18" cy="23" r="1.2" fill="#b8a5ff" stroke="none"/><circle cx="30" cy="23" r="1.2" fill="#b8a5ff" stroke="none"/><path d="M4 32c4-4 6 2 9-2m23 4c3-4 5 1 8-3" stroke="#9b7bc4" stroke-width=".8" opacity=".65"/>',
  milkshake: '<path d="M19 18v20" stroke="#ffffff" stroke-width="1.2" opacity=".7"/><path d="m30 9 4-6m-2 7 4-6" stroke="#ef5b6c" stroke-width="1"/><path d="M19 27c4-2 8 2 12 0m-12 5c4-2 8 2 12 0" stroke="#fff0fa" stroke-width=".7"/><circle cx="26" cy="7" r="2.4" fill="#ef5b6c" stroke="#9d3044" stroke-width=".6"/><path d="M26 5c0-2 2-3 3-3" stroke="#67a35b" stroke-width=".7"/><path d="M3 39h42M7 44h34" stroke="#d99b52" stroke-width=".65" opacity=".6"/>',
  rocket: '<path d="m18 9 3 6-3 4m12-10-3 6 3 4M24 8v6l-2 3" stroke="#ff4a00" stroke-width="1.5"/><path d="m18 9 1 3m11-3-1 3" stroke="#ffd166" stroke-width=".65"/><path d="M16 34v4m5-4v5m5-5v5m5-5v4" stroke="#0e0705" stroke-width=".65"/><path d="M27 40v4" stroke="#ffd166" stroke-width="1.2"/><g fill="#ffd166" stroke="none"><circle cx="18" cy="25" r=".7"/><circle cx="31" cy="25" r=".7"/><circle cx="36" cy="13" r=".8"/></g>',
  clock: '<circle cx="24" cy="25" r="10" stroke="#d3b76a" stroke-width=".6"/><path d="M24 14v3m0 16v3M13 25h3m16 0h3M16 17l2 2m12 12 2 2m0-16-2 2M18 31l-2 2" stroke="#7c5a20" stroke-width=".8"/><path d="M24 18v8l6 3" stroke="#4b3315" stroke-width="1.1"/><circle cx="24" cy="25" r="1.4" fill="#ef5b5b" stroke="none"/><path d="M20 5h8" stroke="#ffffff" stroke-width=".8"/>',
  hundred: '<rect x="12" y="12" width="24" height="24" rx="1" stroke="#9ba8ff" stroke-width=".7"/><path d="M15 15h18v18H15Zm3 0v18m12-18v18" stroke="#252c61" stroke-width=".7"/><text x="24" y="29" text-anchor="middle" font-size="11" font-weight="900" fill="#fff0a6" stroke="#7c4d08" stroke-width=".35">100</text><g fill="#ffe779" stroke="none"><circle cx="9" cy="9" r="1"/><circle cx="39" cy="9" r="1"/><circle cx="9" cy="39" r="1"/><circle cx="39" cy="39" r="1"/></g>',
  tree: '<path d="M22 28v13m4-13v13m-3-8-2 3m5 1 2 3" stroke="#5d361c" stroke-width=".75"/><path d="M13 20c4 1 7-2 10 0m-12 8c5 2 9-2 14 0m-5-15c3 2 6 0 9 2" stroke="#b8f7c1" stroke-width=".65" opacity=".7"/><g fill="#ffcf5a" stroke="#5b7c35" stroke-width=".4"><circle cx="15" cy="25" r="1.4"/><circle cx="30" cy="20" r="1.4"/><circle cx="28" cy="29" r="1.4"/></g><path d="M2 40c7-3 12 2 18 0m11 1c5-3 9 1 15-1" stroke="#79c76a" stroke-width=".8"/>',
  submarine: '<path d="M11 21c7-4 20-4 27 1M12 33c7 3 18 3 25-1" stroke="#fff0a6" stroke-width=".65"/><path d="M23 10h4m-2 0V6h6" stroke="#e3aa32" stroke-width=".8"/><path d="M5 24v6m-3-3h6" stroke="#d8f7ff" stroke-width=".8"/><g fill="#fff0a6" stroke="#8b6d20" stroke-width=".35"><circle cx="12" cy="25" r=".8"/><circle cx="25" cy="18" r=".8"/><circle cx="36" cy="25" r=".8"/></g><circle cx="19" cy="26" r="1" fill="#ffffff" stroke="none"/><circle cx="31" cy="26" r="1" fill="#ffffff" stroke="none"/><path d="M38 12l6-5m-4 8 6-5" stroke="#9be7ff" stroke-width=".7" opacity=".55"/>',
  mountain: '<path d="m7 37 11-18 8 11 6-8 10 15" stroke="#a9bdd0" stroke-width=".65"/><path d="M18 14v16m0-15 7 2-7 3" stroke="#ef5b6c" stroke-width=".8"/><path d="M10 36c6-5 11-3 15-8 3-4 5-2 9-6" stroke="#fff8df" stroke-width=".65" stroke-dasharray="1.5 1.5"/><path d="M4 13c2-2 4-2 6 0m-3-2c2-2 4-2 6 0" stroke="#d8f7ff" stroke-width=".6"/><path d="m5 40 3-6 3 6m27 0 3-7 3 7" fill="#315c3c" stroke="none"/>',
  flower: '<path d="M24 5v10m14 5H29M24 35V25M10 20h9" stroke="#ffd0df" stroke-width=".7"/><path d="M24 36v8m0-5-7-5m7 7 7-5" stroke="#315c3c" stroke-width=".8"/><circle cx="22.5" cy="18.5" r="1.2" fill="#fff8d0" stroke="none"/><circle cx="26" cy="21" r="1" fill="#d69a1c" stroke="none"/><circle cx="31" cy="10" r="1.2" fill="#d8f7ff" stroke="#ffffff" stroke-width=".4"/><path d="M3 43c2-5 3-5 4 0m3 0c2-7 3-7 4 0m25 0c2-6 3-6 4 0" stroke="#79c76a" stroke-width=".7"/>',
  stairsDown: '<path d="M5 12h9v9h9v9h9v9M8 15h3m3 9h4m4 9h4" stroke="#d8f7ff" stroke-width=".75"/><path d="M2 4h12m16 0h16M2 42h10m25 0h9" stroke="#7894a4" stroke-width=".6"/><path d="M40 4c-5 0-5 6-8 6m8-6c0 5-5 5-5 8" stroke="#d8f7ff" stroke-width=".5" opacity=".55"/><path d="m35 27 3 5 3-5" stroke="#d8f7ff" stroke-width=".8"/>',
  stairsUp: '<path d="M5 36h9v-9h9v-9h9V8h9M8 33h3m3-9h4m4-9h4" stroke="#d8f7ff" stroke-width=".75"/><path d="M35 8h6v12h-6Z" fill="#fff0a6" stroke="#d69a1c" stroke-width=".65"/><path d="m34 12-7 3m7 1-9 5" stroke="#fff0a6" stroke-width=".65" opacity=".55"/><path d="M2 4h12m17 24h15M2 44h12" stroke="#7894a4" stroke-width=".6"/>',
  desk: '<rect x="19" y="12" width="10" height="5" fill="#23445a" stroke="#d8f7ff" stroke-width=".45"/><path d="M20 13h6m-6 2h8m-8 1h5" stroke="#9be7ff" stroke-width=".45"/><path d="M20 23h8m-7 2h6m-6 1h6" stroke="#e3c69a" stroke-width=".55"/><rect x="33" y="14" width="5" height="6" rx="1" fill="#fff8df" stroke="#80502f" stroke-width=".6"/><path d="M38 15c3 0 3 4 0 4" stroke="#fff8df" stroke-width=".7"/><path d="m7 15 5-7 3 1-2 6" fill="#ffe779" stroke="#80502f" stroke-width=".6"/><path d="M11 28v12m26-12v12" stroke="#5f371f" stroke-width=".7"/>',
  box: '<path d="m8 16 16 8 16-8M24 24v18" stroke="#8b5a2b" stroke-width=".7"/><path d="m18 11 6-3 8 4-6 3Z" fill="#f3d39a" stroke="#a67338" stroke-width=".5"/><rect x="27" y="26" width="8" height="6" fill="#fff8df" stroke="#8b5a2b" stroke-width=".5" transform="skewY(-22)"/><path d="M29 28h4m-4 2h3" stroke="#56717d" stroke-width=".5"/><path d="m12 27 2-3 2 3m-2-3v6" stroke="#6f451f" stroke-width=".7"/><path d="M6 35h8m21-18h7" stroke="#e4b873" stroke-width=".6"/>',
  teleport: '<circle cx="24" cy="24" r="13" stroke="#79dfff" stroke-width=".6" stroke-dasharray="2 2"/><circle cx="24" cy="24" r="6" stroke="#fff0fa" stroke-width=".7"/><path d="m24 17 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#d8f7ff" stroke="#8750a5" stroke-width=".55"/><path d="M5 41h38M9 37l-4 4m14-4-2 4m22-4 4 4m-14-4 2 4" stroke="#8750a5" stroke-width=".6" opacity=".65"/><g fill="#fff8d0" stroke="none"><circle cx="14" cy="10" r="1"/><circle cx="36" cy="15" r="1.2"/><circle cx="9" cy="31" r=".8"/></g>',
  printer: '<path d="M16 9h16m-16 3h12m-12 3h15" stroke="#68a9c7" stroke-width=".65"/><path d="M17 33h14m-14 3h10m-10 3h12" stroke="#68a9c7" stroke-width=".65"/><path d="M10 22h16m-16 3h12m-12 3h14" stroke="#7c8792" stroke-width=".6"/><circle cx="35" cy="23" r=".7" fill="#fff8d0" stroke="none"/><path d="M3 29h7m-5 3h7m24-18 4-4m-2 7 5-4" stroke="#fff8df" stroke-width=".65"/><path d="M4 43h40" stroke="#293d4c" stroke-width=".8"/>',
  hundredFifty: '<rect x="10" y="12" width="28" height="24" rx="1" stroke="#9be7ff" stroke-width=".7"/><path d="M13 15h22v18H13Zm5 0v18m12-18v18" stroke="#183f56" stroke-width=".7"/><text x="24" y="29" text-anchor="middle" font-size="10.5" font-weight="900" fill="#d8f7ff" stroke="#17445c" stroke-width=".35">150</text><path d="M5 7h38M5 41h38" stroke="#9be7ff" stroke-width=".65"/><g fill="#fff0a6" stroke="none"><circle cx="8" cy="8" r="1"/><circle cx="40" cy="8" r="1"/><circle cx="8" cy="40" r="1"/><circle cx="40" cy="40" r="1"/></g>',
  slide: '<path d="M17 24h13m-11 3h9m-12 7h8" stroke="#9be7ff" stroke-width=".7"/><path d="M8 38h8m10 2h8" stroke="#fff8df" stroke-width=".7"/><path d="M2 30h10m-8 4h7M3 10h10" stroke="#e0ccff" stroke-width=".8" opacity=".75"/><circle cx="39" cy="39" r="2.2" fill="#d8c49a" stroke="none" opacity=".45"/><circle cx="43" cy="42" r="1.4" fill="#d8c49a" stroke="none" opacity=".35"/>',
  jump: '<path d="M20 20h12m-10 3h9m-8 9 3 2 3-2" stroke="#9be7ff" stroke-width=".7"/><path d="M14 39h8m9-1h8" stroke="#fff8df" stroke-width=".7"/><path d="M5 28c-3-14 7-23 16-25" stroke="#b8f7c1" stroke-width=".7" stroke-dasharray="2 2" opacity=".7"/><path d="m6 6 .8 1.7 1.7.8-1.7.8L6 11l-.8-1.7-1.7-.8 1.7-.8Zm36 23 .7 1.5 1.5.7-1.5.7-.7 1.5-.7-1.5-1.5-.7 1.5-.7Z" fill="#fff0a6" stroke="none"/>',
  closet: '<path d="M24 6v35M14 11h7v9h-7Zm13 0h7v9h-7ZM14 28h7v8h-7Zm13 0h7v8h-7Z" stroke="#6f3d22" stroke-width=".7"/><path d="M16 13h3m-3 2h3m10-2h3m-3 2h3" stroke="#3a261c" stroke-width=".7"/><circle cx="21" cy="24" r="1" fill="#ffe779" stroke="#5b321c" stroke-width=".5"/><circle cx="27" cy="24" r="1" fill="#ffe779" stroke="#5b321c" stroke-width=".5"/><path d="M12 39h24M8 44h32" stroke="#e4b873" stroke-width=".65"/><path d="M4 11h4m-4 4h4" stroke="#fff0a6" stroke-width=".6" opacity=".55"/>',
  lightning: '<path d="m28 7-12 19h9l-3 14 11-17h-9Z" stroke="#fff8d0" stroke-width=".8"/><path d="m10 7-3 6m6-3-3 6m28 17-3 6m6-10-3 6" stroke="#9be7ff" stroke-width=".8"/><circle cx="24" cy="24" r="20" stroke="#9be7ff" stroke-width=".5" stroke-dasharray="1 3" opacity=".55"/><path d="M4 43h12m17 0h11" stroke="#79dfff" stroke-width=".7"/>',
  crown: '<path d="m9 17 8 7 7-12 7 12 8-7-3 17H12Z" stroke="#fff0a6" stroke-width=".75"/><path d="M13 34h22m-20 3h18" stroke="#fff0a6" stroke-width=".7"/><circle cx="24" cy="26" r="1.2" fill="#fff0fa" stroke="none"/><circle cx="15" cy="28" r=".8" fill="#ffffff" stroke="none"/><circle cx="33" cy="28" r=".8" fill="#ffffff" stroke="none"/><path d="M5 8c3-4 7-4 10 0m18 0c3-4 7-4 10 0" stroke="#ff8d66" stroke-width=".7"/><path d="m24 40 0 5m-3-2 3 2 3-2" stroke="#ffd84d" stroke-width=".75"/>',
  heart: '<path d="M24 37S10 28 10 19c0-6 8-9 14-1 6-8 14-5 14 1 0 9-14 18-14 18Z" stroke="#ffb3c1" stroke-width=".75"/><path d="M11 25h7l4-9 5 16 4-7h9" stroke="#fff8df" stroke-width="1"/><path d="M14 15c2-3 5-3 7-1" stroke="#ffffff" stroke-width="1.1"/><path d="M4 39h9m22 0h9" stroke="#ef8ba0" stroke-width=".65"/><circle cx="39" cy="9" r="2" fill="#fff0fa" stroke="none" opacity=".65"/>',
  paper: '<path d="M15 9h12m-12 3h9m-7 8h14m-14 4h11m-11 4h14m-14 4h9m-9 4h12" stroke="#9cb7bf" stroke-width=".55"/><path d="M29 5v9h8" stroke="#68a9c7" stroke-width=".75"/><rect x="19" y="17" width="13" height="4" fill="#ef8ba0" stroke="#9d3044" stroke-width=".45" opacity=".8"/><path d="M8 12c-4-4-7 1-3 4l4 4c3 3 7-1 4-4L9 12c-2-2-4 0-2 2l4 4" stroke="#d8f7ff" stroke-width=".7"/>',
  rain: '<path d="M14 18c5-5 13-4 17 0m-15 5h16" stroke="#d8f7ff" stroke-width=".65"/><path d="m15 34-3 7m14-7-3 7m14-7-3 7" stroke="#d8f7ff" stroke-width=".8"/><ellipse cx="13" cy="43" rx="7" ry="1.5" stroke="#9be7ff" stroke-width=".65"/><ellipse cx="35" cy="42" rx="8" ry="1.7" stroke="#9be7ff" stroke-width=".65"/><path d="M5 12v6m-2-1h4m35 11v6m-2-1h4" stroke="#ffe779" stroke-width=".7"/><circle cx="8" cy="25" r="1" fill="#d8f7ff" stroke="none"/>',
  medal: '<circle cx="24" cy="28" r="9" stroke="#d69a1c" stroke-width=".7"/><circle cx="24" cy="28" r="6" stroke="#fff8d0" stroke-width=".55"/><path d="m24 22 1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6Z" fill="#e3aa32" stroke="#a96c12" stroke-width=".5"/><path d="m14 7 6 3m14-3-6 3M15 11l5 2m13-2-5 2" stroke="#d8f7ff" stroke-width=".75"/><text x="24" y="30" text-anchor="middle" font-size="4" font-weight="900" fill="#fff8d0" stroke="none">0</text>',
  badges: '<circle cx="18" cy="20" r="6.5" stroke="#fff0a6" stroke-width=".65"/><circle cx="31" cy="28" r="6.5" stroke="#d8f7ff" stroke-width=".65"/><path d="m18 15 1.4 3 3.2.4-2.3 2.2.6 3.2-2.9-1.5-2.9 1.5.6-3.2-2.3-2.2 3.2-.4Zm13 8 1.4 3 3.2.4-2.3 2.2.6 3.2-2.9-1.5-2.9 1.5.6-3.2-2.3-2.2 3.2-.4Z" fill="#fff8d0" stroke="none"/><path d="M13 32l5 3 4-2m14 5 3 2 3-1" stroke="#fff0fa" stroke-width=".65"/><path d="M5 7h8m24 34h7" stroke="#ffe779" stroke-width=".7"/>',
  trophy: '<path d="M17 9h14v9c0 6-3 10-7 10s-7-4-7-10Z" stroke="#fff0a6" stroke-width=".75"/><path d="M9 11H6v4c0 5 3 7 8 7m25-11h3v4c0 5-3 7-8 7" stroke="#d69a1c" stroke-width=".8"/><path d="m24 11 1.5 3 3.3.5-2.4 2.3.6 3.3-3-1.6-3 1.6.6-3.3-2.4-2.3 3.3-.5Z" fill="#e3aa32" stroke="#a96c12" stroke-width=".45"/><path d="M24 31v8m-7 2h14" stroke="#fff0a6" stroke-width=".75"/><rect x="18" y="39" width="12" height="3" fill="#4b2c08" stroke="#ffe779" stroke-width=".45"/><text x="24" y="41.4" text-anchor="middle" font-size="2.1" font-weight="900" fill="#fff0a6" stroke="none">ALL</text>'
};

const badgeScenePalettes = {
  main: ['#582c3f', '#d4784f'],
  cellar: ['#101a2d', '#35566b'],
  garden: ['#163b45', '#4f8b64'],
  office: ['#1b324a', '#607f98'],
  fun: ['#3a2556', '#9b5b91']
};

const badgeIconScenes = {
  riftCan: '<rect x="0" y="34" width="48" height="14" fill="#081c46"/><circle cx="9" cy="10" r="2" fill="#d8f7ff"/><circle cx="39" cy="15" r="2" fill="#72e3ff"/><circle cx="35" cy="37" r="1.5" fill="#d8f7ff"/><path d="M0 36c12-7 30 6 48-3v15H0Z" fill="#175fd1" opacity=".45"/>',
  flowJuice: '<rect x="0" y="34" width="48" height="14" fill="#263456"/><circle cx="8" cy="12" r="5" fill="#ff8fd8" opacity=".55"/><circle cx="39" cy="17" r="7" fill="#79dfff" opacity=".45"/><circle cx="36" cy="38" r="3" fill="#b8a5ff" opacity=".65"/><path d="M0 38c12-5 28 5 48-2v12H0Z" fill="#8750a5" opacity=".35"/>',
  fantaJug: '<rect x="0" y="34" width="48" height="14" fill="#2d3338"/><path d="M0 12h48v3H0Zm0 12h48v3H0Z" fill="#293137"/><path d="M5 5h38v4H5Z" fill="#69747b"/><path d="M17 7h14v3H17Z" fill="#fff3a6"/>',
  door: '<rect x="3" y="34" width="42" height="12" fill="#4b2c28"/><rect x="5" y="5" width="38" height="4" fill="#f0b76b" opacity=".25"/><circle cx="38" cy="12" r="2" fill="#fff0a6"/>',
  key: '<rect x="3" y="32" width="42" height="14" fill="#6b4229"/><rect x="6" y="34" width="36" height="4" fill="#a1663f"/><circle cx="38" cy="10" r="2" fill="#fff0a6"/><circle cx="33" cy="7" r="1" fill="#fff0a6"/>',
  run: '<rect x="2" y="4" width="10" height="29" fill="#2a3340"/><rect x="36" y="4" width="10" height="29" fill="#2a3340"/><rect x="0" y="37" width="48" height="11" fill="#333d47"/><path d="M2 18h12v3H2Zm0 8h9v2H2Z" fill="#fff0a6" opacity=".45"/>',
  boot: '<path d="M2 12h16v3H2Zm0 9h11v3H2Zm0 18h17v3H2Z" fill="#d8f7ff" opacity=".45"/><ellipse cx="25" cy="43" rx="20" ry="3" fill="#1c2c38" opacity=".35"/>',
  sword: '<circle cx="36" cy="15" r="10" fill="#361a2d"/><path d="M0 40h48v8H0Z" fill="#3c2732"/><path d="m35 7 2 4 4 1-3 3-1 4-2-3-4-1 3-3Z" fill="#ff8d66" opacity=".7"/>',
  skull: '<circle cx="9" cy="36" r="8" fill="#684a7f" opacity=".45"/><circle cx="39" cy="34" r="10" fill="#684a7f" opacity=".45"/><path d="M3 42h42v4H3Z" fill="#211a31"/>',
  milkshake: '<rect x="0" y="32" width="48" height="16" fill="#7d4936"/><path d="M0 32h48v4H0Z" fill="#f4f0df"/><path d="M4 38h8v8H4Zm16 0h8v8h-8Zm16 0h8v8h-8Z" fill="#f7a8c4" opacity=".5"/>',
  rocket: '<circle cx="24" cy="24" r="22" fill="#ff4a00" opacity=".14"/><path d="M0 38c12-5 29 4 48-2v12H0Z" fill="#240b05"/><path d="M0 43c14-4 28 3 48-2v7H0Z" fill="#ff4a00" opacity=".25"/><path d="m3 36 4-8 3 8m28 1 4-9 3 8" fill="#100806" opacity=".8"/><g fill="#ff9f43"><circle cx="7" cy="9" r="1.2"/><circle cx="39" cy="7" r="1"/><circle cx="42" cy="23" r="1.3"/><circle cx="8" cy="29" r=".8"/></g><g fill="#ffd166"><circle cx="10" cy="15" r=".7"/><circle cx="37" cy="17" r=".8"/></g>',
  clock: '<rect x="4" y="5" width="14" height="17" fill="#24354b"/><circle cx="10" cy="10" r="4" fill="#fff3c4"/><path d="M11 5v17h2V5ZM4 13h14v2H4Z" fill="#8295a8"/>',
  hundred: '<path d="M2 5h8v12H2Zm12 0h8v12h-8Zm24 0h8v12h-8ZM2 32h8v12H2Zm36 0h8v12h-8Z" fill="#1d264e" opacity=".65"/>',
  tree: '<circle cx="38" cy="10" r="6" fill="#fff3c4" opacity=".7"/><path d="M0 35c12-4 30 3 48-2v15H0Z" fill="#315c3c"/>',
  submarine: '<path d="M0 0h48v48H0Z" fill="#1b5570" opacity=".35"/><circle cx="7" cy="11" r="2" fill="#9be7ff" opacity=".6"/><circle cx="40" cy="15" r="3" fill="#9be7ff" opacity=".45"/><circle cx="9" cy="24" r="1.2" fill="#9be7ff"/><path d="M4 48 8 33l4 15Zm32 0 4-17 5 17Z" fill="#2c6b55"/>',
  mountain: '<circle cx="38" cy="9" r="4" fill="#fff3c4"/><path d="m0 34 10-14 8 12 8-9 10 12 12-8v21H0Z" fill="#263c56" opacity=".5"/>',
  flower: '<path d="M0 36c12-5 30 2 48-3v15H0Z" fill="#3a7445"/><circle cx="8" cy="35" r="2" fill="#ffe779"/><circle cx="40" cy="33" r="2" fill="#f7a8c4"/>',
  stairsDown: '<path d="M0 6h48v5H0Zm0 12h48v3H0Zm0 12h48v3H0Z" fill="#a9c0cc" opacity=".14"/><path d="M11 0h2v48h-2Zm24 0h2v48h-2Z" fill="#a9c0cc" opacity=".1"/>',
  stairsUp: '<path d="M0 6h48v5H0Zm0 12h48v3H0Zm0 12h48v3H0Z" fill="#a9c0cc" opacity=".14"/><path d="M11 0h2v48h-2Zm24 0h2v48h-2Z" fill="#a9c0cc" opacity=".1"/>',
  desk: '<rect x="0" y="35" width="48" height="13" fill="#293d4c"/><path d="M3 6h12v8H3Zm30 2h11v7H33Z" fill="#fff8df" opacity=".5"/>',
  box: '<path d="M2 6h10v32H2Zm34 0h10v32H36Z" fill="#3e2b24" opacity=".5"/><path d="M0 16h48v4H0Zm0 22h48v4H0Z" fill="#6b4229"/>',
  teleport: '<circle cx="24" cy="24" r="21" fill="#241c46" opacity=".45"/><circle cx="24" cy="24" r="18" fill="none" stroke="#9be7ff" stroke-width="1" opacity=".5"/><circle cx="7" cy="8" r="1.5" fill="#fff8d0"/><circle cx="41" cy="39" r="1.5" fill="#fff8d0"/>',
  printer: '<path d="m4 4 9 2-2 8-9-2Zm32 1 9-2 2 8-9 2ZM3 28l8 2-2 7-8-2Z" fill="#fff8df" opacity=".75"/>',
  hundredFifty: '<path d="M2 5h8v12H2Zm12 0h8v12h-8Zm24 0h8v12h-8ZM2 32h8v12H2Zm36 0h8v12h-8Z" fill="#172c3c" opacity=".65"/>',
  slide: '<path d="M0 34h48v14H0Z" fill="#2d2743"/><path d="M2 39h14v3H2Zm24-27h16v3H26Zm4 7h12v3H30Z" fill="#e0ccff" opacity=".4"/>',
  jump: '<path d="M0 40h48v8H0Z" fill="#284635"/><circle cx="8" cy="9" r="2" fill="#fff0a6"/><circle cx="39" cy="15" r="1.5" fill="#fff0a6"/><circle cx="12" cy="24" r="1.2" fill="#fff0a6"/>',
  closet: '<rect x="2" y="3" width="44" height="42" fill="#39291f" opacity=".35"/><path d="M3 5h42v4H3Zm0 35h42v5H3Z" fill="#d3a064" opacity=".35"/>',
  lightning: '<circle cx="10" cy="12" r="9" fill="#364461"/><circle cx="35" cy="10" r="12" fill="#364461"/><path d="M0 36h48v12H0Z" fill="#1c2c42"/>',
  crown: '<path d="M0 0h48v48H0Z" fill="#4b1f33" opacity=".3"/><path d="M4 4h7v34H4Zm33 0h7v34h-7Z" fill="#2a1826" opacity=".5"/><circle cx="24" cy="8" r="4" fill="#ff8d66" opacity=".6"/>',
  heart: '<circle cx="24" cy="23" r="20" fill="#7c334c" opacity=".35"/><path d="M4 40h40v6H4Z" fill="#3b2438"/>',
  paper: '<path d="m2 9 10-3 3 9-10 3Zm31 24 11-2 2 10-11 2ZM3 33l8-2 2 7-8 2Z" fill="#fff8df" opacity=".45"/>',
  rain: '<path d="M0 38c12-4 31 4 48-1v11H0Z" fill="#24445c"/><ellipse cx="13" cy="42" rx="9" ry="2" fill="#9be7ff" opacity=".4"/><ellipse cx="36" cy="45" rx="8" ry="1.5" fill="#9be7ff" opacity=".35"/>',
  medal: '<path d="M7 35h34v9H7Z" fill="#3f3555"/><path d="M13 30h22v7H13Z" fill="#5a4b70"/><circle cx="7" cy="8" r="2" fill="#ffe779"/><circle cx="40" cy="14" r="2" fill="#f7a8c4"/>',
  badges: '<path d="m5 5 2 4 4 1-3 3-1 4-2-3-4-1 3-3Zm34 27 2 4 4 1-3 3-1 4-2-3-4-1 3-3Z" fill="#ffe779" opacity=".6"/><circle cx="39" cy="8" r="2" fill="#9be7ff"/><circle cx="8" cy="29" r="2" fill="#f7a8c4"/>',
  trophy: '<path d="M4 0h10L8 48H0Zm30 0h10l6 48h-8Z" fill="#fff0a6" opacity=".18"/><path d="M5 40h38v8H5Z" fill="#4c3156"/><circle cx="7" cy="18" r="2" fill="#f7a8c4"/><circle cx="40" cy="24" r="2" fill="#9be7ff"/><path d="m9 4 2 4 4 1-3 3-1 4-2-3-4-1 3-3Z" fill="#ffe779"/>'
};

let currentDoor = 1;
let mainFloorResumeDoor = 1;
let cutsceneActive = false;
let cutsceneSeen = false;
let cutsceneTimer = 0;
let cutsceneStep = 0;
let paused = true;
let won = false;
let keyFound = false;
let doorOpen = false;
let monsterActive = false;
let bossActive = false;
let bossIsReturn = false;
let rewardClaimed = false;
let hasFlashlight = false;
let roomIsDark = false;
let currentTarget = null;
let messageTimer = 0;
let badgeToastTimer = 0;
let hotbarSlots = new Array(5).fill(null);
let selectedHotbarSlot = 0;
let backpackStorageSlots = new Array(4).fill(null);
let hasBackpack = false;
let riftItem = loadRiftItem();
let earnedBadges = new Set(loadBadges());
let badgeDescentActive = false;
let badgeDescentTimer;
const funStats = {
  jumps: 0,
  slides: 0,
  hides: 0,
  stomps: loadBossStomps(),
  storageRooms: 0,
  gardenTime: 0
};
let activeChaseDamageFree = true;
let currentFloorDamageFree = true;

const music = {
  context: null,
  master: null,
  timer: null,
  nextNoteTime: 0,
  step: 0,
  mode: 'none',
  noiseBuffer: null,
  chase: {
    stepDuration: .09,
    melody: [880, 0, 880, 988, 784, 0, 880, 0, 659, 0, 784, 880, 988, 0, 880, 0],
    bass: [110, 0, 110, 0, 98, 0, 98, 0, 87, 0, 87, 0, 98, 0, 110, 0],
    drums: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    snare: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    ticks: [0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1]
  },
  boss: {
    stepDuration: .14,
    melody: [294, 0, 0, 349, 294, 0, 392, 0, 294, 0, 0, 466, 415, 0, 392, 0],
    bass: [73, 0, 0, 0, 78, 0, 0, 0, 69, 0, 0, 0, 78, 0, 82, 0],
    drums: [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0]
  }
};

function loadBossStomps() {
  try {
    const stomps = Number(localStorage.getItem(bossStompsStorageKey));
    return Number.isFinite(stomps) ? Math.max(0, Math.floor(stomps)) : 0;
  } catch {
    return 0;
  }
}

function saveBossStomps() {
  try {
    localStorage.setItem(bossStompsStorageKey, String(funStats.stomps));
  } catch {
  }
}

function loadBadges() {
  try {
    return JSON.parse(localStorage.getItem('100-doors-badges') || '[]');
  } catch {
    return [];
  }
}

function saveBadges() {
  try {
    localStorage.setItem('100-doors-badges', JSON.stringify([...earnedBadges]));
  } catch {
  }
}

function loadRiftItem() {
  try {
    const item = JSON.parse(localStorage.getItem(riftStorageKey) || 'null');
    if (!item || !Object.hasOwn(riftItemNames, item.id)) return null;
    const count = Math.floor(Number(item.count));
    if (!Number.isFinite(count) || count < 1) return null;
    return { id: item.id, name: riftItemNames[item.id], count };
  } catch {
    return null;
  }
}

function saveRiftItem() {
  try {
    if (riftItem) localStorage.setItem(riftStorageKey, JSON.stringify(riftItem));
    else localStorage.removeItem(riftStorageKey);
    return true;
  } catch {
    return false;
  }
}

const badgeSectionNames = {
  main: 'MAIN FLOOR',
  cellar: 'THE CELLAR',
  garden: 'THE GARDEN',
  office: 'THE OFFICE',
  fun: 'FUN & RANDOM'
};

const badgeExtraDescriptions = {
  'first-key': 'Search the cabinet, collect the first golden key, and unlock the way forward.',
  'speed-boots': 'Open the reward chest after the chase and claim the glowing Speed Boots.',
  'demon-slayer': 'Defeat the Door 50 demon by bouncing on its head three times.',
  'monster-slayer': 'Defeat the returning Door 75 monster and survive its faster attacks.',
  'all-doors': 'Open every door on the Main Floor and escape through Door 100.'
};

function getBadgeDescription(badge) {
  return badge.popup || badgeExtraDescriptions[badge.id] || `Earn the ${badge.name} collectible in THE PARK.`;
}

function renderBadgeArt(badge, instance) {
  const [sceneTop, sceneBottom] = badgeScenePalettes[badge.section];
  const artId = `badge-${instance}-${badge.id}`;
  return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><defs><linearGradient id="${artId}-scene" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${sceneTop}"/><stop offset=".58" stop-color="${sceneBottom}"/><stop offset="1" stop-color="#101522"/></linearGradient><linearGradient id="${artId}-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8d0"/><stop offset=".22" stop-color="#d8a83e"/><stop offset=".48" stop-color="#fff0a6"/><stop offset=".72" stop-color="#8b5a16"/><stop offset="1" stop-color="#ffe779"/></linearGradient><radialGradient id="${artId}-light" cx=".25" cy=".15" r=".9"><stop offset="0" stop-color="#ffffff" stop-opacity=".34"/><stop offset=".45" stop-color="#ffffff" stop-opacity=".04"/><stop offset="1" stop-color="#050914" stop-opacity=".44"/></radialGradient><pattern id="${artId}-grain" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 4 4 0M-1 1 1-1M3 5l2-2" stroke="#ffffff" stroke-width=".35" opacity=".14"/></pattern><clipPath id="${artId}-clip"><rect x="1" y="1" width="46" height="46" rx="5"/></clipPath><filter id="${artId}-shadow" x="-40%" y="-40%" width="180%" height="190%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="1.2" stdDeviation=".75" flood-color="#050914" flood-opacity=".8"/></filter></defs><g clip-path="url(#${artId}-clip)"><rect width="48" height="48" fill="url(#${artId}-scene)" stroke="none"/><rect width="48" height="48" fill="url(#${artId}-grain)" stroke="none"/><path d="M24 24 2 0h9Zm0 0L18 0h7Zm0 0L37 0h8Zm0 0L48 9v8Zm0 0L48 32v11Zm0 0L36 48h-8Zm0 0L12 48H3Zm0 0L0 40v-9Zm0 0L0 19V8Z" fill="#fff8d0" opacity=".035" stroke="none"/><g stroke="none">${badgeIconScenes[badge.icon]}</g><ellipse cx="24" cy="43" rx="18" ry="2.6" fill="#050914" opacity=".38" stroke="none"/><g filter="url(#${artId}-shadow)"><g stroke="none">${badgeIconDetails[badge.icon]}</g>${badgeIcons[badge.icon]}<g>${badgeMicroDetails[badge.icon]}</g></g><rect width="48" height="48" fill="url(#${artId}-light)" stroke="none"/><path d="M3 4h20C13 8 7 16 3 29Z" fill="#ffffff" opacity=".1" stroke="none"/><path d="M4 41c12-3 26 4 40-1" stroke="#ffffff" stroke-width=".55" opacity=".2"/><g fill="#fff8d0" stroke="none"><circle cx="7" cy="9" r=".85"/><circle cx="41" cy="36" r=".8"/><path d="m39 5 .9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9Z"/></g></g><rect x=".7" y=".7" width="46.6" height="46.6" rx="5.4" stroke="url(#${artId}-rim)" stroke-width="1.4"/><rect x="2.4" y="2.4" width="43.2" height="43.2" rx="3.8" stroke="#fff8d0" stroke-width=".4" opacity=".55"/><path d="M3 10V3h7m28 0h7v7M3 38v7h7m28 0h7v-7" stroke="#fff3c4" stroke-width=".75" opacity=".8"/></svg>`;
}

function renderBadge(badge, instance) {
  const earned = earnedBadges.has(badge.id);
  const state = `badge${earned ? ' earned' : ''}${badge.difficult ? ' difficult' : ''}`;
  const status = earned ? 'EARNED' : 'LOCKED';
  const description = `${badge.difficult ? 'Ultra challenge: ' : ''}${getBadgeDescription(badge)}`;
  const rainbow = badge.difficult ? '<span class="badge-rainbow" aria-hidden="true"></span>' : '';
  const edition = String(badges.indexOf(badge) + 1).padStart(2, '0');
  return `<div class="${state}" data-section="${badge.section}" data-badge-id="${badge.id}" role="button" tabindex="0" aria-label="${badge.name}. ${status}. Inspect badge." title="${description}"><span class="badge-ribbon" aria-hidden="true"></span><span class="badge-medal" aria-hidden="true">${rainbow}${renderBadgeArt(badge, instance)}</span><span class="badge-edition">NO. ${edition} / ${badge.difficult ? 'ULTRA' : badgeSectionNames[badge.section]}</span><span class="badge-name">${badge.name}</span><span class="badge-status">${status}</span></div>`;
}

function renderBadgeCollection(instance) {
  const renderSection = (sectionId, title) => {
    const sectionBadges = badges.filter(badge => badge.section === sectionId);
    const shelves = [];
    for (let index = 0; index < sectionBadges.length; index += 4) {
      const shelfBadges = sectionBadges.slice(index, index + 4);
      shelves.push(`<div class="badge-shelf"><div class="badge-grid">${shelfBadges.map(badge => renderBadge(badge, instance)).join('')}</div></div>`);
    }
    return `<section class="badge-section"><h3>${title}</h3>${shelves.join('')}</section>`;
  };
  return renderSection('main', 'MAIN FLOOR')
    + renderSection('cellar', 'THE CELLAR')
    + renderSection('garden', 'THE GARDEN')
    + renderSection('office', 'THE OFFICE')
    + renderSection('fun', 'FUN & RANDOM');
}

function updateBadgeUi() {
  badgeList.innerHTML = renderBadgeCollection('wall');
  winBadgeList.innerHTML = renderBadgeCollection('win');
  badgeCount.textContent = `${earnedBadges.size}/${badges.length} badges`;
  badgeIndexCount.textContent = `${earnedBadges.size}/${badges.length} badges`;
}

function showBadgeDetail(badgeId) {
  const badge = badges.find(item => item.id === badgeId);
  if (!badge) return;
  const earned = earnedBadges.has(badge.id);
  const edition = String(badges.indexOf(badge) + 1).padStart(2, '0');
  badgeDetailDialog.dataset.badgeId = badge.id;
  badgeDetailArt.className = `badge-detail-art${earned ? ' earned' : ''}`;
  badgeDetailArt.innerHTML = `<div class="badge-detail-medal">${renderBadgeArt(badge, 'inspect')}</div>`;
  badgeDetailKicker.textContent = `${badgeSectionNames[badge.section]} / COLLECTIBLE NO. ${edition}`;
  badgeDetailName.textContent = badge.name;
  badgeDetailDescription.textContent = getBadgeDescription(badge);
  badgeDetailStatus.textContent = earned ? 'EARNED' : 'LOCKED';
  badgeDetailStatus.className = `badge-detail-status${earned ? ' earned' : ''}`;
  badgeDetailProgress.textContent = badge.id === 'boss-bouncer'
    ? `Boss bounces: ${Math.min(funStats.stomps, 10)}/10`
    : badge.difficult ? 'ULTRA RARE / CHALLENGE BADGE' : 'THE PARK / DETAILED COLLECTOR EDITION';
  if (!badgeDetailDialog.open) badgeDetailDialog.showModal();
}

function awardBadge(id) {
  if (earnedBadges.has(id)) return;
  const badge = badges.find(item => item.id === id);
  if (!badge) return;
  earnedBadges.add(id);
  saveBadges();
  updateBadgeUi();
  badgeToast.textContent = badge.popup || `Badge earned: ${badge.name}`;
  badgeToast.classList.add('visible');
  badgeToastTimer = 3;
  checkMetaBadges();
}

function checkMetaBadges() {
  if (earnedBadges.size >= 10) awardBadge('badge-collector');
  if (badges.filter(badge => badge.id !== 'completionist').every(badge => earnedBadges.has(badge.id))) {
    awardBadge('completionist');
  }
}

function initMusic() {
  if (music.context) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  music.context = new AudioContextClass();
  music.master = music.context.createGain();
  music.master.gain.value = .16;
  music.master.connect(music.context.destination);

  const sampleRate = music.context.sampleRate;
  const noiseLength = Math.floor(sampleRate * .12);
  music.noiseBuffer = music.context.createBuffer(1, noiseLength, sampleRate);
  const noiseData = music.noiseBuffer.getChannelData(0);
  for (let index = 0; index < noiseLength; index++) {
    noiseData[index] = Math.random() * 2 - 1;
  }
}

function playMusicTone(frequency, startTime, duration, type, volume) {
  if (!frequency) return;
  const oscillator = music.context.createOscillator();
  const gain = music.context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + .01);
  gain.gain.exponentialRampToValueAtTime(.001, startTime + duration);
  oscillator.connect(gain);
  gain.connect(music.master);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + .02);
}

function playMusicDrum(startTime) {
  const oscillator = music.context.createOscillator();
  const gain = music.context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(120, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(45, startTime + .09);
  gain.gain.setValueAtTime(.16, startTime);
  gain.gain.exponentialRampToValueAtTime(.001, startTime + .12);
  oscillator.connect(gain);
  gain.connect(music.master);
  oscillator.start(startTime);
  oscillator.stop(startTime + .14);
}

function playMusicTick(startTime) {
  const oscillator = music.context.createOscillator();
  const gain = music.context.createGain();
  oscillator.type = 'square';
  oscillator.frequency.value = 1400;
  gain.gain.setValueAtTime(.025, startTime);
  gain.gain.exponentialRampToValueAtTime(.001, startTime + .025);
  oscillator.connect(gain);
  gain.connect(music.master);
  oscillator.start(startTime);
  oscillator.stop(startTime + .035);
}

function playMusicSnare(startTime) {
  const source = music.context.createBufferSource();
  const gain = music.context.createGain();
  const filter = music.context.createBiquadFilter();
  source.buffer = music.noiseBuffer;
  filter.type = 'highpass';
  filter.frequency.value = 1200;
  gain.gain.setValueAtTime(.09, startTime);
  gain.gain.exponentialRampToValueAtTime(.001, startTime + .08);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(music.master);
  source.start(startTime);
  source.stop(startTime + .1);
}

function scheduleMusic() {
  const pattern = music.mode === 'chase' ? music.chase : music.boss;
  const currentTime = music.context.currentTime;

  while (music.nextNoteTime < currentTime + .15) {
    const step = music.step % pattern.melody.length;
    playMusicTone(pattern.melody[step], music.nextNoteTime, pattern.stepDuration * .9, 'square', .08);
    playMusicTone(pattern.bass[step], music.nextNoteTime, pattern.stepDuration * 1.2, 'triangle', .12);
    if (pattern.drums && pattern.drums[step]) playMusicDrum(music.nextNoteTime);
    if (pattern.snare && pattern.snare[step]) playMusicSnare(music.nextNoteTime);
    if (pattern.ticks && pattern.ticks[step]) playMusicTick(music.nextNoteTime);
    music.step++;
    music.nextNoteTime += pattern.stepDuration;
  }
}

function updateMusic() {
  if (!music.context) return;

  const desiredMode = paused || won
    ? 'none'
    : monsterActive || rushActive || vineMonsterActive || officeChaseActive
      ? 'chase'
      : bossActive
        ? 'boss'
        : 'none';

  if (desiredMode === 'none') {
    if (music.timer) {
      clearInterval(music.timer);
      music.timer = null;
    }
    music.mode = 'none';
    return;
  }

  if (music.context.state === 'suspended') music.context.resume();
  if (music.mode !== desiredMode) {
    music.mode = desiredMode;
    music.step = 0;
    music.nextNoteTime = music.context.currentTime + .05;
  }
  if (!music.timer) music.timer = setInterval(scheduleMusic, 40);
}

function addItemToHotbar(id, name) {
  const existingItem = hotbarSlots.find(item => item && item.id === id);
  if (existingItem) {
    existingItem.count++;
    updateHotbarUi();
    return true;
  } else {
    const emptySlot = hotbarSlots.findIndex(item => item === null);
    if (id === 'teleporter' && emptySlot === -1) {
      showMessage('Your hotbar is full! Free a slot to carry the Teleporter.');
      return false;
    }
    if (emptySlot === -1 && hasBackpack) {
      const backpackSlot = backpackStorageSlots.findIndex(item => item === null);
      if (backpackSlot !== -1) {
        backpackStorageSlots[backpackSlot] = { id, name, count: 1 };
        updateBackpackUi();
        return true;
      }
    }
    if (emptySlot === -1) {
      showMessage('Your hotbar is full!');
      return false;
    }
    hotbarSlots[emptySlot] = { id, name, count: 1 };
  }
  updateHotbarUi();
  return true;
}

function updateHotbarUi() {
  hotbarElement.innerHTML = hotbarSlots.map((item, index) => {
    const selected = index === selectedHotbarSlot ? ' selected' : '';
    const itemHtml = item
      ? `<div class="hotbar-item item-${item.id}"></div><span class="item-count">x${item.count}</span>`
      : '';
    return `<div class="hotbar-slot${selected}" data-slot-index="${index}" title="${item ? item.name : 'Empty slot'}"><span class="hotbar-number">${index + 1}</span>${itemHtml}</div>`;
  }).join('');
  updateBackpackVisibility();
}

function updateBackpackUi() {
  backpackStorageElement.innerHTML = backpackStorageSlots.map((item, index) => {
    const itemHtml = item
      ? `<div class="hotbar-item item-${item.id}"></div><span class="item-count">x${item.count}</span>`
      : '';
    return `<div class="backpack-slot" data-slot-index="${index}" title="${item ? `${item.name} - click to take out` : 'Empty backpack slot'}">${itemHtml}</div>`;
  }).join('');
}

function updateBackpackVisibility() {
  backpackStorageElement.classList.toggle('hidden', !hasBackpack);
}

function selectHotbarSlot(index) {
  selectedHotbarSlot = index;
  updateHotbarUi();
}

function storeSelectedHotbarItem() {
  if (!hasBackpack) {
    showMessage('Find the rare Backpack first!');
    return false;
  }

  const selectedItem = hotbarSlots[selectedHotbarSlot];
  if (!selectedItem) {
    showMessage('Select a hotbar item first, then press B to store it.');
    return false;
  }
  if (selectedItem.id === 'backpack') {
    showMessage('You cannot store the Backpack inside itself!');
    return false;
  }

  const existingItem = backpackStorageSlots.find(item => item && item.id === selectedItem.id);
  const emptySlot = backpackStorageSlots.findIndex(item => item === null);
  if (!existingItem && emptySlot === -1) {
    showMessage('Your Backpack is full! Take something out first.');
    return false;
  }

  if (existingItem) existingItem.count += selectedItem.count;
  else backpackStorageSlots[emptySlot] = { ...selectedItem };
  hotbarSlots[selectedHotbarSlot] = null;
  updateHotbarUi();
  updateBackpackUi();
  showMessage(`${selectedItem.name} stored in your Backpack.`);
  return true;
}

function takeBackpackItem(index) {
  const backpackItem = backpackStorageSlots[index];
  if (!backpackItem) return false;

  const existingItem = hotbarSlots.find(item => item && item.id === backpackItem.id);
  const emptySlot = hotbarSlots.findIndex(item => item === null);
  if (!existingItem && emptySlot === -1) {
    showMessage('Your hotbar is full! Make room before taking that item out.');
    return false;
  }

  if (existingItem) {
    existingItem.count += backpackItem.count;
    selectedHotbarSlot = hotbarSlots.indexOf(existingItem);
  } else {
    hotbarSlots[emptySlot] = { ...backpackItem };
    selectedHotbarSlot = emptySlot;
  }
  backpackStorageSlots[index] = null;
  updateHotbarUi();
  updateBackpackUi();
  showMessage(`${backpackItem.name} moved back to your hotbar.`);
  return true;
}

function isPermanentRiftActive() {
  return currentFloor === 'main' && (currentDoor === totalDoors || (currentDoor === 1 && Boolean(riftItem) && !thrownRiftActive));
}

function isRiftActive() {
  return isPermanentRiftActive() || thrownRiftActive;
}

function getActiveRift() {
  return thrownRiftActive ? thrownRift : rift;
}

function useRift() {
  if (riftItem) {
    const existingItem = hotbarSlots.find(item => item && item.id === riftItem.id);
    const emptySlot = hotbarSlots.findIndex(item => item === null);
    if (!existingItem && emptySlot === -1) {
      showMessage('Your hotbar is full! Make room for the RIFT item.');
      return;
    }

    const returnedItem = riftItem;
    riftItem = null;
    if (!saveRiftItem()) {
      riftItem = returnedItem;
      showMessage('The RIFT could not save that change. Your item is still safe inside.');
      return;
    }

    if (existingItem) existingItem.count += returnedItem.count;
    else hotbarSlots[emptySlot] = returnedItem;
    if (returnedItem.id === 'backpack') {
      hasBackpack = true;
      updateBackpackUi();
    }
    updateHotbarUi();
    if (currentFloor === 'main' && currentDoor === 1) startRoom();
    else updateHud();
    showMessage(`The blue RIFT tossed your ${returnedItem.name} back out!`);
    return;
  }

  const selectedItem = hotbarSlots[selectedHotbarSlot];
  if (!selectedItem) {
    showMessage('Select a hotbar item first, then press E at the blue RIFT.');
    return;
  }

  riftItem = { ...selectedItem };
  if (!saveRiftItem()) {
    riftItem = null;
    showMessage('The RIFT could not save your item. It is still in your hotbar.');
    return;
  }

  hotbarSlots[selectedHotbarSlot] = null;
  if (riftItem.id === 'backpack') hasBackpack = false;
  updateHotbarUi();
  updateHud();
  showMessage(`${riftItem.name} is safe inside the blue RIFT.`);
}

function useSelectedHotbarItem() {
  const item = hotbarSlots[selectedHotbarSlot];
  if (!item) return;

  if (item.id === 'flow-juice') {
    flowJuiceTimer = flowJuiceDuration;
    item.count--;
    if (item.count <= 0) hotbarSlots[selectedHotbarSlot] = null;
    updateHotbarUi();
    showMessage(`Flow Juice used! Low gravity for ${flowJuiceDuration} seconds.`);
    return;
  }

  if (item.id === 'rift-can') {
    if (isRiftActive()) {
      showMessage('A RIFT is already open in this room.');
      return;
    }

    const throwCenter = player.x + player.width / 2 + player.facing * 110;
    thrownRift.x = Math.max(45, Math.min(door.x - thrownRift.width - 25, throwCenter - thrownRift.width / 2));
    thrownRift.y = groundY - thrownRift.height;
    thrownRiftActive = true;
    item.count--;
    if (item.count <= 0) hotbarSlots[selectedHotbarSlot] = null;
    updateHotbarUi();
    updateHud();
    showMessage('Rift-in-a-Can thrown! A RIFT opened on the floor. Press E nearby to use it.');
    return;
  }

  if (item.id === 'fanta-jug') {
    player.health = player.maxHealth;
    fantaRushTimer = fantaRushDuration;
    item.count--;
    if (item.count <= 0) hotbarSlots[selectedHotbarSlot] = null;
    updateHotbarUi();
    updateHealthUi();
    showMessage(`Fanta Jug used! 100% HP and Fanta Rush for ${fantaRushDuration} seconds.`);
    return;
  }

  if (item.id === 'teleporter') {
    if (currentFloor !== 'office') {
      showMessage('The Teleporter only works in THE OFFICE.');
      return;
    }

    if (currentDoor === totalOfficeDoors && !officeSideRoomActive) {
      showMessage('You are already at the end of THE OFFICE.');
      return;
    }

    item.count--;
    if (item.count <= 0) hotbarSlots[selectedHotbarSlot] = null;
    updateHotbarUi();

    officeSideRoomActive = false;
    currentDoor = totalOfficeDoors;
    startRoom();
    showMessage('Teleporter used! You warped to Office Door 150.');
    awardBadge('shortcut-specialist');
    return;
  }

  if (item.id !== 'milkshake') return;
  if (player.health >= player.maxHealth) {
    showMessage('Health is already full!');
    return;
  }

  player.health = Math.min(player.maxHealth, player.health + 25);
  item.count--;
  if (item.count <= 0) hotbarSlots[selectedHotbarSlot] = null;

  updateHotbarUi();
  updateHealthUi();
  showMessage('Milkshake used! +25 HP.');
  awardBadge('snack-time');
}

const roomThemes = [
  { name: 'Grand Gallery', wallpaper: 'damask', wallTop: '#5b4a62', wallMiddle: '#403549', wallLower: '#292331', floor: '#4d3b28', floorLine: '#806044', detail: 'paintings' },
  { name: 'Conservatory', wallpaper: 'botanical', wallTop: '#4f765e', wallMiddle: '#315540', wallLower: '#203a2b', floor: '#4a5b36', floorLine: '#708551', detail: 'plants' },
  { name: 'Boiler Room', wallpaper: 'stripes', wallTop: '#4a5568', wallMiddle: '#303a49', wallLower: '#1f2632', floor: '#404b5c', floorLine: '#65748a', detail: 'pipes' },
  { name: 'Library', wallpaper: 'lattice', wallTop: '#72584a', wallMiddle: '#4e3b31', wallLower: '#2e211b', floor: '#5c4231', floorLine: '#88644a', detail: 'shelves' },
  { name: 'Bedroom', wallpaper: 'stars', wallTop: '#5c5f78', wallMiddle: '#3b3e52', wallLower: '#252736', floor: '#4a4e64', floorLine: '#707793', detail: 'bedroom' },
  { name: 'Clockwork Study', wallpaper: 'deco', wallTop: '#5a6f78', wallMiddle: '#354b54', wallLower: '#1e2e34', floor: '#3c5158', floorLine: '#66818a', detail: 'gears' },
  { name: 'Crystal Room', wallpaper: 'diamonds', wallTop: '#6d5f78', wallMiddle: '#473d52', wallLower: '#2a2332', floor: '#4a3f57', floorLine: '#776487', detail: 'crystals' },
  { name: 'Overgrown Parlour', wallpaper: 'vines', wallTop: '#62725c', wallMiddle: '#3d4b38', wallLower: '#222b1f', floor: '#41503a', floorLine: '#698061', detail: 'vines' },
  { name: 'Dusty Attic', wallpaper: 'dots', wallTop: '#7b7259', wallMiddle: '#575040', wallLower: '#332e26', floor: '#5b5241', floorLine: '#827862', detail: 'boxes' },
  { name: 'Golden Reward Room', wallpaper: 'deco', wallTop: '#6f5a3d', wallMiddle: '#4a3b28', wallLower: '#2a2118', floor: '#57432d', floorLine: '#8a6b48', detail: 'gold' }
];

const player = {
  x: 80,
  y: 512,
  width: 24,
  height: 48,
  speed: 235,
  jumpSpeed: 520,
  velocityY: 0,
  onGround: true,
  onPlatform: false,
  sliding: false,
  facing: 1,
  animationTime: 0,
  moving: false,
  hidden: false,
  health: 100,
  maxHealth: 100,
  invulnerableTimer: 0
};

const monster = {
  x: -80,
  y: 500,
  width: 36,
  height: 64,
  speed: 135
};

const cabinet = {
  x: 120,
  y: 500,
  width: 60,
  height: 60,
  searched: false,
  keyVisible: false
};

const rewardChest = {
  x: 420,
  y: 490,
  width: 70,
  height: 50,
  claimed: false
};

const boss = {
  x: 520,
  y: 420,
  width: 96,
  height: 140,
  health: 3,
  maxHealth: 3,
  phase: 1,
  speed: 130,
  chargeTimer: 0,
  attacking: false,
  invulnerableTimer: 0,
  direction: -1
};

const bossImage = new Image();
bossImage.crossOrigin = 'anonymous';
bossImage.src = `https://www.roblox.com/asset-thumbnail/image?assetId=${bossImageId}&width=420&height=420&format=png`;

const door = {
  x: 820,
  y: 470,
  width: 50,
  height: 90,
  open: false,
  requiresKey: true
};

const mainFloorElevator = {
  x: 650,
  y: 390,
  width: 100,
  height: 170,
  kind: 'main-elevator'
};

const gardenDoor = {
  x: 430,
  y: 470,
  width: 50,
  height: 90,
  kind: 'garden-door'
};

const officeDoor = {
  x: 430,
  y: 470,
  width: 50,
  height: 90,
  kind: 'office-door'
};

const storageDoor = {
  x: 430,
  y: 470,
  width: 50,
  height: 90,
  kind: 'storage-door'
};

const cellarStaircase = {
  x: 520,
  y: 430,
  width: 110,
  height: 130,
  kind: 'cellar-staircase'
};

const cellarExit = {
  x: 620,
  y: 430,
  width: 110,
  height: 130,
  kind: 'cellar-exit'
};

const cellarMonster = {
  x: 720,
  y: 510,
  width: 64,
  height: 50,
  direction: -1,
  state: 'patrol',
  timer: 1.6
};

const officeMonster = {
  x: -140,
  y: 450,
  width: 130,
  height: 110,
  speed: 195
};

const vineMonster = {
  x: 410,
  y: 340,
  width: 110,
  height: 150,
  mouthTimer: 1.6,
  mouthOpen: false,
  chaseSpeed: 215
};

const milkshake = {
  x: 406,
  y: 468,
  width: 22,
  height: 30,
  kind: 'milkshake',
  taken: false
};

const fantaJug = {
  x: 480,
  y: 484,
  width: 44,
  height: 54,
  kind: 'fanta-jug',
  taken: false
};

const riftCan = {
  x: 540,
  y: 500,
  width: 34,
  height: 40,
  kind: 'rift-can',
  taken: false
};

const flowJuice = {
  x: 520,
  y: 498,
  width: 30,
  height: 42,
  kind: 'flow-juice',
  taken: false
};

const backpack = {
  x: 420,
  y: 500,
  width: 34,
  height: 38,
  taken: false
};

const teleporter = {
  x: 340,
  y: 470,
  width: 42,
  height: 32,
  kind: 'teleporter',
  taken: false
};

const rift = {
  x: 420,
  y: 380,
  width: 120,
  height: 180,
  kind: 'rift'
};

const thrownRift = {
  x: 420,
  y: 380,
  width: 120,
  height: 180,
  kind: 'thrown-rift'
};

const closet = {
  x: 640,
  y: 440,
  width: 72,
  height: 120,
  kind: 'closet'
};

const rush = {
  x: -100,
  y: 450,
  width: 84,
  height: 110,
  speed: 420
};

let obstacles = [];
let platforms = [];
let platformIgnoreTimer = 0;
const input = new Set();

function startRoom() {
  const wasChaseActive = monsterActive || gardenChaseActive || officeChaseActive;
  stairDescentActive = false;
  encounterFlashTimer = 0;
  encounterShakeTimer = 0;
  thrownRiftActive = false;
  player.x = 80;
  player.y = groundY - player.height;
  player.velocityY = 0;
  player.onGround = true;
  player.sliding = false;
  player.hidden = false;
  player.health = player.maxHealth;
  player.invulnerableTimer = 0;
  updateHealthUi();

  const isMainFloor = currentFloor === 'main';
  const isGardenFloor = currentFloor === 'garden';
  const isOfficeFloor = currentFloor === 'office';
  const isCellarFloor = currentFloor === 'cellar';
  const isSubFloor = isGardenFloor || isOfficeFloor || isCellarFloor;
  bossIsReturn = isMainFloor && currentDoor === bossReturnDoor;
  bossActive = isMainFloor && (currentDoor === bossDoor || bossIsReturn);
  monsterActive = isMainFloor && currentDoor >= monsterStartDoor && currentDoor <= monsterEndDoor;
  const isRewardRoom = isMainFloor && currentDoor === rewardDoor;
  const isRiftRoom = isPermanentRiftActive();
  const isSpecialRoom = isMainFloor && (currentDoor === 1 || monsterActive || isRewardRoom || bossActive || isRiftRoom);
  rareRoomActive = isMainFloor && !isSpecialRoom && Math.random() < rareRoomChance;
  fantaJugActive = isMainFloor && !isSpecialRoom && !rareRoomActive && Math.random() < fantaJugSpawnChance;
  riftCanActive = isMainFloor && !isSpecialRoom && !rareRoomActive && !fantaJugActive && Math.random() < riftCanSpawnChance;
  flowJuiceActive = isMainFloor && !isSpecialRoom && !rareRoomActive && !fantaJugActive && !riftCanActive && Math.random() < flowJuiceSpawnChance;
  closetVisible = isMainFloor && currentDoor !== 1 && !rareRoomActive && !fantaJugActive && currentDoor !== rewardDoor && !bossActive && !isRiftRoom && !mainFloorHasStairs() && !mainFloorElevatorActive();
  rushActive = isMainFloor && currentDoor > rewardDoor && !isSpecialRoom && !rareRoomActive && !fantaJugActive && !mainFloorHasStairs() && !mainFloorElevatorActive() && Math.random() < rushChance;
  rushWarningTimer = rushActive ? 5 : 0;
  if (isMainFloor && !isSpecialRoom && !unlockedDoors.has(currentDoor) && Math.random() < unlockedDoorChance) {
    unlockedDoors.add(currentDoor);
  }
  const isUnlockedDoor = isSubFloor || isRiftRoom || unlockedDoors.has(currentDoor) || rareRoomActive || fantaJugActive;
  roomIsDark = (isCellarFloor || (isMainFloor && currentDoor > rewardDoor
    && currentDoor % 5 === 0
    && currentDoor !== bossDoor
    && currentDoor !== bossReturnDoor
    && currentDoor !== 95
    && !isRiftRoom
    && !rareRoomActive
    && !fantaJugActive));
  monster.x = -80;
  monster.y = mainFloorGroundAt(monster.x + monster.width / 2) - monster.height;
  monster.speed = 135 + (currentDoor - monsterStartDoor) * 6;
  keyFound = isSubFloor || monsterActive || isRewardRoom || bossActive || isUnlockedDoor || rareRoomActive;
  doorOpen = isSubFloor || monsterActive || isUnlockedDoor || rareRoomActive;
  cabinet.searched = isSubFloor || isRewardRoom || bossActive || isUnlockedDoor || rareRoomActive;
  cabinet.keyVisible = false;
  cabinet.x = mainFloorHasStairs() || mainFloorElevatorActive()
    ? 150 + ((currentDoor * 37) % 220)
    : 120 + ((currentDoor * 37) % 480);
  cabinet.y = mainFloorHasStairs()
    ? mainFloorGroundAt(cabinet.x + cabinet.width / 2) - cabinet.height
    : 500;
  if (mainFloorHasStairs()) {
    player.height = 48;
    player.y = mainFloorGroundAt(player.x + player.width / 2) - player.height;
    player.onGround = true;
  }
  closet.x = 620 + ((currentDoor * 29) % 80);
  closet.y = groundY - closet.height;
  rush.x = -100;
  ragebaitCloseCall = false;
  door.x = 820;
  door.open = doorOpen;
  door.requiresKey = !doorOpen;
  rewardChest.claimed = isRewardRoom ? rewardClaimed : false;
  gardenChaseActive = isGardenFloor
    && currentDoor >= gardenChaseStartDoor
    && currentDoor <= gardenGroundChaseEndDoor;
  submarineActive = isGardenFloor
    && currentDoor >= gardenChaseStartDoor
    && currentDoor <= gardenChaseEndDoor;
  mountainChaseActive = isGardenFloor
    && currentDoor >= gardenGroundChaseStartDoor
    && currentDoor <= gardenGroundChaseEndDoor;
  officeChaseActive = isOfficeFloor
    && !officeSideRoomActive
    && currentDoor >= officeChaseStartDoor
    && currentDoor <= officeChaseEndDoor;
  cellarMonsterActive = isCellarFloor && currentDoor >= 3 && currentDoor <= 8;
  cellarMonster.x = 720;
  cellarMonster.direction = -1;
  cellarMonster.state = 'patrol';
  cellarMonster.timer = 1.6;
  const isChaseActive = monsterActive || gardenChaseActive || officeChaseActive;
  if (isChaseActive && !wasChaseActive) activeChaseDamageFree = true;
  officeMonster.x = -140;
  officeMonster.speed = 190 + (currentDoor - officeChaseStartDoor) * 6;
  milkshake.taken = false;
  fantaJug.taken = false;
  riftCan.taken = false;
  flowJuice.taken = false;
  backpack.taken = false;
  teleporter.taken = false;
  backpackActive = isMainFloor && !isSpecialRoom && !fantaJugActive && !hasBackpack && !mainFloorHasStairs() && Math.random() < backpackSpawnChance;
  backpackOnTable = backpackActive && Math.random() < .5;
  backpack.x = backpackOnTable ? 410 : 420;
  backpack.y = backpackOnTable ? 450 : 500;
  teleporterActive = isOfficeFloor && !officeChaseActive && Math.random() < teleporterSpawnChance;
  teleporterOnDesk = teleporterActive && !officeSideRoomActive;
  teleporter.x = officeSideRoomActive ? 350 : 340;
  teleporter.y = officeSideRoomActive ? 452 : 470;

  boss.x = 520;
  boss.height = bossIsReturn ? 140 : 112;
  boss.y = groundY - boss.height;
  boss.health = bossIsReturn ? 4 : 3;
  boss.maxHealth = boss.health;
  boss.speed = bossIsReturn ? 165 : 130;
  boss.phase = 1;
  boss.attacking = false;
  boss.chargeTimer = bossIsReturn ? 1.2 : 1.6;
  boss.invulnerableTimer = 0;
  boss.direction = -1;

  obstacles = [];
  platforms = isMainFloor && currentDoor === bossDoor
    ? [
        { x: 80, y: 500, width: 70 },
        { x: 150, y: 460, width: 70 },
        { x: 220, y: 420, width: 70 },
        { x: 290, y: 380, width: 70 },
        { x: 360, y: 340, width: 300 }
      ]
    : [];

  vineMonsterActive = false;
  if (isOfficeFloor && !officeSideRoomActive && !officeChaseActive && currentDoor % 10 === 0) {
    const shift = (Math.floor(currentDoor / 10) % 4) * 22;
    obstacles.push({ type: 'officeDesk', x: 210 + shift, y: 500, width: 100, height: 60 });
    obstacles.push({ type: 'cableBeam', x: 390 + shift, y: 512, width: 130, height: 22 });
    obstacles.push({ type: 'officeDesk', x: 610 + shift, y: 500, width: 100, height: 60 });
  }

  if (officeChaseActive) {
    const shift = ((currentDoor - officeChaseStartDoor) % 3) * 28;
    const pattern = (currentDoor - officeChaseStartDoor) % 2;
    obstacles.push(pattern === 0
      ? { type: 'officeDesk', x: 220 + shift, y: 500, width: 100, height: 60 }
      : { type: 'cableBeam', x: 220 + shift, y: 512, width: 130, height: 22 });
    obstacles.push(pattern === 0
      ? { type: 'cableBeam', x: 450 + shift, y: 512, width: 130, height: 22 }
      : { type: 'officeDesk', x: 450 + shift, y: 500, width: 100, height: 60 });
    obstacles.push(pattern === 0
      ? { type: 'officeDesk', x: 620 + shift, y: 500, width: 100, height: 60 }
      : { type: 'cableBeam', x: 620 + shift, y: 512, width: 130, height: 22 });
  }

  if (isGardenFloor) {
    const vineChases = [
      { start: 6, end: 10, speed: 150 },
      { start: 16, end: 21, speed: 175 },
      { start: 29, end: 34, speed: 200 },
      { start: 40, end: 46, speed: 225 }
    ];
    const activeChase = vineChases.find(chase => !gardenChaseActive
      && currentDoor >= chase.start
      && currentDoor <= chase.end);
    vineMonsterActive = gardenChaseActive || Boolean(activeChase);
    vineMonster.x = gardenChaseActive ? -140 : 390 + ((currentDoor * 31) % 130);
    vineMonster.y = gardenChaseActive ? 410 : 340;
    vineMonster.mouthTimer = 1.6;
    vineMonster.mouthOpen = gardenChaseActive;
    vineMonster.chaseSpeed = mountainChaseActive
      ? 220 + (currentDoor - gardenGroundChaseStartDoor) * 12
      : 205 + (currentDoor - gardenChaseStartDoor) * 15;

    if (gardenChaseActive) {
      if (mountainChaseActive) {
        const shift = (currentDoor - gardenGroundChaseStartDoor) * 18;
        obstacles.push({ type: 'rock', x: 210 + shift, y: 520, width: 44, height: 40 });
        obstacles.push({ type: 'fallenLog', x: 390 + shift, y: 510, width: 150, height: 24 });
        obstacles.push({ type: 'rock', x: 600 + shift, y: 520, width: 44, height: 40 });
        obstacles.push({ type: 'fallenLog', x: 750, y: 510, width: 150, height: 24 });
      } else {
      const pattern = currentDoor - gardenChaseStartDoor;
        obstacles.push(pattern % 2 === 0
          ? { type: 'vineStalk', x: 210, y: 520, width: 36, height: 40 }
          : { type: 'vineBeam', x: 190, y: 512, width: 120, height: 22 });
        obstacles.push(pattern % 2 === 0
          ? { type: 'vineBeam', x: 370, y: 512, width: 120, height: 22 }
          : { type: 'vineStalk', x: 390, y: 520, width: 36, height: 40 });
        obstacles.push(pattern % 2 === 0
          ? { type: 'vineStalk', x: 550, y: 520, width: 36, height: 40 }
          : { type: 'vineBeam', x: 530, y: 512, width: 120, height: 22 });
        obstacles.push(pattern % 2 === 0
          ? { type: 'vineBeam', x: 700, y: 512, width: 120, height: 22 }
          : { type: 'vineStalk', x: 720, y: 520, width: 36, height: 40 });
      }
    }

    if (activeChase) {
      const shift = (currentDoor - activeChase.start) * 16;
      const pattern = currentDoor % 2;
      obstacles.push(pattern === 0
        ? { type: 'vineStalk', x: 230 + shift, y: 520, width: 36, height: 40 }
        : { type: 'vineBeam', x: 230 + shift, y: 512, width: 120, height: 22 });
      obstacles.push(pattern === 0
        ? { type: 'vineBeam', x: 450 + shift, y: 512, width: 120, height: 22 }
        : { type: 'vineStalk', x: 450 + shift, y: 520, width: 36, height: 40 });
      obstacles.push(pattern === 0
        ? { type: 'vineStalk', x: 670 + shift, y: 520, width: 36, height: 40 }
        : { type: 'vineBeam', x: 670 + shift, y: 512, width: 120, height: 22 });
    }
  }

  if (monsterActive) {
    const shift = (currentDoor - monsterStartDoor) * 25;
    const pattern = (currentDoor - monsterStartDoor) % 2;
    const chaseObstacles = [pattern === 0
      ? { type: 'crate', x: 220 + shift, y: 520, width: 40, height: 40 }
      : { type: 'beam', x: 220 + shift, y: 512, width: 120, height: 22 },
    pattern === 0
      ? { type: 'beam', x: 430 + shift, y: 512, width: 120, height: 22 }
      : { type: 'crate', x: 430 + shift, y: 520, width: 40, height: 40 },
    pattern === 0
      ? { type: 'crate', x: 650 + shift, y: 520, width: 40, height: 40 }
      : { type: 'beam', x: 650 + shift, y: 512, width: 120, height: 22 }];
    for (const obstacle of chaseObstacles) {
      if (mainFloorHasStairs()) {
        const obstacleGround = mainFloorGroundAt(obstacle.x + obstacle.width / 2);
        obstacle.y = obstacle.type === 'beam' ? obstacleGround - 48 : obstacleGround - obstacle.height;
      }
      obstacles.push(obstacle);
    }
  }

  if (isCellarFloor) {
    const pattern = currentDoor % 3;
    if (pattern === 1) {
      obstacles.push({ type: 'crate', x: 260, y: 520, width: 40, height: 40 });
      obstacles.push({ type: 'beam', x: 480, y: 512, width: 120, height: 22 });
    } else if (pattern === 2) {
      obstacles.push({ type: 'beam', x: 320, y: 512, width: 120, height: 22 });
      obstacles.push({ type: 'crate', x: 580, y: 520, width: 40, height: 40 });
    } else {
      obstacles.push({ type: 'crate', x: 220, y: 520, width: 40, height: 40 });
      obstacles.push({ type: 'crate', x: 620, y: 520, width: 40, height: 40 });
    }
  }

  if (bossIsReturn) {
    obstacles.push(
      { type: 'spike', x: 170, y: 530, width: 30, height: 30, originX: 170, moveRange: 70, moveSpeed: 120, moveDirection: 1 },
      { type: 'beam', x: 300, y: 512, width: 120, height: 22 },
      { type: 'spike', x: 450, y: 530, width: 30, height: 30, originX: 450, moveRange: 80, moveSpeed: 140, moveDirection: -1 },
      { type: 'beam', x: 580, y: 512, width: 120, height: 22 },
      { type: 'spike', x: 720, y: 530, width: 30, height: 30, originX: 720, moveRange: 90, moveSpeed: 160, moveDirection: 1 }
    );
  }

  updateHud();

  if (isOfficeFloor) {
    showMessage(officeSideRoomActive
      ? `STORAGE SIDEROOM · Office Door ${currentDoor}/${totalOfficeDoors}`
      : officeChaseActive
      ? `OFFICE CHASE · the printing machine is hunting you! Door ${currentDoor}/${totalOfficeDoors}`
      : teleporterActive && !teleporter.taken
      ? `RARE TELEPORTER · grab it to warp to Door ${totalOfficeDoors}!`
      : currentDoor % 10 === 0
      ? `THE OFFICE · ruined workstations! Door ${currentDoor}/${totalOfficeDoors}`
      : `THE OFFICE · Door ${currentDoor}/${totalOfficeDoors}`);
  }

  if (currentFloor === 'garden') {
    showMessage(vineMonsterActive
      ? `THE GARDEN Â· giant vine flower! Door ${currentDoor}/${totalGardenDoors}`
      : `THE GARDEN Â· Door ${currentDoor}/${totalGardenDoors}`);
  }

  if (isCellarFloor) {
    showMessage(cellarMonsterActive
      ? `THE CELLAR · Gloom Crawler ahead! Jump when it charges.`
      : `THE CELLAR · Dark room ${currentDoor}/${totalCellarDoors}`);
  }

  if (isMainFloor && monsterActive) {
    showMessage(mainFloorHasStairs()
      ? 'Monster chase in the stairwell! Jump or slide past obstacles and keep moving right.'
      : 'Monster chase! Jump over crates, slide under beams, and keep moving right.');
  }

  if (isMainFloor && isRewardRoom && !rewardClaimed) {
    showMessage('You escaped the monster! Open your reward chest.');
    awardBadge('chase-survivor');
  }

  if (isMainFloor && bossActive) {
    showMessage(bossIsReturn
      ? 'The Door 25 monster returns! Stomp it 4 times.'
      : 'Boss fight! Climb the roof stairs, then S-drop on its head 3 times.');
  }

  if (isMainFloor && rareRoomActive) {
    awardBadge('restaurant-finder');
    showMessage('Rare Restaurant Room! Grab the milkshake.');
  } else if (isMainFloor && fantaJugActive) {
    showMessage('Rare basement! Grab the yellow Fanta Jug with E.');
  } else if (isMainFloor && riftCanActive) {
    showMessage('Rift-in-a-Can spotted! Grab it with E, then press Q to throw it.');
  } else if (isMainFloor && flowJuiceActive) {
    showMessage('Flow Juice spotted! Grab it with E, then press Q for low gravity.');
  } else if (isMainFloor && mainFloorElevatorActive()) {
    showMessage(`Elevator found! Press E nearby to ride down to Door ${mainFloorElevatorDestination()}.`);
  } else if (isMainFloor && isUnlockedDoor && !isRiftRoom) {
    showMessage('This door is already unlocked. Walk right.');
  }

  if (isRiftRoom) {
    showMessage(riftItem
      ? `The blue RIFT is keeping your ${riftItem.name} safe. Press E to take it back.`
      : 'You found the blue RIFT! Select an item and press E to store it.');
  }

  if (rushActive) showMessage('Rocket is coming in 5 seconds! Hide in the closet!');

  if (currentFloor === 'garden' && currentDoor === gardenChaseStartDoor && !cutsceneSeen) {
    cutsceneSeen = true;
    cutsceneActive = true;
    cutsceneTimer = 0;
    cutsceneStep = 0;
    paused = true;
    gardenCutscene.classList.add('active');
    cutsceneContinue.classList.add('hidden');
    cutsceneCaption.textContent = 'You walk past the old tree...';
  }
}

function updateHud() {
  if (currentFloor === 'cellar') {
    doorNumber.textContent = `THE CELLAR · ${currentDoor}/${totalCellarDoors}`;
    modeText.textContent = currentDoor === totalCellarDoors
      ? 'Cellar exit · climb the stairs'
      : cellarMonsterActive
      ? 'Gloom Crawler · jump over its charge'
      : 'Dark cellar · use the flashlight';
    return;
  }

  if (currentFloor === 'office') {
    doorNumber.textContent = `THE OFFICE · ${currentDoor}/${totalOfficeDoors}`;
    modeText.textContent = officeSideRoomActive
      ? 'Storage sideroom · bookshelves, boxes, and pencils'
      : officeChaseActive
      ? `Office chase · ${officeChaseEndDoor - currentDoor + 1} doors left`
      : currentDoor === totalOfficeDoors
      ? 'Office exit · walk right'
      : currentDoor % 10 === 0
        ? 'Ruined workstation · jump desks and slide under cables'
        : 'Destroyed office · walk right';
    return;
  }

  if (currentFloor === 'garden') {
    doorNumber.textContent = `THE GARDEN Â· ${currentDoor}/${totalGardenDoors}`;
    modeText.textContent = mountainChaseActive
      ? `Ground chase Â· ${gardenGroundChaseEndDoor - currentDoor + 1} doors left`
      : gardenChaseActive
      ? `Submarine chase Â· ${gardenChaseEndDoor - currentDoor + 1} doors left`
      : vineMonsterActive
      ? `Vine flower Â· ${currentDoor}/${totalGardenDoors}`
      : currentDoor === totalGardenDoors
        ? 'Grand garden exit Â· walk right'
        : 'Garden floor Â· optional route';
    return;
  }

  doorNumber.textContent = `Door ${currentDoor} / ${totalDoors}`;
  if (rushActive) {
    modeText.textContent = rushWarningTimer > 0
      ? `Rocket incoming Â· ${Math.ceil(rushWarningTimer)}s`
      : 'Rocket incoming Â· hide!';
  } else if (monsterActive) {
    modeText.textContent = `Monster chase · ${monsterEndDoor - currentDoor + 1} doors left`;
  } else if (bossActive) {
    modeText.textContent = bossIsReturn
      ? `Monster returns · ${boss.health} hits left`
      : `Boss fight · ${boss.health} hits left`;
  } else if (currentDoor === rewardDoor) {
    modeText.textContent = rewardClaimed ? 'Reward room · Speed Boots active' : 'Reward room · open the chest';
  } else if (isRiftActive()) {
    modeText.textContent = riftItem ? `RIFT: ${riftItem.name}` : 'RIFT: empty';
  } else if (roomIsDark) {
    modeText.textContent = 'Dark room · flashlight on';
  } else if (rareRoomActive) {
    modeText.textContent = 'Rare Restaurant Room · 1.5% find';
  } else if (fantaJugActive) {
    modeText.textContent = 'Basement - Fanta Jug';
  } else if (riftCanActive) {
    modeText.textContent = 'Rare item - Rift-in-a-Can';
  } else if (flowJuiceActive) {
    modeText.textContent = 'Rare item - Flow Juice';
  } else if (mainFloorElevatorActive()) {
    modeText.textContent = `${currentRoomTheme().name} - elevator to Door ${mainFloorElevatorDestination()}`;
  } else if (mainFloorHasStairs()) {
    modeText.textContent = 'Grand Stairwell - steps to the exit';
  } else if (currentDoor === 1) {
    modeText.textContent = 'Calm room · find the key';
  } else {
    const roomName = currentRoomTheme().name || 'Calm room';
    modeText.textContent = unlockedDoors.has(currentDoor)
      ? `${roomName} - door already unlocked`
      : roomName;
  }
}

function showMessage(text) {
  messageElement.textContent = text;
  messageElement.style.opacity = 1;
  messageTimer = 2;
}

function rect(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function playerBox(x = player.x, y = player.y) {
  return { x, y, width: player.width, height: player.sliding ? 26 : player.height };
}

function landingPlatform(previousBottom, nextBottom, box) {
  if (platformIgnoreTimer > 0) return null;
  for (const platform of platforms) {
    const overlapsHorizontally = box.x + box.width > platform.x && box.x < platform.x + platform.width;
    if (overlapsHorizontally && previousBottom <= platform.y + 2 && nextBottom >= platform.y) {
      return platform;
    }
  }
  return null;
}

function collides(box) {
  if (box.x < 0 || box.x + box.width > canvas.width) return true;
  if (box.y + box.height > groundY) return true;
  for (const obstacle of obstacles) {
    if ((obstacle.type === 'beam'
      || obstacle.type === 'vineBeam'
      || obstacle.type === 'fallenLog'
      || obstacle.type === 'cableBeam') && player.sliding) continue;
    if (rect(box, obstacle)) return true;
  }
  return false;
}

function updateHealthUi() {
  const health = Math.max(0, Math.round(player.health));
  healthNumber.textContent = `${health}/${player.maxHealth} HP`;
  healthFill.style.width = `${(health / player.maxHealth) * 100}%`;
}

function damagePlayer(amount, text) {
  if (player.invulnerableTimer > 0) return;

  activeChaseDamageFree = false;
  currentFloorDamageFree = false;
  player.health -= amount;
  player.invulnerableTimer = 1;
  encounterFlashTimer = .22;
  encounterFlashColor = '255,77,94';
  encounterShakeTimer = .22;

  if (player.health <= 0) {
    player.health = 0;
    updateHealthUi();
    showMessage(`${text} You collapsed! Try this room again.`);
    startRoom();
    return;
  }

  updateHealthUi();
  showMessage(`${text} ${Math.round(player.health)} HP left.`);
}

function updateTarget() {
  if (player.hidden) {
    currentTarget = closet;
    promptElement.textContent = 'E: Leave closet';
    return;
  }

  currentTarget = null;
  let closestDistance = 75;

  const targets = [];
  if (bossActive) {
    targets.push(boss);
  } else if (currentFloor === 'main' && currentDoor === rewardDoor && !rewardChest.claimed) {
    targets.push(rewardChest);
  } else {
    if (currentFloor === 'main' && currentDoor === 65) targets.push(gardenDoor);
    if (currentFloor === 'main' && currentDoor === 95) targets.push(officeDoor);
    if (isRiftActive()) targets.push(getActiveRift());
    if (currentFloor === 'main' && currentDoor === cellarEntranceDoor) targets.push(cellarStaircase);
    if (currentFloor === 'cellar' && currentDoor === totalCellarDoors) targets.push(cellarExit);
    if (currentFloor === 'office' && !officeSideRoomActive && currentDoor % 15 === 0) targets.push(storageDoor);
    if (rareRoomActive && !milkshake.taken) targets.push(milkshake);
    if (fantaJugActive && !fantaJug.taken) targets.push(fantaJug);
    if (riftCanActive && !riftCan.taken) targets.push(riftCan);
    if (flowJuiceActive && !flowJuice.taken) targets.push(flowJuice);
    if (mainFloorElevatorActive()) targets.push(mainFloorElevator);
    if (backpackActive && !backpack.taken) targets.push(backpack);
    if (teleporterActive && !teleporter.taken) targets.push(teleporter);
    if (closetVisible) targets.push(closet);
    if (!cabinet.searched) targets.push(cabinet);
    if (cabinet.keyVisible) targets.push({ ...cabinet, y: cabinet.y + 4, height: 18, kind: 'key' });
  }
  if (!doorOpen && !mainFloorElevatorActive()) targets.push(door);

  for (const target of targets) {
    const centerX = target.x + target.width / 2;
    const centerY = target.y + target.height / 2;
    const distance = Math.hypot(centerX - (player.x + player.width / 2), centerY - (player.y + player.height / 2));
    if (distance < closestDistance) {
      closestDistance = distance;
      currentTarget = target;
    }
  }

  if (!currentTarget) {
    promptElement.textContent = monsterActive
      ? 'Run right!'
      : bossActive && !bossIsReturn
        ? 'Climb the stairs, then S-drop on the boss!'
        : mainFloorElevatorActive()
          ? 'Ride the elevator to continue!'
          : '';
    return;
  }

  if (currentTarget === boss) {
    promptElement.textContent = bossIsReturn
      ? 'Jump on the boss!'
      : 'Climb the stairs, then S-drop on the boss!';
  } else if (currentTarget === rewardChest) {
    promptElement.textContent = 'E: Open reward chest';
  } else if (currentTarget === milkshake) {
    promptElement.textContent = 'E: Take milkshake';
  } else if (currentTarget === fantaJug) {
    promptElement.textContent = 'E: Take Fanta Jug';
  } else if (currentTarget === riftCan) {
    promptElement.textContent = 'E: Take Rift-in-a-Can';
  } else if (currentTarget === flowJuice) {
    promptElement.textContent = 'E: Take Flow Juice';
  } else if (currentTarget === mainFloorElevator) {
    promptElement.textContent = `E: Ride elevator to Door ${mainFloorElevatorDestination()}`;
  } else if (currentTarget === backpack) {
    promptElement.textContent = 'E: Take backpack';
  } else if (currentTarget === teleporter) {
    promptElement.textContent = 'E: Take Teleporter';
  } else if (currentTarget === closet) {
    promptElement.textContent = 'E: Hide in closet';
  } else if (currentTarget === gardenDoor) {
    promptElement.textContent = 'E: Enter THE GARDEN';
  } else if (currentTarget === officeDoor) {
    promptElement.textContent = 'E: Enter THE OFFICE';
  } else if (currentTarget === rift || currentTarget === thrownRift) {
    const selectedItem = hotbarSlots[selectedHotbarSlot];
    promptElement.textContent = riftItem
      ? `E: Take ${riftItem.name}`
      : selectedItem
      ? `E: Store ${selectedItem.name}`
      : 'Select a hotbar item for the RIFT';
  } else if (currentTarget === cellarStaircase) {
    promptElement.textContent = 'E: Climb down to THE CELLAR';
  } else if (currentTarget === cellarExit) {
    promptElement.textContent = 'E: Climb up to the Main Floor';
  } else if (currentTarget === storageDoor) {
    promptElement.textContent = 'E: Enter storage sideroom';
  } else if (currentTarget === cabinet) {
    promptElement.textContent = 'E: Search drawer';
  } else if (currentTarget.kind === 'key') {
    promptElement.textContent = 'E: Take key';
  } else {
    promptElement.textContent = keyFound ? 'E: Open door' : 'Find the key first';
  }
}

function startMainFloorElevatorRide() {
  const destination = mainFloorElevatorDestination();
  if (!destination) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    currentDoor = destination;
    startRoom();
    showMessage(`Elevator arrived at Door ${destination}: ${currentRoomTheme().name}.`);
    return;
  }

  elevatorRideActive = true;
  elevatorRideTimer = 0;
  elevatorRideOrigin = currentDoor;
  elevatorRideDestination = destination;
  elevatorRideArrived = false;
  paused = true;
  input.clear();
  player.moving = false;
  player.sliding = false;
  currentTarget = null;
  promptElement.textContent = '';
  showMessage(`Elevator descending from Door ${elevatorRideOrigin} to Door ${destination}.`);
}

function updateMainFloorElevatorRide(delta) {
  elevatorRideTimer += delta;

  if (!elevatorRideArrived && elevatorRideTimer >= 1.55) {
    currentDoor = elevatorRideDestination;
    startRoom();
    elevatorRideArrived = true;
    paused = true;
  }

  if (elevatorRideTimer >= 2.25) {
    elevatorRideActive = false;
    paused = false;
    player.moving = false;
    currentTarget = null;
    updateHud();
    showMessage(`Elevator arrived at Door ${currentDoor}: ${currentRoomTheme().name}.`);
  }
}

function interact() {
  if (!currentTarget || paused || won) return;

  if (player.hidden) {
    player.hidden = false;
    player.x = closet.x - 40;
    player.y = groundY - player.height;
    player.velocityY = 0;
    player.onGround = true;
    showMessage('You left the closet.');
    return;
  }

  if (currentTarget === closet) {
    player.hidden = true;
    player.x = closet.x + 12;
    player.y = closet.y + closet.height - player.height;
    player.velocityY = 0;
    player.onGround = true;
    player.sliding = false;
    funStats.hides++;
    if (funStats.hides >= 5) awardBadge('closet-camper');
    showMessage('Hidden! Wait for the monster to pass.');
    return;
  }

  if (currentTarget === gardenDoor) {
    currentFloor = 'garden';
    currentDoor = 1;
    currentFloorDamageFree = true;
    awardBadge('outside-person');
    startRoom();
    showMessage('Entering THE GARDEN! 50 doors ahead.');
    return;
  }

  if (currentTarget === cellarStaircase) {
    currentFloor = 'cellar';
    currentDoor = 1;
    currentFloorDamageFree = true;
    awardBadge('cellar-explorer');
    startRoom();
    showMessage('Entering THE CELLAR! The stairs grow cold and dark.');
    return;
  }

  if (currentTarget === cellarExit) {
    currentFloor = 'main';
    currentDoor = cellarEntranceDoor;
    currentFloorDamageFree = true;
    awardBadge('cellar-clear');
    startRoom();
    showMessage('You climbed back to the Main Floor.');
    return;
  }

  if (currentTarget === officeDoor) {
    currentFloor = 'office';
    currentDoor = 1;
    currentFloorDamageFree = true;
    awardBadge('office-worker');
    startRoom();
    showMessage('Entering THE OFFICE! 150 ruined workstations ahead.');
    return;
  }

  if (currentTarget === rift || currentTarget === thrownRift) {
    useRift();
    return;
  }

  if (currentTarget === storageDoor) {
    officeSideRoomActive = true;
    officeSideRoomReturnDoor = currentDoor;
    funStats.storageRooms++;
    if (funStats.storageRooms >= 3) awardBadge('paper-chaser');
    awardBadge('storage-explorer');
    startRoom();
    showMessage('Storage sideroom! Walk right to return.');
    return;
  }

  if (currentTarget === mainFloorElevator) {
    startMainFloorElevatorRide();
    return;
  }

  if (currentTarget === cabinet) {
    cabinet.searched = true;
    cabinet.keyVisible = true;
    showMessage('You opened the drawer and found a key!');
    return;
  }

  if (currentTarget === milkshake) {
    milkshake.taken = true;
    addItemToHotbar('milkshake', 'Milkshake');
    showMessage('Milkshake collected!');
    return;
  }

  if (currentTarget === fantaJug) {
    if (!addItemToHotbar('fanta-jug', 'Fanta Jug')) return;
    fantaJug.taken = true;
    awardBadge('fanta-jug-finder');
    showMessage('Rare yellow Fanta Jug collected! Select it and press Q.');
    return;
  }

  if (currentTarget === riftCan) {
    if (!addItemToHotbar('rift-can', 'Rift-in-a-Can')) return;
    riftCan.taken = true;
    awardBadge('rift-can-finder');
    showMessage('Rift-in-a-Can collected! Select it and press Q to throw it.');
    return;
  }

  if (currentTarget === flowJuice) {
    if (!addItemToHotbar('flow-juice', 'Flow Juice')) return;
    flowJuice.taken = true;
    awardBadge('flow-juice-finder');
    showMessage('Flow Juice collected! Select it and press Q for low gravity.');
    return;
  }

  if (currentTarget === backpack) {
    backpack.taken = true;
    hasBackpack = true;
    addItemToHotbar('backpack', 'Rare Backpack');
    updateBackpackUi();
    showMessage('Rare Backpack collected!');
    return;
  }

  if (currentTarget === teleporter) {
    if (!addItemToHotbar('teleporter', 'Teleporter')) return;
    teleporter.taken = true;
    awardBadge('teleporter-finder');
    showMessage('Rare Teleporter collected! Select it and press Q.');
    return;
  }

  if (currentTarget === rewardChest) {
    rewardChest.claimed = true;
    rewardClaimed = true;
    hasFlashlight = true;
    player.speed = 285;
    player.jumpSpeed = 560;
    doorOpen = true;
    door.open = true;
    updateHud();
    awardBadge('speed-boots');
    showMessage('Reward: Speed Boots! You are faster now.');
    return;
  }

  if (currentTarget.kind === 'key') {
    cabinet.keyVisible = false;
    keyFound = true;
    if (currentDoor === 1) awardBadge('first-key');
    showMessage('Key collected. Go to the door.');
    return;
  }

  if (currentTarget === door && keyFound) {
    doorOpen = true;
    door.open = true;
    showMessage('Door opened. Walk right.');
  }
}

function nextDoor() {
  if (currentFloor === 'cellar') {
    if (currentDoor >= totalCellarDoors) {
      if (currentFloorDamageFree) awardBadge('no-hit-wonder');
      currentFloor = 'main';
      currentDoor = cellarEntranceDoor;
      currentFloorDamageFree = true;
      awardBadge('cellar-clear');
      startRoom();
      showMessage('You escaped THE CELLAR! Back at Main Door 40.');
      return;
    }

    currentDoor++;
    startRoom();
    return;
  }

  if (currentFloor === 'office') {
    if (officeSideRoomActive) {
      officeSideRoomActive = false;
      currentDoor = officeSideRoomReturnDoor;
      startRoom();
      showMessage('Back in THE OFFICE at the same door.');
      return;
    }

    if (currentDoor >= totalOfficeDoors) {
      if (currentFloorDamageFree) awardBadge('no-hit-wonder');
      currentFloor = 'main';
      currentDoor = 96;
      currentFloorDamageFree = true;
      awardBadge('overtime-champion');
      startRoom();
      showMessage('You finished THE OFFICE! Back at Main Door 96.');
      return;
    }

    const finishedOfficeChase = currentDoor === officeChaseEndDoor;
    const finishedOfficeChaseNoDamage = finishedOfficeChase && activeChaseDamageFree;
    currentDoor++;
    startRoom();
    if (finishedOfficeChase) awardBadge('office-chase-survivor');
    if (finishedOfficeChaseNoDamage) awardBadge('office-olympian');
    return;
  }

  if (currentFloor === 'garden') {
    if (currentDoor >= totalGardenDoors) {
      if (currentFloorDamageFree) awardBadge('no-hit-wonder');
      currentFloor = 'main';
      currentDoor = 66;
      currentFloorDamageFree = true;
      awardBadge('touched-grass');
      startRoom();
      showMessage('You finished THE GARDEN! Back at Door 66.');
      return;
    }

    const finishedSubmarineChase = currentDoor === gardenChaseEndDoor;
    const finishedGroundChase = currentDoor === gardenGroundChaseEndDoor;
    const finishedSubmarineChaseNoDamage = finishedSubmarineChase && activeChaseDamageFree;
    const finishedGroundChaseNoDamage = finishedGroundChase && activeChaseDamageFree;
    currentDoor++;
    startRoom();
    if (finishedSubmarineChase) awardBadge('submarine-pilot');
    if (finishedGroundChase) awardBadge('mountain-runner');
    if (finishedSubmarineChaseNoDamage) awardBadge('submarine-surfer');
    if (finishedGroundChaseNoDamage) awardBadge('mountain-goat');
    return;
  }

  if (currentDoor >= totalDoors) {
    won = true;
    paused = true;
    if (currentFloorDamageFree) awardBadge('no-hit-wonder');
    awardBadge('all-doors');
    gameElement.classList.add('hidden');
    winScreen.classList.remove('hidden');
    return;
  }

  currentDoor++;
  startRoom();
}

function movePlayer(delta) {
  player.invulnerableTimer = Math.max(0, player.invulnerableTimer - delta);
  if (player.hidden) return;
  if (stairDescentActive && (!mainFloorHasStairs() || player.x + player.width / 2 >= 805)) {
    stairDescentActive = false;
  }

  const left = input.has('KeyA') || input.has('ArrowLeft');
  const right = input.has('KeyD') || input.has('ArrowRight') || stairDescentActive;
  const slide = input.has('KeyS') || input.has('ArrowDown');
  const jump = input.has('KeyW') || input.has('Space') || input.has('ArrowUp');

  const wasSliding = player.sliding;
  if (slide && player.onPlatform) {
    platformIgnoreTimer = .25;
    player.onPlatform = false;
    player.sliding = false;
  } else {
    player.sliding = slide && player.onGround;
  }

  const wasHeight = player.height;
  player.height = player.sliding ? 26 : 48;
  if (wasSliding !== player.sliding) player.y += wasHeight - player.height;
  if (!wasSliding && player.sliding) {
    funStats.slides++;
    if (funStats.slides >= 25) awardBadge('slide-legend');
  }

  const direction = right ? 1 : left ? -1 : 0;
  if (direction !== 0) player.facing = direction;
  player.moving = direction !== 0;
  player.animationTime += delta;
  const speed = player.sliding ? 145 : player.speed * (fantaRushTimer > 0 ? fantaRushSpeedMultiplier : 1);
  const nextX = player.x + direction * speed * delta;
  if (!collides(playerBox(nextX, player.y))) player.x = nextX;

  if (mainFloorHasStairs() && player.onGround) {
    player.y = mainFloorGroundAt(player.x + player.width / 2) - player.height;
    player.velocityY = 0;
  }

  if (jump && player.onGround && !player.sliding) {
    player.velocityY = -player.jumpSpeed;
    player.onGround = false;
    funStats.jumps++;
    if (funStats.jumps >= 50) awardBadge('jump-machine');
  }

  player.velocityY += 1300 * (flowJuiceTimer > 0 ? flowJuiceGravityMultiplier : 1) * delta;
  platformIgnoreTimer = Math.max(0, platformIgnoreTimer - delta);
  const previousBottom = player.y + player.height;
  const nextY = player.y + player.velocityY * delta;
  const nextBottom = nextY + player.height;
  const platform = player.velocityY >= 0
    ? landingPlatform(previousBottom, nextBottom, playerBox(player.x, nextY))
    : null;
  const stairGround = mainFloorGroundAt(player.x + player.width / 2);

  if (platform) {
    player.y = platform.y - player.height;
    player.velocityY = 0;
    player.onGround = true;
    player.onPlatform = true;
  } else if (mainFloorHasStairs() && player.velocityY >= 0 && nextBottom >= stairGround) {
    player.y = stairGround - player.height;
    player.velocityY = 0;
    player.onGround = true;
    player.onPlatform = false;
  } else if (!collides(playerBox(player.x, nextY))) {
    player.y = nextY;
    player.onGround = false;
    player.onPlatform = false;
  } else {
    if (player.velocityY > 0) player.onGround = true;
    player.velocityY = 0;
    player.onPlatform = false;
    player.y = Math.min(player.y, groundY - player.height);
  }

  if (doorOpen && !mainFloorElevatorActive() && player.x + player.width > door.x + 20) nextDoor();
}

function updateMonster(delta) {
  if (!monsterActive) return;
  monster.x += monster.speed * delta;
  monster.y = mainFloorGroundAt(monster.x + monster.width / 2) - monster.height;

  if (!player.hidden && rect(playerBox(), monster)) {
    damagePlayer(20, 'The monster hit you!');
  }
}

function updateVineMonster(delta) {
  if (!vineMonsterActive) return;

  if (gardenChaseActive) {
    modeText.textContent = mountainChaseActive
      ? `Ground chase Â· ${gardenGroundChaseEndDoor - currentDoor + 1} doors left`
      : `Submarine chase Â· ${gardenChaseEndDoor - currentDoor + 1} doors left`;
    vineMonster.x += vineMonster.chaseSpeed * delta;
    if (rect(playerBox(), vineMonster)) {
      damagePlayer(20, mountainChaseActive
        ? 'The tree monster caught you!'
        : 'The vine flower caught the submarine!');
    }
    return;
  }

  modeText.textContent = vineMonster.mouthOpen
    ? 'Vine mouth open - stand still!'
    : 'Vine mouth closed - run!';

  vineMonster.mouthTimer -= delta;
  if (vineMonster.mouthTimer <= 0) {
    vineMonster.mouthOpen = !vineMonster.mouthOpen;
    vineMonster.mouthTimer = vineMonster.mouthOpen ? 1.2 : 1.6;
    if (vineMonster.mouthOpen) showMessage('Vine mouth open! Stand still!');
  }

  const playerIsStill = !player.moving && player.onGround && !player.sliding;
  if (vineMonster.mouthOpen && !playerIsStill) {
    damagePlayer(18, 'The giant vine flower saw you move!');
  }
}

function updateOfficeMonster(delta) {
  if (!officeChaseActive) return;

  officeMonster.x += officeMonster.speed * delta;
  if (rect(playerBox(), officeMonster)) {
    damagePlayer(20, 'The printing machine caught you!');
  }
}

function updateCellarMonster(delta) {
  if (!cellarMonsterActive) return;

  const monster = cellarMonster;
  monster.timer -= delta;

  if (monster.state === 'patrol') {
    monster.x += monster.direction * 65 * delta;
    if (monster.x <= 140 || monster.x >= 760) {
      monster.x = Math.max(140, Math.min(760, monster.x));
      monster.direction *= -1;
    }
    if (monster.timer <= 0) {
      monster.state = 'warning';
      monster.timer = .65;
      monster.direction = player.x + player.width / 2 < monster.x + monster.width / 2 ? -1 : 1;
      showMessage('Gloom Crawler is about to charge! Jump!');
    }
  } else if (monster.state === 'warning') {
    if (monster.timer <= 0) {
      monster.state = 'charge';
      monster.timer = .85;
    }
  } else {
    monster.x += monster.direction * 310 * delta;
    if (monster.timer <= 0 || monster.x <= 100 || monster.x >= 800) {
      monster.x = Math.max(100, Math.min(800, monster.x));
      monster.state = 'patrol';
      monster.timer = 1.8;
    }
  }

  if (!player.hidden && rect(playerBox(), monster)) {
    damagePlayer(15, 'The Gloom Crawler hit you! Jump over its charge!');
  }
}

function updateRush(delta) {
  if (!rushActive) return;

  if (rushWarningTimer > 0) {
    updateHud();
    rushWarningTimer -= delta;
    if (rushWarningTimer <= 0) {
      updateHud();
      showMessage('Rocket is here!');
    }
    return;
  }

  rush.x += rush.speed * delta;
  if (player.hidden && rect(playerBox(), rush)) {
    ragebaitCloseCall = true;
  }

  if (!player.hidden && rect(playerBox(), rush)) {
    damagePlayer(25, 'Rocket hit you!');
  }

  if (rush.x > canvas.width + 120) {
    rushActive = false;
    awardBadge('rocket-survivor');
    if (ragebaitCloseCall && player.hidden) {
      awardBadge('maximum-ragebaiter');
    }
    updateHud();
    showMessage(player.hidden ? 'Rocket passed. You are safe!' : 'Rocket passed!');
  }
}

function updateBoss(delta) {
  if (!bossActive) return;

  boss.invulnerableTimer = Math.max(0, boss.invulnerableTimer - delta);
  boss.chargeTimer -= delta;
  if (boss.chargeTimer <= 0) {
    boss.attacking = !boss.attacking;
    boss.chargeTimer = boss.attacking
      ? (bossIsReturn ? .24 : .32)
      : bossIsReturn
        ? (boss.phase === 2 ? .75 : 1)
        : (boss.phase === 2 ? 1.05 : 1.35);
  }

  const targetX = player.x + player.width / 2;
  const bossCenterX = boss.x + boss.width / 2;
  const direction = Math.sign(targetX - bossCenterX) || boss.direction;
  boss.direction = direction;
  const phaseSpeed = boss.phase === 2 ? 1.18 : 1;
  const speed = (boss.attacking
    ? (bossIsReturn ? 330 : 275)
    : boss.speed) * phaseSpeed;
  boss.x += direction * speed * delta;
  boss.x = Math.max(40, Math.min(canvas.width - boss.width - 40, boss.x));

  if (!rect(playerBox(), boss)) return;

  if (boss.invulnerableTimer > 0) return;

  const stomp = player.velocityY > 0 && player.y + player.height < boss.y + 56;
  if (stomp) {
    funStats.stomps++;
    saveBossStomps();
    if (funStats.stomps >= 10) awardBadge('boss-bouncer');
    boss.health--;
    boss.invulnerableTimer = bossIsReturn ? .55 : .7;
    player.velocityY = -430;
    encounterFlashTimer = .12;
    encounterFlashColor = '255,216,77';
    encounterShakeTimer = .16;
    const enteredPhaseTwo = boss.phase === 1 && boss.health > 0 && boss.health <= boss.maxHealth / 2;
    if (enteredPhaseTwo) boss.phase = 2;
    if (boss.health <= 0) {
      bossActive = false;
      doorOpen = true;
      door.open = true;
      updateHud();
      awardBadge(bossIsReturn ? 'monster-slayer' : 'demon-slayer');
      showMessage('Boss defeated! The door is open.');
    } else {
      updateHud();
      showMessage(enteredPhaseTwo
        ? `PHASE 2! The boss is enraged. ${boss.health} stomps left.`
        : `Boss hit! ${boss.health} left.`);
    }
    return;
  }

  if (!stomp) {
    damagePlayer(20, 'The boss hit you!');
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

function drawPolyline(points, color, width = 2) {
  if (points.length < 2) return;
  context.strokeStyle = color;
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(points[0][0], points[0][1]);
  for (let pointIndex = 1; pointIndex < points.length; pointIndex++) {
    context.lineTo(points[pointIndex][0], points[pointIndex][1]);
  }
  context.stroke();
}

function drawKey(x, y) {
  drawOutlinedRect(x - 12, y - 7, 14, 14, '#ffd84d', '#8a6a00');
  drawRect(x - 7, y - 2, 5, 4, '#8a6a00');
  drawOutlinedRect(x + 1, y - 3, 16, 6, '#ffd84d', '#8a6a00');
  drawRect(x + 8, y + 3, 4, 5, '#ffd84d');
  drawRect(x + 14, y + 3, 4, 4, '#ffd84d');
}

function drawCabinet() {
  drawOutlinedRect(cabinet.x, cabinet.y, cabinet.width, cabinet.height, '#7a4a24', '#2e1a0d');
  drawRect(cabinet.x + 5, cabinet.y + 5, cabinet.width - 10, cabinet.height - 10, '#5c3a1d');

  for (let index = 0; index < 3; index++) {
    const drawerY = cabinet.y + 7 + index * 17;
    if (index === 0 && cabinet.searched) {
      drawRect(cabinet.x + 7, drawerY, cabinet.width - 14, 15, '#1b1008');
      drawOutlinedRect(cabinet.x + 11, drawerY + 3, cabinet.width - 22, 11, '#a1662f', '#3d240d');
      drawRect(cabinet.x + cabinet.width / 2 - 5, drawerY + 6, 10, 4, '#ffd84d');
      if (cabinet.keyVisible) drawKey(cabinet.x + cabinet.width / 2 + 2, drawerY + 8);
    } else {
      drawOutlinedRect(cabinet.x + 7, drawerY, cabinet.width - 14, 15, '#a1662f', '#3d240d');
      drawRect(cabinet.x + cabinet.width / 2 - 5, drawerY + 6, 10, 4, '#ffd84d');
    }
  }
}

function drawRewardChest() {
  drawOutlinedRect(rewardChest.x, rewardChest.y, rewardChest.width, rewardChest.height, rewardChest.claimed ? '#6b4a2a' : '#b8862d', '#2e1a0d');
  drawRect(rewardChest.x + 8, rewardChest.y + 10, rewardChest.width - 16, rewardChest.height - 24, rewardChest.claimed ? '#22160c' : '#f0d060');
  drawRect(rewardChest.x + 28, rewardChest.y + 18, 14, 14, '#ffd84d');
}

function drawMainFloorElevator() {
  if (!mainFloorElevatorActive()) return;

  const elevatorX = mainFloorElevator.x;
  const destination = mainFloorElevatorDestination();
  const lightOn = Math.floor(performance.now() / 450) % 2 === 0;

  drawRect(elevatorX + 18, 210, 8, 130, '#202a35');
  drawRect(elevatorX + 74, 210, 8, 130, '#202a35');
  drawRect(elevatorX + 20, 210, 3, 130, '#71808e');
  drawRect(elevatorX + 76, 210, 3, 130, '#71808e');
  drawRect(elevatorX - 20, 330, 140, 230, '#18232e');
  drawRect(elevatorX - 14, 336, 128, 216, '#4f606e');
  drawRect(elevatorX - 8, 342, 116, 210, '#25333f');
  drawRect(elevatorX - 20, 330, 140, 10, '#8595a1');
  drawRect(elevatorX - 20, 550, 140, 10, '#111a23');
  drawRect(elevatorX - 12, 344, 8, 204, '#71808e');
  drawRect(elevatorX + 104, 344, 8, 204, '#34434f');

  drawOutlinedRect(elevatorX + 9, 346, 82, 34, '#111a23', '#8295a4');
  drawRect(elevatorX + 16, 352, 68, 22, '#071018');
  context.save();
  context.fillStyle = lightOn ? '#ffe779' : '#b89b43';
  context.font = 'bold 15px monospace';
  context.textAlign = 'center';
  context.fillText(`DOWN ${destination}`, elevatorX + 50, 369);
  context.restore();

  drawOutlinedRect(elevatorX, 390, 100, 170, '#657682', '#15202a');
  drawRect(elevatorX + 5, 395, 43, 160, '#526571');
  drawRect(elevatorX + 52, 395, 43, 160, '#465965');
  drawRect(elevatorX + 48, 390, 4, 170, '#17232c');
  drawRect(elevatorX + 8, 400, 3, 145, '#91a1aa');
  drawRect(elevatorX + 55, 400, 2, 145, '#71838e');
  drawOutlinedRect(elevatorX + 13, 410, 28, 50, '#173448', '#9aabb5');
  drawOutlinedRect(elevatorX + 59, 410, 28, 50, '#173448', '#9aabb5');
  drawRect(elevatorX + 17, 414, 8, 38, 'rgba(155,231,255,.22)');
  drawRect(elevatorX + 63, 414, 8, 38, 'rgba(155,231,255,.18)');
  drawRect(elevatorX + 14, 474, 26, 4, '#354853');
  drawRect(elevatorX + 60, 474, 26, 4, '#354853');
  for (let rivetY = 402; rivetY < 550; rivetY += 28) {
    drawRect(elevatorX + 3, rivetY, 3, 3, '#c1ccd2');
    drawRect(elevatorX + 94, rivetY, 3, 3, '#71818b');
  }

  drawOutlinedRect(elevatorX + 112, 446, 18, 35, '#25333f', '#8595a1');
  drawRect(elevatorX + 118, 452, 6, 9, lightOn ? '#ffe779' : '#8c7738');
  drawRect(elevatorX + 118, 466, 6, 8, '#67d06b');
  for (let stripe = 0; stripe < 8; stripe++) {
    drawRect(elevatorX - 14 + stripe * 17, 552, 9, 6, stripe % 2 === 0 ? '#ffd84d' : '#20262e');
  }
}

function drawMainFloorElevatorRide() {
  if (!elevatorRideActive) return;

  let closure = 1;
  if (elevatorRideTimer < .45) closure = Math.min(1, elevatorRideTimer / .45);
  else if (elevatorRideArrived) closure = Math.max(0, 1 - (elevatorRideTimer - 1.55) / .7);

  const shaking = !elevatorRideArrived && closure > .95;
  const shakeY = shaking ? Math.sin(elevatorRideTimer * 48) * 2 : 0;
  const panelWidth = 480 * closure;
  const rightPanelX = canvas.width - panelWidth;

  context.save();
  context.translate(0, shakeY);
  drawRect(0, 0, panelWidth, canvas.height, '#536571');
  drawRect(rightPanelX, 0, panelWidth, canvas.height, '#465965');
  drawRect(0, 82, panelWidth, 8, '#84949e');
  drawRect(rightPanelX, 82, panelWidth, 8, '#73858f');
  drawRect(0, 554, panelWidth, 10, '#25343f');
  drawRect(rightPanelX, 554, panelWidth, 10, '#202e38');

  for (let panelX = 0; panelX < panelWidth; panelX += 38) {
    drawRect(panelX, 90, 3, 460, 'rgba(255,255,255,.09)');
    drawRect(panelX + 8, 90, 2, 460, 'rgba(0,0,0,.09)');
    drawRect(rightPanelX + panelX, 90, 3, 460, 'rgba(255,255,255,.07)');
    drawRect(rightPanelX + panelX + 8, 90, 2, 460, 'rgba(0,0,0,.1)');
  }

  for (let rivetY = 112; rivetY < 540; rivetY += 54) {
    if (panelWidth > 18) {
      drawRect(10, rivetY, 5, 5, '#b7c3ca');
      drawRect(canvas.width - 15, rivetY, 5, 5, '#778891');
      drawRect(panelWidth - 15, rivetY, 4, 4, '#c6d0d5');
      drawRect(rightPanelX + 11, rivetY, 4, 4, '#87979f');
    }
  }

  if (panelWidth > 0) {
    drawRect(panelWidth - 7, 82, 7, 482, '#1b2831');
    drawRect(rightPanelX, 82, 7, 482, '#17232c');
    drawRect(panelWidth - 3, 90, 2, 460, '#a2b0b8');
    drawRect(rightPanelX + 2, 90, 2, 460, '#8799a3');
  }

  if (shaking) {
    for (let arrow = 0; arrow < 3; arrow++) {
      const arrowY = 170 + ((elevatorRideTimer * 115 + arrow * 125) % 330);
      drawRect(477, arrowY - 22, 6, 28, 'rgba(255,231,121,.5)');
      drawPolyline([[466, arrowY], [480, arrowY + 14], [494, arrowY]], 'rgba(255,231,121,.65)', 5);
    }
  }

  drawRect(0, 0, canvas.width, 82, '#1b2832');
  drawRect(0, 0, canvas.width, 8, '#8798a3');
  drawRect(0, 74, canvas.width, 8, '#0e171f');
  drawRect(0, 0, 18, canvas.height, '#1b2832');
  drawRect(canvas.width - 18, 0, 18, canvas.height, '#14212a');
  drawRect(12, 82, 5, 478, '#74858f');
  drawRect(canvas.width - 17, 82, 5, 478, '#52636e');
  drawOutlinedRect(325, 12, 310, 56, '#071018', '#8295a4');
  drawRect(337, 20, 286, 40, '#0d1c25');

  context.fillStyle = elevatorRideArrived ? '#9be7ff' : '#ffe779';
  context.font = 'bold 22px monospace';
  context.textAlign = 'center';
  const indicator = elevatorRideArrived
    ? `DOOR ${elevatorRideDestination}`
    : `${elevatorRideOrigin}  DOWN  ${elevatorRideDestination}`;
  context.fillText(indicator, 480, 48);
  context.font = 'bold 11px monospace';
  context.fillStyle = '#b8c7d0';
  context.fillText(elevatorRideArrived ? 'ARRIVED - DOORS OPENING' : 'MAIN FLOOR ELEVATOR', 480, 64);
  context.restore();
}

function drawStairwellExitDoor() {
  drawRect(door.x - 22, door.y - 20, door.width + 44, door.height + 20, '#171e2a');
  drawRect(door.x - 16, door.y - 30, door.width + 32, 12, '#596577');
  drawRect(door.x - 10, door.y - 38, door.width + 20, 10, '#6f7b8c');
  drawRect(door.x - 14, door.y - 18, 8, door.height + 18, '#465366');
  drawRect(door.x + door.width + 6, door.y - 18, 8, door.height + 18, '#2b3647');
  drawOutlinedRect(door.x, door.y, door.width, door.height, doorOpen ? '#4f9c75' : '#72503a', '#241a17');
  drawOutlinedRect(door.x + 8, door.y + 12, door.width - 16, 25, doorOpen ? '#75c79a' : '#956b48', '#3b2a20');
  drawOutlinedRect(door.x + 8, door.y + 48, door.width - 16, 27, doorOpen ? '#65b889' : '#855d40', '#3b2a20');
  drawRect(door.x + 35, door.y + 42, 8, 8, '#ffe779');
  drawRect(door.x + 17, door.y - 31, 16, 4, '#ffe779');
  drawRect(door.x + 22, door.y - 27, 6, 10, '#ffe779');
  drawRect(door.x + 18, door.y - 20, 14, 4, '#ffe779');
  if (doorOpen) drawRect(door.x + 5, door.y + 5, 4, door.height - 10, 'rgba(255,243,166,.55)');
}

function drawDoor() {
  if (mainFloorElevatorActive()) return;

  if (mainFloorHasStairs()) {
    drawStairwellExitDoor();
    return;
  }

  if (currentFloor === 'garden' && currentDoor === totalGardenDoors) {
    drawGrandGardenDoor();
    return;
  }

  drawOutlinedRect(door.x, door.y, door.width, door.height, doorOpen ? '#67d06b' : '#8b5a2b', '#2b1a0b');
  if (!doorOpen) drawRect(door.x + 35, door.y + 42, 8, 8, '#ffd84d');
}

function drawGrandGardenDoor() {
  const x = door.x;
  const y = door.y;
  const width = door.width;
  const height = door.height;

  drawRect(x - 24, y - 36, width + 48, height + 36, 'rgba(255,216,77,.12)');
  drawRect(x - 18, y - 30, width + 36, height + 30, '#274b32');
  drawRect(x - 13, y - 25, width + 26, height + 25, '#ffd84d');
  drawRect(x - 8, y - 20, width + 16, height + 20, '#487a41');

  drawRect(x - 4, y - 28, width + 8, 12, '#ffd84d');
  drawRect(x, y - 34, width, 10, '#ffd84d');
  drawRect(x + 7, y - 39, width - 14, 8, '#487a41');
  drawRect(x + 14, y - 43, width - 28, 7, '#ffd84d');

  drawOutlinedRect(x, y, width, height, '#f6f6ea', '#ffd84d');
  drawRect(x + width / 2 - 2, y, 4, height, '#ffd84d');

  drawOutlinedRect(x + 7, y + 12, 14, 30, '#bde3f5', '#ffd84d');
  drawOutlinedRect(x + 29, y + 12, 14, 30, '#ffd0e5', '#ffd84d');
  drawOutlinedRect(x + 7, y + 50, 14, 30, '#ffd0e5', '#ffd84d');
  drawOutlinedRect(x + 29, y + 50, 14, 30, '#bde3f5', '#ffd84d');

  drawRect(x + 10, y + 20, 8, 8, '#67d06b');
  drawRect(x + 32, y + 20, 8, 8, '#ff7aa8');
  drawRect(x + 10, y + 58, 8, 8, '#ff7aa8');
  drawRect(x + 32, y + 58, 8, 8, '#67d06b');

  drawRect(x - 14, y + 8, 8, 76, '#67d06b');
  drawRect(x + width + 6, y + 14, 8, 70, '#67d06b');
  drawRect(x - 8, y + 2, 6, 6, '#ff7aa8');
  drawRect(x + width + 12, y + 22, 6, 6, '#ffd84d');
  drawRect(x + width + 12, y + 60, 6, 6, '#ff7aa8');

  drawRect(x + 18, y + 42, 14, 12, '#ffd84d');
  drawRect(x + 21, y + 45, 8, 6, '#fff6cf');
  drawRect(x + 20, y + 44, 3, 3, '#3b2a00');
  drawRect(x + 27, y + 44, 3, 3, '#3b2a00');
  drawRect(x + 23, y + 50, 4, 3, '#3b2a00');

  drawRect(x + 18, y + 88, 4, 9, '#ffd84d');
  drawRect(x + 28, y + 88, 4, 9, '#ffd84d');
  drawRect(x + 20, y + 84, 10, 4, '#ffd84d');
}

function drawGardenDoor() {
  drawRect(gardenDoor.x - 9, gardenDoor.y - 9, gardenDoor.width + 18, gardenDoor.height + 9, '#487a41');
  drawRect(gardenDoor.x - 4, gardenDoor.y - 14, gardenDoor.width + 8, 8, '#487a41');
  drawRect(gardenDoor.x + 2, gardenDoor.y - 18, gardenDoor.width - 4, 7, '#487a41');
  drawRect(gardenDoor.x + 8, gardenDoor.y - 21, gardenDoor.width - 16, 6, '#487a41');
  drawOutlinedRect(gardenDoor.x, gardenDoor.y, gardenDoor.width, gardenDoor.height, '#f6f6ea', '#487a41');

  drawOutlinedRect(gardenDoor.x + 7, gardenDoor.y + 12, 15, 28, '#bde3f5', '#487a41');
  drawOutlinedRect(gardenDoor.x + 28, gardenDoor.y + 12, 15, 28, '#bde3f5', '#487a41');
  drawRect(gardenDoor.x + 7, gardenDoor.y + 24, 36, 3, '#487a41');
  drawRect(gardenDoor.x + 23, gardenDoor.y + 12, 4, 28, '#487a41');

  drawRect(gardenDoor.x - 6, gardenDoor.y + 6, 6, 72, '#67d06b');
  drawRect(gardenDoor.x + gardenDoor.width, gardenDoor.y + 14, 6, 64, '#67d06b');
  drawRect(gardenDoor.x - 2, gardenDoor.y - 4, 6, 6, '#ff7aa8');
  drawRect(gardenDoor.x + gardenDoor.width - 3, gardenDoor.y + 20, 6, 6, '#ffd84d');
  drawRect(gardenDoor.x + gardenDoor.width - 3, gardenDoor.y + 58, 6, 6, '#ff7aa8');

  drawRect(gardenDoor.x + 41, gardenDoor.y + 44, 6, 8, '#8a6238');
  drawRect(gardenDoor.x + 42, gardenDoor.y + 45, 4, 6, '#ffd84d');
}

function drawOfficeDoor() {
  drawRect(officeDoor.x - 10, officeDoor.y - 12, officeDoor.width + 20, officeDoor.height + 12, '#2b3542');
  drawOutlinedRect(officeDoor.x, officeDoor.y, officeDoor.width, officeDoor.height, '#9fb6c6', '#1b222c');
  drawOutlinedRect(officeDoor.x + 8, officeDoor.y + 12, 15, 30, '#9be7ff', '#334452');
  drawOutlinedRect(officeDoor.x + 28, officeDoor.y + 12, 15, 30, '#d8f7ff', '#334452');
  drawRect(officeDoor.x + 7, officeDoor.y + 52, 37, 4, '#607284');
  drawRect(officeDoor.x + 12, officeDoor.y + 64, 26, 5, '#ffd84d');
  drawRect(officeDoor.x + 42, officeDoor.y + 44, 5, 8, '#8fa5b5');
}

function drawStorageDoor() {
  drawRect(storageDoor.x - 8, storageDoor.y - 10, storageDoor.width + 16, storageDoor.height + 10, '#4a331f');
  drawOutlinedRect(storageDoor.x, storageDoor.y, storageDoor.width, storageDoor.height, '#a1662f', '#2b1a0b');
  drawRect(storageDoor.x + 7, storageDoor.y + 12, 36, 3, '#5c4028');
  drawRect(storageDoor.x + 7, storageDoor.y + 24, 36, 3, '#5c4028');
  drawRect(storageDoor.x + 7, storageDoor.y + 36, 36, 3, '#5c4028');
  drawRect(storageDoor.x + 12, storageDoor.y + 54, 26, 14, '#8a6238');
  drawRect(storageDoor.x + 18, storageDoor.y + 60, 14, 4, '#ffd84d');
}

function drawCellarStaircase() {
  const stairs = cellarStaircase;
  drawRect(stairs.x - 8, stairs.y - 8, stairs.width + 16, stairs.height + 8, '#171d21');
  drawOutlinedRect(stairs.x, stairs.y, stairs.width, stairs.height, '#242c31', '#0c1114');

  for (let step = 0; step < 6; step++) {
    const stepY = stairs.y + 18 + step * 18;
    const stepX = stairs.x + 10 + step * 12;
    drawOutlinedRect(stepX, stepY, stairs.width - 20 - step * 24, 14, step % 2 === 0 ? '#38454c' : '#2e3940', '#101619');
  }

  drawRect(stairs.x + stairs.width / 2 - 6, stairs.y + 4, 12, 10, '#7ee7ff');
  drawRect(stairs.x + stairs.width / 2 - 2, stairs.y + 7, 4, 4, '#f6fbff');
}

function drawCellarExit() {
  const stairs = cellarExit;
  drawRect(stairs.x - 8, stairs.y - 8, stairs.width + 16, stairs.height + 8, '#171d21');
  drawOutlinedRect(stairs.x, stairs.y, stairs.width, stairs.height, '#26333a', '#0c1114');

  for (let step = 0; step < 6; step++) {
    const stepY = stairs.y + 18 + step * 18;
    const stepX = stairs.x + 10 + step * 12;
    drawOutlinedRect(stepX, stepY, stairs.width - 20 - step * 24, 14, step % 2 === 0 ? '#42525a' : '#333f46', '#101619');
  }

  drawRect(stairs.x + stairs.width / 2 - 8, stairs.y + 2, 16, 12, '#ffd84d');
  drawRect(stairs.x + stairs.width / 2 - 4, stairs.y + 6, 8, 5, '#fff6cf');
}

function drawPencil(x, y, color) {
  drawRect(x, y, 14, 3, color);
  drawRect(x + 14, y, 4, 3, '#e5d7c1');
  drawRect(x + 18, y + 1, 3, 1, '#20262e');
  drawRect(x - 4, y, 4, 3, '#ff8f8f');
}

function drawPaperPlane(x, y) {
  drawRect(x, y, 14, 4, '#f2f5f7');
  drawRect(x + 5, y - 5, 9, 5, '#dfe7ec');
  drawRect(x + 3, y + 4, 8, 3, '#c9d6de');
}

function drawOfficePaperPlanes() {
  const time = performance.now() / 1000;
  for (let index = 0; index < 7; index++) {
    const speed = 42 + index * 9;
    const x = (index * 131 + currentDoor * 41 + time * speed) % 1040 - 40;
    const y = 145 + index * 29 + Math.sin(time * 2 + index) * 8;
    drawPaperPlane(Math.floor(x), Math.floor(y));
  }
}

function drawDestroyedComputer(x, y, variant) {
  drawOutlinedRect(x, y, 52, 40, '#2b3542', '#121820');
  drawRect(x + 5, y + 5, 42, 28, variant % 2 === 0 ? '#101820' : '#1c0f14');
  drawRect(x + 12, y + 8, 2, 12, '#9be7ff');
  drawRect(x + 14, y + 18, 12, 2, '#9be7ff');
  drawRect(x + 26, y + 20, 2, 10, '#ff4d5e');
  drawRect(x + 18, y + 12, 16, 2, '#4a5967');
  drawRect(x + 8, y + 26, 9, 3, '#4a5967');
  drawRect(x + 35, y + 12, 8, 2, '#4a5967');
  drawRect(x + 5, y + 43, 42, 6, '#3b4756');

  const spark = Math.floor(performance.now() / 180) % 3 === 0;
  if (spark) {
    drawRect(x + 38, y - 4, 4, 4, '#ffd84d');
    drawRect(x + 44, y - 8, 3, 3, '#ff4d5e');
  }
}

function drawOfficeDeskArt(x, y, width, variant) {
  drawRect(x + 8, y + 12, 10, 48, '#5c4028');
  drawRect(x + width - 18, y + 12, 10, 48, '#5c4028');
  drawOutlinedRect(x, y, width, 12, '#8a6238', '#3d240d');
  drawRect(x + 8, y + 3, width - 16, 5, '#a97446');
  drawDestroyedComputer(x + 14, y - 45, variant);
  drawOutlinedRect(x + 8, y - 6, 54, 10, '#4a5967', '#20262e');
  drawRect(x + 13, y - 4, 6, 5, '#69788a');
  drawRect(x + 23, y - 4, 6, 5, '#69788a');
  drawRect(x + 33, y - 4, 6, 5, '#69788a');
  drawPencil(x + 70, y - 5, '#ffd84d');
  drawPencil(x + 76, y + 2, '#67d06b');
}

function drawPrintingMachine(x, y) {
  drawOutlinedRect(x, y, 120, 64, '#7c8792', '#2f3742');
  drawRect(x + 10, y + 8, 100, 12, '#9fb6c6');
  drawRect(x + 18, y - 12, 84, 14, '#f2f5f7');
  drawRect(x + 24, y - 8, 66, 5, '#c9d6de');
  drawRect(x + 18, y + 30, 84, 8, '#3b4756');
  drawRect(x + 24, y + 38, 18, 5, '#ffd84d');
  drawRect(x + 48, y + 38, 18, 5, '#67d06b');
  drawRect(x + 72, y + 38, 18, 5, '#ff4d5e');
  const warning = Math.floor(performance.now() / 300) % 2 === 0;
  drawRect(x + 102, y + 12, 8, 8, warning ? '#ff4d5e' : '#5d1d1d');
  drawRect(x - 10, y + 42, 10, 8, '#20262e');
  drawRect(x + 120, y + 46, 12, 6, '#20262e');
}

function drawOfficeMonster() {
  if (!officeChaseActive) return;

  const x = officeMonster.x;
  const y = officeMonster.y;
  const shake = Math.sin(performance.now() / 100) * 2;

  for (let index = 0; index < 4; index++) {
    const paperX = x - 18 - index * 20;
    const paperY = y + 6 + (index % 3) * 22 + Math.sin(performance.now() / 130 + index) * 5;
    drawOutlinedRect(paperX, paperY, 14, 10, '#f2f5f7', '#7c8792');
    drawRect(paperX + 3, paperY + 3, 8, 2, '#c9d6de');
  }

  drawRect(x + 8, y + 96, 118, 14, 'rgba(0,0,0,.28)');
  drawOutlinedRect(x + 8, y + 82, 112, 28, '#3b4756', '#121820');
  drawRect(x + 18, y + 90, 18, 12, '#20262e');
  drawRect(x + 50, y + 90, 18, 12, '#20262e');
  drawRect(x + 82, y + 90, 18, 12, '#20262e');

  drawOutlinedRect(x, y + shake, 130, 82, '#7c8792', '#20262e');
  drawRect(x + 12, y + 10 + shake, 106, 14, '#9fb6c6');
  drawRect(x + 20, y - 14 + shake, 92, 16, '#f2f5f7');
  drawRect(x + 26, y - 10 + shake, 74, 5, '#c9d6de');

  drawOutlinedRect(x + 22, y + 32 + shake, 34, 20, '#ff4d5e', '#320b10');
  drawRect(x + 29, y + 39 + shake, 20, 6, '#ffd84d');
  drawRect(x + 74, y + 34 + shake, 32, 4, '#20262e');
  drawRect(x + 74, y + 42 + shake, 22, 4, '#3b4756');
  drawRect(x + 74, y + 50 + shake, 28, 4, '#3b4756');

  drawRect(x - 12, y + 58 + shake, 14, 8, '#20262e');
  drawRect(x + 128, y + 64 + shake, 16, 7, '#20262e');

  const spark = Math.floor(performance.now() / 160) % 3 === 0;
  if (spark) {
    drawRect(x + 104, y + 26 + shake, 5, 5, '#ffd84d');
    drawRect(x + 112, y + 20 + shake, 4, 4, '#ff4d5e');
  }
}

function drawBookshelf(x, y, variant) {
  drawOutlinedRect(x, y, 92, 170, '#6b4229', '#28170b');
  for (let shelf = 0; shelf < 5; shelf++) {
    const shelfY = y + 22 + shelf * 30;
    drawRect(x + 6, shelfY, 80, 6, '#4a2c18');
    for (let book = 0; book < 7; book++) {
      if (variant === 2 && shelf === 2 && book > 4) continue;
      const bookX = x + 9 + book * 11;
      const colors = ['#ff4d5e', '#ffd84d', '#67d06b', '#9be7ff', '#ff7aa8', '#8fa5b5', '#a97446'];
      drawRect(bookX, shelfY - 20, 8, 20, colors[(book + shelf + variant) % colors.length]);
      drawRect(bookX + 2, shelfY - 16, 4, 5, 'rgba(255,255,255,.18)');
    }
  }
  drawPencil(x + 15, y + 168, '#ffd84d');
  drawPencil(x + 58, y + 176, '#9be7ff');
}

function drawOfficeRoomDetails() {
  drawRect(0, 0, canvas.width, 24, '#20262e');
  for (let x = 60; x < canvas.width; x += 210) {
    drawRect(x, 28, 120, 10, '#9fb6c6');
    drawRect(x + 20, 38, 80, 4, Math.floor(performance.now() / 450) % 2 === 0 ? '#fff6cf' : '#c9d6de');
  }

  drawRect(70, 300, 14, 260, '#4a5967');
  drawRect(250, 310, 14, 250, '#414f5c');
  drawRect(590, 300, 14, 260, '#4a5967');
  drawRect(84, 330, 176, 12, '#596875');
  drawRect(84, 420, 176, 12, '#596875');

  drawOfficeDeskArt(80, 500, 110, currentDoor % 3);
  drawOfficeDeskArt(290, 500, 110, currentDoor % 4);
  drawPrintingMachine(560, 492);
  drawOfficePaperPlanes();

  drawPencil(180, 550, '#ff7aa8');
  drawPencil(430, 568, '#9be7ff');
  drawPencil(715, 552, '#ffd84d');
  drawRect(140, 578, 34, 5, '#f2f5f7');
  drawRect(420, 588, 28, 5, '#dfe7ec');
}

function drawStorageRoomDetails() {
  drawRect(0, 0, canvas.width, 24, '#20262e');
  drawBookshelf(60, 350, currentDoor % 3);
  drawBookshelf(180, 330, currentDoor % 4);
  drawBookshelf(680, 340, currentDoor % 5);

  drawOutlinedRect(330, 500, 80, 60, '#a97446', '#3d240d');
  drawRect(338, 508, 64, 7, '#8a6238');
  drawRect(344, 530, 52, 5, '#ffd84d');
  drawOutlinedRect(430, 525, 58, 35, '#7c8792', '#2f3742');
  drawRect(438, 533, 42, 8, '#3b4756');

  drawDestroyedComputer(330, 420, currentDoor % 2);
  drawPencil(120, 585, '#ffd84d');
  drawPencil(260, 590, '#67d06b');
  drawPencil(410, 578, '#ff7aa8');
  drawPencil(640, 588, '#9be7ff');
  drawOfficePaperPlanes();
}

function drawObstacle(obstacle) {
  if (obstacle.type === 'officeDesk') {
    drawOfficeDeskArt(obstacle.x, obstacle.y, obstacle.width, currentDoor % 3);
    return;
  }

  if (obstacle.type === 'cableBeam') {
    drawRect(obstacle.x, obstacle.y, obstacle.width, 8, '#20262e');
    for (let x = obstacle.x + 8; x < obstacle.x + obstacle.width; x += 20) {
      drawRect(x, obstacle.y + 8, 5, 14, '#ffb1b1');
      drawRect(x + 1, obstacle.y + 22, 3, 7, '#d94f4f');
      drawRect(x + 8, obstacle.y + 8, 4, 10, '#ffd84d');
    }
    return;
  }

  if (mountainChaseActive && obstacle.type === 'rock') {
    drawOutlinedRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, '#6f7783', '#262c33');
    drawRect(obstacle.x + 6, obstacle.y + 7, obstacle.width - 12, 8, '#8b949f');
    drawRect(obstacle.x + 10, obstacle.y + 20, 10, 7, '#585f69');
    drawRect(obstacle.x + 26, obstacle.y + 12, 8, 5, '#9aa4ae');
    return;
  }

  if (mountainChaseActive && obstacle.type === 'fallenLog') {
    drawOutlinedRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, '#6b452b', '#281910');
    drawRect(obstacle.x + 8, obstacle.y + 5, obstacle.width - 16, 7, '#855a38');
    drawRect(obstacle.x + 14, obstacle.y + 15, obstacle.width - 28, 5, '#7a5030');
    drawRect(obstacle.x + 4, obstacle.y + 2, 8, 20, '#5c3b23');
    drawRect(obstacle.x + obstacle.width - 12, obstacle.y + 2, 8, 20, '#5c3b23');
    return;
  }

  if (gardenChaseActive && obstacle.type === 'vineStalk') {
    drawRect(obstacle.x + obstacle.width / 2 - 6, obstacle.y, 12, obstacle.height, '#1d6b4f');
    drawRect(obstacle.x + obstacle.width / 2 - 2, obstacle.y - 14, 8, 18, '#277a58');
    drawRect(obstacle.x + obstacle.width / 2 - 16, obstacle.y + 16, 32, 9, '#3f9a75');
    drawRect(obstacle.x + obstacle.width / 2 - 9, obstacle.y - 7, 18, 14, '#ff7aa8');
    return;
  }

  if (gardenChaseActive && obstacle.type === 'vineBeam') {
    drawRect(obstacle.x, obstacle.y, obstacle.width, 9, '#0f4f5d');
    for (let x = obstacle.x + 8; x < obstacle.x + obstacle.width; x += 24) {
      drawRect(x, obstacle.y + 9, 9, 18, '#ff8f6f');
      drawRect(x + 2, obstacle.y + 27, 5, 7, '#ffd0b8');
      drawRect(x + 14, obstacle.y + 9, 7, 13, '#ff6f8f');
    }
    return;
  }

  if (obstacle.type === 'spike') {
    drawOutlinedRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, '#d93b4f', '#320b10');
    drawRect(obstacle.x + 5, obstacle.y + 8, obstacle.width - 10, obstacle.height - 14, '#ff7a89');
  } else if (obstacle.type === 'crate') {
    drawOutlinedRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, '#a1662f', '#3d240d');
  } else if (obstacle.type === 'vineStalk') {
    drawRect(obstacle.x + obstacle.width / 2 - 4, obstacle.y, 8, obstacle.height, '#487a41');
    drawRect(obstacle.x + obstacle.width / 2 - 14, obstacle.y + 12, 28, 8, '#67d06b');
    drawRect(obstacle.x + obstacle.width / 2 - 10, obstacle.y + 26, 20, 7, '#3f6f3a');
    drawRect(obstacle.x + obstacle.width / 2 - 7, obstacle.y - 10, 14, 14, '#ff7aa8');
  } else if (obstacle.type === 'vineBeam') {
    drawRect(obstacle.x, obstacle.y, obstacle.width, 7, '#487a41');
    for (let x = obstacle.x + 6; x < obstacle.x + obstacle.width; x += 18) {
      drawRect(x, obstacle.y + 7, 5, 15, '#67d06b');
      drawRect(x + 2, obstacle.y + 22, 6, 7, '#ff7aa8');
    }
  } else {
    drawOutlinedRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, '#7c8792', '#2f3742');
  }
}

function drawPlatforms() {
  for (const platform of platforms) {
    drawRect(platform.x, platform.y + 14, 8, groundY - platform.y - 14, '#4d3b28');
    drawRect(platform.x + platform.width - 8, platform.y + 14, 8, groundY - platform.y - 14, '#4d3b28');
    drawOutlinedRect(platform.x, platform.y, platform.width, 14, '#8a6238', '#3d240d');
  }
}

function drawMilkshake() {
  if (!rareRoomActive || milkshake.taken) return;
  drawRect(milkshake.x + 14, milkshake.y - 14, 4, 20, '#ff5252');
  drawOutlinedRect(milkshake.x, milkshake.y, milkshake.width, milkshake.height, '#ff9ec4', '#6b2b45');
  drawRect(milkshake.x + 2, milkshake.y + 6, 18, 18, '#ffd0e5');
  drawRect(milkshake.x + 3, milkshake.y - 4, 16, 7, '#fff2f8');
  drawRect(milkshake.x + 7, milkshake.y - 10, 8, 8, '#e5344b');
}

function drawFantaJug() {
  if (!fantaJugActive || fantaJug.taken) return;
  const jugX = fantaJug.x;
  const jugY = fantaJug.y + Math.sin(performance.now() / 260) * 2;

  context.save();
  context.globalAlpha = .14;
  drawRect(jugX - 8, jugY - 10, fantaJug.width + 20, fantaJug.height + 18, '#ffe45c');
  context.globalAlpha = 1;

  drawOutlinedRect(jugX - 10, fantaJug.y + fantaJug.height, fantaJug.width + 24, 12, '#8a6238', '#3d240d');
  drawOutlinedRect(jugX + 6, jugY - 2, 32, 8, '#d9e2e8', '#38424a');
  drawRect(jugX + 10, jugY, 24, 3, '#f1f5f7');
  drawOutlinedRect(jugX + 4, jugY + 5, 36, 11, '#f4b91f', '#6b4b00');
  drawOutlinedRect(jugX, jugY + 13, 44, 34, '#ffd84d', '#6b4b00');
  drawOutlinedRect(jugX + 4, jugY + 44, 36, 8, '#f2a91b', '#6b4b00');
  drawRect(jugX + 4, jugY + 15, 6, 27, '#fff3a6');
  drawRect(jugX + 35, jugY + 15, 5, 27, '#f2a91b');
  drawRect(jugX, jugY + 18, 44, 6, '#7c8792');
  drawRect(jugX + 2, jugY + 41, 40, 5, '#59646b');
  drawOutlinedRect(jugX + 2, jugY + 49, 40, 5, '#59646b', '#293137');
  drawRect(jugX + 7, jugY + 26, 30, 13, '#fff8dc');
  drawRect(jugX + 20, jugY + 26, 4, 13, '#e88912');
  drawRect(jugX + 15, jugY + 31, 14, 3, '#e88912');
  drawRect(jugX + 17, jugY + 28, 10, 8, '#e88912');
  drawRect(jugX - 4, jugY + 5, 4, 4, '#fff8cf');
  drawRect(jugX + 43, jugY + 4, 3, 3, '#fff8cf');
  context.restore();
}

function drawRiftCan() {
  if (!riftCanActive || riftCan.taken) return;
  const canX = riftCan.x;
  const canY = riftCan.y + Math.sin(performance.now() / 300) * 2;

  context.save();
  context.globalAlpha = .16;
  drawRect(canX - 7, canY - 7, riftCan.width + 14, riftCan.height + 14, '#53d8ff');
  context.globalAlpha = 1;
  drawOutlinedRect(canX + 3, canY, 28, 6, '#d9e2e8', '#38424a');
  drawRect(canX + 12, canY + 1, 10, 3, '#7c8792');
  drawOutlinedRect(canX, canY + 5, 34, 33, '#2456a6', '#081c46');
  drawRect(canX + 4, canY + 9, 26, 5, '#3b82f6');
  drawRect(canX + 4, canY + 31, 26, 4, '#172a63');
  context.lineWidth = 3;
  context.strokeStyle = '#72e3ff';
  context.beginPath();
  context.ellipse(canX + 17, canY + 22, 10, 7, .35, 0, Math.PI * 2);
  context.stroke();
  context.strokeStyle = '#8750a5';
  context.beginPath();
  context.ellipse(canX + 17, canY + 22, 6, 10, -.35, 0, Math.PI * 2);
  context.stroke();
  drawRect(canX - 4, canY + 4, 3, 3, '#d8f7ff');
  context.restore();
}

function drawFlowJuice() {
  if (!flowJuiceActive || flowJuice.taken) return;
  const juiceX = flowJuice.x;
  const juiceY = flowJuice.y + Math.sin(performance.now() / 280) * 2;

  context.save();
  context.globalAlpha = .15;
  drawRect(juiceX - 7, juiceY - 6, flowJuice.width + 14, flowJuice.height + 12, '#c7a5ff');
  context.globalAlpha = 1;
  drawOutlinedRect(juiceX + 7, juiceY, 16, 6, '#d9e2e8', '#303a65');
  drawOutlinedRect(juiceX + 6, juiceY + 6, 18, 7, '#e8f4ff', '#303a65');
  drawOutlinedRect(juiceX + 1, juiceY + 12, 28, 28, '#e8f4ff', '#303a65');
  drawRect(juiceX + 4, juiceY + 20, 10, 16, '#ff8fd8');
  drawRect(juiceX + 14, juiceY + 20, 4, 16, '#b8a5ff');
  drawRect(juiceX + 18, juiceY + 20, 8, 16, '#79dfff');
  drawRect(juiceX + 4, juiceY + 15, 5, 15, 'rgba(255,255,255,.55)');
  drawRect(juiceX + 7, juiceY + 23, 3, 3, '#ffd8ef');
  drawRect(juiceX + 20, juiceY + 27, 3, 3, '#d8f7ff');
  drawRect(juiceX - 4, juiceY + 7, 4, 4, '#ff8fd8');
  drawRect(juiceX + 31, juiceY + 3, 4, 4, '#79dfff');
  context.restore();
}

function drawBackpack() {
  if (!backpackActive || backpack.taken) return;
  if (backpackOnTable) {
    drawOutlinedRect(backpack.x - 10, backpack.y + backpack.height, backpack.width + 20, 12, '#8a6238', '#3d240d');
  }
  drawOutlinedRect(backpack.x, backpack.y, backpack.width, backpack.height, '#7a4a24', '#2e1a0d');
  drawRect(backpack.x + 5, backpack.y + 6, backpack.width - 10, 12, '#a1662f');
  drawRect(backpack.x + 5, backpack.y + 24, backpack.width - 10, 8, '#a1662f');
  drawRect(backpack.x + 11, backpack.y + 5, 12, 30, '#5c3a1d');
  drawRect(backpack.x - 5, backpack.y + 8, 8, 20, '#5c3a1d');
  drawRect(backpack.x + backpack.width - 3, backpack.y + 8, 8, 20, '#5c3a1d');
  drawRect(backpack.x + 13, backpack.y - 7, 8, 8, '#ffd84d');
}

function drawTeleporter() {
  if (!teleporterActive || teleporter.taken) return;

  if (teleporterOnDesk) {
    drawOutlinedRect(teleporter.x - 12, teleporter.y + teleporter.height, teleporter.width + 24, 12, '#8a6238', '#3d240d');
  } else {
    drawOutlinedRect(teleporter.x - 12, teleporter.y + teleporter.height, teleporter.width + 24, 16, '#a97446', '#3d240d');
  }

  drawOutlinedRect(teleporter.x + 3, teleporter.y + 18, teleporter.width - 6, 12, '#7c8792', '#20262e');
  drawRect(teleporter.x + 7, teleporter.y + 21, teleporter.width - 14, 6, '#9fb6c6');
  drawRect(teleporter.x + 11, teleporter.y + 4, 20, 16, '#7ee7ff');
  drawRect(teleporter.x + 15, teleporter.y + 7, 12, 10, '#d8f7ff');
  drawRect(teleporter.x + 18, teleporter.y + 9, 6, 6, '#fff6cf');
  drawRect(teleporter.x + 9, teleporter.y + 1, 5, 4, '#9be7ff');
  drawRect(teleporter.x + 28, teleporter.y + 2, 4, 4, '#9be7ff');
}

function drawRiftItem(x, y) {
  if (!riftItem) {
    drawRect(x - 3, y - 14, 6, 28, '#d8f7ff');
    drawRect(x - 14, y - 3, 28, 6, '#d8f7ff');
    drawRect(x - 7, y - 7, 14, 14, '#7ee7ff');
    return;
  }

  if (riftItem.id === 'milkshake') {
    drawRect(x + 5, y - 24, 4, 14, '#ff5252');
    drawOutlinedRect(x - 12, y - 12, 24, 30, '#ff9ec4', '#6b2b45');
    drawRect(x - 9, y - 7, 18, 18, '#ffd0e5');
    drawRect(x - 10, y - 17, 20, 7, '#fff2f8');
  } else if (riftItem.id === 'backpack') {
    drawOutlinedRect(x - 15, y - 15, 30, 34, '#7a4a24', '#2e1a0d');
    drawRect(x - 10, y - 9, 20, 9, '#a1662f');
    drawRect(x - 9, y + 7, 18, 7, '#a1662f');
    drawRect(x - 5, y - 21, 10, 7, '#5c3a1d');
    drawRect(x - 3, y - 9, 6, 6, '#ffd84d');
  } else if (riftItem.id === 'fanta-jug') {
    drawOutlinedRect(x - 15, y - 31, 30, 7, '#d9e2e8', '#38424a');
    drawOutlinedRect(x - 17, y - 25, 34, 10, '#f4b91f', '#6b4b00');
    drawOutlinedRect(x - 20, y - 17, 40, 31, '#ffd84d', '#6b4b00');
    drawOutlinedRect(x - 16, y + 12, 32, 7, '#f2a91b', '#6b4b00');
    drawRect(x - 20, y - 12, 40, 5, '#7c8792');
    drawRect(x - 18, y + 8, 36, 5, '#59646b');
    drawRect(x - 12, y - 4, 24, 10, '#fff8dc');
    drawRect(x - 2, y - 5, 4, 12, '#e88912');
    drawRect(x - 7, y - 1, 14, 3, '#e88912');
    drawRect(x - 5, y - 3, 10, 7, '#e88912');
  } else if (riftItem.id === 'rift-can') {
    drawOutlinedRect(x - 15, y - 25, 30, 42, '#2456a6', '#081c46');
    drawOutlinedRect(x - 12, y - 31, 24, 7, '#d9e2e8', '#38424a');
    drawRect(x - 11, y - 20, 22, 5, '#3b82f6');
    drawRect(x - 11, y + 10, 22, 4, '#172a63');
    context.lineWidth = 3;
    context.strokeStyle = '#72e3ff';
    context.beginPath();
    context.ellipse(x, y - 2, 9, 6, .35, 0, Math.PI * 2);
    context.stroke();
    context.strokeStyle = '#8750a5';
    context.beginPath();
    context.ellipse(x, y - 2, 5, 9, -.35, 0, Math.PI * 2);
    context.stroke();
  } else if (riftItem.id === 'flow-juice') {
    drawOutlinedRect(x - 12, y - 24, 24, 38, '#e8f4ff', '#303a65');
    drawOutlinedRect(x - 8, y - 32, 16, 8, '#d9e2e8', '#303a65');
    drawRect(x - 9, y - 11, 8, 21, '#ff8fd8');
    drawRect(x - 1, y - 11, 4, 21, '#b8a5ff');
    drawRect(x + 3, y - 11, 6, 21, '#79dfff');
    drawRect(x - 7, y - 20, 4, 23, 'rgba(255,255,255,.55)');
  } else if (riftItem.id === 'teleporter') {
    drawOutlinedRect(x - 17, y - 13, 34, 28, '#7c8792', '#20262e');
    drawRect(x - 12, y - 8, 24, 8, '#9fb6c6');
    drawRect(x - 8, y - 23, 16, 12, '#7ee7ff');
    drawRect(x - 4, y - 20, 8, 6, '#d8f7ff');
    drawRect(x - 11, y + 7, 22, 4, '#9be7ff');
  }
}

function drawRift() {
  if (!isRiftActive()) return;
  const activeRift = getActiveRift();
  context.save();
  context.translate(activeRift.x - rift.x, activeRift.y - rift.y);
  const centerX = rift.x + rift.width / 2;
  const centerY = rift.y + 85;
  const time = performance.now() / 1000;
  const pulse = Math.sin(time * 3) * 3;

  drawOutlinedRect(rift.x - 16, groundY - 14, rift.width + 32, 14, '#243a59', '#091427');
  drawOutlinedRect(rift.x + 4, groundY - 27, rift.width - 8, 13, '#315b80', '#0b1d36');

  context.save();
  context.globalAlpha = .16 + Math.sin(time * 2) * .03;
  context.fillStyle = '#38b6ff';
  context.beginPath();
  context.ellipse(centerX, centerY, 72 + pulse, 96 + pulse, 0, 0, Math.PI * 2);
  context.fill();

  context.globalAlpha = 1;
  const portalGlow = context.createRadialGradient(centerX - 10, centerY - 18, 4, centerX, centerY, 72);
  portalGlow.addColorStop(0, '#c7f7ff');
  portalGlow.addColorStop(.25, '#53d8ff');
  portalGlow.addColorStop(.62, '#176fd1');
  portalGlow.addColorStop(1, '#071d55');
  context.fillStyle = portalGlow;
  context.beginPath();
  context.ellipse(centerX, centerY, 53, 80, 0, 0, Math.PI * 2);
  context.fill();

  context.lineWidth = 8;
  context.strokeStyle = '#123c8f';
  context.beginPath();
  context.ellipse(centerX, centerY, 56, 83, 0, 0, Math.PI * 2);
  context.stroke();
  context.lineWidth = 4;
  context.strokeStyle = '#72e3ff';
  context.beginPath();
  context.ellipse(centerX, centerY, 49 + pulse * .3, 75 + pulse * .3, 0, 0, Math.PI * 2);
  context.stroke();

  for (let index = 0; index < 4; index++) {
    const angle = time * .7 + index * Math.PI / 2;
    context.lineWidth = 3;
    context.strokeStyle = index % 2 === 0 ? '#9be7ff' : '#2b8fff';
    context.beginPath();
    context.ellipse(centerX, centerY, 23 + index * 6, 46 + index * 5, angle * .22, angle, angle + Math.PI * 1.15);
    context.stroke();
    drawRect(centerX + Math.cos(angle) * 36 - 2, centerY + Math.sin(angle) * 57 - 2, 4, 4, '#e5fbff');
  }
  context.restore();

  drawRiftItem(centerX, centerY + Math.sin(time * 2) * 6);

  context.save();
  context.textAlign = 'center';
  context.font = 'bold 16px monospace';
  context.fillStyle = '#9be7ff';
  context.fillText('R I F T', centerX, rift.y - 18);
  context.font = 'bold 13px monospace';
  context.fillStyle = '#d8f7ff';
  const itemLabel = riftItem ? `${riftItem.name}${riftItem.count > 1 ? ` x${riftItem.count}` : ''}` : 'EMPTY - READY FOR AN ITEM';
  context.fillText(itemLabel, centerX, groundY + 30);
  context.restore();
  context.restore();
}

function drawRiftRoomDetails() {
  for (let index = 0; index < 48; index++) {
    const x = 25 + (index * 173 + 47) % 900;
    const y = 28 + (index * 67 + 31) % 300;
    const size = index % 7 === 0 ? 4 : 2;
    drawRect(x, y, size, size, index % 3 === 0 ? '#9be7ff' : '#4f83c7');
  }

  for (const x of [62, 866]) {
    drawOutlinedRect(x, 220, 32, 340, '#142c4d', '#071328');
    drawRect(x + 8, 238, 16, 290, '#1e426b');
    drawRect(x + 4, 250, 24, 8, '#2e6292');
    drawRect(x + 4, 476, 24, 8, '#2e6292');
  }

  drawRect(345, 322, 270, 6, '#173b68');
  drawRect(375, 337, 210, 3, '#275d92');
}

function drawCloset() {
  if (!closetVisible) return;

  drawOutlinedRect(closet.x, closet.y, closet.width, closet.height, '#6b3f1f', '#221308');
  drawRect(closet.x + 6, closet.y + 8, closet.width - 12, closet.height - 16, player.hidden ? '#120a05' : '#3d2312');

  if (player.hidden) {
    drawRect(closet.x + 8, closet.y + 10, 26, closet.height - 20, '#7c4a22');
    drawRect(closet.x + 38, closet.y + 10, 26, closet.height - 20, '#7c4a22');
    drawRect(closet.x + 30, closet.y + 54, 5, 9, '#ffd84d');
  } else {
    drawRect(closet.x - 12, closet.y + 10, 14, closet.height - 20, '#7c4a22');
    drawRect(closet.x + closet.width - 2, closet.y + 10, 14, closet.height - 20, '#7c4a22');
  }
}

function drawRush() {
  if (!rushActive || rushWarningTimer > 0) return;

  context.fillStyle = 'rgba(24,5,0,.42)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const x = rush.x;
  const y = rush.y;
  const flicker = Math.floor(performance.now() / 100) % 2 === 0;
  const magmaCore = flicker ? '#ffd166' : '#ff7a18';
  const magmaDeep = flicker ? '#ff4a00' : '#d92b00';

  drawRect(x + 2, y + 4, rush.width + 16, rush.height + 8, 'rgba(255,80,0,.14)');
  drawRect(x + 8, y + 8, rush.width + 4, rush.height, 'rgba(255,150,40,.10)');
  drawRect(x + 4, y + 72, rush.width + 12, 38, 'rgba(20,4,0,.75)');
  drawRect(x + 12, y + 58, rush.width - 24, 46, 'rgba(8,2,0,.82)');

  drawOutlinedRect(x + 14, y + 10, 56, 62, '#eee2cf', '#241b16');
  drawRect(x + 18, y + 6, 48, 64, '#eee2cf');
  drawRect(x + 10, y + 38, 64, 28, '#eee2cf');

  drawRect(x + 18, y + 28, 17, 20, '#150703');
  drawRect(x + 49, y + 31, 17, 18, '#150703');
  drawRect(x + 22, y + 34, 8, 8, magmaDeep);
  drawRect(x + 24, y + 36, 4, 4, magmaCore);
  drawRect(x + 53, y + 36, 8, 8, magmaDeep);
  drawRect(x + 55, y + 38, 4, 4, magmaCore);

  drawRect(x + 39, y + 46, 7, 12, '#150703');
  drawRect(x + 41, y + 51, 3, 5, magmaDeep);

  drawRect(x + 20, y + 14, 6, 4, magmaDeep);
  drawRect(x + 25, y + 17, 4, 5, magmaCore);
  drawRect(x + 56, y + 12, 5, 4, magmaDeep);
  drawRect(x + 52, y + 17, 4, 5, magmaCore);
  drawRect(x + 34, y + 22, 5, 4, magmaDeep);

  drawOutlinedRect(x + 18, y + 68, 48, 16, '#e5d7c1', '#241b16');
  drawOutlinedRect(x + 24, y + 82, 36, 12, '#d9c8ad', '#241b16');
  drawRect(x + 22, y + 72, 4, 10, '#241b16');
  drawRect(x + 31, y + 72, 4, 10, '#241b16');
  drawRect(x + 40, y + 72, 4, 10, '#241b16');
  drawRect(x + 49, y + 72, 4, 10, '#241b16');
  drawRect(x + 58, y + 72, 4, 10, '#241b16');

  drawRect(x + 28, y + 92, 6, 18, '#e5d7c1');
  drawRect(x + 40, y + 92, 8, 28, '#d9c8ad');
  drawRect(x + 54, y + 92, 6, 14, '#e5d7c1');
  drawRect(x + 42, y + 104, 4, 6, magmaCore);
  drawRect(x + 30, y + 100, 3, 4, magmaDeep);
}

function drawTreeMonster() {
  const x = vineMonster.x;
  const y = vineMonster.y;

  for (let index = 0; index < 4; index++) {
    drawRect(x - 20 - index * 18, y + 55 + index * 17, 12, 5, index % 2 === 0 ? 'rgba(103,208,107,.45)' : 'rgba(255,143,143,.35)');
  }
  drawRect(x + 25, y + 130, 50, groundY - y - 130, '#4a382a');
  drawOutlinedRect(x + 10, y + 30, 100, 105, '#255238', '#123324');
  drawOutlinedRect(x + 25, y + 50, 70, 70, '#1d4129', '#10251a');
  drawOutlinedRect(x - 12, y + 65, 28, 14, '#255238', '#123324');
  drawOutlinedRect(x + 104, y + 65, 28, 14, '#255238', '#123324');
  drawRect(x + 32, y + 70, 12, 12, '#ff4d5e');
  drawRect(x + 72, y + 70, 12, 12, '#ff4d5e');
  drawRect(x + 44, y + 95, 32, 9, '#210508');
  drawRect(x + 52, y + 99, 6, 6, '#fff4d8');

  for (let index = 0; index < 3; index++) {
    const legX = x + 16 + index * 34;
    const lift = Math.max(0, Math.sin(performance.now() / 100 + index * 2.1)) * 10;
    drawOutlinedRect(legX, groundY - 68 + lift, 20, 68 - lift, '#ff8f8f', '#5d1d1d');
    drawRect(legX + 4, groundY - 58 + lift, 12, 28, '#ffb1b1');
    drawOutlinedRect(legX - 2, groundY - 18, 26, 18, '#d94f4f', '#5d1d1d');
    drawRect(legX + 3, groundY - 12, 7, 8, '#ffb1b1');
    drawRect(legX + 14, groundY - 12, 7, 8, '#ffb1b1');
  }
}

function drawUnderwaterVineMonster() {
  const bob = Math.sin(performance.now() / 220) * 6;
  const x = vineMonster.x;
  const y = vineMonster.y + bob;
  const centerX = x + vineMonster.width / 2;
  const centerY = y + 54;

  for (let index = 0; index < 6; index++) {
    const bubbleY = y + 20 + ((index * 31 - performance.now() / 35) % 110 + 110) % 110;
    const bubbleSize = 5 + (index % 2) * 3;
    drawRect(x - 18 - (index % 3) * 18, bubbleY, bubbleSize, bubbleSize, 'rgba(155,231,255,.5)');
  }
  for (let index = 0; index < 5; index++) {
    const tentacleX = centerX - 42 + index * 21;
    drawPolyline([
      [tentacleX, y + 92],
      [tentacleX + Math.sin(performance.now() / 180 + index) * 10, y + 122],
      [tentacleX + Math.cos(performance.now() / 160 + index) * 13, y + 150]
    ], index % 2 === 0 ? '#3f6f3a' : '#67d06b', 9);
  }
  for (let angle = 0; angle < 10; angle++) {
    const petalX = centerX + Math.cos(angle * Math.PI / 5) * 52 - 17;
    const petalY = centerY + Math.sin(angle * Math.PI / 5) * 43 - 17;
    drawOutlinedRect(petalX, petalY, 34, 34, '#ff7aa8', '#6d2038');
  }
  drawOutlinedRect(centerX - 38, centerY - 31, 76, 62, '#ffd84d', '#6d4a00');
  drawRect(centerX - 25, centerY - 15, 12, 12, '#ff4d5e');
  drawRect(centerX + 13, centerY - 15, 12, 12, '#ff4d5e');
  drawOutlinedRect(centerX - 28, centerY + 7, 56, 23, '#210508', '#000000');
  for (let tooth = 0; tooth < 4; tooth++) drawRect(centerX - 22 + tooth * 14, centerY + 8, 7, 8, '#fff4d8');
}

function drawVineMonster() {
  if (!vineMonsterActive) return;

  if (gardenChaseActive) {
    if (mountainChaseActive) drawTreeMonster();
    else drawUnderwaterVineMonster();
    return;
  }

  const x = vineMonster.x;
  const y = vineMonster.y;
  const centerX = x + vineMonster.width / 2;
  const headCenterY = y + 58;

  drawRect(centerX - 9, y + 104, 18, groundY - y - 104, '#3f6f3a');
  drawRect(centerX - 58, y + 130, 116, 16, '#487a41');
  drawRect(centerX - 84, y + 152, 48, 15, '#67d06b');
  drawRect(centerX + 36, y + 164, 48, 15, '#67d06b');

  for (let angle = 0; angle < 10; angle++) {
    const petalX = centerX + Math.cos(angle * Math.PI / 5) * 58 - 19;
    const petalY = headCenterY + Math.sin(angle * Math.PI / 5) * 47 - 19;
    drawOutlinedRect(petalX, petalY, 38, 38, '#ff7aa8', '#6d2038');
  }

  drawOutlinedRect(centerX - 38, headCenterY - 32, 76, 64, '#ffd84d', '#6d4a00');

  if (vineMonster.mouthOpen) {
    drawOutlinedRect(centerX - 32, headCenterY - 11, 64, 34, '#210508', '#000000');
    drawRect(centerX - 26, headCenterY - 9, 9, 12, '#fff4d8');
    drawRect(centerX - 12, headCenterY - 9, 9, 12, '#fff4d8');
    drawRect(centerX + 2, headCenterY - 9, 9, 12, '#fff4d8');
    drawRect(centerX + 16, headCenterY - 9, 9, 12, '#fff4d8');
    drawRect(centerX - 4, headCenterY - 34, 8, 8, '#ff4d5e');
  } else {
    drawRect(centerX - 32, headCenterY + 5, 64, 9, '#6d4a00');
  }
}

function drawFurniture() {
  if (currentFloor !== 'main') return;
  if (rareRoomActive) return;
  if (fantaJugActive) return;
  if (monsterActive || bossActive || currentDoor === rewardDoor || isPermanentRiftActive() || mainFloorHasStairs()) return;

  const variant = roomThemes.indexOf(currentRoomTheme());
  const offsetX = ((currentDoor * 17) % 3) * 35;

  if (variant === 0) {
    const x = 300 + offsetX;
    drawOutlinedRect(x, 500, 120, 60, '#7a3f47', '#2d1419');
    drawRect(x + 10, 510, 45, 20, '#a35560');
    drawRect(x + 65, 510, 45, 20, '#a35560');
    drawRect(x + 12, 542, 96, 10, '#54262e');
  } else if (variant === 1) {
    const x = 310 + offsetX;
    drawOutlinedRect(x, 510, 110, 12, '#8a6238', '#3d240d');
    drawRect(x + 8, 522, 10, 38, '#5c4028');
    drawRect(x + 92, 522, 10, 38, '#5c4028');
    drawOutlinedRect(x + 132, 512, 46, 43, '#a56d42', '#3d2b1d');
    drawRect(x + 139, 518, 32, 7, '#d69a62');
    drawRect(x + 151, 458, 7, 56, '#3f6f3a');
    drawOutlinedRect(x + 126, 456, 29, 17, '#5f9e58', '#274d2b');
    drawOutlinedRect(x + 153, 439, 32, 20, '#79b96a', '#274d2b');
    drawOutlinedRect(x + 142, 475, 28, 18, '#4f8b49', '#274d2b');
    drawRect(x + 25, 500, 40, 10, '#fff0a6');
    drawRect(x + 31, 493, 28, 7, '#d8c49a');
  } else if (variant === 2) {
    const x = 300 + offsetX;
    drawOutlinedRect(x, 420, 100, 140, '#566673', '#202b34');
    drawRect(x + 10, 430, 80, 14, '#7f8f9a');
    drawRect(x + 14, 492, 72, 48, '#2c3740');
    drawOutlinedRect(x + 27, 501, 46, 28, '#d87932', '#522c18');
    drawRect(x + 35, 507, 30, 14, '#ffb347');
    drawOutlinedRect(x + 30, 451, 38, 30, '#e3e8df', '#26343e');
    drawRect(x + 47, 456, 4, 15, '#d9534f');
    drawRect(x + 47, 468, 13, 4, '#d9534f');
    for (let rivetY = 442; rivetY < 540; rivetY += 24) {
      drawRect(x + 7, rivetY, 5, 5, '#b8c4cc');
      drawRect(x + 88, rivetY, 5, 5, '#b8c4cc');
    }
    drawRect(x + 100, 445, 70, 14, '#7c8792');
    drawRect(x + 156, 445, 14, 70, '#7c8792');
    drawRect(x + 144, 505, 38, 10, '#596775');
  } else if (variant === 3) {
    const x = 300 + offsetX;
    drawOutlinedRect(x, 420, 110, 140, '#6b4229', '#28170b');
    for (let shelfY = 454; shelfY < 550; shelfY += 38) {
      drawRect(x + 7, shelfY, 96, 7, '#3d2414');
      for (let book = 0; book < 7; book++) {
        const bookColors = ['#d9534f', '#4fa3d9', '#f0c040', '#67d06b', '#9b6dc4'];
        drawRect(x + 12 + book * 12, shelfY - 24, 9, 24, bookColors[(book + shelfY) % bookColors.length]);
        drawRect(x + 14 + book * 12, shelfY - 19, 5, 2, '#fff0a6');
      }
    }
    drawOutlinedRect(x + 140, 450, 34, 110, '#c9a24a', '#6a5420');
    drawRect(x + 153, 410, 8, 44, '#7c8792');
    drawRect(x + 144, 398, 26, 18, '#ffe58a');
  } else if (variant === 4) {
    const x = 290 + offsetX;
    drawOutlinedRect(x, 465, 150, 20, '#7a4a24', '#2e1a0d');
    drawOutlinedRect(x, 485, 150, 65, '#d9e4ef', '#8fa5b5');
    drawOutlinedRect(x + 10, 490, 45, 22, '#fff8df', '#a8b4c0');
    drawRect(x + 60, 490, 80, 50, '#6c79b8');
    for (let blanketX = x + 67; blanketX < x + 135; blanketX += 18) {
      drawRect(blanketX, 496, 7, 7, '#b8c9ff');
      drawRect(blanketX + 7, 514, 7, 7, '#b8c9ff');
    }
    drawOutlinedRect(x + 160, 510, 44, 40, '#7a4a24', '#2e1a0d');
    drawRect(x + 178, 480, 6, 30, '#c9a24a');
    drawRect(x + 166, 466, 30, 16, '#ffe58a');
  } else if (variant === 5) {
    const x = 310 + offsetX;
    drawOutlinedRect(x, 495, 120, 18, '#8a6238', '#3d240d');
    drawRect(x + 8, 513, 10, 47, '#5c4028');
    drawRect(x + 102, 513, 10, 47, '#5c4028');
    drawOutlinedRect(x + 18, 450, 70, 45, '#20262e', '#0d1116');
    drawRect(x + 26, 458, 54, 28, '#7ee7ff');
    drawRect(x + 31, 464, 30, 4, '#287c9b');
    drawRect(x + 31, 473, 40, 3, '#d8f7ff');
    drawRect(x + 35, 502, 62, 6, '#39434c');
    for (let keyX = x + 39; keyX < x + 91; keyX += 10) drawRect(keyX, 503, 6, 3, '#9fb6c6');
    drawOutlinedRect(x + 105, 530, 45, 30, '#7c8792', '#2f3742');
    drawOutlinedRect(x + 135, 448, 30, 30, '#c9a24a', '#5d491d');
    drawRect(x + 147, 436, 6, 54, '#c9a24a');
    drawRect(x + 123, 460, 54, 6, '#c9a24a');
  } else if (variant === 6) {
    const x = 320 + offsetX;
    drawOutlinedRect(x, 510, 145, 40, '#51445f', '#211a2c');
    drawRect(x + 10, 516, 125, 7, '#78658b');
    drawOutlinedRect(x + 24, 448, 24, 62, '#7ee7ff', '#29445f');
    drawRect(x + 30, 454, 7, 40, '#d8f7ff');
    drawOutlinedRect(x + 52, 466, 34, 44, '#9b7bd0', '#38274e');
    drawRect(x + 60, 472, 8, 27, '#d8bfff');
    drawOutlinedRect(x + 91, 435, 29, 75, '#67c9e8', '#29445f');
    drawRect(x + 98, 443, 7, 48, '#d8f7ff');
    drawRect(x + 18, 548, 112, 4, 'rgba(155,231,255,.28)');
  } else if (variant === 7) {
    const x = 300 + offsetX;
    drawOutlinedRect(x, 500, 135, 60, '#476644', '#1f3423');
    drawRect(x + 10, 510, 50, 20, '#64835a');
    drawRect(x + 70, 510, 50, 20, '#59794f');
    drawRect(x + 12, 542, 110, 10, '#30472f');
    drawRect(x + 20, 440, 7, 65, '#3f6f3a');
    drawRect(x + 102, 430, 7, 75, '#3f6f3a');
    for (let leafY = 448; leafY < 505; leafY += 18) {
      drawRect(x + 7, leafY, 18, 8, '#6c9c58');
      drawRect(x + 103, leafY - 8, 20, 8, '#79aa61');
    }
  } else if (variant === 8) {
    const x = 315 + offsetX;
    drawOutlinedRect(x, 485, 82, 70, '#8a6238', '#3d240d');
    drawRect(x + 8, 494, 66, 8, '#b27b49');
    drawRect(x + 36, 487, 8, 66, '#5f3d22');
    drawOutlinedRect(x + 62, 520, 80, 35, '#725034', '#322216');
    drawRect(x + 71, 527, 61, 5, '#a2744c');
    drawOutlinedRect(x + 28, 438, 67, 47, '#9b7047', '#3d240d');
    drawRect(x + 36, 447, 51, 6, '#c18c58');
    drawRect(x + 55, 440, 7, 43, '#674429');
    drawOutlinedRect(x + 150, 526, 65, 24, '#72526f', '#322438');
    drawRect(x + 158, 532, 49, 5, '#a582a0');
  }
}

function updateObstacles(delta) {
  for (const obstacle of obstacles) {
    if (obstacle.type !== 'spike') continue;

    obstacle.x += obstacle.moveSpeed * obstacle.moveDirection * delta;
    if (obstacle.x > obstacle.originX + obstacle.moveRange) {
      obstacle.x = obstacle.originX + obstacle.moveRange;
      obstacle.moveDirection = -1;
    }
    if (obstacle.x < obstacle.originX - obstacle.moveRange) {
      obstacle.x = obstacle.originX - obstacle.moveRange;
      obstacle.moveDirection = 1;
    }

    if (rect(playerBox(), obstacle)) {
      damagePlayer(15, 'A spike hit you!');
    }
  }
}

function drawPlayer() {
  context.save();
  const submarineBob = submarineActive
    ? Math.sin(performance.now() / 420) * 5
    : 0;
  context.translate(player.x + player.width / 2, player.y + submarineBob);
  context.scale(player.facing, 1);
  if (fantaRushTimer > 0) {
    const sparkleFrame = Math.floor(performance.now() / 120) % 4;
    drawRect(-20, 4 + sparkleFrame * 9, 4, 4, '#fff3a6');
    drawRect(16, 36 - sparkleFrame * 8, 4, 4, '#ffd84d');
    if (player.moving) {
      drawRect(-28, 14, 11, 4, '#ffd84d');
      drawRect(-34, 27, 15, 4, '#fff3a6');
    }
  }
  if (flowJuiceTimer > 0) {
    const bubbleFrame = Math.floor(performance.now() / 150) % 4;
    drawRect(-18, 38 - bubbleFrame * 10, 4, 4, '#ff8fd8');
    drawRect(16, 42 - bubbleFrame * 9, 4, 4, '#79dfff');
    drawRect(-13, 5 + bubbleFrame * 7, 3, 3, '#b8a5ff');
  }
  context.globalAlpha = player.invulnerableTimer > 0 && Math.floor(performance.now() / 100) % 2 === 0
    ? .45
    : 1;

  if (officeChaseActive) {
    drawShadowPlayer();
    context.restore();
    return;
  }

  if (submarineActive) {
    drawOutlinedRect(-24, 12, 54, 28, '#ffd84d', '#123047');
    drawRect(-16, 18, 22, 14, '#9be7ff');
    drawRect(4, 16, 12, 8, '#ff4d5e');
    drawRect(-30, 20, 8, 12, '#7c8792');
    drawRect(-38, 23, 8, 7, '#9fb6c6');
    drawRect(-8, -2, 15, 12, '#67d06b');
    drawRect(-4, -9, 8, 8, '#ff7aa8');
    context.restore();
    return;
  }

  drawAdventurer();

  context.restore();
}

function drawAdventurer() {
  const outline = '#171a24';
  const skin = '#d99b6c';
  const skinLight = '#f0ba87';
  const hair = '#292235';
  const teal = '#159b9b';
  const tealLight = '#42c9bb';
  const tealDark = '#0d646f';
  const scarf = '#ff9f43';
  const scarfDark = '#c65e2a';
  const trousers = '#29334c';
  const boots = '#4b352c';
  const backpack = '#b87536';
  const walkFrame = Math.floor(player.animationTime * 10) % 4;
  const legSwing = player.moving && player.onGround ? [4, 0, -4, 0][walkFrame] : 0;
  const bodyBob = player.onGround
    ? player.moving ? (walkFrame === 1 || walkFrame === 3 ? 1 : 0) : (Math.sin(player.animationTime * 3) > 0 ? 0 : 1)
    : 0;
  const blink = !player.moving && Math.floor(player.animationTime * 1.5) % 4 === 3;

  if (player.sliding) {
    drawRect(-22, 7, 14, 5, scarfDark);
    drawRect(-20, 4, 10, 5, scarf);
    drawOutlinedRect(-15, 8, 10, 14, backpack, '#4c2e1b');
    drawRect(-13, 11, 3, 9, '#e0a34f');
    drawOutlinedRect(-11, 8, 24, 13, teal, outline);
    drawRect(-8, 10, 16, 3, tealLight);
    drawRect(-8, 17, 20, 3, tealDark);
    drawOutlinedRect(-1, 0, 15, 14, skin, outline);
    drawRect(10, 6, 4, 5, skinLight);
    drawRect(-2, -2, 16, 5, hair);
    drawRect(-3, 1, 5, 8, hair);
    drawRect(1, 0, 12, 2, '#6b4a2c');
    drawOutlinedRect(2, -1, 5, 5, '#ffe779', '#493820');
    drawOutlinedRect(8, -1, 5, 5, '#ffe779', '#493820');
    drawRect(3, 0, 3, 2, '#9be7ff');
    drawRect(9, 0, 3, 2, '#9be7ff');
    drawRect(9, 6, 2, blink ? 1 : 3, outline);
    drawRect(9, 12, 4, 1, '#8b4938');
    drawRect(-2, 13, 17, 4, scarf);
    drawRect(8, 16, 6, 5, scarfDark);
    drawOutlinedRect(-9, 18, 11, 8, boots, '#261b18');
    drawOutlinedRect(5, 18, 11, 8, boots, '#261b18');
    drawRect(-7, 18, 7, 3, trousers);
    drawRect(6, 18, 7, 3, trousers);
    drawOutlinedRect(5, 11, 8, 8, tealDark, outline);
    drawRect(10, 16, 5, 4, skinLight);
    return;
  }

  const scarfReach = player.moving || !player.onGround ? 6 : 0;
  drawRect(-18 - scarfReach, 16 + bodyBob, 12 + scarfReach, 5, scarfDark);
  drawRect(-16 - scarfReach, 12 + bodyBob, 9 + scarfReach, 5, scarf);
  drawOutlinedRect(-15, 17 + bodyBob, 9, 19, backpack, '#4c2e1b');
  drawRect(-13, 20 + bodyBob, 3, 12, '#e0a34f');
  drawRect(-15, 25 + bodyBob, 9, 3, '#7c4727');

  if (!player.onGround) {
    drawOutlinedRect(-9, 30, 8, 9, trousers, outline);
    drawOutlinedRect(3, 31, 8, 8, trousers, outline);
    drawOutlinedRect(-11, 36, 11, 8, boots, '#261b18');
    drawOutlinedRect(4, 38, 11, 8, boots, '#261b18');
    drawRect(-9, 41, 9, 3, '#8a6544');
    drawRect(6, 43, 9, 3, '#8a6544');
  } else {
    drawRect(-8 - legSwing, 31, 7, 10, trousers);
    drawRect(1 + legSwing, 31, 7, 10, trousers);
    drawRect(-7 - legSwing, 32, 2, 8, '#3e4c6d');
    drawRect(2 + legSwing, 32, 2, 8, '#3e4c6d');
    drawOutlinedRect(-11 - legSwing, 40, 11, 8, boots, '#261b18');
    drawOutlinedRect(1 + legSwing, 40, 11, 8, boots, '#261b18');
    drawRect(-9 - legSwing, 44, 9, 2, '#8a6544');
    drawRect(3 + legSwing, 44, 9, 2, '#8a6544');
  }

  if (!player.onGround) {
    drawOutlinedRect(-14, 9 + bodyBob, 7, 15, tealDark, outline);
    drawRect(-14, 7 + bodyBob, 6, 5, skinLight);
  } else {
    drawOutlinedRect(-13 + legSwing, 18 + bodyBob, 7, 13, tealDark, outline);
    drawRect(-12 + legSwing, 28 + bodyBob, 6, 4, skinLight);
  }

  drawOutlinedRect(-10, 15 + bodyBob, 20, 17, teal, outline);
  drawRect(-7, 17 + bodyBob, 4, 11, tealLight);
  drawRect(6, 17 + bodyBob, 2, 11, tealDark);
  drawRect(-10, 27 + bodyBob, 20, 4, trousers);
  drawRect(-1, 17 + bodyBob, 2, 10, '#d8f3dc');
  drawRect(2, 19 + bodyBob, 2, 2, '#ffe779');
  drawRect(2, 23 + bodyBob, 2, 2, '#ffe779');

  drawOutlinedRect(-7, 2 + bodyBob, 16, 14, skin, outline);
  drawRect(-4, 5 + bodyBob, 4, 6, skinLight);
  drawRect(8, 8 + bodyBob, 3, 4, skinLight);
  drawRect(-8, bodyBob, 18, 5, hair);
  drawRect(-9, 3 + bodyBob, 5, 9, hair);
  drawRect(-6, -2 + bodyBob, 6, 4, hair);
  drawRect(1, -3 + bodyBob, 6, 5, hair);
  drawRect(6, -1 + bodyBob, 5, 4, hair);
  drawRect(-7, 2 + bodyBob, 16, 2, '#6b4a2c');
  drawOutlinedRect(-6, 1 + bodyBob, 7, 5, '#ffe779', '#493820');
  drawOutlinedRect(2, 1 + bodyBob, 7, 5, '#ffe779', '#493820');
  drawRect(-4, 2 + bodyBob, 4, 2, '#9be7ff');
  drawRect(4, 2 + bodyBob, 4, 2, '#9be7ff');
  drawRect(4, 8 + bodyBob, 2, blink ? 1 : 3, outline);
  drawRect(3, 13 + bodyBob, 5, 1, '#8b4938');

  if (!player.onGround) {
    drawOutlinedRect(8, 8 + bodyBob, 7, 14, teal, outline);
    drawRect(10, 5 + bodyBob, 6, 5, skinLight);
  } else {
    drawOutlinedRect(6 - legSwing, 17 + bodyBob, 7, 13, teal, outline);
    drawRect(7 - legSwing, 27 + bodyBob, 6, 4, skinLight);
  }

  drawRect(-9, 14 + bodyBob, 20, 5, scarf);
  drawRect(-7, 14 + bodyBob, 12, 2, '#ffc266');
  drawRect(5, 18 + bodyBob, 7, 6, scarfDark);
  drawRect(7, 18 + bodyBob, 4, 3, scarf);
}

function drawShadowPlayer() {
  const bodyColor = '#0b0f14';
  const outlineColor = '#5d6b78';
  const stickyColor = '#ffd84d';

  if (player.sliding) {
    drawOutlinedRect(-16, 24, 34, 18, bodyColor, outlineColor);
    drawOutlinedRect(-4, 16, 20, 17, stickyColor, '#8a6d00');
    drawRect(-1, 21, 3, 4, '#171a20');
    drawRect(6, 21, 3, 4, '#171a20');
    drawRect(-1, 28, 10, 2, '#171a20');
    return;
  }

  if (!player.onGround) {
    drawOutlinedRect(-12, 12, 26, 24, bodyColor, outlineColor);
    drawOutlinedRect(-4, 2, 20, 18, stickyColor, '#8a6d00');
    drawRect(-1, 8, 3, 5, '#171a20');
    drawRect(6, 8, 3, 5, '#171a20');
    drawRect(-2, 6, 6, 2, '#171a20');
    drawRect(5, 6, 6, 2, '#171a20');
    drawRect(-1, 15, 10, 2, '#171a20');
    drawOutlinedRect(-16, 18, 10, 9, bodyColor, outlineColor);
    drawOutlinedRect(8, 18, 10, 9, bodyColor, outlineColor);
    return;
  }

  const walkFrame = Math.floor(player.animationTime * 10) % 4;
  const legSwing = player.moving ? [4, 0, -4, 0][walkFrame] : 0;
  const bodyBob = player.moving && (walkFrame === 1 || walkFrame === 3) ? 1 : 0;

  drawOutlinedRect(-12 - legSwing, 38, 10, 10, bodyColor, outlineColor);
  drawOutlinedRect(2 + legSwing, 38, 10, 10, bodyColor, outlineColor);
  drawOutlinedRect(-13, 12 + bodyBob, 27, 28, bodyColor, outlineColor);
  drawOutlinedRect(-5, -4 + bodyBob, 23, 21, stickyColor, '#8a6d00');

  drawRect(-2, 3 + bodyBob, 4, 5, '#171a20');
  drawRect(7, 3 + bodyBob, 4, 5, '#171a20');
  drawRect(-3, 1 + bodyBob, 7, 2, '#171a20');
  drawRect(6, 1 + bodyBob, 7, 2, '#171a20');
  drawRect(-1, 12 + bodyBob, 12, 2, '#171a20');

  drawOutlinedRect(-18, 16 + bodyBob, 10, 13, bodyColor, outlineColor);
  drawOutlinedRect(10, 16 + bodyBob, 10, 13, bodyColor, outlineColor);
}

function drawFlashlight() {
  if (!roomIsDark || !hasFlashlight) return;

  const startX = player.x + player.width / 2;
  const startY = player.y + player.height / 2;
  const beamLength = 280;
  const beamSpread = 95;
  const endX = startX + player.facing * beamLength;
  const endTopY = startY - beamSpread / 2;
  const endBottomY = startY + beamSpread / 2;

  lightingContext.globalCompositeOperation = 'source-over';
  lightingContext.clearRect(0, 0, canvas.width, canvas.height);
  lightingContext.fillStyle = 'rgba(0,0,0,.82)';
  lightingContext.fillRect(0, 0, canvas.width, canvas.height);
  lightingContext.globalCompositeOperation = 'destination-out';
  lightingContext.fillStyle = 'rgba(255,255,255,1)';
  lightingContext.beginPath();
  lightingContext.arc(startX, startY, 42, 0, Math.PI * 2);
  lightingContext.fill();
  lightingContext.beginPath();
  lightingContext.moveTo(startX, startY);
  lightingContext.lineTo(endX, endTopY);
  lightingContext.lineTo(endX, endBottomY);
  lightingContext.closePath();
  lightingContext.fill();
  lightingContext.globalCompositeOperation = 'source-over';

  context.drawImage(lightingCanvas, 0, 0);

  const glow = context.createRadialGradient(startX, startY, 0, startX, startY, beamLength);
  glow.addColorStop(0, 'rgba(255,241,178,.2)');
  glow.addColorStop(.65, 'rgba(255,241,178,.07)');
  glow.addColorStop(1, 'rgba(255,241,178,0)');
  context.fillStyle = glow;
  context.beginPath();
  context.arc(startX, startY, 42, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endTopY);
  context.lineTo(endX, endBottomY);
  context.closePath();
  context.fill();
}

function drawGardenRain() {
  if (currentFloor !== 'garden' || (gardenChaseActive && !mountainChaseActive)) return;

  context.fillStyle = 'rgba(4,10,28,.18)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const time = performance.now() / 1000;
  for (let index = 0; index < 120; index++) {
    const speed = 520 + (index % 6) * 45;
    const dropY = Math.floor((index * 67 + time * speed) % (canvas.height + 80)) - 40;
    const dropX = Math.floor(((index * 97 + currentDoor * 23 - dropY * .08) % (canvas.width + 80) + canvas.width + 80) % (canvas.width + 80)) - 40;
    drawRect(dropX, dropY, 2, 16, index % 4 === 0 ? 'rgba(209,234,255,.65)' : 'rgba(158,208,255,.5)');
  }

  for (let index = 0; index < 10; index++) {
    const puddleX = (index * 103 + currentDoor * 17) % (canvas.width - 70);
    drawRect(puddleX, groundY + 24 + (index % 3) * 8, 46, 4, 'rgba(126,184,238,.22)');
  }
}

function drawGardenTree(x, variant) {
  const lean = variant % 2 === 0 ? -2 : 2;
  const trunkX = x + lean;

  drawRect(x - 34, 550, 88, 8, 'rgba(3,8,14,.35)');
  drawRect(x - 18, 548, 26, 14, '#322219');
  drawRect(x + 14, 548, 26, 14, '#322219');
  drawRect(trunkX - 4, 540, 32, 20, '#3b2b20');
  drawRect(trunkX, 440, 22, 110, '#4a382a');
  drawRect(trunkX + 4, 450, 4, 90, '#5f4b39');
  drawRect(trunkX + 13, 462, 3, 70, '#6a5440');
  drawRect(trunkX + 6, 500, 5, 18, '#31231a');
  drawRect(trunkX + 15, 482, 4, 24, '#352720');

  drawRect(trunkX - 20, 420, 28, 8, '#42311f');
  drawRect(trunkX - 32, 406, 16, 8, '#3d2c20');
  drawRect(trunkX + 18, 424, 30, 8, '#42311f');
  drawRect(trunkX + 40, 408, 16, 8, '#3d2c20');

  drawRect(x - 48, 352, 100, 72, '#172d22');
  drawRect(x - 36, 318, 78, 54, '#193527');
  drawRect(x - 24, 296, 52, 42, '#1b3b2b');
  drawRect(x - 44, 374, 92, 36, '#204432');
  drawRect(x - 30, 332, 60, 34, '#275038');
  drawRect(x - 16, 308, 34, 28, '#2c573d');
  drawRect(x - 40, 356, 54, 12, '#316245');
  drawRect(x - 26, 324, 36, 8, '#376b4a');
  drawRect(x - 14, 302, 20, 7, '#3b7050');
  drawRect(x - 48, 384, 100, 8, '#122719');
  drawRect(x - 36, 350, 78, 7, '#162e1f');
  drawRect(x - 24, 328, 52, 7, '#183322');
  drawRect(x - 38, 352, 24, 5, 'rgba(172,214,255,.24)');
  drawRect(x - 22, 320, 18, 4, 'rgba(172,214,255,.2)');
}

function drawGardenStonePath() {
  drawRect(180, 570, 620, 30, '#1b2e26');
  for (let index = 0; index < 9; index++) {
    const stoneX = 190 + index * 68 + (currentDoor % 3) * 5;
    drawRect(stoneX, 574, 40, 14, '#43584d');
    drawRect(stoneX + 4, 578, 30, 5, '#576d61');
    drawRect(stoneX + 8, 584, 20, 4, '#354a40');
  }
}

function drawGardenLantern(x, y) {
  drawRect(x, y, 10, 74, '#28343b');
  drawRect(x - 6, y + 18, 22, 5, '#28343b');
  drawOutlinedRect(x - 7, y - 26, 24, 32, '#ffdc4d', '#28343b');
  drawRect(x - 3, y - 21, 16, 22, 'rgba(255,236,150,.45)');
}

function drawGardenBench(x, y) {
  drawRect(x, y, 86, 12, '#6a5440');
  drawRect(x + 6, y + 12, 9, 32, '#4a382a');
  drawRect(x + 70, y + 12, 9, 32, '#4a382a');
  drawRect(x, y - 25, 86, 10, '#5c4636');
  drawRect(x + 6, y - 15, 9, 15, '#4a382a');
  drawRect(x + 70, y - 15, 9, 15, '#4a382a');
}

function drawGardenFlowerPatch(x, y, variant) {
  drawRect(x, y + 12, 94, 18, '#173826');
  drawRect(x + 8, y + 16, 78, 7, '#1d4830');
  for (let index = 0; index < 7; index++) {
    const flowerX = x + 6 + index * 12 + (variant + index) % 4;
    drawRect(flowerX, y, 4, 15, '#2b5b3c');
    drawRect(flowerX - 3, y - 5, 10, 7, index % 2 === 0 ? '#ff7aa8' : '#ffd84d');
    drawRect(flowerX, y - 8, 4, 4, '#fff2b8');
  }
}

function drawGardenHedge(x, y, width) {
  drawRect(x, y + 24, width, 18, '#15301f');
  for (let index = 0; index < width; index += 16) {
    drawRect(x + index, y, 24, 30, index % 32 === 0 ? '#1d4129' : '#204731');
    drawRect(x + index + 5, y - 7, 13, 10, '#275038');
  }
}

function drawGardenPond(x, y) {
  drawRect(x, y + 18, 190, 58, '#0e2531');
  drawRect(x + 12, y, 166, 18, '#0c211f');
  drawRect(x + 16, y + 22, 158, 40, '#173c4d');
  drawRect(x + 30, y + 32, 120, 8, 'rgba(158,208,255,.4)');
  drawRect(x + 52, y + 46, 64, 5, 'rgba(209,234,255,.28)');
  drawRect(x + 18, y + 68, 154, 8, '#123526');
}

function drawGardenGazebo(x, y) {
  drawRect(x + 10, y + 76, 10, 70, '#4a382a');
  drawRect(x + 120, y + 76, 10, 70, '#4a382a');
  drawRect(x, y + 66, 140, 12, '#5c4636');
  drawRect(x + 14, y + 82, 112, 9, '#4a382a');
  drawRect(x + 20, y, 100, 14, '#3e2b20');
  drawRect(x + 30, y - 16, 80, 17, '#4b341e');
  drawRect(x + 52, y - 34, 36, 19, '#5c4636');
  drawRect(x + 26, y + 18, 8, 48, '#2b5b3c');
  drawRect(x + 106, y + 24, 8, 42, '#2b5b3c');
}

function drawGardenScenery() {
  const treePositions = [
    [70, 1], [230, 2], [410, 3], [620, 4], [810, 5], [900, 6]
  ];
  for (const [x, variant] of treePositions) drawGardenTree(x, variant + currentDoor % 3);

  drawGardenStonePath();
  drawGardenLantern(78, 480);
  drawGardenLantern(875, 480);

  const roomGroup = Math.ceil(currentDoor / 5);
  if (roomGroup % 2 === 1) {
    drawGardenFlowerPatch(140, 466, currentDoor);
    drawGardenFlowerPatch(650, 486, currentDoor + 2);
  } else {
    drawGardenHedge(130, 430, 150);
    drawGardenHedge(690, 450, 150);
  }

  if (roomGroup === 2 || roomGroup === 7) drawGardenBench(360, 484);
  if (roomGroup === 3 || roomGroup === 8) drawGardenPond(390, 470);
  if (roomGroup === 4 || roomGroup === 9) drawGardenGazebo(405, 370);
  if (roomGroup === 5 || roomGroup === 10) {
    drawGardenFlowerPatch(105, 462, currentDoor + 1);
    drawGardenBench(305, 500);
    drawGardenFlowerPatch(650, 470, currentDoor + 3);
  }
}

function gardenRandom(seed) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function drawRandomGroundFlowers() {
  for (let index = 0; index < 18; index++) {
    const seed = currentDoor * 100 + index;
    const x = 16 + Math.floor(gardenRandom(seed) * 920);
    const y = 568 + Math.floor(gardenRandom(seed + 41) * 50);
    const stemHeight = 18 + Math.floor(gardenRandom(seed + 83) * 12);
    const flowerColor = gardenRandom(seed + 127) > .5 ? '#ff7aa8' : '#ffd84d';

    drawRect(x, y - stemHeight, 5, stemHeight, gardenRandom(seed + 173) > .5 ? '#2c5f3f' : '#376b4a');
    drawRect(x - 4, y - stemHeight - 8, 13, 9, flowerColor);
    drawRect(x - 1, y - stemHeight - 11, 7, 5, '#fff2b8');
    drawRect(x - 8, y - 3, 6, 4, 'rgba(172,214,255,.18)');
    drawRect(x + 8, y - 1, 6, 4, 'rgba(172,214,255,.14)');
  }
}

function drawMonster() {
  if (!monsterActive) return;
  const x = monster.x;
  const y = monster.y;
  const stride = Math.sin(performance.now() / 85) * 4;
  const eyeColor = Math.floor(performance.now() / 170) % 2 === 0 ? '#ffdc4a' : '#ffb52e';

  drawRect(x - 26, y + 20, 18, 4, 'rgba(255,77,94,.32)');
  drawRect(x - 18, y + 38, 14, 3, 'rgba(255,216,77,.24)');
  drawRect(x - 5, y + 60, 48, 6, 'rgba(0,0,0,.32)');
  drawOutlinedRect(x + 4 + stride, y + 45, 10, 15, '#5b1d25', '#22070c');
  drawOutlinedRect(x + 22 - stride, y + 45, 10, 15, '#5b1d25', '#22070c');
  drawRect(x + 1 + stride, y + 57, 16, 7, '#2a0d12');
  drawRect(x + 19 - stride, y + 57, 16, 7, '#2a0d12');
  drawOutlinedRect(x + 1, y + 23, 34, 31, '#8b2f3b', '#22070c');
  drawRect(x + 8, y + 31, 20, 14, '#a83c48');
  drawOutlinedRect(x - 7, y + 28 + stride, 10, 23, '#742630', '#22070c');
  drawOutlinedRect(x + 33, y + 28 - stride, 10, 23, '#742630', '#22070c');
  drawRect(x - 9, y + 47 + stride, 5, 5, '#e5d7c1');
  drawRect(x + 41, y + 47 - stride, 5, 5, '#e5d7c1');
  drawOutlinedRect(x - 2, y + 3, 40, 29, '#963541', '#22070c');
  drawRect(x + 1, y - 6, 8, 12, '#4a1218');
  drawRect(x + 27, y - 6, 8, 12, '#4a1218');
  drawRect(x + 3, y - 8, 4, 5, '#d9c8ad');
  drawRect(x + 29, y - 8, 4, 5, '#d9c8ad');
  drawRect(x + 6, y + 12, 8, 8, eyeColor);
  drawRect(x + 22, y + 12, 8, 8, eyeColor);
  drawRect(x + 9, y + 14, 3, 5, '#24100a');
  drawRect(x + 22, y + 14, 3, 5, '#24100a');
  drawRect(x + 7, y + 25, 23, 6, '#320b10');
  drawRect(x + 10, y + 25, 4, 4, '#f4f0df');
  drawRect(x + 21, y + 25, 4, 4, '#f4f0df');
}

function drawCellarMonster() {
  if (!cellarMonsterActive) return;

  const monster = cellarMonster;
  const shake = monster.state === 'warning' ? Math.sin(performance.now() / 45) * 2 : 0;
  const bob = Math.sin(performance.now() / 180) * 1.5;
  const x = monster.x + shake;
  const y = monster.y + bob;
  const headX = monster.direction < 0 ? x - 7 : x + 43;
  const eyeColor = monster.state === 'charge' ? '#ff4d5e' : '#7ee7ff';

  drawRect(x + 3, monster.y + 43, 60, 8, 'rgba(0,0,0,.35)');
  for (let leg = 0; leg < 3; leg++) {
    drawOutlinedRect(x + 8 + leg * 18, y + 34, 10, 15, '#251b38', '#0c0912');
  }
  drawRect(monster.direction < 0 ? x + 54 : x - 7, y + 23, 17, 8, '#3d2b59');
  drawOutlinedRect(x + 4, y + 10, 56, 30, '#3d2b59', '#120f1c');
  for (let spike = 0; spike < 4; spike++) {
    drawRect(x + 12 + spike * 12, y + 4, 7, 8, spike % 2 === 0 ? '#8c68ad' : '#6e4b91');
  }
  drawOutlinedRect(headX, y + 17, 28, 25, '#573b78', '#120f1c');
  drawRect(headX + 5, y + 23, 6, 6, eyeColor);
  drawRect(headX + 17, y + 23, 6, 6, eyeColor);
  drawRect(headX + 8, y + 34, 13, 4, '#1a1025');
  drawRect(headX + 10, y + 34, 3, 4, '#f4f0df');
  drawRect(headX + 16, y + 34, 3, 4, '#f4f0df');

  if (monster.state === 'warning') {
    const blink = Math.floor(performance.now() / 120) % 2 === 0;
    drawRect(x + 28, monster.y - 22, 9, 17, blink ? '#ff4d5e' : '#ffd84d');
    drawRect(x + 28, monster.y - 1, 9, 7, blink ? '#ff4d5e' : '#ffd84d');
    for (let arrow = 0; arrow < 4; arrow++) {
      const arrowX = x + 32 + monster.direction * (52 + arrow * 28);
      drawPolyline([
        [arrowX - monster.direction * 8, groundY - 18],
        [arrowX, groundY - 9],
        [arrowX - monster.direction * 8, groundY]
      ], blink ? '#ff4d5e' : '#ffd84d', 4);
    }
  }

  if (monster.state === 'charge') {
    const trailX = monster.direction < 0 ? x + 70 : x - 30;
    drawRect(trailX, y + 18, 24, 4, 'rgba(126,231,255,.45)');
    drawRect(trailX + 8, y + 30, 18, 3, 'rgba(126,231,255,.25)');
  }
}

function drawCellarMonsterGlow() {
  if (!cellarMonsterActive) return;

  const monster = cellarMonster;
  const shake = monster.state === 'warning' ? Math.sin(performance.now() / 45) * 2 : 0;
  const bob = Math.sin(performance.now() / 180) * 1.5;
  const x = monster.x + shake;
  const y = monster.y + bob;
  const headX = monster.direction < 0 ? x - 7 : x + 43;
  const eyeColor = monster.state === 'charge' ? '#ff4d5e' : '#7ee7ff';

  context.save();
  context.shadowColor = eyeColor;
  context.shadowBlur = 14;
  drawRect(headX + 5, y + 23, 6, 6, eyeColor);
  drawRect(headX + 17, y + 23, 6, 6, eyeColor);
  if (monster.state === 'warning') {
    const warningColor = Math.floor(performance.now() / 120) % 2 === 0 ? '#ff4d5e' : '#ffd84d';
    context.shadowColor = warningColor;
    drawRect(x + 28, monster.y - 22, 9, 17, warningColor);
    drawRect(x + 28, monster.y - 1, 9, 7, warningColor);
  }
  context.restore();
}

function drawBoss() {
  if (!bossActive) return;
  drawBossTelegraph();
  const x = boss.x;
  const y = boss.y;
  const width = boss.width;
  const height = boss.height;
  const phaseColor = boss.phase === 2 ? '#ff8c55' : '#ff4d5e';
  const armSwing = boss.attacking ? 10 : Math.sin(performance.now() / 180) * 3;

  drawRect(x - 12, groundY - 8, width + 24, 8, 'rgba(0,0,0,.35)');
  drawOutlinedRect(x + 12, y + height - 22, 25, 24, '#4a1820', '#22070c');
  drawOutlinedRect(x + width - 37, y + height - 22, 25, 24, '#4a1820', '#22070c');
  drawRect(x + 6, groundY - 10, 34, 10, '#2a0d12');
  drawRect(x + width - 40, groundY - 10, 34, 10, '#2a0d12');
  drawOutlinedRect(x - 13, y + 48 + armSwing, 18, 48, '#742630', '#22070c');
  drawOutlinedRect(x + width - 5, y + 48 - armSwing, 18, 48, '#742630', '#22070c');
  drawRect(x - 16, y + 88 + armSwing, 8, 8, '#e5d7c1');
  drawRect(x + width + 8, y + 88 - armSwing, 8, 8, '#e5d7c1');

  const useBossImage = !bossIsReturn && bossImage.complete && bossImage.naturalWidth > 0;
  if (useBossImage) {
    context.drawImage(bossImage, x, y, width, height);
  } else {
    drawOutlinedRect(x, y, width, height, '#8b2f3b', '#22070c');
    drawRect(x + 10, y + 44, width - 20, height - 58, '#9f3542');
    drawRect(x + 18, y + height - 30, width - 36, 12, '#5b1d25');
    drawRect(x + 16, y + 22, 16, 18, '#ffdc4a');
    drawRect(x + width - 32, y + 22, 16, 18, '#ffdc4a');
    drawRect(x + 21, y + 27, 6, 9, '#351208');
    drawRect(x + width - 27, y + 27, 6, 9, '#351208');
    drawOutlinedRect(x + 18, y + 62, width - 36, 20, '#320b10', '#22070c');
    for (let tooth = 0; tooth < 4; tooth++) {
      drawRect(x + 24 + tooth * ((width - 48) / 3), y + 64, 7, 8, '#f4f0df');
    }
  }

  drawRect(x + 8, y - 14, 16, 22, '#4a1218');
  drawRect(x + width - 24, y - 14, 16, 22, '#4a1218');
  drawRect(x + 11, y - 20, 8, 10, '#d9c8ad');
  drawRect(x + width - 19, y - 20, 8, 10, '#d9c8ad');
  drawRect(x + 22, y + 48, width - 44, 5, phaseColor);
  drawRect(x + 30, y + 54, width - 60, 4, phaseColor);

  const healthBarY = y - 34;
  drawRect(x, healthBarY, width, 12, '#22070c');
  drawRect(x + 2, healthBarY + 2, (width - 4) * (boss.health / boss.maxHealth), 8, phaseColor);
}

function drawBossTelegraph() {
  if (boss.phase === 2) {
    const pulse = Math.floor(performance.now() / 130) % 2 === 0;
    drawRect(boss.x - 8, boss.y - 8, boss.width + 16, boss.height + 16, pulse ? 'rgba(255,77,94,.18)' : 'rgba(255,145,77,.12)');
  }

  const warning = !boss.attacking && boss.chargeTimer <= (boss.phase === 2 ? .55 : .45);
  if (warning) {
    const blink = Math.floor(performance.now() / 110) % 2 === 0;
    const centerX = boss.x + boss.width / 2;
    context.save();
    context.textAlign = 'center';
    context.font = 'bold 18px monospace';
    context.fillStyle = blink ? '#ff4d5e' : '#ffd84d';
    context.fillText('CHARGE!', centerX, boss.y - 42);
    context.font = 'bold 34px monospace';
    context.fillText('!', centerX, boss.y - 12);
    context.restore();
    for (let arrow = 0; arrow < 3; arrow++) {
      const arrowX = centerX + boss.direction * (54 + arrow * 22);
      drawPolyline([
        [arrowX - boss.direction * 7, groundY - 14],
        [arrowX, groundY - 7],
        [arrowX - boss.direction * 7, groundY]
      ], blink ? '#ff4d5e' : '#ffd84d', 4);
    }
  }

  if (boss.attacking) {
    for (let trail = 0; trail < 4; trail++) {
      const trailX = boss.x - boss.direction * (12 + trail * 15);
      drawRect(trailX, boss.y + 28 + trail * 17, 18, 4, trail % 2 === 0 ? 'rgba(255,216,77,.55)' : 'rgba(255,77,94,.4)');
    }
  }
}

function chaseEncounter(name, startDoor, endDoor, pursuerX, color) {
  return {
    name,
    detail: `${endDoor - currentDoor + 1} DOORS LEFT`,
    completed: currentDoor - startDoor,
    total: endDoor - startDoor + 1,
    pursuerX,
    distance: player.x + player.width / 2 - pursuerX,
    warning: pursuerX < 0,
    color
  };
}

function currentEncounter() {
  if (bossActive) {
    const warning = !boss.attacking && boss.chargeTimer <= (boss.phase === 2 ? .55 : .45);
    return {
      name: bossIsReturn ? 'THE RETURNING MONSTER' : 'THE PARK DEMON',
      detail: boss.attacking ? 'CHARGING - DODGE!' : warning ? 'CHARGE INCOMING!' : `PHASE ${boss.phase} - ${boss.health} STOMPS LEFT`,
      completed: boss.maxHealth - boss.health,
      total: boss.maxHealth,
      color: boss.phase === 2 ? '#ff8c55' : '#ff4d5e'
    };
  }
  if (monsterActive) return chaseEncounter('THE PARK MONSTER', monsterStartDoor, monsterEndDoor, monster.x, '#ff6b62');
  if (mountainChaseActive) return chaseEncounter('THREE-LEGGED TREE MONSTER', gardenGroundChaseStartDoor, gardenGroundChaseEndDoor, vineMonster.x, '#ff8f8f');
  if (gardenChaseActive) return chaseEncounter('VINE FLOWER SUBMARINE CHASE', gardenChaseStartDoor, gardenChaseEndDoor, vineMonster.x, '#f7a8c4');
  if (officeChaseActive) return chaseEncounter('RUNAWAY PRINTING MACHINE', officeChaseStartDoor, officeChaseEndDoor, officeMonster.x, '#ff8c55');
  if (cellarMonsterActive) {
    const encounter = chaseEncounter('GLOOM CRAWLER', 3, 8, cellarMonster.x, '#b89be0');
    encounter.detail = `${8 - currentDoor + 1} DOORS - ${cellarMonster.state.toUpperCase()}`;
    return encounter;
  }
  if (vineMonsterActive) {
    return {
      name: 'GIANT VINE FLOWER',
      detail: vineMonster.mouthOpen ? 'MOUTH OPEN - STAND STILL!' : 'MOUTH CLOSED - RUN!',
      completed: 0,
      total: 0,
      progress: 1 - Math.max(0, vineMonster.mouthTimer) / (vineMonster.mouthOpen ? 1.2 : 1.6),
      color: vineMonster.mouthOpen ? '#ff4d5e' : '#67d06b'
    };
  }
  if (rushActive) {
    return {
      name: 'ROCKET',
      detail: rushWarningTimer > 0 ? `INCOMING IN ${Math.ceil(rushWarningTimer)} - HIDE!` : 'ROCKET IS HERE - HIDE!',
      completed: 0,
      total: 0,
      progress: rushWarningTimer > 0 ? 1 - rushWarningTimer / 5 : 1,
      pursuerX: rush.x,
      distance: player.x - rush.x,
      warning: rushWarningTimer > 0 || rush.x < 0,
      color: '#ff8c55'
    };
  }
  return null;
}

function drawEncounterHud() {
  const encounter = currentEncounter();
  if (!encounter) return;
  const danger = encounter.distance > 0 && encounter.distance < 220;
  drawOutlinedRect(230, 84, 500, 72, 'rgba(7,12,20,.88)', encounter.color);
  drawRect(236, 90, 5, 60, encounter.color);

  context.save();
  context.textAlign = 'center';
  context.font = 'bold 16px monospace';
  context.fillStyle = encounter.color;
  context.fillText(encounter.name, 480, 106);
  context.font = 'bold 12px monospace';
  context.fillStyle = danger ? '#ffd84d' : '#d8e5ed';
  context.fillText(danger ? 'DANGER CLOSE - KEEP MOVING!' : encounter.detail, 480, 125);
  context.restore();

  if (encounter.total > 0) {
    const gap = 4;
    const pipWidth = Math.min(32, (420 - (encounter.total - 1) * gap) / encounter.total);
    const totalWidth = encounter.total * pipWidth + (encounter.total - 1) * gap;
    const startX = 480 - totalWidth / 2;
    for (let index = 0; index < encounter.total; index++) {
      const color = index < encounter.completed ? encounter.color : index === encounter.completed ? '#ffd84d' : '#26313c';
      drawRect(startX + index * (pipWidth + gap), 136, pipWidth, 8, color);
    }
  } else {
    drawRect(270, 136, 420, 8, '#26313c');
    drawRect(270, 136, 420 * Math.max(0, Math.min(1, encounter.progress)), 8, encounter.color);
  }
}

function drawEncounterEffects() {
  const encounter = currentEncounter();
  if (encounter && encounter.pursuerX !== undefined) {
    const closeBehind = encounter.distance > 0 && encounter.distance < 260;
    if ((encounter.warning || closeBehind) && Math.floor(performance.now() / 130) % 2 === 0) {
      drawRect(8, 252, 7, 102, encounter.color);
      context.save();
      context.textAlign = 'center';
      context.font = 'bold 48px monospace';
      context.fillStyle = encounter.color;
      context.fillText('!', 40, 318);
      context.restore();
    }
  }

  if (encounterFlashTimer > 0) {
    const alpha = Math.min(.28, encounterFlashTimer * 1.1);
    drawRect(0, 0, canvas.width, canvas.height, `rgba(${encounterFlashColor},${alpha})`);
  }
}

function mainFloorHasStairs() {
  if (currentFloor !== 'main' || currentDoor === 1) return false;
  const stairDoor = ((currentDoor * 37 + 17) % 100) < 18;
  const darkDoor = currentDoor > rewardDoor && currentDoor % 5 === 0;
  return stairDoor && !darkDoor && !bossActive && currentDoor !== rewardDoor
    && currentDoor !== cellarEntranceDoor && currentDoor !== 65 && currentDoor !== 95
    && !rareRoomActive && !fantaJugActive && !riftCanActive && !flowJuiceActive && !isPermanentRiftActive();
}

function mainFloorGroundAt(xPosition) {
  if (!mainFloorHasStairs()) return groundY;
  if (xPosition < 500) return 424;
  if (xPosition >= 800) return groundY;
  const step = Math.max(0, Math.min(5, Math.floor((xPosition - 500) / 50)));
  return 452 + step * 18;
}

function updateMainFloorStairButton() {
  const visible = mainFloorHasStairs() && !player.hidden && player.onGround
    && player.x + player.width / 2 < 800;
  const label = stairDescentActive ? 'WALKING DOWN...' : 'GO DOWN THE STAIRS';
  stairsDownButton.classList.toggle('hidden', !visible);
  stairsDownButton.disabled = stairDescentActive;
  if (stairsDownButton.textContent !== label) stairsDownButton.textContent = label;
}

function startMainFloorStairDescent() {
  if (stairDescentActive || paused || won || player.hidden || !player.onGround || !mainFloorHasStairs()) return;
  stairDescentActive = true;
  input.clear();
  const previousHeight = player.height;
  player.height = 48;
  player.y += previousHeight - player.height;
  player.sliding = false;
  player.facing = 1;
  stairsDownButton.blur();
  showMessage('Going down the stairs...');
}

function mainFloorElevatorDestination() {
  if (currentFloor !== 'main') return 0;
  const nextSection = Math.floor((currentDoor - 1) / 5) * 5 + 6;
  const sectionStops = [monsterStartDoor, rewardDoor, cellarEntranceDoor, bossDoor, 65, bossReturnDoor, 95, totalDoors];
  const nextStop = sectionStops.find(doorNumber => doorNumber > currentDoor) || totalDoors;
  return nextSection <= nextStop && nextSection <= totalDoors ? nextSection : 0;
}

function mainFloorElevatorActive() {
  if (currentFloor !== 'main' || currentDoor === 1 || !mainFloorElevatorDestination()) return false;
  const appearsHere = ((currentDoor * 53 + 29) % 100) < 16;
  const darkDoor = currentDoor > rewardDoor && currentDoor % 5 === 0;
  return appearsHere && !darkDoor && !monsterActive && !bossActive && currentDoor !== rewardDoor
    && currentDoor !== cellarEntranceDoor && currentDoor !== 65 && currentDoor !== 95
    && !rareRoomActive && !fantaJugActive && !riftCanActive && !flowJuiceActive
    && !mainFloorHasStairs() && !isPermanentRiftActive();
}

function currentRoomTheme() {
  if (fantaJugActive) {
    return {
      wallTop: '#242a30',
      wallMiddle: '#343d43',
      wallLower: '#404a50',
      floor: '#2d3338',
      floorLine: '#59646b',
      detail: 'basement'
    };
  }

  if (currentFloor === 'cellar') {
    return {
      wallTop: '#0d1114',
      wallMiddle: '#182024',
      wallLower: '#222a30',
      floor: '#2c3438',
      floorLine: '#48535a',
      detail: 'cellar'
    };
  }

  if (currentFloor === 'office' && officeSideRoomActive) {
    return {
      wallTop: '#1b2530',
      wallMiddle: '#293644',
      wallLower: '#334452',
      floor: '#414f5c',
      floorLine: '#607284',
      detail: 'officeStorage'
    };
  }

  if (currentFloor === 'office') {
    return {
      wallTop: '#1d2633',
      wallMiddle: '#2b3544',
      wallLower: '#394556',
      floor: '#4b5766',
      floorLine: '#69788a',
      detail: 'office'
    };
  }

  if (currentFloor === 'garden' && mountainChaseActive) {
    return {
      wallTop: '#070c18',
      wallMiddle: '#142432',
      wallLower: '#233745',
      floor: '#2d3a31',
      floorLine: '#4e6353',
      detail: 'mountain'
    };
  }

  if (currentFloor === 'garden' && gardenChaseActive) {
    return {
      wallTop: '#04223a',
      wallMiddle: '#073b56',
      wallLower: '#0b4f6a',
      floor: '#123f56',
      floorLine: '#1f6d8c',
      detail: 'underwater'
    };
  }

  if (currentFloor === 'garden') {
    return {
      wallTop: '#070d22',
      wallMiddle: '#102b25',
      wallLower: '#0b1f18',
      floor: '#123526',
      floorLine: '#1d5238',
      detail: 'garden'
    };
  }

  if (rareRoomActive) {
    return {
      wallTop: '#6f4f31',
      wallMiddle: '#8b5e3c',
      wallLower: '#4a331f',
      floor: '#7f5836',
      floorLine: '#a8754a',
      detail: 'restaurant'
    };
  }
  if (bossActive) {
    if (bossIsReturn) {
      return {
        wallTop: '#3b2d47',
        wallMiddle: '#221a2b',
        wallLower: '#140f18',
        floor: '#2e2438',
        floorLine: '#4d3f60',
        detail: 'bossReturn'
      };
    }

    return {
      wallTop: '#4a1f28',
      wallMiddle: '#2d1418',
      wallLower: '#1b0d10',
      floor: '#3b1b22',
      floorLine: '#5f2b36',
      detail: 'boss'
    };
  }
  if (monsterActive && !mainFloorHasStairs()) return roomThemes[2];
  if (currentDoor === rewardDoor) return roomThemes[9];
  if (isPermanentRiftActive()) {
    return {
      wallTop: '#05091c',
      wallMiddle: '#0b1838',
      wallLower: '#122852',
      floor: '#172a43',
      floorLine: '#28527a',
      detail: 'rift'
    };
  }
  if (mainFloorHasStairs()) {
    return {
      name: 'Grand Stairwell',
      wallpaper: 'deco',
      wallTop: '#4b5268',
      wallMiddle: '#30384c',
      wallLower: '#1d2433',
      floor: '#3b3540',
      floorLine: '#6f6273',
      detail: 'stairwell'
    };
  }
  return roomThemes[Math.floor((currentDoor - 1) / 5) % roomThemes.length];
}

function drawMainFloorStaircase() {
  const firstStepY = 452;
  const stepHeight = 18;
  const stepWidth = 50;
  drawRect(0, 424, 500, groundY - 424, '#202938');
  drawRect(0, 434, 494, groundY - 434, '#303b4b');
  drawRect(0, 424, 500, 6, '#93a0ad');
  drawRect(0, 424, 500, 2, '#c1c9cf');
  drawRect(30, 424, 440, 5, '#633344');
  drawRect(30, 424, 440, 1, '#b38a4d');
  for (let panelX = 24; panelX < 470; panelX += 74) {
    drawOutlinedRect(panelX, 458, 54, 70, '#283442', '#465464');
    drawRect(panelX + 8, 466, 38, 3, '#3c4a59');
  }

  const railPoints = [[480, 394]];
  for (let step = 0; step < 6; step++) {
    const stepX = 500 + step * stepWidth;
    const stepY = firstStepY + step * stepHeight;
    const stoneColor = step % 2 === 0 ? '#4b5868' : '#435161';
    drawRect(stepX, stepY, stepWidth, stepHeight, '#202936');
    drawRect(stepX + 3, stepY + 5, stepWidth - 3, stepHeight - 5, stoneColor);
    drawRect(stepX, stepY, stepWidth, 6, '#93a0ad');
    drawRect(stepX + 5, stepY + 1, stepWidth - 10, 2, '#c1c9cf');
    drawRect(stepX + 12, stepY + 6, 26, stepHeight - 6, '#633344');
    drawRect(stepX + 10, stepY + 6, 3, stepHeight - 6, '#b38a4d');
    drawRect(stepX + 37, stepY + 6, 3, stepHeight - 6, '#b38a4d');
    drawRect(stepX + 14, stepY + 9, 22, 2, '#8e5060');
    drawPolyline([[stepX + 10, stepY + 8], [stepX + 16, stepY + 11], [stepX + 12, stepY + 16]], '#2a3542', 2);
    drawRect(stepX + 42, stepY + 11, 4, 4, '#73808d');

    const postX = stepX + 10;
    const postY = stepY - 30;
    drawPolyline([[postX, stepY], [postX, postY]], '#171d27', 7);
    drawPolyline([[postX, stepY], [postX, postY]], '#8d744c', 3);
    drawRect(postX - 5, stepY - 4, 10, 4, '#4a3c2c');
    drawRect(postX - 4, postY - 4, 8, 8, '#c0a068');
    railPoints.push([postX, postY]);
  }

  drawPolyline(railPoints, '#171d27', 9);
  drawPolyline(railPoints, '#725c3c', 5);
  drawPolyline(railPoints.map(point => [point[0], point[1] - 2]), '#d0b37a', 1.5);
  drawRect(794, 552, 38, 8, '#202936');
  drawRect(800, 552, 32, 3, '#8c98a8');
}

function drawRoomDetails(theme) {
  if (theme.detail === 'stairwell') {
    drawMainFloorStaircase();
    return;
  }

  if (theme.detail === 'rift') {
    drawRiftRoomDetails();
    return;
  }

  if (theme.detail === 'office') {
    drawOfficeRoomDetails();
    return;
  }

  if (theme.detail === 'officeStorage') {
    drawStorageRoomDetails();
    return;
  }

  if (theme.detail === 'mountain') {
    drawRect(0, 0, canvas.width, 220, '#070c18');
    drawRect(0, 220, canvas.width, 180, '#0d1723');
    drawRect(0, 400, canvas.width, 160, '#1a2a35');

    for (let index = 0; index < 38; index++) {
      const starX = (index * 89 + currentDoor * 17) % canvas.width;
      const starY = (index * 47) % 205;
      drawRect(starX, starY, 2, 2, index % 6 === 0 ? '#ffe58a' : '#c9d8ff');
    }

    drawRect(706, 42, 48, 12, '#f4f7ff');
    drawRect(688, 54, 84, 26, '#f4f7ff');
    drawRect(706, 80, 48, 12, '#f4f7ff');
    drawRect(716, 48, 10, 10, '#d4dce8');
    drawRect(744, 62, 8, 8, '#d4dce8');

    for (let peak = 0; peak < 5; peak++) {
      const startX = peak * 220 - 70;
      const shade = peak % 2 === 0 ? '#19303f' : '#142838';
      for (let layer = 0; layer < 8; layer++) {
        const width = 220 - layer * 27;
        drawRect(startX + layer * 14, 275 + layer * 26, width, 10, shade);
      }
    }

    drawRect(0, 470, canvas.width, 50, '#253542');
    for (let index = 0; index < 16; index++) {
      const rockX = (index * 71 + currentDoor * 19) % canvas.width;
      drawRect(rockX, 494, 25, 14, '#48525b');
      drawRect(rockX + 5, 490, 15, 7, '#5a656f');
    }

    for (let index = 0; index < 22; index++) {
      const grassX = (index * 53 + currentDoor * 37) % canvas.width;
      drawRect(grassX, 552, 4, 14, '#3d6247');
      drawRect(grassX + 4, 556, 4, 10, '#487a58');
    }
    return;
  }

  if (theme.detail === 'underwater') {
    drawRect(0, 0, canvas.width, 220, '#04223a');
    drawRect(0, 220, canvas.width, 180, '#073b56');
    drawRect(0, 400, canvas.width, 160, '#0b4f6a');
    drawRect(0, groundY, canvas.width, canvas.height - groundY, '#123f56');

    for (let index = 0; index < 28; index++) {
      const bubbleX = (index * 97 + currentDoor * 31) % canvas.width;
      const bubbleY = (index * 53 + Math.floor(performance.now() / 90)) % 520;
      drawRect(bubbleX, bubbleY, 5, 5, 'rgba(155,231,255,.32)');
      drawRect(bubbleX + 1, bubbleY + 1, 2, 2, 'rgba(255,255,255,.55)');
    }

    for (let index = 0; index < 9; index++) {
      const weedX = 70 + index * 100 + (currentDoor % 4) * 9;
      drawRect(weedX, 440, 10, 120, '#1d6b4f');
      drawRect(weedX + 12, 470, 8, 90, '#277a58');
      drawRect(weedX + 22, 500, 7, 60, '#1d6b4f');
      drawRect(weedX - 12, 520, 20, 40, '#0f4f5d');
      drawRect(weedX + 16, 535, 26, 25, '#164a5c');
    }

    drawRect(120, 300, 120, 14, 'rgba(155,231,255,.14)');
    drawRect(520, 250, 180, 12, 'rgba(155,231,255,.12)');
    drawRect(300, 390, 220, 10, 'rgba(155,231,255,.10)');
    return;
  }

  if (theme.detail === 'garden') {
    drawRect(0, 0, canvas.width, 75, '#05091b');
    drawRect(0, 75, canvas.width, 70, '#081127');
    drawRect(0, 145, canvas.width, 75, '#0b172d');

    for (let index = 0; index < 48; index++) {
      const starX = (index * 97 + currentDoor * 13) % canvas.width;
      const starY = (index * 53) % 185;
      drawRect(starX, starY, 2, 2, index % 7 === 0 ? '#ffd84d' : '#c9d8ff');
    }

    drawRect(764, 36, 32, 8, '#eaf3ff');
    drawRect(752, 44, 56, 24, '#eaf3ff');
    drawRect(760, 68, 40, 8, '#eaf3ff');
    drawRect(768, 76, 24, 8, '#eaf3ff');
    drawRect(768, 52, 8, 8, '#c7d4e6');
    drawRect(786, 60, 6, 6, '#c7d4e6');

    drawRect(0, 195, canvas.width, 25, '#081c16');
    drawRect(60, 180, 90, 20, '#0a231b');
    drawRect(430, 185, 120, 18, '#081f18');
    drawRect(750, 180, 100, 20, '#0a231b');

    drawGardenScenery();

    drawRandomGroundFlowers();
    return;
  }

  if (theme.detail === 'restaurant') {
    drawRect(90, 250, 180, 110, '#fff4e0');
    drawRect(104, 264, 152, 18, '#8b3a2f');
    drawRect(104, 292, 76, 8, '#4a331f');
    drawRect(104, 308, 110, 8, '#4a331f');
    drawRect(104, 324, 88, 8, '#4a331f');
    drawRect(720, 250, 150, 100, '#cfe8ff');
    drawRect(728, 258, 134, 84, '#9fd4f5');

    const tableXPositions = [100, 235, 370, 505, 640];
    for (const tableX of tableXPositions) {
      drawOutlinedRect(tableX, 500, 90, 12, '#d9a15b', '#6b4229');
      drawRect(tableX + 10, 512, 10, 48, '#8a6238');
      drawRect(tableX + 70, 512, 10, 48, '#8a6238');
      drawOutlinedRect(tableX + 18, 528, 18, 32, '#c46b3f', '#54291a');
      drawOutlinedRect(tableX + 54, 528, 18, 32, '#c46b3f', '#54291a');
    }
    return;
  }

  if (theme.detail === 'bossReturn') {
    drawRect(60, 250, 20, 200, '#5d4a72');
    drawRect(880, 250, 20, 200, '#5d4a72');
    drawRect(180, 220, 110, 18, '#6f5788');
    drawRect(670, 220, 110, 18, '#6f5788');
    drawRect(220, 420, 100, 14, '#7a5f92');
    drawRect(640, 420, 100, 14, '#7a5f92');
    return;
  }

  if (theme.detail === 'boss') {
    drawRect(70, 250, 20, 180, '#6d3540');
    drawRect(870, 250, 20, 180, '#6d3540');
    drawRect(180, 210, 120, 18, '#7d4149');
    drawRect(660, 210, 120, 18, '#7d4149');
    drawRect(240, 430, 90, 12, '#8d4b52');
    drawRect(630, 430, 90, 12, '#8d4b52');
    return;
  }

  if (theme.detail === 'basement') {
    for (let wallY = 245; wallY < 430; wallY += 42) {
      drawRect(0, wallY, canvas.width, 3, '#293137');
      for (let wallX = (wallY / 42) % 2 ? 40 : 0; wallX < canvas.width; wallX += 120) {
        drawRect(wallX, wallY - 39, 3, 39, '#293137');
      }
    }
    drawRect(50, 205, 650, 16, '#69747b');
    drawRect(84, 205, 14, 100, '#69747b');
    drawRect(80, 288, 100, 14, '#69747b');
    drawRect(655, 205, 14, 88, '#69747b');
    drawRect(390, 178, 150, 12, '#151b1f');
    drawRect(405, 190, 120, 8, '#fff3a6');
    drawRect(420, 198, 90, 4, '#d6b937');
    drawOutlinedRect(145, 478, 72, 70, '#6b4a2f', '#342316');
    drawRect(153, 486, 56, 8, '#8a6238');
    drawOutlinedRect(205, 505, 58, 43, '#7b5637', '#342316');
    drawOutlinedRect(665, 435, 74, 113, '#59646b', '#293137');
    drawRect(677, 449, 50, 8, '#8b989f');
    drawRect(681, 470, 42, 42, '#414a50');
    drawRect(692, 525, 8, 23, '#69747b');
    drawRect(230, 551, 105, 4, 'rgba(120,180,220,.22)');
  } else if (theme.detail === 'paintings') {
    drawRect(150, 260, 70, 50, '#8b5a2b');
    drawRect(160, 270, 50, 30, '#c8e0ff');
    drawRect(520, 250, 80, 60, '#8b5a2b');
    drawRect(535, 262, 50, 36, '#ffd9a0');
  } else if (theme.detail === 'cellar') {
    drawRect(80, 250, 180, 14, '#4a5a64');
    drawRect(620, 290, 180, 14, '#4a5a64');
    drawRect(150, 470, 60, 50, '#3b454c');
    drawRect(680, 450, 70, 70, '#3b454c');
    drawRect(280, 430, 16, 4, 'rgba(120,180,220,.18)');
    drawRect(560, 470, 12, 4, 'rgba(120,180,220,.14)');
  } else if (theme.detail === 'plants') {
    drawRect(140, 480, 30, 50, '#3a5a34');
    drawRect(150, 450, 10, 40, '#487a41');
    drawRect(640, 470, 40, 60, '#3a5a34');
    drawRect(660, 430, 12, 50, '#487a41');
  } else if (theme.detail === 'pipes') {
    drawRect(80, 240, 120, 16, '#7c8792');
    drawRect(500, 300, 180, 16, '#7c8792');
    drawRect(300, 360, 90, 12, '#66727d');
  } else if (theme.detail === 'bedroom') {
    drawOutlinedRect(650, 220, 130, 120, '#26354d', '#8f7c5c');
    drawRect(660, 230, 110, 100, '#14213d');
    drawRect(711, 230, 6, 100, '#8f7c5c');
    drawRect(660, 275, 110, 6, '#8f7c5c');
    drawRect(742, 244, 20, 20, '#fff3c4');
    drawRect(734, 244, 10, 20, '#14213d');
    drawRect(676, 251, 4, 4, '#d8f7ff');
    drawRect(695, 305, 3, 3, '#d8f7ff');
    drawRect(754, 296, 3, 3, '#d8f7ff');
    drawRect(642, 340, 146, 10, '#5b4a42');
  } else if (theme.detail === 'boxes') {
    drawRect(160, 470, 50, 50, '#8a6238');
    drawRect(650, 470, 60, 50, '#8a6238');
    drawRect(660, 430, 40, 40, '#a97446');
  } else if (theme.detail === 'shelves') {
    drawRect(120, 250, 140, 12, '#7a5a3a');
    drawRect(120, 310, 140, 12, '#7a5a3a');
    drawRect(620, 270, 150, 12, '#7a5a3a');
  } else if (theme.detail === 'gears') {
    drawRect(180, 250, 40, 40, '#8c94a3');
    drawRect(570, 300, 50, 50, '#8c94a3');
    drawRect(690, 210, 35, 35, '#77808d');
  } else if (theme.detail === 'crystals') {
    drawRect(150, 250, 25, 50, '#7ee7ff');
    drawRect(620, 270, 30, 60, '#9be7ff');
    drawRect(750, 230, 20, 40, '#7ee7ff');
  } else if (theme.detail === 'vines') {
    drawRect(130, 220, 12, 150, '#3f6f3a');
    drawRect(610, 240, 14, 160, '#3f6f3a');
    drawRect(720, 210, 10, 120, '#487a41');
  } else if (theme.detail === 'sand') {
    drawRect(100, 470, 80, 20, '#d9b977');
    drawRect(600, 450, 90, 25, '#d9b977');
  } else {
    drawRect(140, 240, 60, 60, '#ffd84d');
    drawRect(620, 260, 70, 50, '#ffd84d');
  }
}

function drawMainFloorWallpaper(theme) {
  if (currentFloor !== 'main' || !theme.wallpaper) return;

  const ink = 'rgba(255,240,210,.11)';
  const shadowInk = 'rgba(5,10,18,.14)';

  if (theme.wallpaper === 'stripes') {
    for (let stripeX = 0; stripeX < canvas.width; stripeX += 48) {
      drawRect(stripeX, 126, 5, 294, ink);
      drawRect(stripeX + 10, 126, 2, 294, shadowInk);
      drawRect(stripeX + 24, 126, 18, 294, 'rgba(255,255,255,.025)');
    }
  } else if (theme.wallpaper === 'dots') {
    for (let dotY = 150; dotY < 410; dotY += 44) {
      for (let dotX = Math.floor((dotY - 150) / 44) % 2 ? 22 : 46; dotX < canvas.width; dotX += 68) {
        drawRect(dotX, dotY, 5, 5, ink);
        drawRect(dotX + 2, dotY + 7, 2, 2, shadowInk);
      }
    }
  } else {
    for (let motifY = 154; motifY < 405; motifY += 66) {
      for (let motifX = 30; motifX < canvas.width; motifX += 72) {
        const offsetX = Math.floor((motifY - 154) / 66) % 2 ? 20 : 0;
        const centerX = motifX + offsetX;
        if (theme.wallpaper === 'damask') {
          drawRect(centerX - 3, motifY - 13, 6, 26, ink);
          drawRect(centerX - 12, motifY - 3, 24, 6, ink);
          drawRect(centerX - 8, motifY - 8, 5, 5, ink);
          drawRect(centerX + 4, motifY - 8, 5, 5, ink);
          drawRect(centerX - 8, motifY + 5, 5, 5, ink);
          drawRect(centerX + 4, motifY + 5, 5, 5, ink);
          drawRect(centerX - 2, motifY - 2, 4, 4, shadowInk);
        } else if (theme.wallpaper === 'botanical' || theme.wallpaper === 'vines') {
          drawRect(centerX, motifY - 14, 3, 31, ink);
          drawRect(centerX - 9, motifY - 9, 9, 5, ink);
          drawRect(centerX + 3, motifY - 2, 10, 5, ink);
          drawRect(centerX - 10, motifY + 7, 10, 5, ink);
          drawRect(centerX - 7, motifY - 12, 5, 3, shadowInk);
          drawRect(centerX + 5, motifY + 1, 5, 3, shadowInk);
        } else if (theme.wallpaper === 'stars') {
          drawRect(centerX - 2, motifY - 9, 4, 18, ink);
          drawRect(centerX - 9, motifY - 2, 18, 4, ink);
          drawRect(centerX + 18, motifY + 15, 4, 4, ink);
          drawRect(centerX - 20, motifY + 20, 3, 3, shadowInk);
        } else if (theme.wallpaper === 'lattice') {
          drawPolyline([[centerX, motifY - 15], [centerX + 15, motifY], [centerX, motifY + 15], [centerX - 15, motifY], [centerX, motifY - 15]], ink, 2);
          drawRect(centerX - 2, motifY - 2, 4, 4, shadowInk);
        } else if (theme.wallpaper === 'diamonds') {
          drawPolyline([[centerX, motifY - 13], [centerX + 10, motifY], [centerX, motifY + 13], [centerX - 10, motifY], [centerX, motifY - 13]], ink, 2);
          drawPolyline([[centerX, motifY - 6], [centerX + 5, motifY], [centerX, motifY + 6], [centerX - 5, motifY], [centerX, motifY - 6]], shadowInk, 2);
        } else if (theme.wallpaper === 'deco') {
          drawPolyline([[centerX - 15, motifY + 12], [centerX, motifY - 12], [centerX + 15, motifY + 12]], ink, 3);
          drawPolyline([[centerX - 9, motifY + 12], [centerX, motifY - 3], [centerX + 9, motifY + 12]], shadowInk, 2);
          drawRect(centerX - 2, motifY + 7, 4, 6, ink);
        }
      }
    }
  }

  drawRect(0, 108, canvas.width, 8, 'rgba(255,255,255,.12)');
  drawRect(0, 116, canvas.width, 5, 'rgba(0,0,0,.18)');
  drawRect(0, 124, canvas.width, 3, 'rgba(255,255,255,.07)');
  drawRect(0, 420, canvas.width, 9, 'rgba(255,255,255,.1)');
  drawRect(0, 429, canvas.width, 6, 'rgba(0,0,0,.2)');
  drawRect(0, 541, canvas.width, 12, 'rgba(0,0,0,.18)');
  drawRect(0, 541, canvas.width, 3, 'rgba(255,255,255,.1)');
  for (let panelX = 20; panelX < canvas.width; panelX += 90) {
    drawRect(panelX, 447, 3, 78, 'rgba(255,255,255,.055)');
    drawRect(panelX + 4, 447, 2, 78, 'rgba(0,0,0,.1)');
  }

  for (let plankY = 584; plankY < canvas.height; plankY += 28) {
    drawRect(0, plankY, canvas.width, 2, 'rgba(0,0,0,.16)');
    for (let plankX = Math.floor((plankY - 584) / 28) % 2 ? 50 : 120; plankX < canvas.width; plankX += 170) {
      drawRect(plankX, plankY - 26, 3, 26, 'rgba(0,0,0,.14)');
      drawRect(plankX + 8, plankY - 20, 3, 3, 'rgba(255,255,255,.1)');
    }
  }
}

function drawRoom() {
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
  context.scale(1 / pixelScale, 1 / pixelScale);
  if (encounterShakeTimer > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const shakeTime = performance.now();
    context.translate(Math.sin(shakeTime * .11) * 4, Math.cos(shakeTime * .13) * 3);
  }

  drawRect(0, 0, canvas.width, canvas.height, '#101820');
  const theme = currentRoomTheme();
  drawRect(0, 0, canvas.width, 220, theme.wallTop);
  drawRect(0, 220, canvas.width, 180, theme.wallMiddle);
  drawRect(0, 400, canvas.width, 160, theme.wallLower);
  drawRect(0, groundY, canvas.width, canvas.height - groundY, theme.floor);
  drawRect(0, groundY, canvas.width, 8, theme.floorLine);

  for (let x = 0; x < canvas.width; x += 40) {
    drawRect(x, groundY + 12, 30, 6, theme.floorLine);
  }

  drawMainFloorWallpaper(theme);
  drawRoomDetails(theme);
  drawFurniture();
  drawMainFloorElevator();
  drawCloset();
  drawPlatforms();
  drawMilkshake();
  drawFantaJug();
  drawRiftCan();
  drawFlowJuice();
  drawBackpack();
  drawTeleporter();
  drawRift();

  if (currentFloor === 'main' && currentDoor === rewardDoor) drawRewardChest();
  else if (currentFloor === 'main' && !rareRoomActive && !fantaJugActive && currentDoor !== bossDoor && currentDoor !== bossReturnDoor && !isPermanentRiftActive()) drawCabinet();
  for (const obstacle of obstacles) drawObstacle(obstacle);
  drawDoor();
  if (currentFloor === 'main' && currentDoor === 65) drawGardenDoor();
  if (currentFloor === 'main' && currentDoor === 95) drawOfficeDoor();
  if (currentFloor === 'main' && currentDoor === cellarEntranceDoor) drawCellarStaircase();
  if (currentFloor === 'cellar' && currentDoor === totalCellarDoors) drawCellarExit();
  if (currentFloor === 'office' && !officeSideRoomActive && currentDoor % 15 === 0) drawStorageDoor();
  drawMonster();
  drawCellarMonster();
  drawBoss();
  drawRush();
  drawVineMonster();
  drawOfficeMonster();
  if (!player.hidden) drawPlayer();
  drawFlashlight();
  drawCellarMonsterGlow();
  drawGardenRain();
  drawMainFloorElevatorRide();
  drawEncounterEffects();
  drawEncounterHud();

  context.restore();
}

function startGame() {
  initMusic();
  currentFloor = 'main';
  currentDoor = 1;
  currentFloorDamageFree = true;
  officeSideRoomActive = false;
  officeSideRoomReturnDoor = 1;
  won = false;
  fantaRushTimer = 0;
  flowJuiceTimer = 0;
  unlockedDoors.clear();
  hotbarSlots.fill(null);
  backpackStorageSlots.fill(null);
  hasBackpack = false;
  cutsceneSeen = false;
  cutsceneActive = false;
  cutsceneTimer = 0;
  cutsceneStep = 0;
  selectedHotbarSlot = 0;
  updateHotbarUi();
  updateBackpackUi();
  startRoom();
  awardBadge('game-starter');
  paused = false;
  lobby.classList.add('hidden');
  floorScreen.classList.add('hidden');
  gameElement.classList.remove('hidden');
}

function startGardenFloor() {
  initMusic();
  if (currentFloor === 'main') mainFloorResumeDoor = currentDoor;
  currentFloor = 'garden';
  currentDoor = 1;
  currentFloorDamageFree = true;
  won = false;
  startRoom();
  awardBadge('outside-person');
  paused = false;
  floorScreen.classList.add('hidden');
  lobby.classList.add('hidden');
  gameElement.classList.remove('hidden');
}

function startCellarFloor() {
  initMusic();
  if (currentFloor === 'main') mainFloorResumeDoor = currentDoor;
  currentFloor = 'cellar';
  currentDoor = 1;
  currentFloorDamageFree = true;
  hasFlashlight = true;
  won = false;
  startRoom();
  awardBadge('cellar-explorer');
  paused = false;
  floorScreen.classList.add('hidden');
  lobby.classList.add('hidden');
  gameElement.classList.remove('hidden');
}

function startOfficeFloor() {
  initMusic();
  if (currentFloor === 'main') mainFloorResumeDoor = currentDoor;
  currentFloor = 'office';
  currentDoor = 1;
  currentFloorDamageFree = true;
  officeSideRoomActive = false;
  officeSideRoomReturnDoor = 1;
  won = false;
  startRoom();
  awardBadge('office-worker');
  paused = false;
  floorScreen.classList.add('hidden');
  lobby.classList.add('hidden');
  gameElement.classList.remove('hidden');
}

function updateCutscene(delta) {
  cutsceneTimer += delta;

  if (cutsceneTimer >= 1.2 && cutsceneStep < 1) {
    cutsceneStep = 1;
    cutsceneCaption.textContent = 'The old tree cracks open...';
  }

  if (cutsceneTimer >= 2.1 && cutsceneStep < 2) {
    cutsceneStep = 2;
    cutsceneCaption.textContent = 'Three meat legs burst out!';
  }

  if (cutsceneTimer >= 3.1 && cutsceneStep < 3) {
    cutsceneStep = 3;
    cutsceneCaption.textContent = 'A submarine rises from the water!';
  }

  if (cutsceneTimer >= 4.2 && cutsceneStep < 4) {
    cutsceneStep = 4;
    cutsceneCaption.textContent = 'Board the submarine!';
    cutsceneContinue.classList.remove('hidden');
  }
}

function finishCutscene() {
  cutsceneActive = false;
  gardenCutscene.classList.remove('active');
  paused = false;
  showMessage('Submarine chase! Swim right!');
}

function resumeMainFloor() {
  if (currentFloor === 'main' && startButton.textContent === 'Resume') {
    paused = false;
    floorScreen.classList.add('hidden');
    lobby.classList.add('hidden');
    gameElement.classList.remove('hidden');
    return;
  }

  if (currentFloor !== 'main' && mainFloorResumeDoor > 1) {
    officeSideRoomActive = false;
    currentFloor = 'main';
    currentDoor = mainFloorResumeDoor;
    currentFloorDamageFree = true;
    startRoom();
    paused = false;
    floorScreen.classList.add('hidden');
    lobby.classList.add('hidden');
    gameElement.classList.remove('hidden');
    return;
  }

  startGame();
}

startButton.addEventListener('click', startGame);
trailerButton.addEventListener('click', () => {
  window.location.href = 'trailer/';
});
stairsDownButton.addEventListener('click', startMainFloorStairDescent);
againButton.addEventListener('click', () => window.location.reload());

function finishBadgeDescent() {
  if (!badgeDescentActive) return;
  badgeDescentActive = false;
  clearTimeout(badgeDescentTimer);
  badgeDescentScreen.hidden = true;
  badgeDescentScreen.classList.remove('active');
  lobby.classList.add('hidden');
  badgeScreen.classList.remove('hidden', 'badge-arrival');
  badgeScreen.querySelector('.badge-index-card').scrollTop = 0;
  void badgeScreen.offsetWidth;
  badgeScreen.classList.add('badge-arrival');
  badgesButton.setAttribute('aria-expanded', 'true');
  badgeList.querySelector('.badge')?.focus({ preventScroll: true });
}

function startBadgeDescent() {
  if (badgeDescentActive) return;
  badgeDescentActive = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishBadgeDescent();
    return;
  }
  badgeDescentScreen.hidden = false;
  badgeDescentScreen.classList.add('active');
  badgeDescentSkip.focus({ preventScroll: true });
  badgeDescentTimer = setTimeout(finishBadgeDescent, 2800);
}

badgesButton.addEventListener('click', startBadgeDescent);
badgeDescentSkip.addEventListener('click', finishBadgeDescent);

backButton.addEventListener('click', () => {
  badgeScreen.classList.add('hidden');
  badgeScreen.classList.remove('badge-arrival');
  lobby.classList.remove('hidden');
  badgesButton.setAttribute('aria-expanded', 'false');
  badgesButton.focus({ preventScroll: true });
});

for (const container of [badgeList, winBadgeList]) {
  container.addEventListener('click', event => {
    const badge = event.target.closest('[data-badge-id]');
    if (badge) showBadgeDetail(badge.dataset.badgeId);
  });
  container.addEventListener('keydown', event => {
    if (!['Enter', 'Space'].includes(event.code)) return;
    const badge = event.target.closest('[data-badge-id]');
    if (!badge) return;
    event.preventDefault();
    showBadgeDetail(badge.dataset.badgeId);
  });
}

badgeDetailClose.addEventListener('click', () => badgeDetailDialog.close());
badgeDetailDialog.addEventListener('click', event => {
  const bounds = badgeDetailDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) badgeDetailDialog.close();
});

function createReleaseConfetti() {
  const container = document.querySelector('#release-confetti');
  const colors = ['#ffd84d', '#75e6ff', '#ff8a70', '#e69bff', '#83ed96', '#ffffff'];
  const fragment = document.createDocumentFragment();
  let seed = 20261121;
  const random = () => {
    seed = seed * 16807 % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let index = 0; index < 56; index++) {
    const drop = document.createElement('span');
    const piece = document.createElement('span');
    const width = 5 + Math.round(random() * 5);
    drop.className = 'confetti-drop';
    piece.className = 'confetti-piece';
    drop.style.setProperty('--x', `${(random() * 100).toFixed(2)}%`);
    drop.style.setProperty('--drift', `${Math.round((random() - .5) * 220)}px`);
    drop.style.setProperty('--fall-time', `${(7 + random() * 7).toFixed(2)}s`);
    drop.style.setProperty('--flutter-time', `${(.55 + random() * .8).toFixed(2)}s`);
    drop.style.setProperty('--delay', `${(-random() * 14).toFixed(2)}s`);
    drop.style.setProperty('--spin', `${540 + Math.round(random() * 720)}deg`);
    drop.style.setProperty('--piece-opacity', (.65 + random() * .35).toFixed(2));
    piece.style.setProperty('--piece-color', colors[Math.floor(random() * colors.length)]);
    piece.style.setProperty('--piece-width', `${width}px`);
    piece.style.setProperty('--piece-height', `${index % 7 === 0 ? width : 8 + Math.round(random() * 8)}px`);
    piece.style.setProperty('--piece-radius', index % 7 === 0 ? '50%' : '2px');
    drop.append(piece);
    fragment.append(drop);
  }
  container.append(fragment);
}

document.addEventListener('DOMContentLoaded', () => {
  createReleaseConfetti();
  gardenCutscene = document.querySelector('#garden-cutscene');
  cutsceneCaption = document.querySelector('#cutscene-caption');
  cutsceneContinue = document.querySelector('#cutscene-continue');
  floorsButton = document.querySelector('#floors-button');
  floorScreen = document.querySelector('#floor-screen');
  mainFloorButton = document.querySelector('#main-floor-button');
  gardenFloorButton = document.querySelector('#garden-floor-button');
  cellarFloorButton = document.querySelector('#cellar-floor-button');
  floorBackButton = document.querySelector('#floor-back-button');

  const actionRow = document.createElement('div');
  actionRow.className = 'lobby-actions';
  badgesButton.after(actionRow);
  actionRow.append(badgesButton, floorsButton, trailerButton);

  floorsButton.addEventListener('click', () => {
    lobby.classList.add('hidden');
    floorScreen.classList.remove('hidden');
  });

  floorBackButton.addEventListener('click', () => {
    floorScreen.classList.add('hidden');
    lobby.classList.remove('hidden');
  });

  mainFloorButton.addEventListener('click', resumeMainFloor);
  gardenFloorButton.addEventListener('click', startGardenFloor);
  cellarFloorButton.addEventListener('click', startCellarFloor);
  officeFloorButton = document.querySelector('#office-floor-button');
  officeFloorButton.addEventListener('click', startOfficeFloor);
  cutsceneContinue.addEventListener('click', finishCutscene);
});

if (funStats.stomps >= 10) awardBadge('boss-bouncer');
updateBadgeUi();
fantaJugChanceElement.textContent = `Rare yellow Fanta Jug: ${fantaJugSpawnChance * 100}% chance in its basement room.`;
flowJuiceChanceElement.textContent = `Flow Juice: ${flowJuiceSpawnChance * 100}% chance in calm rooms.`;
riftCanChanceElement.textContent = `Rift-in-a-Can: ${riftCanSpawnChance * 100}% chance in calm rooms.`;
updateHotbarUi();
updateBackpackUi();

hotbarElement.addEventListener('click', event => {
  const slot = event.target.closest('.hotbar-slot');
  if (!slot) return;
  selectHotbarSlot(Number(slot.dataset.slotIndex));
});

backpackStorageElement.addEventListener('click', event => {
  const slot = event.target.closest('.backpack-slot');
  if (!slot) return;
  takeBackpackItem(Number(slot.dataset.slotIndex));
});

document.addEventListener('keydown', event => {
  if (elevatorRideActive) {
    event.preventDefault();
    return;
  }
  if (badgeDescentActive) {
    if (['Escape', 'Enter', 'Space'].includes(event.code)) finishBadgeDescent();
    event.preventDefault();
    return;
  }
  if (stairDescentActive && ['KeyA', 'KeyD', 'ArrowLeft', 'ArrowRight', 'KeyW', 'ArrowUp', 'Space', 'KeyS', 'ArrowDown'].includes(event.code)) {
    stairDescentActive = false;
  }
  input.add(event.code);
  if (/^[1-5]$/.test(event.key)) selectHotbarSlot(Number(event.key) - 1);
  if (event.code === 'KeyE') interact();
  if (event.code === 'KeyQ') useSelectedHotbarItem();
  if (event.code === 'KeyB') storeSelectedHotbarItem();
  if (event.code === 'Escape' && !won) {
    if (!floorScreen.classList.contains('hidden')) {
      floorScreen.classList.add('hidden');
      lobby.classList.remove('hidden');
      return;
    }

    paused = true;
    stairDescentActive = false;
    gameElement.classList.add('hidden');
    lobby.classList.remove('hidden');
    startButton.textContent = 'Resume';
  }
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) {
    event.preventDefault();
  }
});

document.addEventListener('keyup', event => input.delete(event.code));

startRoom();

let lastTime = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const delta = Math.min(.05, (now - lastTime) / 1000);
  lastTime = now;

  if (elevatorRideActive) {
    updateMainFloorElevatorRide(delta);
  } else if (cutsceneActive) {
    updateCutscene(delta);
  } else if (!paused && !won) {
    fantaRushTimer = Math.max(0, fantaRushTimer - delta);
    flowJuiceTimer = Math.max(0, flowJuiceTimer - delta);
    movePlayer(delta);
    updateMonster(delta);
    updateVineMonster(delta);
    updateOfficeMonster(delta);
    updateCellarMonster(delta);
    updateRush(delta);
    updateBoss(delta);
    updateObstacles(delta);
    updateTarget();
    if (currentFloor === 'garden') {
      funStats.gardenTime += delta;
      if (funStats.gardenTime >= 10) awardBadge('rain-dancer');
    }
  }

  if (messageTimer > 0) {
    messageTimer -= delta;
    if (messageTimer <= 0) messageElement.style.opacity = 0;
  }

  if (badgeToastTimer > 0) {
    badgeToastTimer -= delta;
    if (badgeToastTimer <= 0) badgeToast.classList.remove('visible');
  }

  encounterFlashTimer = Math.max(0, encounterFlashTimer - delta);
  encounterShakeTimer = Math.max(0, encounterShakeTimer - delta);
  updateMusic();
  updateMainFloorStairButton();

  drawRoom();
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

requestAnimationFrame(animate);
