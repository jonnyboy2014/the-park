const canvas = document.querySelector('#doors');
const displayContext = canvas.getContext('2d');
const pixelScale = 2;
const pixelCanvas = document.createElement('canvas');
pixelCanvas.width = canvas.width / pixelScale;
pixelCanvas.height = canvas.height / pixelScale;
const context = pixelCanvas.getContext('2d');

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
const rushChance = .12;
let unlockedDoors = new Set();
let rareRoomActive = false;
let backpackActive = false;
let backpackOnTable = false;
let teleporterActive = false;
let teleporterOnDesk = false;
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
const messageElement = document.querySelector('#message');
const badgeList = document.querySelector('#badge-list');
const winBadgeList = document.querySelector('#win-badges');
const badgeCount = document.querySelector('#badge-count');
const badgeToast = document.querySelector('#badge-toast');
const hotbarElement = document.querySelector('#hotbar');
const backpackStorageElement = document.querySelector('#backpack-storage');
const healthNumber = document.querySelector('#health-number');
const healthFill = document.querySelector('#health-fill');
const bossBouncerProgress = document.querySelector('#boss-bouncer-progress');

const badges = [
  { id: 'game-starter', name: 'Game Starter', popup: 'You entered the game!', section: 'main', icon: 'door' },
  { id: 'first-key', name: 'First Key', section: 'main', icon: 'key' },
  { id: 'chase-survivor', name: 'Chase Complete', popup: 'You completed the chase!', section: 'main', icon: 'run', difficult: true },
  { id: 'speed-boots', name: 'Speed Boots', section: 'main', icon: 'boot' },
  { id: 'demon-slayer', name: 'Demon Slayer', section: 'main', icon: 'sword', difficult: true },
  { id: 'monster-slayer', name: 'Monster Slayer', section: 'main', icon: 'skull', difficult: true },
  { id: 'restaurant-finder', name: 'Restaurant Finder', popup: 'You found the rare Restaurant Room!', section: 'main', icon: 'milkshake' },
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
  door: '<rect x="13" y="7" width="22" height="34" rx="2"/><circle cx="29" cy="25" r="1.5" fill="currentColor" stroke="none"/><path d="M9 41h30"/>',
  key: '<circle cx="16" cy="18" r="7"/><path d="m21 23 17 17m-6-6 4-4m-9 9 4-4"/>',
  run: '<circle cx="28" cy="8" r="4"/><path d="m24 16-6 9 8 5-4 11m2-25 9 7 7-2M18 25l-8 7m16-2 8 10"/>',
  boot: '<path d="M15 7v20l-7 6v8h30v-6l-13-8V7Z"/><path d="M9 33h16"/>',
  sword: '<path d="m12 36 24-24m-2-4 6-2-2 6M10 30l8 8m-11 3 5-5m-3 8 5-5"/>',
  skull: '<path d="M10 23a14 14 0 0 1 28 0c0 7-4 9-7 11v7H17v-7c-3-2-7-4-7-11Z"/><circle cx="18" cy="23" r="3"/><circle cx="30" cy="23" r="3"/><path d="m24 29-3 5h6ZM20 41v-5m8 5v-5"/>',
  milkshake: '<path d="M13 15h22l-3 27H16ZM11 15h26M19 10h14M29 10l5-7"/><path d="M17 24c4-3 10 3 15 0"/>',
  rocket: '<path d="M24 5c9 6 12 16 8 27l-8 7-8-7c-4-11-1-21 8-27Z"/><circle cx="24" cy="20" r="4"/><path d="m16 26-8 5 8 3m16-8 8 5-8 3M20 39l-2 5m12-5 2 5m-8-6v7"/>',
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
  slide: '<path d="M5 35h38M9 29l22-13m-5-4 8-1-1 8M9 20h12"/><path d="m30 30 8 5-8 5"/>',
  jump: '<path d="M8 39h32M24 36V9m-9 9 9-9 9 9"/><path d="M9 31h7m16 0h7"/>',
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
  door: '<rect x="13" y="7" width="22" height="34" rx="2" fill="#8f4e2c"/><rect x="17" y="11" width="14" height="10" rx="1" fill="#d99b52"/><rect x="17" y="25" width="14" height="11" rx="1" fill="#c47b3d"/>',
  key: '<circle cx="16" cy="18" r="6" fill="#ffe779"/><path d="M22 24 37 39" fill="none" stroke="#ffe779" stroke-width="5"/><circle cx="16" cy="18" r="2.5" fill="#fff7c2"/>',
  run: '<circle cx="28" cy="8" r="3.5" fill="#ffd0a3"/><path d="m22 17 7 5-5 9-8-6Z" fill="#58b7e8"/><path d="m18 31 7 3-3 8-6-1Z" fill="#394f8f"/>',
  boot: '<path d="M15 7v20l-7 6v8h30v-6l-13-8V7Z" fill="#5cc9e8"/><rect x="17" y="12" width="8" height="5" rx="1" fill="#ffd84d"/><path d="M9 34h28v6H9Z" fill="#337a9b"/>',
  sword: '<path d="M13 34 35 12l3-5 1 1-4 6-22 22Z" fill="#d8f7ff"/><path d="m9 31 8 8-3 3-8-8Z" fill="#ffd84d"/>',
  skull: '<path d="M10 23a14 14 0 0 1 28 0c0 7-4 9-7 11v7H17v-7c-3-2-7-4-7-11Z" fill="#f1e6c8"/><circle cx="18" cy="23" r="3" fill="#37424b"/><circle cx="30" cy="23" r="3" fill="#37424b"/><path d="m24 29-3 5h6Z" fill="#67707a"/>',
  milkshake: '<path d="M13 15h22l-3 27H16Z" fill="#9be7ff"/><path d="M16 20h16l-2 18H18Z" fill="#f7a8c4"/><circle cx="19" cy="14" r="5" fill="#fff3d4"/><circle cx="27" cy="13" r="6" fill="#fff3d4"/>',
  rocket: '<path d="M24 5c9 6 12 16 8 27l-8 7-8-7c-4-11-1-21 8-27Z" fill="#f4f0df"/><circle cx="24" cy="20" r="3.5" fill="#9be7ff"/><path d="m16 26-8 5 8 3Zm16 0 8 5-8 3Z" fill="#ef5b5b"/><path d="m20 39-2 6 6-5 6 5-2-6Z" fill="#ff9f43"/>',
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
  slide: '<circle cx="12" cy="14" r="4" fill="#ffd0a3"/><path d="m9 21 13 4 11-10 4 4-13 12-16-5Z" fill="#58b7e8"/><path d="M5 35h38v5H5Z" fill="#8750a5"/>',
  jump: '<path d="M8 38h32v4H8Z" fill="#67d06b"/><path d="m18 18 6-9 6 9-6-4Z" fill="#b8f7c1"/><circle cx="11" cy="27" r="3" fill="#ffd0a3"/>',
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
let earnedBadges = new Set(loadBadges());
const funStats = {
  jumps: 0,
  slides: 0,
  hides: 0,
  stomps: 0,
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

function updateBadgeUi() {
  const renderBadge = badge => {
    const earned = earnedBadges.has(badge.id);
    const state = `badge${earned ? ' earned' : ''}${badge.difficult ? ' difficult' : ''}`;
    const status = earned ? 'EARNED' : 'LOCKED';
    const description = `${badge.difficult ? 'Difficult badge: ' : ''}${badge.popup || badge.name}`;
    return `<div class="${state}" data-section="${badge.section}" title="${description}"><span class="badge-ribbon" aria-hidden="true"></span><span class="badge-medal" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><g stroke="none">${badgeIconDetails[badge.icon]}</g>${badgeIcons[badge.icon]}<g fill="#fff8d0" stroke="none"><circle cx="7" cy="9" r="1.3"/><circle cx="41" cy="36" r="1.2"/><path d="m39 6 1.2 2.8L43 10l-2.8 1.2L39 14l-1.2-2.8L35 10l2.8-1.2Z"/></g></svg></span><span class="badge-name">${badge.name}</span><span class="badge-status">${status}</span></div>`;
  };
  const renderSection = (sectionId, title) => {
    const sectionBadges = badges.filter(badge => badge.section === sectionId);
    const shelves = [];
    for (let index = 0; index < sectionBadges.length; index += 4) {
      const shelfBadges = sectionBadges.slice(index, index + 4);
      shelves.push(`<div class="badge-shelf"><div class="badge-grid">${shelfBadges.map(renderBadge).join('')}</div></div>`);
    }
    return `<section class="badge-section"><h3>${title}</h3>${shelves.join('')}</section>`;
  };
  badgeList.innerHTML = renderSection('main', 'MAIN FLOOR')
    + renderSection('cellar', 'THE CELLAR')
    + renderSection('garden', 'THE GARDEN')
    + renderSection('office', 'THE OFFICE')
    + renderSection('fun', 'FUN & RANDOM');
  winBadgeList.innerHTML = badgeList.innerHTML;
  badgeCount.textContent = `${earnedBadges.size}/${badges.length} badges`;
  badgeIndexCount.textContent = `${earnedBadges.size}/${badges.length} badges`;
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

function updateBossBouncerProgress() {
  if (!bossBouncerProgress) return;
  bossBouncerProgress.textContent = earnedBadges.has('boss-bouncer')
    ? 'Boss Bouncer: DONE'
    : `Boss Bouncer: ${Math.min(funStats.stomps, 10)}/10`;
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
  backpackStorageElement.innerHTML = backpackStorageSlots.map(item => {
    const itemHtml = item
      ? `<div class="hotbar-item item-${item.id}"></div><span class="item-count">x${item.count}</span>`
      : '';
    return `<div class="backpack-slot" title="${item ? item.name : 'Empty backpack slot'}">${itemHtml}</div>`;
  }).join('');
}

function updateBackpackVisibility() {
  const selectedItem = hotbarSlots[selectedHotbarSlot];
  const showBackpack = hasBackpack && selectedItem && selectedItem.id === 'backpack';
  backpackStorageElement.classList.toggle('hidden', !showBackpack);
}

function selectHotbarSlot(index) {
  selectedHotbarSlot = index;
  updateHotbarUi();
}

function useSelectedHotbarItem() {
  const item = hotbarSlots[selectedHotbarSlot];
  if (!item) return;

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
  { wallTop: '#3f4a5a', wallMiddle: '#2b3441', wallLower: '#1d2530', floor: '#4d3b28', floorLine: '#6b5237', detail: 'paintings' },
  { wallTop: '#3f6f56', wallMiddle: '#26503c', wallLower: '#183527', floor: '#4a5b36', floorLine: '#687a47', detail: 'plants' },
  { wallTop: '#4a5568', wallMiddle: '#303a49', wallLower: '#1f2632', floor: '#404b5c', floorLine: '#59667a', detail: 'pipes' },
  { wallTop: '#72584a', wallMiddle: '#4e3b31', wallLower: '#2e211b', floor: '#5c4231', floorLine: '#7d5b42', detail: 'boxes' },
  { wallTop: '#5c5f78', wallMiddle: '#3b3e52', wallLower: '#252736', floor: '#4a4e64', floorLine: '#666c86', detail: 'shelves' },
  { wallTop: '#5a6f78', wallMiddle: '#354b54', wallLower: '#1e2e34', floor: '#3c5158', floorLine: '#587078', detail: 'gears' },
  { wallTop: '#6d5f78', wallMiddle: '#473d52', wallLower: '#2a2332', floor: '#4a3f57', floorLine: '#6a5b7b', detail: 'crystals' },
  { wallTop: '#62725c', wallMiddle: '#3d4b38', wallLower: '#222b1f', floor: '#41503a', floorLine: '#5c6e52', detail: 'vines' },
  { wallTop: '#7b7259', wallMiddle: '#575040', wallLower: '#332e26', floor: '#5b5241', floorLine: '#7b7259', detail: 'sand' },
  { wallTop: '#6f5a3d', wallMiddle: '#4a3b28', wallLower: '#2a2118', floor: '#57432d', floorLine: '#7a6140', detail: 'gold' }
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
  const isSpecialRoom = isMainFloor && (currentDoor === 1 || monsterActive || isRewardRoom || bossActive);
  rareRoomActive = isMainFloor && !isSpecialRoom && Math.random() < rareRoomChance;
  closetVisible = isMainFloor && currentDoor !== 1 && !rareRoomActive && currentDoor !== rewardDoor && !bossActive;
  rushActive = isMainFloor && currentDoor > rewardDoor && !isSpecialRoom && !rareRoomActive && Math.random() < rushChance;
  rushWarningTimer = rushActive ? 5 : 0;
  if (isMainFloor && !isSpecialRoom && !unlockedDoors.has(currentDoor) && Math.random() < unlockedDoorChance) {
    unlockedDoors.add(currentDoor);
  }
  const isUnlockedDoor = isSubFloor || unlockedDoors.has(currentDoor) || rareRoomActive;
  roomIsDark = (isCellarFloor || (isMainFloor && currentDoor > rewardDoor
    && currentDoor % 5 === 0
    && currentDoor !== bossDoor
    && currentDoor !== bossReturnDoor
    && currentDoor !== 95
    && !rareRoomActive));
  monster.x = -80;
  monster.speed = 135 + (currentDoor - monsterStartDoor) * 6;
  keyFound = isSubFloor || monsterActive || isRewardRoom || bossActive || isUnlockedDoor || rareRoomActive;
  doorOpen = isSubFloor || monsterActive || isUnlockedDoor || rareRoomActive;
  cabinet.searched = isSubFloor || isRewardRoom || bossActive || isUnlockedDoor || rareRoomActive;
  cabinet.keyVisible = false;
  cabinet.x = 120 + ((currentDoor * 37) % 480);
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
  backpack.taken = false;
  teleporter.taken = false;
  backpackActive = isMainFloor && !isSpecialRoom && !hasBackpack && Math.random() < backpackSpawnChance;
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
  boss.chargeTimer = 0;
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
    obstacles.push(pattern === 0
      ? { type: 'crate', x: 220 + shift, y: 520, width: 40, height: 40 }
      : { type: 'beam', x: 220 + shift, y: 512, width: 120, height: 22 });
    obstacles.push(pattern === 0
      ? { type: 'beam', x: 430 + shift, y: 512, width: 120, height: 22 }
      : { type: 'crate', x: 430 + shift, y: 520, width: 40, height: 40 });
    obstacles.push(pattern === 0
      ? { type: 'crate', x: 650 + shift, y: 520, width: 40, height: 40 }
      : { type: 'beam', x: 650 + shift, y: 512, width: 120, height: 22 });
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
  } else if (isMainFloor && isUnlockedDoor) {
    showMessage('This door is already unlocked. Walk right.');
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
  } else if (roomIsDark) {
    modeText.textContent = 'Dark room · flashlight on';
  } else if (rareRoomActive) {
    modeText.textContent = 'Rare Restaurant Room · 1.5% find';
  } else if (currentDoor === 1) {
    modeText.textContent = 'Calm room · find the key';
  } else {
    modeText.textContent = unlockedDoors.has(currentDoor)
      ? 'Calm room - door already unlocked'
      : 'Calm room';
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
    if (currentFloor === 'main' && currentDoor === cellarEntranceDoor) targets.push(cellarStaircase);
    if (currentFloor === 'cellar' && currentDoor === totalCellarDoors) targets.push(cellarExit);
    if (currentFloor === 'office' && !officeSideRoomActive && currentDoor % 15 === 0) targets.push(storageDoor);
    if (rareRoomActive && !milkshake.taken) targets.push(milkshake);
    if (backpackActive && !backpack.taken) targets.push(backpack);
    if (teleporterActive && !teleporter.taken) targets.push(teleporter);
    if (closetVisible) targets.push(closet);
    if (!cabinet.searched) targets.push(cabinet);
    if (cabinet.keyVisible) targets.push({ ...cabinet, y: cabinet.y + 4, height: 18, kind: 'key' });
  }
  if (!doorOpen) targets.push(door);

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

  const left = input.has('KeyA') || input.has('ArrowLeft');
  const right = input.has('KeyD') || input.has('ArrowRight');
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
  const speed = player.sliding ? 145 : player.speed;
  const nextX = player.x + direction * speed * delta;
  if (!collides(playerBox(nextX, player.y))) player.x = nextX;

  if (jump && player.onGround && !player.sliding) {
    player.velocityY = -player.jumpSpeed;
    player.onGround = false;
    funStats.jumps++;
    if (funStats.jumps >= 50) awardBadge('jump-machine');
  }

  player.velocityY += 1300 * delta;
  platformIgnoreTimer = Math.max(0, platformIgnoreTimer - delta);
  const previousBottom = player.y + player.height;
  const nextY = player.y + player.velocityY * delta;
  const nextBottom = nextY + player.height;
  const platform = player.velocityY >= 0
    ? landingPlatform(previousBottom, nextBottom, playerBox(player.x, nextY))
    : null;

  if (platform) {
    player.y = platform.y - player.height;
    player.velocityY = 0;
    player.onGround = true;
    player.onPlatform = true;
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

  if (doorOpen && player.x + player.width > door.x + 20) nextDoor();
}

function updateMonster(delta) {
  if (!monsterActive) return;
  monster.x += monster.speed * delta;

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
      showMessage('Gloom Crawler is about to charge! Jump!');
    }
  } else if (monster.state === 'warning') {
    if (monster.timer <= 0) {
      monster.state = 'charge';
      monster.timer = .85;
      monster.direction = player.x + player.width / 2 < monster.x + monster.width / 2 ? -1 : 1;
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
      : (bossIsReturn ? 1 : 1.35);
  }

  const targetX = player.x + player.width / 2;
  const bossCenterX = boss.x + boss.width / 2;
  const direction = Math.sign(targetX - bossCenterX) || boss.direction;
  boss.direction = direction;
  const speed = boss.attacking
    ? (bossIsReturn ? 330 : 275)
    : boss.speed;
  boss.x += direction * speed * delta;
  boss.x = Math.max(40, Math.min(canvas.width - boss.width - 40, boss.x));

  if (!rect(playerBox(), boss)) return;

  if (boss.invulnerableTimer > 0) return;

  const stomp = player.velocityY > 0 && player.y + player.height < boss.y + 56;
  if (stomp) {
    funStats.stomps++;
    updateBossBouncerProgress();
    if (funStats.stomps >= 10) awardBadge('boss-bouncer');
    boss.health--;
    boss.invulnerableTimer = bossIsReturn ? .55 : .7;
    player.velocityY = -430;
    if (boss.health <= 0) {
      bossActive = false;
      doorOpen = true;
      door.open = true;
      updateHud();
      awardBadge(bossIsReturn ? 'monster-slayer' : 'demon-slayer');
      showMessage('Boss defeated! The door is open.');
    } else {
      updateHud();
      showMessage(`Boss hit! ${boss.health} left.`);
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

function drawDoor() {
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

  drawRect(x + 25, y + 130, 50, groundY - y - 130, '#4a382a');
  drawOutlinedRect(x + 10, y + 30, 100, 105, '#255238', '#123324');
  drawOutlinedRect(x + 25, y + 50, 70, 70, '#1d4129', '#10251a');
  drawRect(x + 32, y + 70, 12, 12, '#ff4d5e');
  drawRect(x + 72, y + 70, 12, 12, '#ff4d5e');
  drawRect(x + 44, y + 95, 32, 9, '#210508');
  drawRect(x + 52, y + 99, 6, 6, '#fff4d8');

  for (let index = 0; index < 3; index++) {
    const legX = x + 16 + index * 34;
    drawOutlinedRect(legX, groundY - 68, 20, 68, '#ff8f8f', '#5d1d1d');
    drawRect(legX + 4, groundY - 58, 12, 28, '#ffb1b1');
    drawOutlinedRect(legX - 2, groundY - 18, 26, 18, '#d94f4f', '#5d1d1d');
    drawRect(legX + 3, groundY - 12, 7, 8, '#ffb1b1');
    drawRect(legX + 14, groundY - 12, 7, 8, '#ffb1b1');
  }
}

function drawVineMonster() {
  if (!vineMonsterActive) return;

  if (gardenChaseActive) {
    drawTreeMonster();
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
  if (monsterActive || bossActive || currentDoor === rewardDoor) return;

  const variant = Math.floor((currentDoor - 1) / 10) % 5;
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
    drawOutlinedRect(x + 130, 495, 45, 60, '#7c8792', '#2f3742');
    drawRect(x + 139, 506, 27, 8, '#3b4650');
  } else if (variant === 2) {
    const x = 300 + offsetX;
    drawOutlinedRect(x, 430, 95, 130, '#6b4229', '#28170b');
    drawRect(x + 8, 450, 79, 8, '#4a2c18');
    drawRect(x + 8, 490, 79, 8, '#4a2c18');
    drawRect(x + 8, 530, 79, 8, '#4a2c18');
    drawRect(x + 12, 436, 10, 12, '#d9534f');
    drawRect(x + 30, 436, 10, 12, '#4fa3d9');
    drawRect(x + 48, 436, 10, 12, '#f0c040');
    drawRect(x + 66, 436, 10, 12, '#67d06b');
    drawOutlinedRect(x + 130, 450, 34, 110, '#c9a24a', '#6a5420');
    drawRect(x + 143, 410, 8, 44, '#7c8792');
    drawRect(x + 134, 398, 26, 18, '#ffe58a');
  } else if (variant === 3) {
    const x = 290 + offsetX;
    drawOutlinedRect(x, 465, 135, 20, '#7a4a24', '#2e1a0d');
    drawOutlinedRect(x, 485, 135, 65, '#d9e4ef', '#8fa5b5');
    drawRect(x + 12, 497, 111, 18, '#8fa5b5');
    drawRect(x + 20, 515, 36, 22, '#67d06b');
    drawOutlinedRect(x + 78, 512, 44, 25, '#ffd84d', '#7a5f00');
  } else {
    const x = 310 + offsetX;
    drawOutlinedRect(x, 495, 120, 18, '#8a6238', '#3d240d');
    drawRect(x + 8, 513, 10, 47, '#5c4028');
    drawRect(x + 102, 513, 10, 47, '#5c4028');
    drawOutlinedRect(x + 18, 450, 70, 45, '#20262e', '#0d1116');
    drawRect(x + 26, 458, 54, 28, '#7ee7ff');
    drawOutlinedRect(x + 105, 530, 45, 30, '#7c8792', '#2f3742');
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

  if (player.sliding) {
    drawOutlinedRect(-12, 5, 8, 14, '#7a4a24', '#2e1a0d');
    drawOutlinedRect(-10, 6, 20, 14, '#3b82f6', '#171a20');
    drawOutlinedRect(-1, 0, 13, 13, '#f3c68b', '#171a20');
    drawRect(0, 0, 13, 5, '#4a2f1d');
    drawRect(7, 5, 2, 3, '#171a20');
    drawOutlinedRect(-9, 18, 9, 8, '#5c4028', '#20140d');
    drawOutlinedRect(1, 18, 9, 8, '#5c4028', '#20140d');
    drawOutlinedRect(5, 10, 7, 9, '#2563eb', '#171a20');
  } else if (!player.onGround) {
    drawOutlinedRect(-7, 2, 15, 14, '#f3c68b', '#171a20');
    drawRect(-8, 0, 17, 6, '#4a2f1d');
    drawRect(4, 7, 2, 3, '#171a20');
    drawOutlinedRect(-9, 16, 18, 16, '#3b82f6', '#171a20');
    drawRect(-9, 27, 18, 4, '#1f2937');
    drawOutlinedRect(-13, 17, 8, 13, '#7a4a24', '#2e1a0d');
    drawOutlinedRect(-3, 7, 7, 12, '#2563eb', '#171a20');
    drawOutlinedRect(5, 9, 7, 12, '#2563eb', '#171a20');
    drawOutlinedRect(-8, 30, 8, 9, '#5c4028', '#20140d');
    drawOutlinedRect(3, 32, 8, 9, '#5c4028', '#20140d');
  } else if (player.moving) {
    const walkFrame = Math.floor(player.animationTime * 10) % 4;
    const legSwing = [4, 0, -4, 0][walkFrame];
    const bodyBob = walkFrame === 1 || walkFrame === 3 ? 1 : 0;

    drawOutlinedRect(-10 - legSwing, 40, 9, 8, '#5c4028', '#20140d');
    drawOutlinedRect(1 + legSwing, 40, 9, 8, '#5c4028', '#20140d');
    drawRect(-8 - legSwing, 31, 7, 10, '#1e3a8a');
    drawRect(1 + legSwing, 31, 7, 10, '#1e3a8a');
    drawOutlinedRect(-9, 15 + bodyBob, 18, 17, '#3b82f6', '#171a20');
    drawRect(-9, 27 + bodyBob, 18, 4, '#1f2937');
    drawOutlinedRect(-13, 17 + bodyBob, 8, 13, '#7a4a24', '#2e1a0d');
    drawOutlinedRect(-6, 2 + bodyBob, 15, 14, '#f3c68b', '#171a20');
    drawRect(-7, bodyBob, 17, 6, '#4a2f1d');
    drawRect(-8, 2 + bodyBob, 5, 9, '#4a2f1d');
    drawRect(3, 7 + bodyBob, 2, 3, '#171a20');
    drawOutlinedRect(4 - legSwing, 17 + bodyBob, 6, 13, '#2563eb', '#171a20');
    drawOutlinedRect(-12 + legSwing, 18 + bodyBob, 6, 12, '#2563eb', '#171a20');
  } else {
    const idleBob = Math.sin(player.animationTime * 3) > 0 ? 0 : 1;
    const blink = Math.floor(player.animationTime * 1.5) % 4 === 3;

    drawOutlinedRect(-10, 40, 9, 8, '#5c4028', '#20140d');
    drawOutlinedRect(1, 40, 9, 8, '#5c4028', '#20140d');
    drawRect(-8, 31, 7, 10, '#1e3a8a');
    drawRect(1, 31, 7, 10, '#1e3a8a');
    drawOutlinedRect(-9, 15 + idleBob, 18, 17, '#3b82f6', '#171a20');
    drawRect(-9, 27 + idleBob, 18, 4, '#1f2937');
    drawOutlinedRect(-13, 17 + idleBob, 8, 13, '#7a4a24', '#2e1a0d');
    drawOutlinedRect(-6, 2 + idleBob, 15, 14, '#f3c68b', '#171a20');
    drawRect(-7, idleBob, 17, 6, '#4a2f1d');
    drawRect(-8, 2 + idleBob, 5, 9, '#4a2f1d');
    drawRect(3, 7 + idleBob, 2, blink ? 1 : 3, '#171a20');
    drawOutlinedRect(4, 18 + idleBob, 6, 13, '#2563eb', '#171a20');
  }

  context.restore();
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

  context.globalCompositeOperation = 'source-over';
  context.fillStyle = 'rgba(0,0,0,.82)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const startX = player.x + player.width / 2;
  const startY = player.y + player.height / 2;
  const beamLength = 280;
  const beamSpread = 95;
  const endX = startX + player.facing * beamLength;
  const endTopY = startY - beamSpread / 2;
  const endBottomY = startY + beamSpread / 2;

  context.globalCompositeOperation = 'destination-out';
  context.fillStyle = 'rgba(255,255,255,1)';
  context.beginPath();
  context.arc(startX, startY, 42, 0, Math.PI * 2);
  context.fill();

  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endTopY);
  context.lineTo(endX, endBottomY);
  context.closePath();
  context.fill();

  context.globalCompositeOperation = 'source-over';
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
  drawOutlinedRect(monster.x, monster.y, monster.width, monster.height, '#8b2f3b', '#2a0d12');
  drawRect(monster.x + 8, monster.y + 14, 8, 8, '#ffdc4a');
  drawRect(monster.x + 20, monster.y + 14, 8, 8, '#ffdc4a');
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

  if (bossIsReturn) {
    drawOutlinedRect(boss.x, boss.y, boss.width, boss.height, '#8b2f3b', '#22070c');
    drawRect(boss.x + 16, boss.y + 20, 18, 18, '#ffdc4a');
    drawRect(boss.x + 62, boss.y + 20, 18, 18, '#ffdc4a');
    drawRect(boss.x + 18, boss.y + 52, 60, 16, '#5b1d25');
    drawRect(boss.x + 24, boss.y + 84, 48, 14, '#391218');
    drawRect(boss.x + 10, boss.y - 14, 14, 18, '#4a1218');
    drawRect(boss.x + boss.width - 24, boss.y - 14, 14, 18, '#4a1218');

    const healthBarX = boss.x;
    const healthBarY = boss.y - 28;
    drawRect(healthBarX, healthBarY, boss.width, 14, '#22070c');
    drawRect(healthBarX + 2, healthBarY + 2, (boss.width - 4) * (boss.health / boss.maxHealth), 10, '#ff4d5e');
    return;
  }

  if (bossImage.complete && bossImage.naturalWidth > 0) {
    context.drawImage(
      bossImage,
      boss.x,
      boss.y,
      boss.width,
      boss.height
    );

    const healthBarX = boss.x;
    const healthBarY = boss.y - 24;
    drawRect(healthBarX, healthBarY, boss.width, 12, '#22070c');
    drawRect(healthBarX + 2, healthBarY + 2, (boss.width - 4) * (boss.health / boss.maxHealth), 8, '#ff4d5e');
    return;
  }

  drawOutlinedRect(boss.x, boss.y, boss.width, boss.height, '#8b2f3b', '#22070c');
  drawRect(boss.x + 16, boss.y + 24, 16, 18, '#ffdc4a');
  drawRect(boss.x + 64, boss.y + 24, 16, 18, '#ffdc4a');
  drawRect(boss.x + 18, boss.y + 68, 60, 16, '#5b1d25');
  drawRect(boss.x + 26, boss.y + 104, 44, 14, '#391218');

  const healthBarX = boss.x;
  const healthBarY = boss.y - 24;
  drawRect(healthBarX, healthBarY, boss.width, 12, '#22070c');
  drawRect(healthBarX + 2, healthBarY + 2, (boss.width - 4) * (boss.health / boss.maxHealth), 8, '#ff4d5e');

  if (boss.attacking) {
    drawRect(boss.x - 10, boss.y + 60, 10, 8, '#ffd84d');
    drawRect(boss.x + boss.width, boss.y + 60, 10, 8, '#ffd84d');
  }
}

function currentRoomTheme() {
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
  if (monsterActive) return roomThemes[2];
  if (currentDoor === rewardDoor) return roomThemes[9];
  if (currentDoor === totalDoors) return roomThemes[9];
  return roomThemes[Math.floor((currentDoor - 1) / 10) % roomThemes.length];
}

function drawRoomDetails(theme) {
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

  if (theme.detail === 'paintings') {
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

function drawRoom() {
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
  context.scale(1 / pixelScale, 1 / pixelScale);

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

  drawRoomDetails(theme);
  drawFurniture();
  drawCloset();
  drawPlatforms();
  drawMilkshake();
  drawBackpack();
  drawTeleporter();

  if (currentFloor === 'main' && currentDoor === rewardDoor) drawRewardChest();
  else if (currentFloor === 'main' && !rareRoomActive && currentDoor !== bossDoor && currentDoor !== bossReturnDoor) drawCabinet();
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
againButton.addEventListener('click', () => window.location.reload());

badgesButton.addEventListener('click', () => {
  lobby.classList.add('hidden');
  badgeScreen.classList.remove('hidden');
  badgesButton.setAttribute('aria-expanded', 'true');
});

backButton.addEventListener('click', () => {
  badgeScreen.classList.add('hidden');
  lobby.classList.remove('hidden');
  badgesButton.setAttribute('aria-expanded', 'false');
});

document.addEventListener('DOMContentLoaded', () => {
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
  actionRow.append(badgesButton, floorsButton);

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

updateBadgeUi();
updateBossBouncerProgress();
updateHotbarUi();
updateBackpackUi();

hotbarElement.addEventListener('click', event => {
  const slot = event.target.closest('.hotbar-slot');
  if (!slot) return;
  selectHotbarSlot(Number(slot.dataset.slotIndex));
});

document.addEventListener('keydown', event => {
  input.add(event.code);
  if (/^[1-5]$/.test(event.key)) selectHotbarSlot(Number(event.key) - 1);
  if (event.code === 'KeyE') interact();
  if (event.code === 'KeyQ') useSelectedHotbarItem();
  if (event.code === 'Escape' && !won) {
    if (!floorScreen.classList.contains('hidden')) {
      floorScreen.classList.add('hidden');
      lobby.classList.remove('hidden');
      return;
    }

    paused = true;
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

  if (cutsceneActive) {
    updateCutscene(delta);
  } else if (!paused && !won) {
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

  updateMusic();

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
