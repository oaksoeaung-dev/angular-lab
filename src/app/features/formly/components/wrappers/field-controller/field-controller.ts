import { Component, DestroyRef, inject } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { LucidePenLine, LucideTrash } from '@lucide/angular';
import { MatRipple } from '@angular/material/core';
import { DialogService } from '../../../../../shared/services/dialog.service';
import { TextBoxEditor } from '../../dialogs/text-box-editor/text-box-editor';
import {
  TextBoxEditorModel,
  TextBoxEditorResult,
} from '../../dialogs/text-box-editor/models/text-box-editor.model';
import { FieldControllerService } from '../../../services/field-controller.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'f-field-controller',
  imports: [LucidePenLine, LucideTrash, MatRipple],
  templateUrl: './field-controller.html',
})
export class FieldController extends FieldWrapper {
  private dialogService = inject(DialogService);
  private fieldControllerService = inject(FieldControllerService);
  private destroyRef = inject(DestroyRef);

  async edit(field: FormlyFieldConfig) {
    const dialogRef = await this.dialogService.open<
      TextBoxEditor,
      FormlyFieldConfig,
      TextBoxEditorResult
    >(() => import('../../dialogs/text-box-editor/text-box-editor').then((c) => c.TextBoxEditor), {
      data: field,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.fieldControllerService.update.emit({
          id: data?.id,
          key: data?.key,
          props: {
            label: data?.props?.label,
            placeholder: data?.props?.placeholder,
            description: data?.props?.description,
            required: data?.props?.required,
            readonly: data?.props?.readonly,
            disabled: data?.props?.disabled,
          },
          expressions: data?.expressions,
        });
      });
  }

  delete(field: FormlyFieldConfig) {
    this.fieldControllerService.delete.emit(field);
  }
}
