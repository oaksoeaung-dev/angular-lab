import { Component, inject, resource } from '@angular/core';
import { Api } from './services/api';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-resource-signal',
  imports: [NgClass, MatButton, MatFormField, MatInput],
  templateUrl: './resource-signal.html',
})
export class ResourceSignal {
  private readonly api = inject(Api);
  protected readonly apiNumber = resource({
    loader: (options) => this.api.getRandomNumberAsync(options.abortSignal),
    defaultValue: -1,
  });

  setLocalValue(val: number) {
    this.apiNumber.set(val);
  }

  protected reloadNumber() {
    this.apiNumber.reload();
  }
}
