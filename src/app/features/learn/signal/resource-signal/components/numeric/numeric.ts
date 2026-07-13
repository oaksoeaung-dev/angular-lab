import { Component, input, model } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-numeric',
  imports: [MatSliderModule, MatButton, FormsModule],
  templateUrl: './numeric.html',
})
export class Numeric {
  readonly value = model.required<number>();
  readonly label = input('');
  increase() {
    this.value.update((v) => Math.min(100, v + 1));
  }
  decrease() {
    this.value.update((v) => Math.max(0, v - 1));
  }
}
