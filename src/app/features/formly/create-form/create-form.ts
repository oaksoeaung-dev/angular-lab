import { Component, inject, model, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormlyFieldConfig, FormlyForm } from '@ngx-formly/core';
import { FieldControl } from '../services/field-control';

@Component({
  selector: 'app-create-form',
  imports: [ReactiveFormsModule, MatButtonModule, PageHeader, FormlyForm],
  templateUrl: './create-form.html',
})
export class CreateForm {
  form = new FormGroup({});

  private fieldControl = inject(FieldControl);

  defaultFields = signal<FormlyFieldConfig[]>([
    {
      key: 'firstName',
      type: 'textbox',
      wrappers: ['formly-field-wrapper'],
      props: {
        label: 'First Name',
        required: true,
      },
    },
  ]);

  result = model();

  fieldContainer = signal<FormlyFieldConfig[]>([]);

  constructor() {
    this.fieldControl.delete.subscribe((x) => {
      this.fieldContainer.update((prev) => prev.filter((p) => p.id !== x.id));
    });

    this.fieldControl.update.subscribe((x) => {
      this.fieldContainer.update((fields) =>
        fields.map((field) => (field.id === x.id ? x : field)),
      );
    });
  }

  onAdd(field: FormlyFieldConfig) {
    this.fieldContainer.update((prev) => [...prev, { ...field, id: crypto.randomUUID() }]);
  }

  getResult() {
    console.log(this.result());
  }
}
