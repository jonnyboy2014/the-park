# 100 Doors: Cellar Plan

## Goal
Add a dark cellar underneath the Main Floor. The player should discover a real staircase going down, enter the Cellar floor, and have a short playable first slice with a clear way back up.

## Core Loop
1. Enter the cellar through an integrated staircase on the Main Floor.
2. Explore dark cellar rooms with a flashlight.
3. Avoid or escape cellar hazards.
4. Find the cellar exit or complete its goal.
5. Return to the Main Floor without losing progress.

## First Slice
- Add one staircase entrance on the Main Floor with a visible prompt.
- Start the Cellar with a small number of dark rooms.
- Preserve the normal side-view controls.
- Make the staircase obvious and reachable.
- Keep a safe exit back to the Main Floor.

## Validation
- Check that the staircase appears and can be used.
- Check that the Cellar loads with its own floor state.
- Check that returning to the Main Floor resumes at the correct door.
- Run JavaScript syntax checks and the local server before pushing.
