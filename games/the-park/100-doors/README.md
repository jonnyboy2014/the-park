# THE PARK

A side-view pixel-style door game.

## Goal
Open all 100 doors.

## Release trailer
- Click **TRAILER** in the lobby or watch at `http://127.0.0.1:3000/doors/trailer/`.
- The trailer showcases all four floors, bosses, chases, rare items, the Backpack, RIFT, badges, and the escape.
- Its original cinematic chiptune theme is called **Last Door Rising**.
- The finished video is `trailer/THE-PARK-Release-Trailer.mp4`; the recording and soundtrack generators are in `trailer/`.
- The **RELEASE DAY** lobby has live falling confetti, sweeping spotlights, and a glowing title. Reduced-motion settings disable these animations.

## Story
- Door 1 is a normal room with no boss fight.
- Normal Main Floor rooms now have named themes: Grand Gallery, Conservatory, Boiler Room, Library, Bedroom, Clockwork Study, Crystal Room, Overgrown Parlour, and Dusty Attic.
- Room themes include matching furniture and wallpaper patterns such as damask, botanical vines, stripes, lattice, stars, geometric diamonds, Art Deco shapes, and dots.
- Wallpaper has crown molding, a chair rail, lower wall panels, and detailed floorboards.
- Some eligible Main Floor rooms become a Grand Stairwell. You start on the upper landing and can walk or jump down six carpeted stone steps to the arched exit, then climb back up.
- Click `GO DOWN THE STAIRS` in a stairwell to walk down automatically. Press a movement key to take back control.
- Elevators can also appear in eligible calm Main Floor rooms. The normal door is removed, so stand by the elevator and press `E` to ride to the next five-door room section.
- Elevator placement is deterministic. Rides cannot skip required monster chases, bosses, reward rooms, or special floor entrances.
- Elevator doors close, the cab rumbles downward, and the doors open in the new section. Reduced-motion settings arrive immediately without the animation.
- Stairwell doors are deterministic, so retries keep the same room layout. Bosses, rare rooms, dark rooms, and floor entrances keep their special designs.
- The adventurer has a new teal jacket, orange scarf, forehead goggles, dark hair, backpack, navy trousers, and brown boots.
- Idle, walking, jumping, and sliding poses include scarf movement, blinking, jacket details, backpack straps, and animated limbs.
- Find the key in the top drawer.
- At Door 26, a monster appears.
- The monster chases you for 8 doors.
- During the chase, jump over crates and slide under beams. Doors 27 and 32 are stairwell chases where the monster and obstacles follow the real step heights.
- After the chase, you get Speed Boots and a flashlight.
- Door 50 has a boss fight. Jump on the boss's head 3 times to win.
- The Door 50 boss room is fully lit, and you get a safe moment after each stomp.
- Door 50 has a staircase to the roof. Press S on the roof to drop onto the boss.
- Door 75 brings back the Door 25 monster with faster charges, moving spikes, and extra beams.
- The boss uses image ID `204734852`, with a hand-drawn fallback if the image cannot load.
- Both boss fights have detailed pixel bodies, large health panels, charge warnings, and a faster Phase 2 at half health.
- Every chase and hunt has a named progress panel, remaining-door pips, proximity warnings, hit flashes, and reduced-motion-safe screen shake.
- Some later rooms are dark, so use the flashlight beam to find the key.
- The flashlight reveals a clear cone around the player in dark Main Floor rooms and throughout THE CELLAR.
- Every group of 10 doors has its own room theme and background details.
- Calm rooms contain pixel furniture such as sofas, tables, shelves, beds, and desks.
- The player is a pixel adventurer with idle, walk, jump, and crouch animations.
- The player has a 100 HP health bar. Monster and boss hits take 20 HP, and moving spikes take 15 HP.
- Health returns to 100 whenever you enter a new room.
- The Door 25 monster chase and boss fights have built-in music with drums. Calm rooms stay quiet.
- There is a rare Restaurant Room with a 1.5% chance in eligible calm rooms.
- The Restaurant Room has 5 dining tables. One has a collectible milkshake.
- Select the milkshake in your hotbar and press Q to heal 25 HP.
- The rare yellow Fanta Jug has a 0.5% chance to appear in its own peaceful Main Floor basement room.
- The lobby shows the current Fanta Jug find chance.
- The basement has concrete blocks, exposed pipes, crates, a water heater, and a yellow utility light.
- The Fanta Jug is a yellow barrel-shaped pixel jug inspired by Starlight Jug, with metal bands, a glowing star label, and no handle.
- Collect it with `E`, then select it and press `Q` to restore 100% HP and gain an 8-second Fanta Rush speed boost.
- After the reward room, Rocket can appear in calm rooms. Hide in a closet when the warning appears.
- Rocket gives you a 5-second countdown and moves slower, giving you time to hide.
- Rocket looks like a melted human skull with glowing magma cracks and lava drips.
- Door 40 has a hidden staircase in the middle of the room. Press `E` to enter THE CELLAR.
- THE CELLAR is a separate 70-door floor with dark rooms, jumpable crates, and low beams to slide under.
- Press **FLOORS** in the lobby and choose **THE CELLAR** to start at Cellar Door 1 with a flashlight.
- Cellar Doors 3-8 contain the Gloom Crawler. Its eyes glow in the dark, and a bright warning with ground arrows shows its exact charge direction.
- Jump over the Gloom Crawler's charge. Touching it costs 15 HP.
- Use the flashlight in THE CELLAR. Finishing it returns you to Main Door 40.
- Door 65 has an optional garden door in the middle of the room. Press `E` to enter THE GARDEN.
- Press **FLOORS** in the lobby to open the floor picker. Press **THE GARDEN** to teleport straight to Garden Door 1.
- Door 95 has an optional office door in the middle of the room. Press `E` to enter THE OFFICE.
- THE GARDEN is a separate 50-door floor. Finishing it returns you to main Door 66.
- Garden Door 25 starts a cutscene: an old tree cracks open, three meat legs burst out, and a submarine rises.
- Garden Doors 25-27 are an underwater chase with seaweed, coral obstacles, and a unique tentacled vine flower with bubbles.
- The submarine gently floats up and down during the underwater chase.
- Garden Doors 28-32 are a rainy ground chase. Jump over rocks and slide under fallen logs while the animated three-legged tree monster follows you.
- Garden Door 50 is a grand gold-and-glass exit door with vines, flowers, and a glowing 50 emblem.
- THE GARDEN takes place on a rainy night with a moon, stars, glowing lanterns, and wet puddles.
- Every Garden room has detailed scenery: realistic pixel trees, stone paths, flower patches, hedges, benches, ponds, or a gazebo.
- Ground flowers appear in seeded-random spots, so each Garden door has its own natural layout.
- Some Garden doors contain huge stationary vine flowers. When a mouth is open, stand still; when it is closed, run past.
- Press **FLOORS** in the lobby and choose **THE OFFICE** to teleport straight to Office Door 1.
- THE OFFICE is a separate 150-door floor. Finishing it returns you to main Door 96.
- Office rooms are ruined workstations with desks, destroyed computers, cables, papers, pencils, paper planes, and a printing machine.
- Every 10th Office door has jumpable desks and low cables you can slide under.
- Office Door 25 starts an 8-door printing-machine chase with flying paper trails. The player becomes a furious shadow with a Post-it note face.
- Every 15th Office door has an optional storage sideroom. It contains bookshelves, storage boxes, broken computer parts, and pencils.
- Walking right inside a storage sideroom returns you to the same Office door.
- The rare Teleporter has a 1.5% chance to appear in THE OFFICE, on a desk or storage box.
- Collect the Teleporter with `E`. Select it in the hotbar and press `Q` to warp straight to Office Door 150.
- The rare Backpack has a 1.3% chance to appear in calm rooms, either on the ground or on a small table.
- Door 100 is a special starry room with a glowing blue RIFT.
- Stand near the RIFT and press `E` to store your selected hotbar item or stack. Press `E` again to take it back out.
- The RIFT holds one item or stack at a time and remembers it in browser storage after a refresh or a new run.
- If the RIFT contains an item, it also appears at Door 1 so you can retrieve it early. Taking the item out restores the normal Door 1 key-search room.
- If your hotbar is full, make room before taking the item out. It stays safe inside the RIFT.
- Rift-in-a-Can has a 0.8% chance to appear in eligible Main Floor calm rooms.
- The lobby shows the current Rift-in-a-Can find chance.
- Collect the can with `E`, select it in the hotbar, and press `Q` to throw it and open a RIFT on the floor ahead of you.
- A thrown RIFT uses the same saved item storage as the Door 1 and Door 100 RIFTS. It closes when you leave the room, but its stored item stays safe.
- Only one RIFT can be open in a room. Throwing another can is blocked until you leave.
- Flow Juice has a 3% chance to appear in eligible Main Floor calm rooms.
- The lobby shows the current Flow Juice find chance.
- The Flow Juice bottle contains swirling pink and blue juice.
- Collect it with `E`, then select it and press `Q` to reduce gravity to 45% for 12 seconds.
- Flow Juice makes jumps float higher and longer. Pink and blue bubbles appear around the player while it is active.
- Each eligible calm room has a 70% chance to start unlocked.
- Normal Door 1 stays locked, and chase, reward, and boss rooms keep their special rules.

