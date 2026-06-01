import React, { useCallback, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LearningObjectivesEditor } from 'apps/authoring/components/PropertyEditor/custom/LearningObjectivesEditor';
import { ActivityLOs } from 'components/resource/objectives/ActivityLOs';
import { PrototypeObjectivesSelection } from './PrototypeObjectivesSelection';
import { ObjectivesList } from 'components/resource/editors/ObjectivesList';
import { Objective } from 'data/content/objective';
import { ObjectiveMap } from 'data/content/activity';
import { ResourceId } from 'data/types';
import { AuthoringObjectivesStoryContext } from './AuthoringObjectivesStoryContext';
import {
  MOCK_PROJECT_SLUG,
  defaultScreenObjectiveIds,
  mockActivityObjectiveMap,
  mockAuthoringObjectives,
  mockPartIds,
  objectiveTitlesForList,
} from './fixtures/objectives';

export default {
  title: 'Prototypes/Learning Objectives/Authoring',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Authoring learning-objectives UX using Torus components and mock course data. No backend required.',
      },
    },
  },
} as ComponentMeta<typeof AuthoringObjectivesStoryContext>;

const PropertyPanelShell: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => (
  <div className="max-w-md mx-auto">
    <p className="text-muted small mb-3">
      Prototype · <strong>{title}</strong> · matches adaptive screen property column width
    </p>
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-4 shadow-sm">
      {children}
    </div>
  </div>
);

export const ScreenPropertyPanel: ComponentStory<typeof AuthoringObjectivesStoryContext> = () => {
  const [selected, setSelected] = useState<ResourceId[]>(defaultScreenObjectiveIds);

  return (
    <AuthoringObjectivesStoryContext>
      <PropertyPanelShell title="Screen → Learning Objectives">
        <LearningObjectivesEditor
          id="objectives"
          value={selected}
          disabled={false}
          readonly={false}
          onChange={setSelected}
          onBlur={() => undefined}
        />
        <p className="text-muted small mt-3 mb-0">
          Selected IDs: {selected.length ? selected.join(', ') : '(none)'}
        </p>
      </PropertyPanelShell>
    </AuthoringObjectivesStoryContext>
  );
};
ScreenPropertyPanel.storyName = '1. Screen property panel';

export const ObjectivesPicker: ComponentStory<typeof AuthoringObjectivesStoryContext> = () => {
  const [catalog, setCatalog] = useState<Objective[]>(mockAuthoringObjectives);
  const [selected, setSelected] = useState<ResourceId[]>([101]);

  const onRegisterNewObjective = useCallback((objective: Objective) => {
    setCatalog((prev) => [...prev, objective]);
  }, []);

  return (
    <AuthoringObjectivesStoryContext objectives={catalog}>
      <div className="max-w-2xl mx-auto">
        <p className="text-muted small mb-3">
          Prototype · <strong>Objectives picker</strong> · typeahead + mock “create objective” (no
          API)
        </p>
        <PrototypeObjectivesSelection
          editMode={true}
          objectives={catalog}
          selected={selected}
          projectSlug={MOCK_PROJECT_SLUG}
          onEdit={setSelected}
          onRegisterNewObjective={onRegisterNewObjective}
        />
        <p className="text-muted small mt-3">
          Tip: type a new name and choose “Create new objective” — it adds to the local catalog only.
        </p>
      </div>
    </AuthoringObjectivesStoryContext>
  );
};
ObjectivesPicker.storyName = '2. Objectives picker (typeahead)';

export const ActivityMultiPart: ComponentStory<typeof AuthoringObjectivesStoryContext> = () => {
  const [objectiveMap, setObjectiveMap] = useState<ObjectiveMap>(mockActivityObjectiveMap);
  const [catalog, setCatalog] = useState<Objective[]>(mockAuthoringObjectives);

  return (
    <AuthoringObjectivesStoryContext objectives={catalog}>
      <div className="max-w-3xl mx-auto">
        <p className="text-muted small mb-3">
          Prototype · <strong>Activity LOs</strong> · one typeahead row per question part
        </p>
        <ActivityLOs
          partIds={mockPartIds}
          objectives={objectiveMap}
          allObjectives={catalog}
          editMode={true}
          projectSlug={MOCK_PROJECT_SLUG}
          onEdit={setObjectiveMap}
        />
      </div>
    </AuthoringObjectivesStoryContext>
  );
};
ActivityMultiPart.storyName = '3. Activity (multi-part)';

export const ActivitySummaryEmpty: ComponentStory = () => (
  <AuthoringObjectivesStoryContext>
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <p className="text-muted small mb-2">No objectives attached</p>
        <ObjectivesList objectives={[]} />
      </div>
      <div>
        <p className="text-muted small mb-2">Objectives attached (read-only chips)</p>
        <ObjectivesList objectives={objectiveTitlesForList} />
      </div>
    </div>
  </AuthoringObjectivesStoryContext>
);
ActivitySummaryEmpty.storyName = '4. Activity summary (empty vs attached)';
