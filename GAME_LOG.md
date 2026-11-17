# Game Studio Log

## 2026-11-14 - The Park 3D prototype

**Milestone:** First playable 3D slice.

**What changed**
- Added a first-person blocky park.
- Added doors, searchable cabinets, hidden keys, and a locked exit gate.

**Next upgrade**
- Add a park keeper with a patrol route so hiding behind objects matters.

## 2026-11-14 - The Park 2D

**Milestone:** Switched the main prototype to a simpler top-down 2D view.

**What changed**
- Added `games/the-park-2d/`.
- Kept the 3D version at `/3d/`.
- Updated the server routes and launcher target.

**Next upgrade**
- Add a small park map and locked side areas so key hunting feels less flat.

## 2026-11-14 - The Park 2D, second pass

**Milestone:** Made the search loop more interesting.

**What changed**
- Added a toggleable minimap.
- Added a locked maintenance area.
- Expanded the key hunt to 4 keys.
- The Maintenance Key now opens the side area where the Gate Key is hidden.

**Next upgrade**
- Add a slow park keeper patrol and a safe hiding bush mechanic.

## 2026-11-14 - The Park 2D, keeper update

**Milestone:** Added the first stealth challenge.

**What changed**
- Added a park keeper with patrol and chase modes.
- Added four hiding bushes.
- The keeper now sends Jonas back to the entrance when caught.
- Added keeper and bush markers to the minimap.
- Added Visible/Hiding/Chased and Caught counters to the HUD.

**Next upgrade**
- Teach the keeper to lose sight of Jonas behind buildings.

## 2026-11-14 - The Park 2D, side-view conversion

**Milestone:** Switched the main 2D prototype from top-down to side-view.

**What changed**
- Added gravity, running, and jumping.
- Rebuilt the park as a side-view scene.
- Kept the keeper, hiding bushes, key hunt, and gate escape.
- Updated controls, docs, and the side-view minimap.

**Next upgrade**
- Add moving platforms and a rooftop route.

## 2026-11-14 - The Park 2D, pixel-art rendering

**Milestone:** Made the side-view park look pixel-like.

**What changed**
- Rendered the game to a smaller internal canvas.
- Upscaled it with crisp pixelated smoothing disabled.
- Kept gameplay, collision, and controls unchanged.

**Next upgrade**
- Add hand-drawn pixel sprites for Jonas and the keeper.

## 2026-11-14 - The Park 2D, sturdier pixel style

**Milestone:** Strengthened the pixel-art look without losing clarity.

**What changed**
- Replaced smooth gradients and circles with blocky pixel shapes.
- Added stronger outlines around important objects.
- Kept 2x rendering and native canvas sizing.

**Next upgrade**
- Add run and jump animations.

## 2026-11-14 - 100 Doors, first complete build

**Milestone:** Created a complete 100-door side-view game.

**What changed**
- Added Door 1 as a calm room where Jonas finds a key in a cabinet.
- Added a monster chase from Door 26 to Door 33 with jump and slide obstacles.
- Added a reward room after the chase with Speed Boots and a flashlight.
- Added dark rooms that use the flashlight beam.
- Added 10 rotating room themes and background details for all 100 rooms.
- Added a boss fight at Door 50.
- Added the Door 25 monster return at Door 75 with harder obstacles.
- Added the requested boss image ID `204734852`.

**Next upgrade**
- Add unique puzzle types for each 10-door section.
- Tune the boss attack speed.
- Tune the Door 75 obstacle speed.

## 2026-11-14 - 100 Doors badge system

**Milestone:** Added earned badges for big game milestones.

**What changed**
- Added seven milestone badges, starting when you enter the game and ending at Door 100.
- The chase badge is called Chase Complete and says, "You completed the chase!"
- Added badge chips, a HUD badge counter, and an earned-badge popup.
- Saved badges in the browser so they survive page refreshes.

**Next upgrade**
- Add badge descriptions and a collection screen.

## 2026-11-14 - Door 50 boss fight fix

**Milestone:** Fixed the main Door 50 boss bugs.

