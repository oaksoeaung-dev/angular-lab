import { Component, computed, inject, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { FormlyFieldConfig, FormlyForm, FormlyModule } from '@ngx-formly/core';
import { FieldControllerService } from '../services/field-controller.service';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { FormConfigService } from '../services/form-config.service';

@Component({
  selector: 'app-create-form',
  imports: [ReactiveFormsModule, FormlyModule, MatButtonModule, MatIconModule],
  templateUrl: './create-form.html',
  styles: `
    .page-hint {
      margin: 0 0 20px;
      font-size: 14px;
      color: var(--mat-sys-on-surface-variant, #49454f);
    }

    .editor-actions {
      display: flex;
      gap: 12px;
      margin: 8px 0 16px;
    }

    .config-preview {
      margin: 0;
      padding: 16px;
      border-radius: 12px;
      background: var(--mat-sys-surface-container, #f3edf7);
      font-size: 12px;
      line-height: 1.6;
      overflow: auto;
      max-height: 320px;
    }
  `,
})
export class CreateForm {
  protected readonly configService = inject(FormConfigService);

  /** Emitted after a config is generated, so the app can jump to the viewer tab. */
  readonly configGenerated = output<void>();

  protected copied = false;

  protected form = new FormGroup({});
  protected model: Record<string, unknown> = {};

  /**
   * The editable fields. Note: the HELD disable state lives inside
   * props['__viewerOverrides'] and is written by the wrapper — it is
   * never applied to these fields while editing.
   */
  protected fields: FormlyFieldConfig[] = [
    {
      key: 'fullName',
      type: 'custom-input',
      wrappers: ['editor-wrapper'],
      props: {
        label: 'Full name',
        placeholder: 'e.g. Jane Doe',
        description: 'As it appears on your ID',
        required: true,
      },
    },
    {
      key: 'email',
      type: 'custom-input',
      wrappers: ['editor-wrapper'],
      props: {
        label: 'Email address',
        placeholder: 'name@example.com',
        description: 'We will send the confirmation here',
        required: false,
        type: 'email',
      },
    },
    {
      key: 'referralCode',
      type: 'custom-input',
      wrappers: ['editor-wrapper'],
      props: {
        label: 'Referral code',
        placeholder: 'Optional code',
        description: 'Try toggling "Disable" on this one',
        required: false,
      },
    },
  ];

  protected generateConfig(): void {
    this.configService.generateFrom(this.fields);
    this.copied = false;
    this.configGenerated.emit();
  }

  protected copyConfig(json: string): void {
    navigator.clipboard?.writeText(json).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }
}
