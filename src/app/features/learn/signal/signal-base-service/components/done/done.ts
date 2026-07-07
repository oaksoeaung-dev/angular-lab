import { Component, computed, input, output } from '@angular/core';
import { PercentPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-done',
  imports: [PercentPipe, MatButton],
  templateUrl: './done.html',
  host: {
    style: 'display: block',
  },
})
export class Done {
  readonly correct = input.required<number>();
  readonly total = input.required<number>();

  readonly score = computed(() => (this.total() === 0 ? 0 : this.correct() / this.total()));

  readonly restart = output<void>();
}
