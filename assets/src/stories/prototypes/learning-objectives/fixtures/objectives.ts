import { Objective } from 'data/content/objective';
import { ObjectiveMap } from 'data/content/activity';
import { ProjectSlug, ResourceId } from 'data/types';

/** Fake project slug — ObjectivesSelection only needs a string when not calling the API. */
export const MOCK_PROJECT_SLUG: ProjectSlug = 'prototype-bio-101';

/**
 * Sample course LO tree: two parents with sub-objectives.
 * IDs are stable so stories can attach predictable selections.
 */
export const mockAuthoringObjectives: Objective[] = [
  {
    id: 101 as ResourceId,
    title: 'Explain the structure and function of cells',
    parentIds: null,
  },
  {
    id: 102 as ResourceId,
    title: 'Identify major organelles and their roles',
    parentIds: [101],
  },
  {
    id: 103 as ResourceId,
    title: 'Compare prokaryotic and eukaryotic cells',
    parentIds: [101],
  },
  {
    id: 201 as ResourceId,
    title: 'Apply the scientific method to biological questions',
    parentIds: null,
  },
  {
    id: 202 as ResourceId,
    title: 'Formulate a testable hypothesis from observations',
    parentIds: [201],
  },
  {
    id: 203 as ResourceId,
    title: 'Design an experiment with appropriate controls',
    parentIds: [201],
  },
];

/** Default selection for the screen property-panel story. */
export const defaultScreenObjectiveIds: ResourceId[] = [101, 102];

export const mockPartIds = ['part-mcq-1', 'part-short-answer-2'];

/** Multi-part activity: different LOs per part. */
export const mockActivityObjectiveMap: ObjectiveMap = {
  [mockPartIds[0]]: [101, 102],
  [mockPartIds[1]]: [201, 203],
};

export const objectiveTitlesForList = [
  'Explain the structure and function of cells',
  'Identify major organelles and their roles',
];