**What changed**
- Excluded both boss rooms from dark-room mode.
- Lowered the Door 50 boss hitbox for easier head stomps.
- Prevented the boss from immediately hitting the player after a successful stomp.

**Next upgrade**
- Add a debug door picker for testing specific rooms.

## 2026-11-15 - Unlocked doors in 100 Doors

**Milestone:** Added unlocked calm doors for better pacing.

**What changed**
- Added nine unlocked calm doors across the 100-door run.
- Unlocked doors appear green and can be entered without a key.
- Preserved Door 1's key puzzle and all chase, reward, dark, and boss rooms.

**Next upgrade**
- Add a debug door picker for testing specific rooms.

## 2026-11-15 - Door 50 roof staircase

**Milestone:** Added a safe route for beating the Door 50 boss.

**What changed**
- Added a climbable pixel staircase and rooftop in the Door 50 boss room.
- Implemented one-way platform physics.
- Added S-drop controls so the player can land directly on the boss's head.

**Next upgrade**
- Add a debug door picker for testing specific rooms.

## 2026-11-15 - 100 Doors room furniture

**Milestone:** Added decorative furniture to calm rooms.

**What changed**
- Added five furniture styles that rotate through the 100-door run.
- Kept furniture non-blocking so key hunts and movement stay simple.
- Kept special rooms uncluttered.

**Next upgrade**
- Add searchable furniture with hidden keys.

## 2026-11-15 - Rare Restaurant Room and 5-slot hotbar

**Milestone:** Added a rare room and the first collectible item.

**What changed**
- Added a 1.5% Restaurant Room with 5 dining tables.
- Added a collectible milkshake and a 5-slot hotbar.
- Added hotbar selection with mouse clicks and keys 1-5.
- Added the Restaurant Finder badge.

**Next upgrade**
- Add a use-item action for the milkshake.

## 2026-11-15 - Player animation update

**Milestone:** Added a new animated pixel player.

**What changed**
- Added idle, walking, jumping, and crouching/sliding animations.
- Added a detailed adventurer design with hair, backpack, gloves, and boots.
- Preserved the existing collision hitbox and movement speed.

**Next upgrade**
- Add a landing squash effect.

## 2026-11-15 - 100 Doors action music

**Milestone:** Added automatic music for chase and boss rooms.

**What changed**
- Added a browser-generated chase theme for the Door 25 monster chase.
- Added a separate boss theme for boss fights.
- Kept calm rooms silent and preserved all existing gameplay.

**Next upgrade**
- Add a music on/off control.

## 2026-11-15 - Intense 100 Doors chase theme

**Milestone:** Upgraded the chase music for more tension.

**What changed**
- Increased the chase tempo.
- Added faster melody motion and deeper bass.
- Added low drum pulses for urgency.

**Next upgrade**
- Add a music on/off control.

## 2026-11-15 - Chase snare drum

**Milestone:** Strengthened the chase drums.

**What changed**
- Added a snare drum layer to the chase theme.
- Kept the kick, hi-hat, and bass intact.

**Next upgrade**
- Add a music on/off control.

## 2026-11-15 - Player health bar in 100 Doors

**Milestone:** Added a 100 HP player health system.

**What changed**
- Added a HUD health bar with a numeric HP readout.
- Added damage from the monster, bosses, and moving spikes.
- Added short invincibility with flashing after each hit.

**Next upgrade**
- Add healing items.

## 2026-11-15 - Rare Backpack item in 100 Doors

**Milestone:** Added another rare collectible item.

**What changed**
- Added a Backpack collectible with a 1.3% spawn chance.
- Added ground and table placements, a pickup prompt, drawing, and a hotbar icon.
- Kept the milkshake collectible unchanged.

**Next upgrade**
- Add more collectible items that can use Backpack storage.

## 2026-11-15 - Random unlocked rooms in 100 Doors

**Milestone:** Added random unlocked-room chances.

**What changed**
- Each eligible calm room now has a 70% chance to start unlocked.
- Preserved Door 1's key hunt and all special challenge rooms.
- Kept the progression quick while still saving important puzzles for later.

**Next upgrade**
- Add searchable furniture with hidden keys.

## 2026-11-15 - Milkshake healing in 100 Doors

