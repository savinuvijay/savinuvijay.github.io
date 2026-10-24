# TangleTrek
## Game Design Document (GDD)

**Document version:** 1.0 — Recovery Draft  
**Genre:** Grid-based puzzle / sequence programming  
**Platform:** Web — desktop and mobile  
**Technology:** Svelte, PixiJS  
**Planned content:** 10 levels

---

# 1. Game Overview

## 1.1 Concept

TangleTrek is a puzzle game in which players construct sequences of actions to guide a character through a grid-based environment and reach a goal.

Rather than controlling the character continuously, players plan a sequence of instructions, arrange them through a drag-and-drop interface, and execute the resulting program.

The central gameplay loop combines spatial reasoning, planning, experimentation, and problem-solving.

## 1.2 Design Pillars

**1. Think before you move**

Players should be encouraged to plan a route instead of relying on reflexes.

**2. Build, execute, improve**

The sequence-building interface should make it easy to experiment, observe the result, and revise a solution.

**3. Learn through discovery**

New mechanics should be introduced progressively, with levels teaching concepts through gameplay rather than lengthy tutorials.

**4. Simple controls, meaningful puzzles**

The game should be approachable on mobile and desktop while gradually challenging the player's ability to reason about instructions and movement.

## 1.3 Target Experience

The intended experience is a compact, visually engaging puzzle game with short levels and a satisfying sense of accomplishment.

Players should feel that they are programming a solution, even if they have no programming experience.

---

# 2. Core Gameplay

## 2.1 Objective

Guide the player character from a starting position to the goal by constructing and executing a valid sequence of actions.

The goal is represented by a trophy.

The precise rules for obstacles, hazards, movement limits, and failure conditions should be confirmed against the original implementation.

## 2.2 Core Game Loop

1. Inspect the level grid and identify the character's starting position and the goal.
2. Review the available action blocks.
3. Drag actions into the sequence builder.
4. Arrange or edit the sequence.
5. Execute the sequence.
6. Observe the character's movement.
7. Review the outcome and modify the sequence if necessary.
8. Complete the level and progress to the next challenge.

## 2.3 Sequence Builder

The sequence builder is the central interaction component.

It provides a visual workspace where players arrange action blocks in execution order.

### Required capabilities

- Drag an action from the available action library into the sequence.
- Reorder actions within the sequence.
- Remove or replace an action.
- Display the current sequence clearly.
- Validate whether the sequence can be executed.
- Execute the sequence in the intended order.
- Provide feedback when the sequence succeeds or fails.

The exact behavior for invalid actions, empty sequences, and interrupted execution should follow the implementation.

## 2.4 Action Library

The action library contains the instructions available to the player in a given level.

A limited action library can create meaningful constraints: players must find a solution using the instructions available to them.

Potential action categories include:

| Category | Example | Status |
|---|---|---|
| Movement | Move forward | Candidate action |
| Rotation | Turn left or right | Candidate action |
| Repetition | Repeat a sequence | Candidate mechanic |
| Nested sequence | Place a sequence inside another sequence | Previously discussed concept |
| Sequence editing | Reorder or remove instructions | Core interface capability |

**Important:** The table is not a definitive inventory of implemented actions. The exact instruction names, semantics, and availability per level need to be verified.

## 2.5 Execution and Feedback

Execution should make the relationship between instructions and movement easy to understand.

Recommended behavior:

- Execute instructions in sequence order.
- Animate character movement between grid cells.
- Make the currently executing instruction visually distinguishable.
- Provide clear feedback when the character reaches the goal.
- Stop or report execution when a terminal condition is reached.

Execution speed should balance readability and responsiveness. Players should be able to follow the character's path without waiting unnecessarily.

## 2.6 Success and Failure

**Success:** The character reaches the trophy according to the level's rules.

**Failure:** A sequence fails to achieve the objective, encounters an invalid state, or otherwise violates a level rule.

Recommended feedback:

- A short victory animation and sound.
- A clear level-completion state.
- A retry option.
- A way to edit the previous sequence without restarting the entire experience, where supported.

The precise failure conditions remain to be verified.

---

# 3. Character Design

The original character sprite and trophy sprite were part of the project. The following specifications provide a consistent visual direction for documenting and refining them.

## 3.1 Main Character — The Explorer

**Role:** The playable character controlled through action sequences.

### Proposed visual identity

