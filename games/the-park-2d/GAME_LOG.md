# The Park 2D Log

## 2026-11-14 - Keeper and hiding

**Milestone:** Added a light stealth challenge.

**What changed**
- Added a park keeper who patrols a route.
- The keeper chases Jonas when nearby and sends him back to the entrance if caught.
- Added four hiding bushes.
- Added keeper and bush markers to the minimap.
- Added Visible/Hiding/Chased and Caught counters to the HUD.

**Next upgrade**
- Make the keeper lose sight of Jonas behind buildings, not just in bushes.

## 2026-11-14 - Side-view conversion

**Milestone:** Changed the main 2D view from top-down to side-view.

**What changed**
- Added gravity, running, and jumping.
- Rebuilt the park as a side-view scene with sky, trees, buildings, bushes, a bench, and a right-side gate.
- The keeper now patrols and chases along the ground.
- Updated the minimap to match the side-view layout.

**Next upgrade**
- Add moving platforms and a rooftop route.

## 2026-11-14 - Pixel-art rendering

**Milestone:** Gave the side-view game a chunky retro look.

**What changed**
- Added a low-resolution drawing canvas.
- Scaled the scene up with crisp pixel rendering.
- Kept all gameplay sizes and collision boxes unchanged.

**Next upgrade**
- Replace simple rectangles with hand-drawn pixel sprites.

## 2026-11-14 - Sturdier pixel style

**Milestone:** Made the pixel art feel more solid and readable.

**What changed**
- Replaced smooth sky gradients and circles with flat pixel blocks.
- Added dark outlines around characters, bushes, buildings, and the gate.
- Kept the clear 2x pixel scale so the game does not become blurry.

**Next upgrade**
- Add a small animation when Jonas runs and jumps.
