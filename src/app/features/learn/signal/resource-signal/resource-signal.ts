import { Component, inject, resource, signal } from '@angular/core';
import { Api } from './services/api';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { Numeric } from './components/numeric/numeric';

@Component({
  selector: 'app-resource-signal',
  imports: [NgClass, MatButton, MatFormField, MatInput, Numeric],
  templateUrl: './resource-signal.html',
})
export class ResourceSignal {
  private readonly api = inject(Api);
  protected readonly apiNumber = resource({
    params: () => ({ value: this.source() }),
    loader: (options) => this.api.multiplyByFiveAsync(options.params.value, options.abortSignal),
    defaultValue: -1,
  });

  setLocalValue(val: number) {
    this.apiNumber.set(val);
  }

  protected reloadNumber() {
    this.apiNumber.reload();
  }

  source = signal<number>(0);
}