- A compact, friendly explorer designed to remain readable at small sizes.
- A distinctive silhouette that is recognizable from a top-down or slightly elevated camera angle.
- A small backpack or other recognizable accessory.
- Clear directional orientation to communicate the character's current heading.
- A restrained color palette that contrasts with the grid and goal.

### Sprite requirements

The character should have a consistent footprint across grid cells.

Recommended animation states:

| State | Purpose |
|---|---|
| Idle | Character waiting for instructions |
| Move | Traversing to another grid cell |
| Turn | Changing orientation, if turning is supported |
| Success | Celebrating level completion |
| Error | Communicating a failed action, if appropriate |

These are recommended animation states, not a confirmed list of existing sprite-sheet frames.

### Directional variants

If the game uses orientation-dependent movement, the sprite system should support the directions required by the movement model.

Possible implementations include separate directional frames or a reusable sprite rotated by the rendering engine.

The choice should match the current asset pipeline.

## 3.2 Goal Character or Object — The Trophy

**Role:** Visual representation of the destination.

### Proposed visual identity

- A gold trophy with a clear silhouette.
- A bright highlight or subtle glow to distinguish it from ordinary grid cells.
- A rotating or spinning animation to attract attention.
- A distinct completion effect when the player reaches it.

The rotating trophy sprite is part of the recovered project context.

The trophy should remain visually prominent without obscuring the grid or distracting from route planning.

## 3.3 Character Animation Principles

Animations should communicate game state, not merely decorate the board.

- Movement should clearly correspond to the executing instruction.
- Turning should make orientation changes understandable.
- Victory animation should reinforce successful completion.
- Idle animations should be subtle.
- Animation timing should not make repeated experimentation tedious.

---

# 4. Grid and Board Design

## 4.1 Grid Structure

The recovered design context specifies a **5 × 5 grid**.

| Property | Design specification |
|---|---|
| Rows | 5 |
| Columns | 5 |
| Total cells | 25 |
| Start | Character starting cell |
| Goal | Trophy destination |
| Camera | Top-down or slightly elevated, subject to existing assets |

The grid should provide enough room for meaningful route-planning puzzles while keeping the board compact.

## 4.2 Cell Design

Each cell should have a consistent size and alignment.

Recommended visual treatment:

- Subtle separation between neighboring cells.
- Consistent cell dimensions.
- Clear distinction between traversable cells and special tiles, if used.
- Sufficient contrast between the character, goal, grid, and any obstacles.
- Optional visual indication of the current or previous path.

Avoid unnecessary decoration inside every cell. The board should communicate spatial information quickly.

## 4.3 Board Elements

| Element | Function | Status |
|---|---|---|
| Grid cell | Defines a movement position | Core board concept |
| Starting position | Establishes the character's initial location | Core gameplay |
| Trophy | Defines the destination | Recovered project detail |
| Character | Executes the programmed route | Core gameplay |
| Path indicator | Shows movement or execution history | Proposed enhancement |
| Obstacle tile | Restricts movement | Requires confirmation |
| Special tile | Introduces a unique puzzle rule | Future design option |

## 4.4 Grid Coordinates

For implementation and level authoring, each cell should have a stable row and column coordinate.

A coordinate system using zero-based indexing is a reasonable implementation convention:

- Top-left cell: `(0, 0)`
- Bottom-right cell: `(4, 4)`

The character's position, trophy location, and any additional board elements should be defined consistently using this coordinate system.

This is a technical recommendation and does not establish the coordinate system used by the existing code.

## 4.5 Responsive Board Layout

On desktop, the grid can occupy a central play area while the action library and sequence builder sit alongside it.

On mobile, the board should remain prominent, with the action library and sequence builder placed below it or presented in a compact layout.

The board should preserve cell proportions and prevent drag-and-drop targets from becoming too small for touch interaction.

---

# 5. User Interface and Game Components

## 5.1 Main Game Screen

The following components form the proposed game-screen architecture.

### A. Game Header

Displays the game identity and relevant level information.

Possible elements:

- TangleTrek logo or wordmark.
- Current level number.
- Level progress.
- Restart or exit control.

### B. Game Board

The PixiJS-rendered play area containing:

- Grid cells.
- Character sprite.
- Trophy sprite.
- Any supported environmental elements.
- Movement and completion animations.

### C. Action Library

A collection of available instructions.

Each action should have:

- A recognizable icon or label.
- A consistent visual style.
- A sufficiently large interaction target.
- A clear distinction from actions already placed in the sequence.

### D. Sequence Builder

The area in which players construct their instructions.

Recommended visual states include:

