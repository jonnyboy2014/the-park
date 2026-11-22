# 100 Doors Log

## 2026-11-14 - First playable slice

**Milestone:** Started the 100 Doors game.

**What changed**
- Added a side-view pixel-style room.
- Added Door 1 as a calm room with a key in a cabinet.
- Planned the monster chase at Door 26.

**Next upgrade**
- Add the monster and 8 chase doors with jump and slide obstacles.

## 2026-11-14 - Full 100-door build

**Milestone:** Made all 100 rooms playable and detailed.

**What changed**
- Added Door 1 as a calm key-search room.
- Added the monster chase from Doors 26 to 33.
- Added jump-over crates and slide-under beams during the chase.
- Added a reward room after the chase with Speed Boots and a flashlight.
- Added dark rooms that use the flashlight beam.
- Added 10 rotating room themes with different wall, floor, and decoration details.
- Added a boss fight at Door 50.
- Added the Door 25 monster return at Door 75, with 4 stomps and harder obstacles.
- Added the requested boss image ID `204734852`.

**Next upgrade**
- Add unique puzzle types for every 10-door section.
- Tune the boss attack speed.
- Tune the moving spike speed on Door 75.

## 2026-11-14 - Badge system

**Milestone:** Added milestone badges for the whole journey.

**What changed**
- Added seven badges: Game Starter, First Key, Chase Complete, Speed Boots, Demon Slayer, Monster Slayer, and 100 Doors.
- Added badge chips to the start screen and win screen.
- Added a badge counter to the HUD and a popup when a badge is earned.
- Badges save in the browser with `localStorage`.

**Next upgrade**
- Add a badge detail panel with a short description for each badge.

## 2026-11-14 - Door 50 boss fix

**Milestone:** Made the Door 50 boss fight fair and reachable.

**What changed**
- Kept boss rooms lit instead of applying the dark-room effect.
- Shortened the Door 50 boss so its head is easier to stomp.
- Added a short safe time after each stomp so the boss cannot instantly hit you.

**Next upgrade**
- Test the Door 50 fight with a quick debug way to jump straight to it.

## 2026-11-15 - Unlocked calm doors

**Milestone:** Made some calm rooms quicker to pass.

**What changed**
- Added unlocked calm doors at 8, 18, 38, 48, 58, 68, 78, 88, and 98.
- Unlocked doors start green, do not need a key, and open when you walk right.
- Kept Door 1 locked so the first key search still happens.

**Next upgrade**
- Add a small unlocked-door icon in the room prompt.

## 2026-11-15 - Door 50 roof staircase

**Milestone:** Made the Door 50 boss easier to stomp.

**What changed**
- Added four staircase platforms and a long roof platform in the Door 50 boss room.
- Platforms are one-way, so you can jump up through them and land on top.
- Press S on the roof to drop onto the boss's head.
- Added a clear prompt for the staircase strategy.

**Next upgrade**
- Add a debug door picker for testing specific rooms.

## 2026-11-15 - Room furniture

**Milestone:** Made calm rooms feel more like real rooms.

**What changed**
- Added pixel furniture that rotates across calm rooms: sofa, table, bookshelf, bed, and desk.
- Furniture is decorative and does not block movement.
- Chase, reward, and boss rooms stay clear for their special challenges.

**Next upgrade**
- Add searchable drawers inside some furniture.

## 2026-11-15 - Rare Restaurant Room and hotbar

**Milestone:** Added the first rare room and item inventory.

**What changed**
- Added a rare Restaurant Room with a 1.5% chance in eligible calm rooms.
- Added exactly 5 dining tables to the Restaurant Room.
- Added a collectible milkshake on one table.
- Added a 5-slot hotbar with click and 1-5 key selection.
- Added the Restaurant Finder badge.

**Next upgrade**
- Make the milkshake selectable and drinkable.

## 2026-11-15 - New player animations

**Milestone:** Rebuilt the player as a clearer pixel adventurer.

**What changed**
- Added an idle animation with breathing and blinking.
- Added a four-frame walk animation.
- Added a jump pose and a crouch/slide pose.
- Kept the original player hitbox, speed, and controls.

**Next upgrade**
- Add a small landing squash animation.

## 2026-11-15 - Chase and boss music

**Milestone:** Added action music without changing calm-room gameplay.

**What changed**
- Added a fast pixel theme for the Door 25 monster chase.
- Added a deeper theme for boss fights.
- Music stops automatically in calm rooms, on pause, and after winning.

**Next upgrade**
- Add a music on/off button.

## 2026-11-15 - Intense chase theme

**Milestone:** Made the Door 25 monster chase music more exciting.

**What changed**
- Made the chase theme faster.
- Added urgent low bass and a rising melody.
- Added heartbeat-style drum pulses.

**Next upgrade**
- Add a music on/off button.

## 2026-11-15 - Chase snare drum

**Milestone:** Made the chase beat more drum-like.

**What changed**
- Added a snare layer to the chase music.
- Kept the kick, hi-hat, and bass layers.

**Next upgrade**
- Add a music on/off button.