## Badges
- Press **BADGES** in the lobby to open the wooden Badge Wall.
- Earned badges light up on colorful plaques. Missing badges stay gray and locked.
- Every badge has an illustrated mini-scene with a gradient background, foreground details, colorful artwork, and bright line work.
- Larger picture windows also have ribbon tails, metallic rings, and engraved name plaques.
- Chase Complete, Slide Legend, and Jump Machine show the playable adventurer with the same brown hair, blue jacket, dark trousers, brown boots, and backpack.
- Difficult badges have animated rainbow rings around their circular artwork, with bright gold card trim and medal rims.
- Scroll the shelves with your mouse wheel. Press **BACK** to return to the lobby.
- **Game Starter:** enter the game for the first time.
- **First Key:** find the Door 1 key.
- **Chase Complete:** reach the reward room after Door 33.
- **Speed Boots:** open the reward chest.
- **Demon Slayer:** defeat the Door 50 boss.
- **Monster Slayer:** defeat the returning monster at Door 75.
- **Restaurant Finder:** discover the rare Restaurant Room.
- **Fanta Jug Finder:** collect the rare yellow Fanta Jug in its basement room.
- **Flow Juice Finder:** collect the pink-blue Flow Juice.
- **Rift Can Finder:** collect Rift-in-a-Can.
- **Rocket Survivor:** survive Rocket passing through the room.
- **Maximum Ragebaiter:** hide from Rocket at the last second before it would hit you.
- **Outside Person:** enter THE GARDEN.
- **Mountain Runner:** survive the five Garden ground-chase doors.
- **Touched Grass:** finish all 50 doors in THE GARDEN.
- **Cellar Explorer:** find the hidden stairs at Main Door 40.
- **Cellar Clear:** escape all 70 rooms in THE CELLAR.
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
- **Boss Bouncer:** bounce on 10 boss heads. Your stomps stay saved between attempts and browser reloads.
- **No Hit Wonder:** finish a floor segment without taking damage.
- **Paper Chaser:** explore 3 storage siderooms.
- **Rain Dancer:** spend 10 seconds in THE GARDEN rain.
- **Submarine Surfer:** finish the underwater chase without damage.
- **Mountain Goat:** finish the Garden ground chase without damage.
- **Office Olympian:** finish the Office chase without damage.
- **Badge Collector:** earn 10 badges.
- **Completionist:** earn every other badge.

