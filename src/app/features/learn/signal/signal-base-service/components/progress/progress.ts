import { Component, computed, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress',
  imports: [MatProgressBarModule],
  templateUrl: './progress.html',
  host: {
    style: 'display: block',
  },
})
export class Progress {
  readonly value = input.required<number>();
  readonly max = input.required<number>();
  readonly ratio = computed(() => (this.max() === 0 ? 0 : this.value() / this.max()));
}