**Milestone:** Added item-based healing.

**What changed**
- Press Q with the Milkshake selected to heal 25 HP.
- The Milkshake is not used while health is already full.
- Updated the controls and hotbar guide.

**Next upgrade**
- Add more useful rare items.

## 2026-11-15 - Rocket and hiding closets in 100 Doors

**Milestone:** Added a hideable monster encounter.

**What changed**
- Added closets that open with `E`, plus enter and leave prompts.
- Added Rocket with a warning, fast charge, 25 HP hit, and pixel face.
- Hiding in a closet protects the player from Rocket and the chase monster.
- Styled Rocket as a melted human skull with orange magma colors and glowing eyes.
- Changed Rocket to a 5-second warning and slower charge speed.
- Added a Rocket Survivor badge for staying alive until Rocket passes.

**Next upgrade**
- Add a custom Rocket animation and sound effect.

## 2026-11-15 - Lobby Badge Index in 100 Doors

**Milestone:** Added a separate all-badges screen.

**What changed**
- Added a lobby button labeled `BADGES`.
- Pressing the button opens the Badge Index as its own screen.
- The screen shows all earned and unearned badges with clear color states.
- Added mouse-wheel scrolling and a `BACK` button.

**Next upgrade**
- Add descriptions for each badge.

## 2026-11-15 - Drawer key furniture in 100 Doors

**Milestone:** Improved the Door 1 key-search prop.

**What changed**
- Replaced the simple cabinet art with a three-drawer pixel dresser.
- Searching now opens the top drawer and shows the key inside.
- Redesigned the key with a round bow, shaft, and teeth.
- Updated the interaction prompt and guide wording.

**Next upgrade**
- Add searchable drawers with bonus loot.

## 2026-11-15 - Door 65 garden door in 100 Doors

**Milestone:** Added a special garden door.

**What changed**
- Door 65 now uses a garden-style door placed in the middle of the room.
- Added a pixel garden frame, glass panes, vines, and flowers.
- Preserved the existing key and exit behavior.

**Next upgrade**
- Add a Door 65 garden reward.

## 2026-11-15 - THE GARDEN floor in 100 Doors

**Milestone:** Added an optional 50-door garden floor.

**What changed**
- Added an optional middle garden door at main Door 65.
- Created THE GARDEN floor with a separate 50-door counter and exit back to main Door 66.
- Added giant vine flowers with open-mouth freeze mechanics and closed-mouth safe movement.
- Made the vine flower a much bigger stationary plant.
- Added garden scenery and vine-based jump/slide obstacles.
- Added Outside Person and Touched Grass badges in a separate Badge Index section.

**Next upgrade**
- Add rare Garden-only loot.

## 2026-11-15 - Detailed rainy Garden rooms in 100 Doors

**Milestone:** Made THE GARDEN feel like a real nighttime outdoor floor.

**What changed**
- Added brighter rain streaks, puddles, and a darker night overlay.
- Replaced flat trees with layered trunks, bark texture, roots, branches, and rain-lit leaves.
- Added reusable scenery pieces: stone paths, lanterns, flower patches, hedges, benches, ponds, and a gazebo.
- Every Garden room now mixes shared scenery with door-based layout changes.

**Next upgrade**
- Add rain sound effects only while exploring THE GARDEN.

## 2026-11-15 - Random Garden ground flowers in 100 Doors

**Milestone:** Made the Garden ground look naturally overgrown.

**What changed**
- Replaced evenly spaced ground flowers with 18 seeded-random flowers.
- Each Garden door now gets a unique flower layout that stays stable during that room.
- Added rain puddle highlights around each flower.

**Next upgrade**
- Add small fireflies that drift above the Garden flowers.

## 2026-11-15 - Lobby floor picker in 100 Doors

**Milestone:** Added a dedicated FLOORS screen.

**What changed**
- Added a `FLOORS` button to the lobby.
- Created a separate floor-index screen with Main Floor and THE GARDEN cards.
- Pressing THE GARDEN teleports the player straight to Garden Door 1.
- Pressing MAIN FLOOR resumes the saved main-floor room when available.

**Next upgrade**
- Show live floor progress inside each floor card.

