import { Component, inject } from '@angular/core';
import { FieldTypeConfig, FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { LucidePenLine, LucideTrash } from '@lucide/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { FieldControl } from '../../services/field-control';

@Component({
  selector: 'app-formly-field-wrapper',
  imports: [MatButtonModule, MatIconModule, LucidePenLine, MatRipple, LucideTrash],
  templateUrl: './formly-field-wrapper.html',
})
export class FormlyFieldWrapper extends FieldWrapper {
  private fieldControl = inject(FieldControl);
  onEdit(data: FormlyFieldConfig) {
    this.fieldControl.update.emit({
      ...data,
      key: 'lastName',
      props: { ...data.props, label: 'Last Name' },
    });
  }

  onDelete(data: FormlyFieldConfig) {
    this.fieldControl.delete.emit(data);
  }
}