- Empty sequence.
- Sequence containing actions.
- Active drag target.
- Selected action.
- Invalid sequence, where applicable.
- Executing sequence.
- Completed execution.

### E. Execution Controls

Potential controls include:

- Run.
- Reset or restart.
- Clear sequence.
- Retry.
- Continue to the next level.

Only controls supported by the actual implementation should be included in the final production UI.

### F. Feedback Layer

Provides visual or textual responses to player actions.

Examples:

- Sequence ready.
- Execution in progress.
- Goal reached.
- Level completed.
- Execution failed.

### G. Audio Controls

A sound toggle or volume control is recommended if the game exposes audio settings.

The exact existing control should be verified.

## 5.2 Component Architecture

A logical component breakdown for the Svelte interface is:

| Component | Responsibility |
|---|---|
| GameShell | Overall game layout |
| GameHeader | Title, level information, navigation |
| GameBoard | PixiJS canvas and board lifecycle |
| ActionLibrary | Available instruction blocks |
| SequenceBuilder | Ordered sequence editing |
| ActionBlock | Individual draggable instruction |
| ExecutionControls | Run, reset, retry, and related actions |
| LevelComplete | Victory feedback and progression |
| AudioControls | Sound settings, if supported |

These names are proposed architectural labels, not confirmed filenames from the original repository.

## 5.3 State Management

The recovered project context includes Svelte stores.

A clean state model should distinguish:

- Current level definition.
- Character position and orientation.
- Available actions.
- User-authored sequence.
- Execution status.
- Current instruction index.
- Completion or failure status.
- Audio preferences, if persisted.

The exact state shape should follow the existing code rather than introducing an unnecessary rewrite.

---

# 6. Interaction and Controls

## 6.1 Desktop

Recommended interactions:

- Mouse drag to move an action into the sequence builder.
- Drag to reorder instructions.
- Click to select or remove an instruction.
- Click to execute or restart a sequence.

Keyboard support may be added where it improves accessibility.

## 6.2 Mobile

The project context includes pointer and touch support.

Mobile interaction should ensure:

- Touch targets are large enough.
- Dragging does not unintentionally scroll the page.
- Sequence editing works on narrow screens.
- The board remains visible during interaction.
- Important controls remain accessible without precise gestures.

## 6.3 Drag-and-Drop Feedback

The interface should communicate where an action will be inserted.

Recommended states:

- Source action highlighted while dragging.
- Valid drop target emphasized.
- Insertion position indicated.
- Invalid drop target visually distinguished.
- Smooth transition after a successful drop.

These details are proposed usability improvements and should be reconciled with the implemented drag-and-drop behavior.

---

# 7. Level Design

## 7.1 Level Design Philosophy

Levels should introduce concepts gradually and reinforce them through practice.

Each level should have:

- A clear objective.
- A defined starting position and goal.
- A specific challenge.
- A solution that can be tested through the sequence builder.
- A clear completion condition.
- A difficulty appropriate to the player's progress.

The recovered project context mentions 10 levels. The following progression is a proposed framework until the original level configurations can be recovered.

## 7.2 Proposed Ten-Level Progression

| Level | Theme | Learning objective | Design direction |
|---|---|---|---|
| 1 | First Steps | Understand the board and execution loop | A direct route with minimal instructions |
| 2 | Find the Turn | Understand directional movement | Introduce a change in direction |
| 3 | Plan Ahead | Think through multiple moves | Require a longer route |
| 4 | The Detour | Compare possible paths | Introduce a route-planning challenge |
| 5 | Limited Moves | Optimize the instruction sequence | Impose a suitable action constraint |
| 6 | Sequence Builder | Improve sequence editing skills | Require a more carefully ordered program |
| 7 | Nested Paths | Understand nested sequences, if supported | Introduce a reusable sequence |
| 8 | Efficient Explorer | Reduce unnecessary actions | Reward a more compact solution |
| 9 | The Tangle | Combine previously learned concepts | Present a multi-step challenge |
| 10 | The Final Trek | Demonstrate mastery | Combine the established mechanics |

**These level descriptions are proposals, not a reconstruction of the actual ten levels.** In particular, action limits, nested sequences, obstacles, and scoring rules must be verified before they are treated as implemented mechanics.

## 7.3 Level Data Model

Each level should be represented by structured data rather than hard-coded UI logic.

A proposed TypeScript interface:

