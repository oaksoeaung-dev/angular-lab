import { ConfigOption } from '@ngx-formly/core';
import { TextBox } from '../../features/formly/components/field-types/text-box/text-box';
import { FieldController } from '../../features/formly/components/wrappers/field-controller/field-controller';
import { withFormlyMaterial } from '@ngx-formly/material';

export const TypeAliases: ConfigOption[] = [
  ...withFormlyMaterial(),

  // Our custom type + custom wrapper
  {
    types: [
      {
        name: 'custom-input',
        component: TextBox,
        // No default wrappers: the editor adds 'editor-wrapper'
        // explicitly per field, and the viewer uses none.
      },
    ],
    wrappers: [{ name: 'editor-wrapper', component: FieldController }],
    validationMessages: [{ name: 'required', message: 'This field is required' }],
  },
];
