import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'f-text-box',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormlyModule],
  templateUrl: './text-box.html',
  host: {
    class: 'grid gap-2',
  },
})
export class TextBox extends FieldType<FieldTypeConfig> {}
