import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-text-box-edit-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './formly-text-box-edit-dialog.html',
})
export class FormlyTextBoxEditDialog {
  label = signal<string | undefined>(undefined);
  name = signal<string | undefined>(undefined);

  private data = inject<FormlyFieldConfig>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<FormlyTextBoxEditDialog>);

  ngOnInit() {
    this.label.set(this.data.props?.label);
    this.name.set(this.data?.key as string);
  }

  save() {
    this.dialogRef.close({ label: this.label(), name: this.name() });
  }
}
