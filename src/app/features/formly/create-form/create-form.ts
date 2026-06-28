import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormlyFieldConfig, FormlyForm } from '@ngx-formly/core';
import { FieldControllerService } from '../services/field-controller.service';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-create-form',
  imports: [ReactiveFormsModule, MatButtonModule, PageHeader, FormlyForm, CdkCopyToClipboard],
  templateUrl: './create-form.html',
})
export class CreateForm {
  private fieldControllerService = inject(FieldControllerService);

  defaultFields = signal<FormlyFieldConfig[]>([
    {
      key: 'firstName',
      type: 'text-box',
      wrappers: ['field-controller'],
      props: {
        label: 'First Name',
      },
    },
  ]);

  protected fields = signal<FormlyFieldConfig[]>([
    {
      id: crypto.randomUUID(),
      key: 'firstName',
      type: 'text-box',
      wrappers: ['field-controller'],
      props: {
        label: 'First Name',
      },
    },
    {
      id: crypto.randomUUID(),
      key: 'lastName',
      type: 'text-box',
      wrappers: ['field-controller'],
      props: {
        label: 'Last Name',
      },
    },
    {
      id: crypto.randomUUID(),
      key: 'fullName',
      type: 'text-box',
      wrappers: ['field-controller'],
      props: {
        label: 'Full Name',
        required: true,
        readonly: true,
        disabled: true,
      },
      expressions: {
        'model.fullName': `((model.firstName || '') + ' ' + (model.lastName || '')).trim()`,
      },
    },
  ]);

  constructor() {
    this.fieldControllerService.update.subscribe((data) => {
      this.fields.update((prev) =>
        prev.map((p) => {
          if (p.id === data.id) {
            return {
              ...p,
              key: data.key,
              props: {
                ...p.props,
                label: data.props?.label,
                description: data.props?.description,
                placeholder: data.props?.placeholder,
                disabled: data.props?.disabled,
                readonly: data.props?.readonly,
                required: data.props?.required,
              },
              expressions: data.expressions,
            };
          }
          return p;
        }),
      );
    });

    this.fieldControllerService.delete.subscribe((data) => {
      this.fields.update((prev) => prev.filter((p) => p.id !== data.id));
    });
  }

  configs = computed(() => JSON.stringify(this.fields().map(({ wrappers, ...field }) => field)));

  onAdd(field: FormlyFieldConfig) {
    this.fields.update((prev) => [...prev, { ...field, id: crypto.randomUUID() }]);
  }

  hasDuplicateKeys = computed(() => {
    const seen = new Set<string>();

    for (const field of this.fields()) {
      if (typeof field.key !== 'string') {
        continue;
      }

      if (seen.has(field.key)) {
        return true;
      }

      seen.add(field.key);
    }

    return false;
  });
}
