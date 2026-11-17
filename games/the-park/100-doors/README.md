# THE PARK

A side-view pixel-style door game.

## Goal
Open all 100 doors.

## Story
- Door 1 is a normal room with no boss fight.
- Find the key in the top drawer.
- At Door 26, a monster appears.
- The monster chases you for 8 doors.
- During the chase, jump over crates and slide under beams.
- After the chase, you get Speed Boots and a flashlight.
- Door 50 has a boss fight. Jump on the boss's head 3 times to win.
- The Door 50 boss room is fully lit, and you get a safe moment after each stomp.
- Door 50 has a staircase to the roof. Press S on the roof to drop onto the boss.
- Door 75 brings back the Door 25 monster with faster charges, moving spikes, and extra beams.
- The boss uses image ID `204734852`, with a hand-drawn fallback if the image cannot load.
- Some later rooms are dark, so use the flashlight beam to find the key.
- Every group of 10 doors has its own room theme and background details.
- Calm rooms contain pixel furniture such as sofas, tables, shelves, beds, and desks.
- The player is a pixel adventurer with idle, walk, jump, and crouch animations.
- The player has a 100 HP health bar. Monster and boss hits take 20 HP, and moving spikes take 15 HP.
- Health returns to 100 whenever you enter a new room.
- The Door 25 monster chase and boss fights have built-in music with drums. Calm rooms stay quiet.
- There is a rare Restaurant Room with a 1.5% chance in eligible calm rooms.
- The Restaurant Room has 5 dining tables. One has a collectible milkshake.
- Select the milkshake in your hotbar and press Q to heal 25 HP.
- After the reward room, Rocket can appear in calm rooms. Hide in a closet when the warning appears.
- Rocket gives you a 5-second countdown and moves slower, giving you time to hide.
- Rocket looks like a melted human skull with glowing magma cracks and lava drips.
- Door 65 has an optional garden door in the middle of the room. Press `E` to enter THE GARDEN.
- Press **FLOORS** in the lobby to open the floor picker. Press **THE GARDEN** to teleport straight to Garden Door 1.
- Door 95 has an optional office door in the middle of the room. Press `E` to enter THE OFFICE.
- THE GARDEN is a separate 50-door floor. Finishing it returns you to main Door 66.
- Garden Door 25 starts a cutscene: an old tree cracks open, three meat legs burst out, and a submarine rises.
- Garden Doors 25-27 are an underwater chase with seaweed and coral obstacles.
- The submarine gently floats up and down during the underwater chase.
- Garden Doors 28-32 are a rainy ground chase. Jump over rocks and slide under fallen logs while the three-legged tree monster follows you.
- Garden Door 50 is a grand gold-and-glass exit door with vines, flowers, and a glowing 50 emblem.
- THE GARDEN takes place on a rainy night with a moon, stars, glowing lanterns, and wet puddles.
- Every Garden room has detailed scenery: realistic pixel trees, stone paths, flower patches, hedges, benches, ponds, or a gazebo.
- Ground flowers appear in seeded-random spots, so each Garden door has its own natural layout.
- Some Garden doors contain huge stationary vine flowers. When a mouth is open, stand still; when it is closed, run past.
- Press **FLOORS** in the lobby and choose **THE OFFICE** to teleport straight to Office Door 1.
- THE OFFICE is a separate 150-door floor. Finishing it returns you to main Door 96.
- Office rooms are ruined workstations with desks, destroyed computers, cables, papers, pencils, paper planes, and a printing machine.
- Every 10th Office door has jumpable desks and low cables you can slide under.
- Office Door 25 starts an 8-door printing-machine chase. The player becomes a furious shadow with a Post-it note face.
- Every 15th Office door has an optional storage sideroom. It contains bookshelves, storage boxes, broken computer parts, and pencils.
- Walking right inside a storage sideroom returns you to the same Office door.
- The rare Teleporter has a 1.5% chance to appear in THE OFFICE, on a desk or storage box.
- Collect the Teleporter with `E`. Select it in the hotbar and press `Q` to warp straight to Office Door 150.
- The rare Backpack has a 1.3% chance to appear in calm rooms, either on the ground or on a small table.
- Each eligible calm room has a 70% chance to start unlocked.
- Door 1 stays locked, and chase, reward, and boss rooms keep their special rules.

## Badges
- Press **BADGES** in the lobby to open a separate Badge Index screen. It lists every earned and missing badge.
- The Badge Index scrolls with your mouse wheel. Press **BACK** to return to the lobby.
- **Game Starter:** enter the game for the first time.
- **First Key:** find the Door 1 key.
- **Chase Complete:** reach the reward room after Door 33.
- **Speed Boots:** open the reward chest.
- **Demon Slayer:** defeat the Door 50 boss.
- **Monster Slayer:** defeat the returning monster at Door 75.
- **Restaurant Finder:** discover the rare Restaurant Room.
- **Rocket Survivor:** survive Rocket passing through the room.
- **Maximum Ragebaiter:** hide from Rocket at the last second before it would hit you.
- **Outside Person:** enter THE GARDEN.
- **Mountain Runner:** survive the five Garden ground-chase doors.
- **Touched Grass:** finish all 50 doors in THE GARDEN.
- **Office Worker:** enter THE OFFICE.
- **Storage Explorer:** find a storage sideroom.
- **Teleporter Finder:** collect the rare Teleporter.
- **Office Chase Survivor:** escape the printing machine at Office Door 32.
- **Overtime Champion:** finish all 150 doors in THE OFFICE.
- **100 Doors:** open Door 100.
- **Slide Legend:** slide 25 times.
- **Jump Machine:** jump 50 times.
- **Closet Camper:** hide 5 times.
- **Snack Time:** drink a milkshake.
- **Shortcut Specialist:** use the Office Teleporter.
- **Boss Bouncer:** bounce on 10 boss heads.
- **No Hit Wonder:** finish a floor segment without taking damage.
- **Paper Chaser:** explore 3 storage siderooms.
- **Rain Dancer:** spend 10 seconds in THE GARDEN rain.
- **Submarine Surfer:** finish the underwater chase without damage.
- **Mountain Goat:** finish the Garden ground chase without damage.
- **Office Olympian:** finish the Office chase without damage.
- **Badge Collector:** earn 10 badges.
- **Completionist:** earn every other badge.

Badges save in your browser, so they stay after you refresh the page.
The Badge Index has separate MAIN FLOOR, THE GARDEN, THE OFFICE, and FUN & RANDOM sections.

## Controls
- A/D or left/right arrow: run
- W, Space, or up arrow: jump
- S or down arrow: slide, and drop through boss-room platforms
- E: search drawers, pick up keys, and open doors
- Q: use the selected milkshake
- 1-5: select a hotbar slot

## Hotbar
- The hotbar has 5 slots.
- Collectible items appear in the first empty hotbar slot.
- The milkshake heals 25 HP and disappears when its count reaches zero.
- Press 1-5 or click a slot to select it.
- The rare Backpack adds 4 storage slots. Select the Backpack in the hotbar to see them.

## Easy Changes
- Total doors: `totalDoors`
- Office doors: `totalOfficeDoors`
- Chase start: `monsterStartDoor`
- Chase length: `chaseDoorCount`
- Player speed: `player.speed`
- Pixel size: `pixelScale`
- Dark rooms appear on doors divisible by 5 after the reward room.
- Unlocked-room chance: `unlockedDoorChance`
- Rare Restaurant Room chance: `rareRoomChance`
- Backpack spawn chance: `backpackSpawnChance`
- Backpack storage slots: `backpackStorageSlots`
- The boss room is Door 50.
- The monster return fight is Door 75.
