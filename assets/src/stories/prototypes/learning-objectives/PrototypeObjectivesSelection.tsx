import React, { useEffect, useState } from 'react';
import {
  AllTypeaheadOwnAndInjectedProps,
  Typeahead,
  TypeaheadMenuProps,
  TypeaheadResult,
} from 'react-bootstrap-typeahead';
import * as Immutable from 'immutable';
import { Objective, ResourceId } from 'data/content/objective';
import { classNames } from 'utils/classNames';
import guid from 'utils/guid';
import styles from 'components/resource/objectives/ObjectivesSelection.modules.scss';
import { ObjectivesProps } from 'components/resource/objectives/ObjectivesSelection';

function filterBy(byId: Record<string, Objective>, option: Objective, props: AllTypeaheadOwnAndInjectedProps<Objective>) {
  const searchText = props.text.toLocaleLowerCase();
  if (option.title.toLocaleLowerCase().indexOf(searchText) > -1) {
    return true;
  }
  if (option.parentIds !== null && option.parentIds.length > 0) {
    return option.parentIds.some((parentId) => {
      const parent = byId[parentId];
      return parent && parent.title.toLocaleLowerCase().indexOf(searchText) > -1;
    });
  }
  return false;
}

function createMapById(objectives: Objective[]) {
  return objectives.reduce<Record<string, Objective>>((m, o) => {
    m[o.id] = o;
    return m;
  }, {});
}

let nextPrototypeObjectiveId = 9000;

/**
 * Storybook-only ObjectivesSelection: "Create new objective" adds to local catalog (no API).
 */
export const PrototypeObjectivesSelection: React.FC<ObjectivesProps> = (props) => {
  const { objectives, editMode, selected, onEdit, onRegisterNewObjective } = props;
  const [id] = useState(guid());
  const [byId, setById] = useState(createMapById(objectives));

  const allSelected = selected.reduce<Record<string, boolean>>((m, oid) => {
    m[oid] = true;
    return m;
  }, {});

  useEffect(() => {
    setById(createMapById(objectives));
  }, [objectives]);

  const renderMenuItemChildren = (
    option: TypeaheadResult<Objective>,
    _props: TypeaheadMenuProps<Objective>,
    _index: number,
  ) => {
    const isChild = option.parentIds !== null && option.parentIds.length > 0;
    return (
      <div>
        {isChild ? <span className="ml-3">&nbsp;</span> : null}
        <input className="mr-2" type="checkbox" readOnly checked={allSelected[option.id]} />
        {option.title}
      </div>
    );
  };

  const map = Immutable.Map<ResourceId, Objective>(objectives.map((o) => [o.id, o]));
  const asObjectives = selected.map((s) => map.get(s) as Objective).filter((o) => !!o);
  const allowNewObjective = !!onRegisterNewObjective;
  const placeholder = editMode
    ? objectives.length > 0
      ? 'Select or Create learning objectives...'
      : 'Create a new learning objective'
    : 'Select a learning objective';

  return (
    <div className={classNames(styles.objectivesSelection, 'flex-grow-1')}>
      <Typeahead
        id={id}
        filterBy={filterBy.bind(null, byId)}
        renderMenuItemChildren={renderMenuItemChildren}
        multiple={true}
        disabled={!editMode}
        onChange={(updated: (Objective & { customOption?: boolean })[]) => {
          const createdObjective = updated.find((o) => o.customOption);
          if (createdObjective && onRegisterNewObjective) {
            const resourceId = (nextPrototypeObjectiveId += 1) as ResourceId;
            const created: Objective = {
              id: resourceId,
              title: createdObjective.title,
              parentIds: null,
            };
            onRegisterNewObjective(created);
            const updatedObjectives = updated.map((o) => (o.customOption ? resourceId : o.id));
            onEdit(updatedObjectives);
            return;
          }
          if (updated.length !== selected.length) {
            const ids = updated.map((o) => o.id);
            onEdit(ids);
          }
        }}
        options={objectives}
        allowNew={allowNewObjective}
        newSelectionPrefix="Create new objective: "
        labelKey="title"
        selected={asObjectives}
        placeholder={placeholder}
      />
    </div>
  );
};

PrototypeObjectivesSelection.displayName = 'PrototypeObjectivesSelection';
