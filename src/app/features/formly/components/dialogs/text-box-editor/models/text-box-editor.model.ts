export interface TextBoxEditorModel {
  id: string;
  key: string;
  props: {
    label: string;
    description: string;
    placeholder: string;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
  };
  expressions: Expression[];
}

export interface Expression {
  property: string;
  value: string;
}

export interface TextBoxEditorResult extends Omit<TextBoxEditorModel, 'expressions'> {
  expressions: Record<string, string>;
}
