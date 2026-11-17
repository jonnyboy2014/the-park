# Agent Instructions: Jonas Game Studio

## Mission
Help Jonas design and build cool games in small, playable steps. Keep code clear, kid-friendly, and easy to change.

## Windows Environment
- This workspace runs on Windows.
- Use PowerShell-compatible commands.
- Avoid Bash-only syntax such as heredocs.
- Prefer Python for small command-line helpers and checks.
- Use `-LiteralPath` for PowerShell file operations.
- Do not mix PowerShell path lookups with another shell for deletes or moves.

## Tooling Preferences
- Keep tool calls simple and minimal.
- Prefer Astro or Next.js for future front-end apps that need a framework.
- For tiny prototypes, plain HTML, CSS, and JavaScript are better than adding a framework.
- Avoid very large patches because they can trigger tool limits.

## Workspace
- Each game lives in `games/<game-name>/`.
- Every game has a short `README.md` explaining how to play and what to change.
- Use `GAME_LOG.md` as studio memory: what changed, what worked, and what to improve next.

## Repository Standards
- The shared remote is `https://github.com/jonnyboy2014/the-park.git`.
- Keep secrets, dependencies, caches, and downloaded tools out of Git.
- Make small focused commits with clear names.
- Validate before pushing: check JavaScript, start the local server, and test the changed screen.
- Push after each validated milestone.
- Respect `LICENSE`: people may download and try the game, but may not copy, redistribute, modify, sell, or reuse the code or art.

## Iteration Loop
1. Clarify the fun: state the core player action and goal before coding.
2. Build a tiny playable slice that works end-to-end.
3. Validate controls, collision, feedback, and the win condition.
4. Log one concrete next upgrade in `GAME_LOG.md`.
5. Improve these instructions when a repeated lesson appears.

## Self-Improvement
- After each milestone, append a dated entry to `GAME_LOG.md`.
- Prefer small reusable helpers over duplicated logic.
- Do not rewrite a whole game to add one feature.
- Simplify a confusing prototype before adding content.

## Design Standards
- Start with a clear objective and visible feedback.
- Make interactions easy to discover with prompts.
- Keep UI labels short and simple.
- Preserve Jonas's creative ideas even when suggesting simpler alternatives.