## 2026-11-15 - Player health bar

**Milestone:** Added a visible player health system.

**What changed**
- Added a 100 HP health bar to the HUD.
- Monster hits and boss hits now take 20 HP.
- Moving spikes now take 15 HP.
- Added one second of invincibility and flashing after each hit.
- Collapsing restarts the current room with full health.

**Next upgrade**
- Add healing items.

## 2026-11-15 - Rare Backpack item

**Milestone:** Added a second rare collectible.

**What changed**
- Added a rare Backpack item with a 1.3% spawn chance.
- The Backpack can appear on the ground or on a small table.
- Added an `E` pickup prompt and a pixel hotbar icon.

**Next upgrade**
- Add more collectible items that can fill the Backpack.

## 2026-11-15 - Random unlocked rooms

**Milestone:** Made unlocked rooms random instead of fixed.

**What changed**
- Added a 70% random chance for each eligible calm room to start unlocked.
- Kept Door 1 locked so the first key puzzle remains.
- Kept chase, reward, and boss rooms as special challenges.

**Next upgrade**
- Add searchable drawers inside some furniture.

## 2026-11-15 - Milkshake healing

**Milestone:** The milkshake is now a usable healing item.

**What changed**
- Press Q with a milkshake selected to heal 25 HP.
- Full health blocks the use so the milkshake is not wasted.
- The count decreases after each drink and the item disappears when it reaches zero.

**Next upgrade**
- Add another rare healing or helper item.

## 2026-11-15 - Rocket and hiding closets

**Milestone:** Added a Rush-style monster and a hiding mechanic.

**What changed**
- Added interactable closets with `E` to hide and leave.
- Added Rocket, a fast monster that warns you before charging across the room.
- Hiding prevents Rocket and the Door 25 monster from hitting you.
- Designed Rocket as a melted human skull with magma glow, cracks, and dripping lava.
- Increased Rocket's warning to 5 seconds and reduced his speed for a fairer escape.
- Added the Rocket Survivor badge for surviving a Rocket encounter.

**Next upgrade**
- Give Rocket a custom animation and sound effect.

## 2026-11-15 - Lobby Badge Index

**Milestone:** Added a full-screen badge viewer.

**What changed**
- Added a `BADGES` lobby button.
- Pressing it opens a separate Badge Index screen.
- The index lists every badge, with gold badges earned and gray badges still missing.
- Added mouse-wheel scrolling, a visible scrollbar, and a `BACK` button.

**Next upgrade**
- Add short badge descriptions to the index.

## 2026-11-15 - Drawer key furniture

**Milestone:** Made the key puzzle furniture clearer and more detailed.

**What changed**
- Redrew the cabinet as a three-drawer pixel dresser.
- The top drawer opens when searched, revealing the key inside.
- Redrew the key with a round bow, shaft, and key teeth.
- Updated the prompt to `E: Search drawer`.

**Next upgrade**
- Add occasional drawers that contain bonus items.

## 2026-11-15 - Door 65 garden door

**Milestone:** Added a special midpoint door design.

**What changed**
- Placed a garden-style door in the middle of Door 65.
- Added an arched green frame, glass panes, vines, flowers, and a wooden handle.
- Kept the normal room theme and door-opening rules.

**Next upgrade**
- Add a small garden cutscene or reward at Door 65.

## 2026-11-15 - THE GARDEN floor

**Milestone:** Added a complete optional garden floor.

**What changed**
- Added an optional garden door at main Door 65.
- Added THE GARDEN, a separate 50-door floor with its own HUD counter.
- Added giant vine flowers in four chase stretches.
- Made the giant vine flower stationary and much larger.
- Vine flowers damage moving players while their mouths are open and can be passed while closed.
- Added garden scenery, vine stalks, vine beams, and flower obstacles.
- Finishing THE GARDEN returns the player to main Door 66.
- Added Outside Person and Touched Grass badges in a separate Badge Index section.

**Next upgrade**
- Add a rare Garden-only collectible.

## 2026-11-15 - Detailed rainy Garden rooms

**Milestone:** Made THE GARDEN feel like a real nighttime outdoor floor.

**What changed**
- Added brighter rain streaks, puddles, and a darker night overlay.
- Replaced flat trees with layered trunks, bark texture, roots, branches, and rain-lit leaves.
- Added reusable scenery pieces: stone paths, lanterns, flower patches, hedges, benches, ponds, and a gazebo.
- Every Garden room now mixes shared scenery with door-based layout changes.

**Next upgrade**
- Add rain sound effects only while exploring THE GARDEN.

## 2026-11-15 - Random Garden ground flowers

**Milestone:** Made the Garden ground look naturally overgrown.

**What changed**
- Replaced evenly spaced ground flowers with 18 seeded-random flowers.
- Each Garden door now gets a unique flower layout that stays stable during that room.
- Added rain puddle highlights around each flower.

**Next upgrade**
- Add small fireflies that drift above the Garden flowers.

## 2026-11-15 - Lobby floor picker

**Milestone:** Added a dedicated FLOORS screen.

