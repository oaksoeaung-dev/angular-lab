import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export const VIEWER_OVERRIDES_KEY = '__viewerOverrides';

@Component({
  selector: 'f-field-controller',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './field-controller.html',
  styles: `
    .editor-field {
      border: 1px solid var(--mat-sys-outline-variant, #cac4d0);
      border-radius: 12px;
      margin-bottom: 16px;
      overflow: hidden;
      background: var(--mat-sys-surface, #fff);
    }

    .editor-field--open {
      border-color: var(--mat-sys-primary, #6750a4);
    }

    .editor-field__header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px 4px 12px;
      background: var(--mat-sys-surface-container-low, #f7f2fa);
      border-bottom: 1px solid var(--mat-sys-outline-variant, #cac4d0);
      font-size: 13px;
    }

    .editor-field__drag-hint {
      font-size: 18px;
      width: 18px;
      height: 18px;
      opacity: 0.6;
    }

    .editor-field__key {
      font-family: monospace;
      font-weight: 600;
    }

    .editor-field__badge {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 11px;
      background: var(--mat-sys-error-container, #f9dedc);
      color: var(--mat-sys-on-error-container, #410e0b);
    }

    .editor-field__badge--required {
      background: var(--mat-sys-secondary-container, #e8def8);
      color: var(--mat-sys-on-secondary-container, #1d192b);
    }

    .editor-field__spacer {
      flex: 1;
    }

    .editor-field__settings {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 16px;
      border-bottom: 1px dashed var(--mat-sys-outline-variant, #cac4d0);
    }

    .editor-field__wide {
      grid-column: 1 / -1;
    }

    .editor-field__toggles {
      grid-column: 1 / -1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 24px;
    }

    .editor-field__toggle-note {
      font-size: 11px;
      opacity: 0.7;
      margin-left: 4px;
    }

    .editor-field__preview {
      padding: 16px 16px 8px;
    }

    @media (max-width: 600px) {
      .editor-field__settings {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class FieldController extends FieldWrapper {
  settingsOpen = false;

  // ---------- IMMEDIATE props: live preview while editing ----------

  get labelValue(): string {
    return this.props.label ?? '';
  }
  set labelValue(value: string) {
    this.props.label = value;
    this.refreshField();
  }

  get placeholderValue(): string {
    return this.props.placeholder ?? '';
  }
  set placeholderValue(value: string) {
    this.props.placeholder = value;
    this.refreshField();
  }

  get descriptionValue(): string {
    return this.props.description ?? '';
  }
  set descriptionValue(value: string) {
    this.props.description = value;
    this.refreshField();
  }

  get requiredValue(): boolean {
    return !!this.props.required;
  }
  set requiredValue(value: boolean) {
    this.props.required = value; // Formly re-applies the validator automatically
    this.refreshField();
  }

  // ---------- HELD props: stored, applied only in the viewer ----------

  get heldDisabled(): boolean {
    return !!this.viewerOverrides['disabled'];
  }
  set heldDisabled(value: boolean) {
    // IMPORTANT: we do NOT touch props.disabled and we do NOT call
    // formControl.disable() here. The editor field stays enabled.
    this.viewerOverrides['disabled'] = value;
  }

  private get viewerOverrides(): Record<string, unknown> {
    return ((this.props as Record<string, unknown>)[VIEWER_OVERRIDES_KEY] ??= {}) as Record<
      string,
      unknown
    >;
  }

  /** Trigger change detection on the wrapped (OnPush) field component. */
  private refreshField(): void {
    this.options.detectChanges?.(this.field);
  }
}
