import { Component, input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-container',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-container.html',
})
export class DialogContainer {
  title = input.required<string>();
}