## 2026-11-15 - Fun & Random badge pack in 100 Doors

**Milestone:** Added 14 playful badges tied to real actions.

**What changed**
- Added a FUN & RANDOM badge section.
- Added movement, hiding, snack, shortcut, boss-stomp, storage, rain, no-hit, and collection badges.
- All new badges use the existing saved-badge system.

**Next upgrade**
- Show live counters for the fun badge challenges.

## 2026-11-17 - THE PARK lobby update

**Milestone:** Renamed 100 Doors to THE PARK and added visible lobby progress.

**What changed**
- Updated the browser title, lobby heading, and README title to THE PARK.
- Added a live Boss Bouncer progress counter to the lobby.

**Next upgrade**
- Add persistent progress counters for all movement badges.

## 2026-11-15 - Garden ground chase in 100 Doors

**Milestone:** Completed the requested five-door ground chase.

**What changed**
- Added Garden Doors 28-32 as a rainy mountain ground chase after the submarine chase.
- Added rocks to jump, fallen logs to slide under, and a Mountain Runner badge.

**Next upgrade**
- Build the mountain-top jump-down ending.

## 2026-11-15 - THE OFFICE sub-floor in 100 Doors

**Milestone:** Added a 150-door Office sub-floor with storage siderooms.

**What changed**
- Added a Door 95 Office entrance and a FLOORS-screen shortcut.
- Built ruined office rooms with desks, destroyed computers, a printing machine, paper planes, and pencils.
- Added 10th-door desk/cable obstacle rooms and 15th-door optional storage siderooms with bookshelves and boxes.
- Added three Office badges and a dedicated Office badge section.

**Next upgrade**
- Add an office-themed monster or boss.

## 2026-11-15 - Office chase and shadow form

**Milestone:** Completed the Office Door 25 chase.

**What changed**
- Added an 8-door printing-machine chase with desk jumps and cable slides.
- Added a furious Post-it-faced shadow form for the player.
- Awarded an Office Chase Survivor badge after Door 32.

**Next upgrade**
- Add printer paper-plane projectiles.

## 2026-11-15 - Rare Office Teleporter

**Milestone:** Added an end-of-floor shortcut item.

**What changed**
- Added a rare Office Teleporter that spawns on desks or storage boxes.
- Pressing `Q` with the Teleporter selected warps the player to Office Door 150.
- Added a Teleporter Finder badge and hotbar icon.

**Next upgrade**
- Add a warp flash effect.

## 2026-11-15 - Maximum Ragebaiter badge

**Milestone:** Added a Main Floor badge for last-second hiding.

**What changed**
- Added the Maximum Ragebaiter badge.
- It awards when the player hides from Rocket just before a hit and stays hidden until Rocket passes.

**Next upgrade**
- Add a close-call visual effect.

## 2026-11-15 - Grand Garden Door 50 in 100 Doors

**Milestone:** Gave THE GARDEN a special final exit.

**What changed**
- Redrew Garden Door 50 as a tall arched grand exit.
- Added gold trim, double doors, stained-glass panels, vines, flowers, and a glowing 50 emblem.
- Updated the final Garden HUD text to `Grand garden exit`.

**Next upgrade**
- Add a short celebration burst when Garden Door 50 opens.

## 2026-11-15 - Lobby button layout repair in 100 Doors

**Milestone:** Kept BADGES visible after adding FLOORS.

**What changed**
- Moved BADGES and FLOORS into a compact side-by-side row.
- Made the lobby card scroll safely on smaller screens.
- Loaded the floor screen after the DOM finished parsing.

**Next upgrade**
- Show live floor progress inside each floor card.

## 2026-11-17 - GitHub-ready Park structure

**Milestone:** Made The Park ready for version control.

**What changed**
- Moved 100 Doors into `games/the-park/100-doors/`.
- Added a project-level `AGENTS.md` for The Park.
- Added `PROJECT_PLAN.md` for the dark Cellar subfloor.
- Added a personal-play license and strict `.gitignore`.
- Updated the server and launcher to use the isolated 100 Doors path.

**Next upgrade**
- Build the first playable Cellar slice.
