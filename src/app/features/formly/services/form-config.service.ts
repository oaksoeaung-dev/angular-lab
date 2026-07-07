import { Injectable, computed, signal } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { VIEWER_OVERRIDES_KEY } from '../components/wrappers/field-controller/field-controller';

/** Plain, serializable config produced by the editor — this is what you
 *  could save to a database and load anywhere else. */
export interface GeneratedField {
  key: string;
  type: string;
  props: {
    label: string;
    placeholder: string;
    description: string;
    required: boolean;
    /** Merged from the HELD editor state — only meaningful in the viewer. */
    disabled: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class FormConfigService {
  /** The last generated config (null until "Generate config" is clicked). */
  readonly generatedConfig = signal<GeneratedField[] | null>(null);

  /** Pretty JSON for display / copy / persistence. */
  readonly generatedJson = computed(() => {
    const config = this.generatedConfig();
    return config ? JSON.stringify(config, null, 2) : null;
  });

  /**
   * Snapshot the current editor fields into a plain config:
   *  - immediate props (label, placeholder, description, required)
   *    are read as they currently are, and
   *  - HELD overrides (disabled) are merged in, becoming real
   *    `props.disabled` for the viewer.
   */
  generateFrom(editorFields: FormlyFieldConfig[]): GeneratedField[] {
    const config = editorFields.map((field) => {
      const props = (field.props ?? {}) as Record<string, unknown>;
      const held = (props[VIEWER_OVERRIDES_KEY] ?? {}) as Record<string, unknown>;

      return {
        key: String(field.key),
        type: 'custom-input',
        props: {
          label: (props['label'] as string) ?? '',
          placeholder: (props['placeholder'] as string) ?? '',
          description: (props['description'] as string) ?? '',
          required: !!props['required'],
          disabled: !!held['disabled'], // held state becomes real here
        },
      } satisfies GeneratedField;
    });

    this.generatedConfig.set(config);
    return config;
  }

  /**
   * Turn a generated (or persisted) config back into Formly fields
   * for the VIEWER: same custom type, NO wrapper, and `disabled`
   * applied for real (Formly disables the FormControl automatically).
   */
  toViewerFields(config: GeneratedField[]): FormlyFieldConfig[] {
    return config.map((item) => ({
      key: item.key,
      type: item.type,
      // no `wrappers` here — the editor wrapper never appears in the viewer
      props: { ...item.props },
    }));
  }
}
