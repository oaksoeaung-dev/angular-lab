import { Component, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PageHeader } from '../../../../shared/components/page-header/page-header';

@Component({
  selector: 'app-writable-signal',
  imports: [MatChipsModule, NgOptimizedImage, MatButtonModule, PageHeader],
  templateUrl: './writable-signal.html',
})
export class WritableSignal {
  age = signal<number>(26);
  name = signal<string>('Oak Soe Aung');

  resetAge() {
    this.age.set(26);
  }

  increaseAge() {
    this.age.update((prev) => prev + 1);
  }
}
