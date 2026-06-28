import { ConfigOption } from '@ngx-formly/core';
import { TextBox } from '../../features/formly/components/field-types/text-box/text-box';
import { FieldController } from '../../features/formly/components/wrappers/field-controller/field-controller';

export const TypeAliases: ConfigOption[] = [
  {
    types: [
      {
        name: 'text-box',
        component: TextBox,
      },
    ],
  },
  {
    wrappers: [{ name: 'field-controller', component: FieldController }],
  },
];
