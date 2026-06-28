import { Component, contentChild, input } from '@angular/core';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'form-field-wrapper',
  imports: [MatLabel],
  templateUrl: './form-field-wrapper.html',
  host: {
    class: 'block',
  },
})
export class FormFieldWrapper {
  label = input.required<string>();

  matInput = contentChild(MatInput, { descendants: true });
  matSelect = contentChild(MatSelect, { descendants: true });

  onLabelClick() {
    if (this.matInput()) {
      this.matInput()?.focus();
    } else if (this.matSelect()) {
      this.matSelect()?.open();
    }
  }
}