## Badge collection
- Pressing `BADGES` plays a short animated walk down a torch-lit stone staircase into the Badge Vault.
- The staircase has beveled stone slabs, brick joints, cracks, chipped edges, moss, pebbles, Roman-numeral carvings, and a bronze handrail.
- The Badge Index pops up after the walk. Use `SKIP`, `Esc`, `Enter`, or `Space` to finish the transition early.
- Reduced-motion settings skip the walking animation and open the Badge Index immediately.
- Every badge has a unique miniature scene with fine details, metallic rims, glass reflections, ribbons, and a collector number.
- Difficult badges use animated rainbow rims and an `ULTRA` collector mark.
- Click any badge in the Badge Index to open a large inspection view with its artwork, description, and earned or locked state.
- Badge inspection also works with `Enter` or `Space` on a focused badge. Press `Esc` or click outside to close it.

Badges save in your browser, so they stay after you refresh the page.
The Badge Wall has separate MAIN FLOOR, THE CELLAR, THE GARDEN, THE OFFICE, and FUN & RANDOM shelves.

## Controls
- A/D or left/right arrow: run
- W, Space, or up arrow: jump
- S or down arrow: slide, and drop through boss-room platforms
- E: search drawers, pick up keys, open doors, and use the blue RIFT
- Q: use the selected milkshake, Fanta Jug, Flow Juice, Teleporter, or Rift-in-a-Can
- B: store the selected hotbar item or stack in the Backpack
- 1-5: select a hotbar slot

## Hotbar
- The hotbar has 5 slots.
- Collectible items appear in the first empty hotbar slot.
- The milkshake heals 25 HP and disappears when its count reaches zero.
- The Fanta Jug restores 100% HP and gives 1.6x movement speed for 8 seconds.
- Rift-in-a-Can is consumed when thrown and opens a usable floor RIFT for the current room.
- Flow Juice is consumed when drunk and gives 12 seconds of low gravity.
- Press 1-5 or click a slot to select it.
- The rare Backpack adds 4 storage slots and shows them whenever you own it.
- Select an item and press `B` to store its whole stack. Matching items stack together inside the Backpack.
- Click a Backpack slot to take its item or stack back into the hotbar.
- If the Backpack or hotbar is full, the move is cancelled and your items stay safe.

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
- Fanta Jug spawn chance: `fantaJugSpawnChance`
- Fanta Rush duration and speed: `fantaRushDuration` and `fantaRushSpeedMultiplier`
- Rift-in-a-Can spawn chance: `riftCanSpawnChance`
- Flow Juice spawn chance, duration, and gravity: `flowJuiceSpawnChance`, `flowJuiceDuration`, and `flowJuiceGravityMultiplier`
- Backpack storage slots: `backpackStorageSlots`
- RIFT browser save key: `riftStorageKey`
- The boss room is Door 50.
- The monster return fight is Door 75.
