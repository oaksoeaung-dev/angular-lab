import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signal',
  imports: [RouterOutlet],
  templateUrl: './signal.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Signal {}
