import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'f-text-box',
  imports: [ReactiveFormsModule, FormlyModule, MatFormFieldModule, MatInputModule],
  templateUrl: './text-box.html',
  host: {
    class: 'grid gap-2',
  },
  styles: `
    .custom-input-field {
      display: block;
      width: 100%;
    }
  `,
})
export class TextBox extends FieldType<FieldTypeConfig> {}