**What changed**
- Added a `FLOORS` button to the lobby.
- Created a separate floor-index screen with Main Floor and THE GARDEN cards.
- Pressing THE GARDEN teleports the player straight to Garden Door 1.
- Pressing MAIN FLOOR resumes the saved main-floor room when available.

**Next upgrade**
- Show live floor progress inside each floor card.

## 2026-11-15 - Fun & Random badge pack

**Milestone:** Added 14 extra badges with real gameplay triggers.

**What changed**
- Added a FUN & RANDOM section to the Badge Index.
- Added Slide Legend, Jump Machine, Closet Camper, Snack Time, Shortcut Specialist, and Boss Bouncer.
- Added No Hit Wonder, Paper Chaser, Rain Dancer, Submarine Surfer, Mountain Goat, and Office Olympian.
- Added Badge Collector for 10 badges and Completionist for earning every other badge.

**Next upgrade**
- Add a badge progress page with counters for jumps, slides, hides, and boss stomps.

## 2026-11-17 - THE PARK lobby rename

**Milestone:** Renamed the visible game title and added lobby challenge progress.

**What changed**
- Changed the browser tab and lobby title to THE PARK.
- Added a Boss Bouncer counter to the lobby.
- The counter updates after every successful boss stomp and shows DONE once the badge is earned.

**Next upgrade**
- Add counters for more FUN & RANDOM badges.

## 2026-11-15 - Grand Garden Door 50

**Milestone:** Gave THE GARDEN a special final exit.

**What changed**
- Redrew Garden Door 50 as a tall arched grand exit.
- Added gold trim, double doors, stained-glass panels, vines, flowers, and a glowing 50 emblem.
- Updated the final Garden HUD text to `Grand garden exit`.

**Next upgrade**
- Add a short celebration burst when Garden Door 50 opens.

## 2026-11-15 - Garden ground chase in 100 Doors

**Milestone:** Finished the story transition from underwater to ground.

**What changed**
- Extended the Garden Door 25 story so the three-legged tree monster follows the player through Doors 28-32.
- Added stormy mountain rooms with stars, a moon, pixel peaks, rocks, grass, and rain.
- Added jumpable rocks and slideable fallen logs.
- Added chase HUD text and a Mountain Runner badge.

**Next upgrade**
- Add the mountain-top jump-down ending with an explosion effect.

## 2026-11-15 - Floating submarine in 100 Doors

**Milestone:** Made the submarine feel buoyant underwater.

**What changed**
- Added a smooth up-and-down floating animation for the submarine during Garden Doors 25-27.

**Next upgrade**
- Add spinning propeller bubbles.

## 2026-11-15 - THE OFFICE sub-floor in 100 Doors

**Milestone:** Added a 150-door ruined-office sub-floor.

**What changed**
- Added an optional Office Door at main Door 95 and a THE OFFICE card in the FLOORS screen.
- Created 150 Office doors that finish at main Door 96.
- Added ruined office rooms with desks, destroyed computers, cables, papers, pencils, paper planes, and a printing machine.
- Added desk/cable obstacle rooms every 10th Office door.
- Added optional storage siderooms every 15th Office door with bookshelves, boxes, broken computer parts, and pencils.
- Added Office Worker, Storage Explorer, and Overtime Champion badges in a new Office badge section.

**Next upgrade**
- Add an office boss or copy-machine monster.

## 2026-11-15 - Office printing-machine chase

**Milestone:** Added a special chase and shadow player form.

**What changed**
- Office Doors 25-32 now feature a printing-machine chase with desks and cables.
- Added chase music, a new survivor badge, and fair obstacle spacing.
- The player becomes a black shadow with a furious yellow Post-it note face during the chase.

**Next upgrade**
- Add paper-plane projectiles for the printing machine.

## 2026-11-15 - Rare Office Teleporter

**Milestone:** Added a collectible shortcut item.

**What changed**
- Added a 1.5% Teleporter spawn chance in Office rooms and storage siderooms.
- The Teleporter appears on a desk or storage box and is collected with `E`.
- Selecting it and pressing `Q` warps the player straight to Office Door 150.
- Added a Teleporter Finder badge and a pixel hotbar icon.

**Next upgrade**
- Add a short warp flash animation.

## 2026-11-15 - Maximum Ragebaiter badge

**Milestone:** Added a Main Floor last-second hiding badge.

**What changed**
- Added the Maximum Ragebaiter badge for hiding from Rocket just before it would hit.
- The badge only awards if the player remains hidden until Rocket passes.

**Next upgrade**
- Add a special close-call screen flash.

## 2026-11-15 - Lobby button layout repair

**Milestone:** Kept BADGES visible after adding FLOORS.

**What changed**
- Moved BADGES and FLOORS into a compact side-by-side row.
- Made the lobby card scroll safely on smaller screens.
- Loaded the floor screen after the DOM finished parsing.

**Next upgrade**
- Show live floor progress inside each floor card.

## 2026-11-17 - First playable Cellar

**Milestone:** Added a hidden 10-room Cellar below the Main Floor.

