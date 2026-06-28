import { EventEmitter, Service } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Service()
export class FieldControllerService {
  delete = new EventEmitter<FormlyFieldConfig>();
  update = new EventEmitter<FormlyFieldConfig>();
}
