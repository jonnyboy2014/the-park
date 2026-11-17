# The Park 2D

A simple side-view park game with running, jumping, hiding, and key hunting.
The scene renders at half resolution and scales up for a pixel-art look without becoming blurry.

## Goal
Find 4 keys inside the park buildings and maintenance area, then unlock the gate on the right. Watch the keeper and hide in bushes.

## Controls
- A/D or left/right arrow keys: run
- W, Space, or up arrow: jump
- E: open doors, search cabinets, take keys, unlock the gate
- M: toggle the minimap
- Stand in a bush to hide from the keeper
- Escape: pause

## Easy Changes
- `keysRequired` changes how many keys are needed.
- Buildings are created in the `buildings` list.
- Player speed is `player.speed`.
- Hiding bushes are in the `hidingBushes` list.
- Keeper speed and sight range are in the `keeper` object.
- Player jump strength is `player.jumpSpeed`.
- Pixel chunk size is `pixelScale`.
