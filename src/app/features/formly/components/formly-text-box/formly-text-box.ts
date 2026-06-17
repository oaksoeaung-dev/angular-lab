import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formly-text-box',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormlyModule],
  templateUrl: './formly-text-box.html',
  host: {
    class: 'grid gap-2',
  },
})
export class FormlyTextBox extends FieldType<FieldTypeConfig> {}
