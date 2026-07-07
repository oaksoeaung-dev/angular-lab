import { Component, effect, inject, signal } from '@angular/core';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormFieldWrapper } from '../../../shared/components/form-field-wrapper/form-field-wrapper';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormlyFieldConfig, FormlyForm, FormlyModule } from '@ngx-formly/core';
import { MatIconModule } from '@angular/material/icon';
import { JsonPipe } from '@angular/common';
import { FormConfigService } from '../services/form-config.service';

@Component({
  selector: 'app-view-form',
  imports: [ReactiveFormsModule, FormlyModule, MatButtonModule, MatIconModule, JsonPipe],
  templateUrl: './view-form.html',
  styles: `
    .page-hint {
      margin: 0 0 20px;
      font-size: 14px;
      color: var(--mat-sys-on-surface-variant, #49454f);
    }

    formly-field {
      display: block;
      margin-bottom: 20px;
    }

    .value-preview {
      margin: 16px 0 0;
      padding: 16px;
      border-radius: 12px;
      background: var(--mat-sys-surface-container, #f3edf7);
      font-size: 12px;
      overflow: auto;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 48px 16px;
      text-align: center;
      color: var(--mat-sys-on-surface-variant, #49454f);
    }

    .empty-state__icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      opacity: 0.5;
    }
  `,
})
export class ViewForm {
  private readonly configService = inject(FormConfigService);

  protected readonly form = signal(new FormGroup({}));
  protected readonly model = signal<Record<string, unknown>>({});
  protected readonly fields = signal<FormlyFieldConfig[]>([]);
  protected readonly submittedValue = signal<unknown>(null);

  constructor() {
    // Rebuild the viewer form every time a new config is generated.
    effect(() => {
      const config = this.configService.generatedConfig();
      this.form.set(new FormGroup({}));
      this.model.set({});
      this.submittedValue.set(null);
      this.fields.set(config ? this.configService.toViewerFields(config) : []);
    });
  }

  protected onSubmit(): void {
    if (this.form().valid) {
      // getRawValue() also includes values of disabled controls
      this.submittedValue.set(this.form().getRawValue());
    }
  }
}
