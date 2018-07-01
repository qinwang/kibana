/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Fragment } from 'react';

import {
  EuiBasicTable,
  EuiButton,
  EuiColorPicker,
  EuiFieldText,
  EuiSpacer,
} from '@elastic/eui';

import {
  DefaultFormatEditor
} from '../default';

import { DEFAULT_COLOR } from '../../../../../../../core_plugins/kibana/common/field_formats/types/color_default';

export class ColorFormatEditor extends DefaultFormatEditor {
  static formatId = 'color';

  constructor(props) {
    super(props);
    this.onChange({
      fieldType: props.fieldType,
    });
  }

  onColorChange = (newColorParams, index) => {
    const colors = [...this.props.formatParams.colors];
    colors[index] = {
      ...colors[index],
      ...newColorParams,
    };
    this.onChange({
      colors,
    });
  }

  addColor = () => {
    const colors = [...this.props.formatParams.colors];
    this.onChange({
      colors: [
        ...colors,
        { ...DEFAULT_COLOR }
      ],
    });
  }

  removeColor = (index) => {
    const colors = [...this.props.formatParams.colors];
    colors.splice(index, 1);
    this.onChange({
      colors,
    });
  }

  render() {
    const { formatParams, fieldType } = this.props;

    const items = formatParams.colors && formatParams.colors.length && formatParams.colors.map((color, index) => {
      return {
        ...color,
        index,
      };
    }) || [];

    const columns = [
      fieldType === 'string' ? {
        field: 'regex',
        name: 'Pattern (regular expression)',
        render: (value, item) => {
          return (
            <EuiFieldText
              value={value}
              onChange={(e) => {
                this.onColorChange({
                  regex: e.target.value,
                }, item.index);
              }}
            />
          );
        }
      } : {
        field: 'range',
        name: 'Range (min:max)',
        render: (value, item) => {
          return (
            <EuiFieldText
              value={value}
              onChange={(e) => {
                this.onColorChange({
                  range: e.target.value,
                }, item.index);
              }}
            />
          );
        }
      },
      {
        field: 'text',
        name: 'Text color',
        render: (color, item) => {
          return (
            <EuiColorPicker
              color={color}
              onChange={(newColor) => {
                this.onColorChange({
                  text: newColor,
                }, item.index);
              }}
            />
          );
        }
      },
      {
        field: 'background',
        name: 'Background color',
        render: (color, item) => {
          return (
            <EuiColorPicker
              color={color}
              onChange={(newColor) => {
                this.onColorChange({
                  background: newColor,
                }, item.index);
              }}
            />
          );
        }
      },
      {
        name: 'Example',
        render: (item) => {
          return (
            <div
              style={{
                background: item.background,
                color: item.text
              }}
            >
              123456
            </div>
          );
        }
      },
      {
        actions: [
          {
            name: 'Delete',
            description: 'Delete color format',
            onClick: (item) => {
              this.removeColor(item.index);
            },
            type: 'icon',
            icon: 'trash',
            color: 'danger',
            available: () => items.length > 1
          }
        ],
      }
    ];

    return (
      <Fragment>
        <EuiBasicTable
          items={items}
          columns={columns}
        />
        <EuiSpacer size="m" />
        <EuiButton
          iconType="plusInCircle"
          size="s"
          onClick={this.addColor}
        >
          Add color
        </EuiButton>
        <EuiSpacer size="l" />
      </Fragment>
    );
  }
}