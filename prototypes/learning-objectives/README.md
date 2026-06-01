# Learning objectives — authoring prototype

Interactive UI experiments for **course authoring** learning objectives, without running Torus (`mix phx.server`).

## What this is

- **Storybook** stories under `assets/src/stories/prototypes/learning-objectives/`
- **Mock data** in `fixtures/objectives.ts` (hierarchical LOs like production)
- Reuses real Torus components: property-panel editor, typeahead picker, activity attachment

## Run it (no global Yarn required)

From the repository root:

```bash
cd assets
npm install --legacy-peer-deps
npx yarn@1.22.17 storybook

Or use the helper script:

```bash
./assets/scripts/run-storybook.sh
```
```

Open **http://localhost:6006** → sidebar **Prototypes / Learning Objectives**.

If you use [asdf](https://asdf-vm.com/) (see `.tool-versions`):

```bash
asdf install
cd assets && yarn install && yarn storybook
```

## Stories

| Story | What it mirrors |
| --- | --- |
| **Screen property panel** | Right-hand “Learning Objectives” on an adaptive screen (`LearningObjectivesEditor`) |
| **Objectives picker** | Typeahead attach/create (`ObjectivesSelection`) — create is mocked, no API |
| **Activity (multi-part)** | LOs per question part (`ActivityLOs`) |
| **Activity summary chips** | Read-only list on an activity (`ObjectivesList`) |

## Iterate here

1. Edit `fixtures/objectives.ts` for new LO trees or titles.
2. Add states in `AuthoringObjectives.stories.tsx`.
3. When an idea is solid, move changes into `assets/src/components/resource/objectives/` or authoring PropertyEditor.

## Out of scope (on purpose)

- Phoenix / database / publish pipeline
- Course-wide LO table (`ObjectivesLive`) — LiveView; use this repo’s LiveView as reference only
- Real `create()` API when picking “Create new objective” in the **picker** story (mock adds locally)

## Torus references

- `assets/src/apps/authoring/components/PropertyEditor/custom/LearningObjectivesEditor.tsx`
- `assets/src/components/resource/objectives/ObjectivesSelection.tsx`
- `lib/oli_web/live/workspaces/course_author/objectives_live.ex` (full course LO manager)