```ts
interface LevelDefinition {
  id: number;
  title: string;
  description?: string;

  grid: {
    rows: number;
    columns: number;
  };

  start: {
    row: number;
    column: number;
    direction?: string;
  };

  goal: {
    row: number;
    column: number;
  };

  availableActions: string[];

  constraints?: {
    maxActions?: number;
    maxMoves?: number;
  };
}
```

This is an illustrative schema, not the existing project's confirmed data structure. The optional constraints should only be implemented if the game rules require them.

## 7.4 Level Validation

Recommended checks during development:

- Grid dimensions are valid.
- Starting and goal positions are inside the grid.
- Required assets are available.
- Available actions are valid.
- Level data contains all mandatory fields.
- The level is solvable under its actual rules.

An automated solvability check is a useful future development tool if the rules are formalized.

---

# 8. Art Direction

## 8.1 Visual Identity

TangleTrek should feel playful, clear, and polished.

The visual system should prioritize:

1. Readability of the grid.
2. Recognition of the character and trophy.
3. Visibility of action blocks.
4. Clear interaction feedback.
5. Consistent animation timing.

## 8.2 Color System

A proposed palette can use:

- A muted, neutral board background.
- Contrasting grid lines.
- A distinctive character color.
- Gold for the trophy and success feedback.
- A separate highlight color for active instructions.
- A clear warning color for errors.

Exact color values should be derived from the existing sprites and interface rather than imposed without reviewing the assets.

## 8.3 Effects and Animation

The recovered context mentions glowing effects.

Potential uses include:

- Highlighting a valid drop target.
- Drawing attention to the trophy.
- Indicating the currently executing action.
- Celebrating level completion.

Glow effects should remain subtle enough that the board's spatial structure is always visible.

## 8.4 Sprite Asset Requirements

Recommended asset inventory:

- Character sprite sheet.
- Trophy sprite or animation frames.
- Grid and board textures, if applicable.
- Action-block icons.
- Success and failure effects.
- Optional environmental tile assets.

The final inventory should be reconciled with the files already present in the project.

---

# 9. Audio Design

The recovered context includes footsteps, a victory effect, and looping music.

## 9.1 Sound Effects

| Sound | Trigger | Purpose |
|---|---|---|
| Footsteps | Character movement | Reinforce movement |
| Action interaction | Selecting or placing an action, if supported | Confirm interaction |
| Victory | Level completion | Reward success |
| Error | Invalid execution, if supported | Communicate failure |

Only existing or intentionally added sounds should appear in the final shipped asset list.

## 9.2 Background Music

Background music should loop seamlessly and remain unobtrusive.

It should support concentration rather than compete with puzzle-solving.

## 9.3 Audio Implementation Considerations

- Avoid overlapping repeated sounds unnecessarily.
- Keep audio playback compatible with browser restrictions.
- Allow audio to be muted where controls are provided.
- Verify that audio loops and sound effects behave correctly on mobile browsers.

---

# 10. Technical Design

## 10.1 Technology Stack

| Technology | Responsibility |
|---|---|
| Svelte / SvelteKit | Application UI and component structure |
| PixiJS | Grid rendering, sprites, and animation |
| Svelte stores | Shared reactive state |
| TypeScript, if used in the current codebase | Types for levels, actions, and execution |
| Vercel | Deployment, as referenced in the project context |

The precise versions and current repository structure should be verified against the actual project.

## 10.2 Separation of Responsibilities

The application should maintain a clear boundary between:

**UI layer**

Handles action selection, sequence editing, controls, and status messages.

**Game model**

Represents level data, character state, available actions, and completion rules.

**Execution engine**

Processes the sequence and determines the result of each instruction.

**Rendering layer**

Uses PixiJS to display the board, sprites, and animations.

This separation makes it easier to test puzzle logic independently of visual rendering.

## 10.3 Execution State Machine

A proposed execution lifecycle:

`READY → RUNNING → COMPLETED`

An unsuccessful execution may transition to an appropriate failure or ready state, depending on the actual game rules.

Important considerations:

- Prevent accidental overlapping executions.
- Keep the displayed character position synchronized with the game model.
- Handle restart and cancellation consistently.
- Ensure the next level cannot load before the completion transition is resolved.

## 10.4 Responsive Rendering

The PixiJS canvas should adapt to the available play area.

Recommended checks:

- Correct aspect ratio.
- Crisp sprite rendering at supported resolutions.
- Proper cleanup when the Svelte component unmounts.
- No duplicated animation loops after resizing or navigation.
- Reliable touch and pointer event handling.

---

# 11. Analytics and Progress Tracking

The recovered context includes discussion of analytics events.

