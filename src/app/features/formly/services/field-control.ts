import { EventEmitter, output, Service } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';

@Service()
export class FieldControl {
  delete = new EventEmitter<FormlyFieldConfig>();
  update = new EventEmitter<FormlyFieldConfig>();
}
