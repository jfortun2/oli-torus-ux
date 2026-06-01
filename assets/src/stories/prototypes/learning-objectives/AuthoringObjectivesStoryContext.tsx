import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { ModalContainer } from 'apps/authoring/components/AdvancedAuthoringModal';
import adaptiveStore from 'apps/authoring/store/storybook';
import { setInitialConfig } from 'apps/authoring/store/app/slice';
import { Objective } from 'data/content/objective';
import { MOCK_PROJECT_SLUG, mockAuthoringObjectives } from './fixtures/objectives';

export type AuthoringObjectivesStoryContextProps = {
  children: React.ReactNode;
  /** Override course LO catalog for this story. */
  objectives?: Objective[];
  className?: string;
};

/**
 * Redux + modal shell for authoring LO stories (mirrors advanced-authoring Storybook setup).
 */
export const AuthoringObjectivesStoryContext: React.FC<AuthoringObjectivesStoryContextProps> = ({
  children,
  objectives = mockAuthoringObjectives,
  className = '',
}) => {
  useEffect(() => {
    adaptiveStore.dispatch(
      setInitialConfig({
        applicationMode: 'expert',
        projectSlug: MOCK_PROJECT_SLUG,
        revisionSlug: 'prototype-rev-1',
        allObjectives: objectives,
      }),
    );
  }, [objectives]);

  return (
    <div
      className={`authoring-objectives-prototype bg-gray-50 dark:bg-gray-900 min-h-[320px] p-6 ${className}`}
    >
      <ModalContainer>
        <DndProvider backend={HTML5Backend}>
          <Provider store={adaptiveStore}>{children}</Provider>
        </DndProvider>
      </ModalContainer>
    </div>
  );
};

AuthoringObjectivesStoryContext.displayName = 'AuthoringObjectivesStoryContext';
