import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DialogContainer } from '../../../../../shared/components/dialog-container/dialog-container';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldWrapper } from '../../../../../shared/components/form-field-wrapper/form-field-wrapper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField, required } from '@angular/forms/signals';
import {
  Expression,
  TextBoxEditorModel,
  TextBoxEditorResult,
} from './models/text-box-editor.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'f-text-box-editor',
  imports: [
    DialogContainer,
    MatButtonModule,
    FormFieldWrapper,
    MatFormFieldModule,
    MatInputModule,
    FormField,
    MatSlideToggleModule,
  ],
  templateUrl: './text-box-editor.html',
})
export class TextBoxEditor implements OnInit {
  protected readonly data = inject<FormlyFieldConfig>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<TextBoxEditor>);

  textBoxModel = signal<TextBoxEditorModel>({
    id: '',
    key: '',
    props: {
      label: '',
      description: '',
      placeholder: '',
      disabled: false,
      readonly: false,
      required: false,
    },
    expressions: [],
  });

  textBoxForm = form(this.textBoxModel, (fieldPath) => {
    required(fieldPath.key, {
      message: 'Key cannot be empty',
    });
  });

  ngOnInit() {
    const expressions: Expression[] = Object.entries(this.data.expressions ?? {}).map(
      ([property, value]) => ({ property, value: String(value) }),
    );

    this.textBoxModel.update((prev) => ({
      ...prev,
      id: this.data.id ?? '',
      key: this.data.key?.toString() ?? '',
      props: {
        label: this.data.props?.label ?? '',
        description: this.data.props?.description ?? '',
        placeholder: this.data.props?.placeholder ?? '',
        required: this.data.props?.required ?? false,
        disabled: this.data.props?.disabled ?? false,
        readonly: this.data.props?.readonly ?? false,
      },
      expressions,
    }));
  }

  addExpression() {
    this.textBoxModel.update((m) => ({
      ...m,
      expressions: [...m.expressions, { property: '', value: '' }],
    }));
  }

  removeExpression(index: number) {
    this.textBoxModel.update((m) => ({
      ...m,
      expressions: m.expressions.filter((_, i) => i !== index),
    }));
  }

  save() {
    const model = this.textBoxModel();

    const expressions = model.expressions.reduce<Record<string, string>>(
      (acc, { property, value }) => {
        const key = property.trim();
        if (key) acc[key] = value;
        return acc;
      },
      {},
    );

    const result: TextBoxEditorResult = { ...model, expressions };
    this.dialogRef.close(result);
  }
}