**What changed**
- Added a staircase at Main Door 40 and a safe return staircase in Cellar Door 10.
- Added dark Cellar rooms with flashlight lighting, crates, beams, and stone scenery.
- Added Cellar Explorer and Cellar Clear badges.
- Returning from the Cellar restores Main Door 40 without clearing badge progress.

**Next upgrade**
- Add a unique Cellar monster.

## 2026-11-17 - Wooden Badge Wall

**Milestone:** Turned the Badge Index into a coded wooden display wall.

**What changed**
- Added wooden shelves with four upright badge plaques per shelf.
- Added section colors, bright earned medals, and gray locked plaques.
- Added EARNED and LOCKED labels plus short hover descriptions.
- Checked the wall at desktop and phone sizes with all 35 badges.

**Next upgrade**
- Give each badge its own CSS-drawn icon.

## 2026-11-17 - Badge pictures and difficulty borders

**Milestone:** Made every badge show its own matching picture.

**What changed**
- Added 32 reusable SVG pictures for all 35 badges, including keys, rockets, trees, submarines, printers, and trophies.
- Added bright double-gold borders to 16 difficult badges, including locked ones.
- Added difficult-badge descriptions to the hover labels.
- Checked every picture and gold border at desktop and phone sizes.

**Next upgrade**
- Add a short shine animation when a new badge is earned.

## 2026-11-17 - Detailed badge medals

**Milestone:** Upgraded the simple badge icons into detailed collectible medals.

**What changed**
- Layered colorful shapes and highlights underneath every badge's line art.
- Added ribbon tails, metallic rings, engraved name plaques, and corner rivets.
- Added diagonal plaque texture and brighter gold detail on difficult badges.
- Enlarged the artwork and checked every shelf at desktop and phone sizes.

**Next upgrade**
- Add a small sparkle burst when a badge is unlocked.

## 2026-11-17 - Player-matched badge poses

**Milestone:** Made badge characters look like the real playable adventurer.

**What changed**
- Replaced the simple Chase Complete stick figure with a running pixel adventurer.
- Added matching sliding and jumping poses to Slide Legend and Jump Machine.
- Reused the real player's brown hair, blue jacket, dark trousers, brown boots, and brown backpack.
- Checked all three poses inside their illustrated badge scenes.

**Next upgrade**
- Add a small sparkle burst when a badge is unlocked.

## 2026-11-17 - Gloom Crawler in the Cellar

**Milestone:** Added a unique Cellar monster with a fair, readable attack.

**What changed**
- Added the purple pixel Gloom Crawler to Cellar Doors 3-8.
- Added patrol, warning, and charge states with a 0.65-second warning before each charge.
- Added glowing eyes and warning symbols that remain visible in the dark.
- Added 15 HP contact damage and verified that jumping avoids the crawler.

**Next upgrade**
- Add the badge-unlock sparkle burst.

## 2026-11-17 - Cellar expanded to 75 rooms

**Milestone:** Turned the Cellar into a longer 75-room floor.

**What changed**
- Expanded THE CELLAR from 10 rooms to 75 rooms.
- Kept the staircase exit, return progress, obstacles, and Gloom Crawler encounters working with the new total.
- Updated the Cellar instructions and Cellar Clear badge description.

**Next upgrade**
- Add more variety between Cellar rooms.

## 2026-11-17 - Cellar floor picker and 70-room total

**Milestone:** Added THE CELLAR to FLOORS and confirmed its final room count.

**What changed**
- Added a purple THE CELLAR card to the floor picker.
- The shortcut starts at Cellar Door 1 with a flashlight and awards Cellar Explorer.
- Set THE CELLAR to 70 rooms, entered from Main Door 40.
- Updated the exit logic, instructions, and badge description for 70 rooms.

**Next upgrade**
- Show the current room number on each floor card.

## 2026-11-17 - Illustrated badge scenes

**Milestone:** Turned every badge picture into a detailed mini-scene.

**What changed**
- Added unique scene artwork behind all 35 badges, including underwater bubbles, office papers, stairs, mountains, rain, and confetti.
- Added section-colored gradient backgrounds and glass highlights.
- Enlarged the picture windows and brightened the detailed line art.
- Verified that every scene fits on desktop and phone without overflow.

**Next upgrade**
- Add a small sparkle burst when a badge is unlocked.

## 2026-11-17 - Flashlight beam repair

**Milestone:** Fixed the flashlight in the Main Floor and THE CELLAR.

**What changed**
- Moved the darkness and beam cutout onto a separate canvas so the room is not erased inside the light.
- Added a full-strength cutout and a soft warm glow around the player.
- Verified clear beam pixels in both Main Door 40 and Cellar Door 1.

**Next upgrade**
- Soften the edges of the flashlight beam.

## 2026-11-17 - Rainbow hard-badge borders

**Milestone:** Made difficult badges stand out with animated rainbow frames.

**What changed**
- Added a colorful conic-gradient border around all 16 difficult badges.
- Kept the gold inner trim and medal rings for a layered reward look.
- Added reduced-motion support and a smaller frame for phone screens.
- Verified all 35 badges on desktop and mobile with no horizontal overflow.

