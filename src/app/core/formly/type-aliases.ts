import { ConfigOption } from '@ngx-formly/core';
import { FormlyTextBox } from '../../features/formly/components/formly-text-box/formly-text-box';
import { FormlyFieldWrapper } from '../../features/formly/components/formly-field-wrapper/formly-field-wrapper';

export const TypeAliases: ConfigOption[] = [
  {
    types: [
      {
        name: 'textbox',
        component: FormlyTextBox,
      },
    ],
  },
  {
    wrappers: [{ name: 'formly-field-wrapper', component: FormlyFieldWrapper }],
  },
];