These events are useful for understanding whether players can complete levels and where they encounter difficulty.

| Event | Suggested properties |
|---|---|
| `level_start` | Level ID, session ID |
| `level_complete` | Level ID, elapsed time, moves or actions used |
| `level_retry` | Level ID, attempt number |
| `action_used` | Level ID, action type |
| `game_complete` | Total levels completed, total duration |
| `game_exit` | Current level, completion status |

These are proposed event schemas. The meaning of “moves” versus “actions” should be defined consistently, and event names should be matched to any analytics implementation that already exists.

## 11.1 Questions Analytics Should Answer

- Which levels are completed most frequently?
- Where do players retry repeatedly?
- How long does each level take?
- How often do players abandon a level?
- Do players discover more efficient solutions after retries?

Analytics should collect only the information necessary to improve the game.

---

# 12. Accessibility and Usability

Recommended accessibility considerations:

- Maintain sufficient contrast between the grid, character, and goal.
- Do not rely exclusively on color to communicate success or failure.
- Provide readable labels for action blocks.
- Support touch interaction without requiring pixel-perfect precision.
- Keep essential instructions concise.
- Provide a way to mute audio.
- Respect reduced-motion preferences where practical.

These are quality goals for the design and should be validated against the existing implementation.

---

# 13. Testing and Quality Assurance

## 13.1 Gameplay Tests

- A valid sequence reaches the intended goal.
- An unsuccessful sequence produces the expected result.
- Instructions execute in the correct order.
- Sequence editing updates the actual program.
- Restart returns the game to the correct initial state.
- Level transitions do not preserve unintended state from the previous level.

## 13.2 Rendering Tests

- Character and trophy sprites render correctly.
- Grid dimensions remain consistent.
- Animations remain synchronized with execution.
- Canvas resizing does not distort the board.
- Sprite assets load correctly in the deployed application.

## 13.3 Interaction Tests

- Drag-and-drop works with a mouse.
- Pointer and touch interactions work on supported mobile devices.
- Drop targets behave consistently.
- The interface remains usable on narrow screens.
- Repeated execution does not create overlapping actions or animation loops.

## 13.4 Deployment Tests

- All ten intended levels load.
- Static assets resolve correctly.
- Audio works in supported browsers.
- The deployed game behaves consistently with the local version.
- Errors are handled gracefully.

---

# 14. Future Enhancements

The following ideas are potential extensions, not confirmed roadmap commitments:

- Additional levels and themed environments.
- Optional challenges based on action efficiency.
- Level-selection and progress screens.
- Player-generated puzzles.
- Additional character skins.
- A level editor.
- More complex instruction types.
- Accessibility and control customization.
- Additional sound and animation polish.

Future development should prioritize improvements that strengthen the core sequence-building experience.

---

# 15. Open Questions and Verification Checklist

This recovery draft needs the following information to become an authoritative GDD.

## Gameplay rules
- What are the exact available action blocks?
- How does character orientation work?
- What happens when an instruction cannot be executed?
- Are there obstacles, hazards, or special tiles?
- What are the exact rules for nested sequences?
- Is the objective simply to reach the trophy, or are there action limits and scoring rules?

## Character and assets
- What does the existing character sprite look like?
- Which directional and animation frames are already implemented?
- Is the trophy animation already complete?
- Which sounds and visual effects are present?

## Level design
- What are the actual configurations of levels 1–10?
- Which mechanic is introduced in each level?
- Are levels stored in data files or implemented directly in code?
- Are there multiple valid solutions?

## Interface and technical architecture
- What are the actual Svelte component names?
- How is the PixiJS scene initialized and destroyed?
- What are the current store definitions?
- Which execution controls are implemented?
- Is analytics integrated or only planned?

## Product status
- What is the current deployment state?
- Are all ten levels playable?
- Which known bugs or unfinished features remain?

---

# 16. Document Status

This document establishes a structured design baseline for TangleTrek using the project context currently available.

**Confirmed from recovered context:** The game's general concept, Svelte and PixiJS technology stack, sequence-building interaction, 5 × 5 grid, character and trophy sprites, nested-sequence concept, mobile and desktop support, ten-level scope, and selected audio and analytics requirements.

**Proposed in this draft:** Detailed character art direction, component boundaries, the ten-level progression, level data schema, state machine, accessibility recommendations, and future enhancements.

**Next step:** Compare this document against the original source code, level definitions, sprite sheets, and any surviving design notes. Update the proposed sections with the actual implementation before treating this as the final game specification.