**Next upgrade**
- Add a small sparkle burst when a badge is unlocked.

## 2026-11-17 - Rainbow rings on badge artwork

**Milestone:** Moved the rainbow borders onto the actual badge medals.

**What changed**
- Moved all 16 rainbow borders from the card edges to the circular badge artwork.
- Kept the gold card trim and medal rims around the colorful rings.
- Adjusted the circular rings for desktop and phone screens.

**Next upgrade**
- Add a small sparkle burst when a badge is unlocked.

## 2026-11-17 - The blue RIFT at Door 100

**Milestone:** Built a two-way item RIFT that remembers what you store.

**What changed**
- Turned Door 100 into a special starry room with a glowing blue portal.
- Added deposit and take-back controls for any hotbar item or stack.
- Saved the RIFT item in browser storage so it survives refreshes and new runs.
- Added a floating picture and name for the stored item.
- Kept items safe when saving fails or the hotbar is full.
- Tested Milkshakes, the Teleporter, and the Backpack, including a full browser refresh.
- Adjusted the game HUD and prompts for phone screens.

**Next upgrade**
- Add a soft sound when the RIFT stores or returns an item.

## 2026-11-17 - Door 99 item test room

**Milestone:** Added a fast lobby shortcut for testing every RIFT item.

**What changed**
- Added a purple DOOR 99 button that starts a fresh run at Door 99.
- Stocked the calm, unlocked test room with a Milkshake, Rare Backpack, and Teleporter.
- Added labeled wooden display tables for all three items.
- Reset the items on each visit so every RIFT test can be repeated.
- Verified the lobby shortcut, every pickup, and all three RIFT round-trips on desktop and phone layouts.

**Next upgrade**
- Add a soft sound when the RIFT stores or returns an item.

## 2026-11-17 - Door 99 test setup removed

**Milestone:** Removed the temporary item-testing shortcut after it passed testing.

**What changed**
- Removed the DOOR 99 lobby button and its special test-room rules.
- Removed the guaranteed Milkshake, Rare Backpack, Teleporter, and display tables from Door 99.
- Returned Door 99 to normal room generation.
- Kept the persistent blue RIFT at Door 100 unchanged.
- Verified normal Door 99 generation and another successful RIFT save-and-return cycle.

**Next upgrade**
- Add a soft sound when the RIFT stores or returns an item.

## 2026-11-21 - Rare yellow Fanta Jug

**Milestone:** Added a full-heal rare item with a temporary speed reward.

**What changed**
- Added a yellow Chug-Jug-style Fanta Jug with a gray cap, handle, fruit label, glow, and hotbar icon.
- Set a 0.005 (0.5%) chance to discover a peaceful basement containing the jug.
- Gave the basement concrete blocks, exposed pipes, crates, a water heater, and a yellow utility light.
- Pressing `Q` with the jug selected restores 100% HP and starts an 8-second Fanta Rush.
- Fanta Rush increases movement speed to 1.6x and adds yellow sparkles and speed lines.
- Added Fanta Jug support for hotbar stacking, Backpack storage, and the persistent RIFT.
- Verified the rare spawn, basement, pickup, full heal, speed boost, and RIFT round-trip in Chrome.

**Next upgrade**
- Add a bubbly drink sound and a small Fanta Rush countdown.

## 2026-11-21 - Manual Backpack storage

**Milestone:** Made the Backpack a two-way storage option instead of overflow-only storage.

**What changed**
- Press `B` to move the selected hotbar item or stack into the Backpack.
- Click a Backpack slot to move its item or stack back into the hotbar.
- Matching items stack together, and the Backpack panel stays visible while owned.
- Added full-inventory protections so items stay in place when a move cannot finish.
- Added an on-screen control hint and updated the playing guide.

**Next upgrade**
- Add drag-and-drop between the hotbar and Backpack.

## 2026-11-21 - Fanta Jug Finder badge

**Milestone:** Added a collection reward and lobby information for the Fanta Jug.

**What changed**
- Added the Main Floor Fanta Jug Finder badge for collecting the jug.
- Gave the badge yellow jug artwork and a basement background.
- Added the live Fanta Jug find percentage to the lobby.
- Linked the lobby percentage to `fantaJugSpawnChance` so it stays accurate.

**Next upgrade**
- Add a small sparkle burst when the Fanta Jug Finder badge unlocks.

## 2026-11-21 - Barrel-shaped Fanta Jug

**Milestone:** Refined the jug silhouette to match the requested Starlight Jug inspiration.

**What changed**
- Replaced the rectangular body and handle with a wide barrel shape.
- Added a metal lid, metal bands, rounded yellow body, and glowing star label.
- Updated the basement item, hotbar icon, RIFT picture, and Fanta Jug Finder badge together.

**Next upgrade**
- Add a soft yellow glow around the star label while Fanta Rush is active.

## 2026-11-21 - Door 1 RIFT retrieval

**Milestone:** Made stored RIFT items retrievable at the start of a run.

