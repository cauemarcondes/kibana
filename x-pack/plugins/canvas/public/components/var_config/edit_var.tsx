/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState, FC } from 'react';
import {
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiToken,
  EuiSuperSelect,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiButtonEmpty,
  EuiSpacer,
  EuiCallOut,
} from '@elastic/eui';
import { CanvasVariable } from '../../../types';

import { VarValueField } from './var_value_field';

import { ComponentStrings } from '../../../i18n';
const { VarConfigEditVar: strings } = ComponentStrings;

interface Props {
  selectedVar: CanvasVariable | null;
  variables: CanvasVariable[];
  onSave: (v: CanvasVariable) => void;
  onCancel: () => void;
}

const checkDupeName = (newName: string, oldName: string | null, variables: CanvasVariable[]) => {
  const match = variables.find((v) => {
    // If the new name matches an existing variable and that
    // matched variable name isn't the old name, then there
    // is a duplicate
    return newName === v.name && (!oldName || v.name !== oldName);
  });

  return !!match;
};

export const EditVar: FC<Props> = ({ variables, selectedVar, onCancel, onSave }) => {
  // If there isn't a selected variable, we're creating a new var
  const isNew = selectedVar === null;

  const [type, setType] = useState(isNew ? 'string' : selectedVar!.type);
  const [name, setName] = useState(isNew ? '' : selectedVar!.name);
  const [value, setValue] = useState(isNew ? '' : selectedVar!.value);

  const hasDupeName = checkDupeName(name, selectedVar && selectedVar.name, variables);

  const typeOptions = [
    {
      value: 'string',
      inputDisplay: (
        <div className="canvasEditVar__typeOption">
          <EuiToken iconType="tokenString" className="canvasEditVar__tokenIcon" />{' '}
          <span>{strings.getTypeStringLabel()}</span>
        </div>
      ),
    },
    {
      value: 'number',
      inputDisplay: (
        <div className="canvasEditVar__typeOption">
          <EuiToken iconType="tokenNumber" className="canvasEditVar__tokenIcon" />{' '}
          <span>{strings.getTypeNumberLabel()}</span>
        </div>
      ),
    },
    {
      value: 'boolean',
      inputDisplay: (
        <div className="canvasEditVar__typeOption">
          <EuiToken iconType="tokenBoolean" className="canvasEditVar__tokenIcon" />{' '}
          <span>{strings.getTypeBooleanLabel()}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="canvasVarHeader__triggerWrapper">
        <button className="canvasVarHeader__button" type="button" onClick={() => onCancel()}>
          <span className="canvasVarHeader__iconWrapper">
            <EuiIcon type="sortLeft" style={{ verticalAlign: 'top' }} />
          </span>
          <span>
            <span className="canvasVarHeader__anchor">
              {isNew ? strings.getAddTitle() : strings.getEditTitle()}
            </span>
          </span>
        </button>
      </div>
      <div className="canvasSidebar__accordionContent">
        {!isNew && (
          <div>
            <EuiCallOut
              title={strings.getEditWarning()}
              color="warning"
              iconType="alert"
              size="s"
            />
            <EuiSpacer size="m" />
          </div>
        )}

        <EuiForm component="form">
          <EuiFormRow label={strings.getTypeFieldLabel()} display="rowCompressed">
            <EuiSuperSelect
              options={typeOptions}
              valueOfSelected={type}
              onChange={(v) => {
                // Only have these types possible in the dropdown
                setType(v as CanvasVariable['type']);

                // Reset default value
                if (v === 'boolean') {
                  // Just setting a default value
                  setValue(true);
                } else if (v === 'number') {
                  // Setting default number
                  setValue(0);
                } else {
                  setValue('');
                }
              }}
              compressed={true}
            />
          </EuiFormRow>
          <EuiFormRow
            label={strings.getNameFieldLabel()}
            display="rowCompressed"
            isInvalid={hasDupeName}
            error={hasDupeName && strings.getDuplicateNameError()}
          >
            <EuiFieldText
              name="name"
              value={name}
              compressed={true}
              onChange={(e) => setName(e.target.value)}
              isInvalid={hasDupeName}
            />
          </EuiFormRow>
          <EuiFormRow label={strings.getValueFieldLabel()} display="rowCompressed">
            <VarValueField type={type} value={value} onChange={(v) => setValue(v)} />
          </EuiFormRow>

          <EuiSpacer size="m" />

          <EuiFlexGroup alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton
                color="secondary"
                size="s"
                fill
                onClick={() =>
                  onSave({
                    name,
                    value,
                    type,
                  })
                }
                disabled={hasDupeName || !name}
                iconType="save"
              >
                {strings.getSaveButtonLabel()}
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty size="s" onClick={() => onCancel()}>
                {strings.getCancelButtonLabel()}
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
      </div>
    </>
  );
};
