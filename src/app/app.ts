import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterLayout } from './shared/components/master-layout/master-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MasterLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