**What changed**
- Door 1 now becomes a starry RIFT room only when the RIFT contains an item.
- The Door 1 RIFT opens the exit and lets the player retrieve the stored item or stack.
- Taking the item out closes the Door 1 RIFT and restores the normal locked key-search room.
- Door 100 keeps its RIFT whether it is empty or occupied.
- Full-hotbar protection keeps the Door 1 RIFT and its item in place.

**Next upgrade**
- Add a small lobby hint when a RIFT item is waiting at Door 1.

## 2026-11-21 - Rift-in-a-Can

**Milestone:** Added a throwable item that opens a portable RIFT.

**What changed**
- Added Rift-in-a-Can with a 0.8% spawn chance in eligible Main Floor calm rooms.
- Press `Q` with the can selected to throw it and open a RIFT on the floor ahead of the player.
- Thrown RIFTS share the same persistent storage as the Door 1 and Door 100 RIFTS.
- Portable RIFTS close when the room changes, while stored items remain safe.
- Added pickup prompts, a glowing can, hotbar artwork, and a stored-can RIFT picture.
- Prevented throwing a second can while any RIFT is already open in the room.

**Next upgrade**
- Add a short can-throwing arc before the portable RIFT opens.

## 2026-11-21 - Flow Juice low-gravity item

**Milestone:** Added a pink-blue drink that makes jumps float.

**What changed**
- Added Flow Juice with a 3% spawn chance in eligible Main Floor calm rooms.
- Added a lobby find-chance label linked to `flowJuiceSpawnChance`.
- Added a two-tone pink-blue bottle, hotbar icon, and RIFT storage artwork.
- Press `Q` with Flow Juice selected to consume it and start 12 seconds of low gravity.
- Reduced gravity to 45% while active for higher, longer jumps.
- Added pink and blue bubbles around the player during the effect.

**Next upgrade**
- Add a small low-gravity countdown near the health bar.

## 2026-11-21 - Flow Juice Finder badge

**Milestone:** Added a collection reward for Flow Juice.

**What changed**
- Added the Main Floor Flow Juice Finder badge for collecting the bottle.
- Gave the badge pink-blue bottle artwork and a bubbly background.
- Added the Flow Juice find percentage to the lobby and linked it to the actual spawn setting.

**Next upgrade**
- Add a pink-blue sparkle burst when the Flow Juice Finder badge unlocks.

## 2026-11-21 - Rift Can Finder badge and lobby chance

**Milestone:** Added collection and discovery information for Rift-in-a-Can.

**What changed**
- Added the Main Floor Rift Can Finder badge for collecting the can.
- Gave the badge blue can artwork with a glowing RIFT swirl.
- Added the Rift-in-a-Can find percentage to the lobby.
- Linked the lobby percentage to `riftCanSpawnChance` so it stays accurate.

**Next upgrade**
- Add a blue sparkle burst when the Rift Can Finder badge unlocks.

## 2026-11-21 - Boss Bouncer progress fix

**Milestone:** Made the 10-stomp badge possible across normal retries and repeated runs.

**What changed**
- Saved every boss-head stomp in local storage instead of losing the counter on reload.
- Kept the lobby counter synchronized with saved progress.
- Awarded the badge on startup if saved stomps already reach 10 but the badge is missing.
- Preserved the existing Door 50 and Door 75 boss health and bounce collision rules.

**Next upgrade**
- Add a small `+1 BOSS BOUNCE` popup after each successful head stomp.

## 2026-11-21 - Ultra-detailed badge collection

**Milestone:** Turned all 38 badges into inspectable miniature collector medals.

**What changed**
- Added unique fine artwork to every badge, including rivets, labels, wood grain, glass highlights, stitches, jewels, scenery, and engraving.
- Added layered SVG lighting, textured backgrounds, metallic borders, soft shadows, and corner ornaments.
- Enlarged shelf medals and added collector numbers, detailed ribbons, and clearer locked artwork.
- Added a large click-to-inspect dialog with badge descriptions, collection details, and earned or locked status.
- Added keyboard inspection with `Enter` and `Space`, plus native `Esc` dialog closing.
- Verified all 38 badges in Chrome with no missing artwork or browser exceptions.

**Next upgrade**
- Add a rotating shine across the large medal while its inspection window is open.

## 2026-11-21 - Badge Vault stair animation

**Milestone:** Added an animated entrance to the Badge Index.

**What changed**
- Pressing `BADGES` now opens a torch-lit stone stairwell cutscene.
- Animated the pixel adventurer walking downstairs with bobbing movement, swinging arms, stepping legs, dust, and flickering torches.
- Added a glowing Badge Vault doorway at the bottom of the stairs.
- Made the Badge Index bounce into view after the descent.
- Added `SKIP`, `Esc`, `Enter`, and `Space` controls for finishing the transition early.
- Respected reduced-motion settings by opening the Badge Index immediately.
- Verified walking movement, automatic opening, all skip controls, reduced motion, and badge inspection in Chrome.

**Next upgrade**
- Add soft footsteps that match each stair during the descent.

## 2026-11-21 - Detailed Badge Vault stairs

