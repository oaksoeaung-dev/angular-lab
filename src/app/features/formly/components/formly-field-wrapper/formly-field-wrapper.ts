import { Component, inject } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { LucidePenLine, LucideTrash } from '@lucide/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { FieldControl } from '../../services/field-control';
import { MatDialog } from '@angular/material/dialog';
import { FormlyTextBoxEditDialog } from '../formly-text-box-edit-dialog/formly-text-box-edit-dialog';

@Component({
  selector: 'app-formly-field-wrapper',
  imports: [MatButtonModule, MatIconModule, LucidePenLine, MatRipple, LucideTrash],
  templateUrl: './formly-field-wrapper.html',
})
export class FormlyFieldWrapper extends FieldWrapper {
  private fieldControl = inject(FieldControl);
  readonly dialog = inject(MatDialog);

  onDelete(data: FormlyFieldConfig) {
    this.fieldControl.delete.emit(data);
  }

  openEditDialog(data: FormlyFieldConfig) {
    const dialogRef = this.dialog.open(FormlyTextBoxEditDialog, { data, disableClose: true });
    dialogRef.afterClosed().subscribe((x: any) => {
      this.fieldControl.update.emit({
        ...data,
        key: x.name,
        props: { ...data.props, label: x.label },
      });
    });
  }
}
