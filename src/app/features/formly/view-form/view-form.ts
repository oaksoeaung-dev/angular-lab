import { Component, effect, signal } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormFieldWrapper } from '../../../shared/components/form-field-wrapper/form-field-wrapper';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { FormlyFieldConfig, FormlyForm } from '@ngx-formly/core';

@Component({
  selector: 'app-view-form',
  imports: [
    PageHeader,
    MatFormFieldModule,
    FormFieldWrapper,
    MatInputModule,
    FormsModule,
    MatButton,
    FormlyForm,
    ReactiveFormsModule,
  ],
  templateUrl: './view-form.html',
})
export class ViewForm {
  form = new FormGroup({});
  configs = signal<string>('');

  fields = signal<FormlyFieldConfig[]>([]);

  model = signal<any>({});

  submit() {
    window.alert(JSON.stringify(this.model()));
  }

  constructor() {
    effect(() => {
      if (this.configs()) {
        this.fields.set(JSON.parse(this.configs()));
      }
    });
  }
}