**Milestone:** Upgraded the stair animation with detailed masonry and metalwork.

**What changed**
- Added beveled and chipped stone treads with worn highlights and small pebbles.
- Added brick joints, branching cracks, stone shading, and hanging moss to every step.
- Added Roman-numeral stone carvings from `I` through `VII`.
- Added a descending bronze handrail with seven posts, reflective trim, and round finials.
- Varied the stone colors and damage placement between steps.
- Re-tested the walking animation, automatic Badge Index opening, skip controls, and reduced-motion behavior in Chrome.

**Next upgrade**
- Add tiny dust puffs when the adventurer lands on each stone step.

## 2026-11-21 - Main Floor rooms and adventurer refresh

**Milestone:** Added named Main Floor room types, detailed wallpaper, occasional stairwell exits, and a new player design.

**What changed**
- Added Grand Gallery, Conservatory, Boiler Room, Library, Bedroom, Clockwork Study, Crystal Room, Overgrown Parlour, and Dusty Attic themes.
- Changed normal room themes every five doors and displayed the room name in the HUD.
- Added nine wallpaper treatments with matching trim, wainscoting, crown molding, and floorboard seams.
- Reworked furniture to match each theme, including library books, a boiler, bedroom furniture, plants, study equipment, crystals, vines, and attic crates.
- Added occasional Grand Stairwell rooms with six carpeted steps, a bronze handrail, and an arched exit door.
- Made stairwell placement deterministic and excluded bosses, chases, dark rooms, rare rooms, and special floor entrances.
- Redesigned the adventurer with a teal jacket, orange scarf, goggles, dark hair, backpack, navy trousers, and brown boots.
- Preserved the original player collision size and all movement controls while redrawing idle, walking, jumping, and sliding poses.
- Chrome checks found 13 occasional stairwell doors, confirmed Door 5 has stairs and Door 6 does not, rendered every sampled theme, and reported no browser exceptions.

**Next upgrade**
- Add a short playable descent when the player enters a Grand Stairwell exit.

## 2026-11-21 - Main Floor section elevators

**Milestone:** Added working elevators that connect Main Floor room sections.

**What changed**
- Added occasional detailed elevator cabs with cables, metal doors, windows, rivets, call buttons, warning stripes, and destination displays.
- Stand near an elevator and press `E` to ride to the next five-door section.
- Added animated closing doors, downward arrows, cab shaking, an origin-and-destination indicator, and opening doors at arrival.
- Made elevator placement deterministic and excluded rare rooms, dark rooms, stairwells, chases, bosses, and special floor entrances.
- Prevented rides from skipping required monster chases, reward rooms, bosses, or floor entrances.
- Added immediate arrivals for players using reduced-motion settings.
- Chrome testing found six elevator doors, verified Door 7 travels to Door 11, checked all mandatory-room protections, and completed the animated ride with no browser exceptions.

**Next upgrade**
- Add elevator buttons for revisiting previously unlocked Main Floor sections.

## 2026-11-21 - Playable Main Floor stairwells

**Milestone:** Turned Grand Stairwell artwork into a real split-level room with stairs leading down to the exit.

**What changed**
- Players and cabinets now start on the raised upstairs landing instead of underneath the staircase.
- Added six walkable descending steps, with matching artwork and collision heights from the upper floor to the normal floor.
- Allowed players to walk back upstairs and land correctly when jumping on a step.
- Connected the staircase to a paneled upper landing with a carpet runner and bronze handrail.
- Chrome testing verified every step height, upstairs spawning, climbing, jumping, and reaching Door 6 through the downstairs exit.
- Re-ran the elevator browser test successfully and found no JavaScript exceptions.

**Next upgrade**
- Add soft footsteps and tiny dust puffs while the adventurer walks downstairs.

## 2026-11-21 - Stairwell descent button

**Milestone:** Added a visible stair-room button for automatically walking downstairs.

**What changed**
- Added a yellow `GO DOWN THE STAIRS` button that only appears while standing above the bottom floor in a Grand Stairwell.
- Clicking it walks the adventurer down every real step and stops safely before the exit, even when the door is open.
- The button shows `WALKING DOWN...` during the descent and disappears at the bottom.
- Pressing a movement key cancels auto-walking immediately, and climbing back upstairs makes the button available again.
- Chrome testing verified real mouse clicking, automatic descent, cancellation, normal-room hiding, and the existing manual stair controls with no browser exceptions.

**Next upgrade**
- Add a matching `GO BACK UP THE STAIRS` button at the bottom landing.

## 2026-11-21 - Chase stairwells and elevator-only rooms

**Milestone:** Added Main Floor chase stairwells and made elevators the only exit in elevator rooms.

**What changed**
- Added deterministic stairwell chases at Main Doors 27 and 32 without changing the other chase layouts.
- Made the pursuing monster climb and descend using the same ground heights as the player.
- Moved chase crates and low beams onto their correct local steps while preserving jump and slide clearance.
- Removed both the artwork and progression trigger for normal doors in elevator rooms.
- Added a clear `Ride the elevator to continue!` prompt while keeping ordinary doors working elsewhere.
- Chrome tests verified stair chase alignment, elevator-only progression, normal exits, elevator rides, and reduced-motion arrivals.

**Next upgrade**
- Add a second staircase shape with a small middle landing.

## 2026-11-21 - Complete boss and chase refresh

**Milestone:** Upgraded every boss fight, chase, hunt, and special enemy warning with clearer feedback and new artwork.

**What changed**
- Added named encounter panels with boss health, chase progress, remaining doors, enemy states, and close-pursuer warnings.
- Added charge telegraphs, impact flashes, and screen shake that is disabled for reduced-motion players.
- Added Phase 2 to both Main Floor bosses at half health, with faster movement, shorter recovery, and a new warning palette.
- Rebuilt the Main Floor monster and fallback boss artwork with horns, teeth, claws, animated limbs, and charge trails.
- Added a separate bubbling underwater vine flower, animated tree-monster legs, printing-machine paper trails, and Gloom Crawler charge-lane arrows.
- Added Rocket and stationary vine-flower status panels so no special encounter is left without feedback.
- Chrome tests covered both boss phases, every chase group, stair chases, Rocket, elevator-only rooms, Boss Bouncer persistence, and all previous stair controls with no browser exceptions.

**Next upgrade**
- Give each enemy a distinct warning sound and footstep rhythm.

## 2026-11-21 - Release Day trailer and original theme

**Milestone:** Finished a complete video trailer and a Chrome theater page for THE PARK.

**What changed**
- Captured 24 scenes into an 87-second, 1280×800 trailer covering every floor, bosses, chases, items, badges, and the escape.
- Composed and generated the original stereo cinematic chiptune theme **Last Door Rising**, synchronized to scene changes.
- Added a final Release Day card reading **AVAILABLE ON GITHUB OR CHROME**, with both links.
- Added a responsive trailer theater at `/doors/trailer/` with native video controls, replay, a poster, game and GitHub links, and an MP4 download.
- Added MP4 streaming with byte-range support so Chrome can seek through the trailer.
- Chrome tests passed metadata, audio-enabled playback, pause, seeking, ending, replay, mobile sizing, and JavaScript error checks. The soundtrack peaks at -2.6 dB without clipping.

**Next upgrade**
- Add a trailer premiere countdown to the lobby for the next major release.

## 2026-11-21 - Lobby trailer button

**Milestone:** Made the Release Day trailer easy to find from the game.

**What changed**
- Added a coral **TRAILER** button to the lobby action row.
- The button opens the existing Chrome trailer theater.

**Next upgrade**
- Add a small **NEW** label when a new trailer premieres.

## 2026-11-21 - Release Day lobby title

**Milestone:** Updated the lobby for the release celebration.

**What changed**
- Replaced the large lobby heading **THE PARK** with **RELEASE DAY**.

**Next upgrade**
- Add a small Release Day decoration around the lobby title.

## 2026-11-21 - Live Release Day confetti and lightshow

**Milestone:** Turned the lobby into a live release celebration.

**What changed**
- Added 56 colorful confetti pieces with continuous falling, drifting, spinning, and fluttering animations.
- Added sweeping cyan, pink, and gold spotlights, animated color washes, a pulsing floor glow, and a glowing title.
- Kept the effects behind the buttons and made them ignore pointer input.
- Disabled confetti and light animations for reduced-motion players.
- Chrome tests verified real animation movement, reduced-motion behavior, the trailer button, and no JavaScript exceptions.

**Next upgrade**
- Add a short confetti burst when the player earns a badge.

## 2026-11-21 - Cleaner Release Day lobby

**Milestone:** Removed Boss Bouncer progress from the lobby.

**What changed**
- Removed the lobby progress text and its update helper.
- Kept Boss Bouncer stomp tracking, persistence, and badge unlocking unchanged.

**Next upgrade**
- Let players inspect Boss Bouncer progress only inside its badge details.

## 2026-11-21 - Rocket Survivor badge redesign

**Milestone:** Made the Rocket Survivor badge match the real Rocket enemy.

**What changed**
- Replaced the spaceship artwork with Rocket's melted skull, dark eye sockets, glowing magma eyes, cracked bone, teeth, and fiery drips.
- Added a scorched scene with embers behind the badge.
- Kept the Rocket Survivor unlock condition unchanged.

**Next upgrade**
- Add a subtle animated ember glow to the inspected Rocket badge.

## 2026-11-22 - Public GitHub Pages edition

**Milestone:** Prepared THE PARK for a public browser link with automatic deployment.

**What changed**
- Enabled GitHub Pages with GitHub Actions as the deployment source.
- Added a workflow that publishes only `games/the-park/100-doors/` as a static site.
- Changed game and trailer navigation to relative URLs so local development and GitHub Pages both work.
- Added the public play link to the project documentation.
- Updated the trailer ending with `jonnyboy2014.github.io/the-park/`.
- Local Chrome tests passed lobby navigation, effects, reduced motion, video playback, seeking, replay, and mobile sizing.

**Next upgrade**
- Add a share button that copies the public game link.
