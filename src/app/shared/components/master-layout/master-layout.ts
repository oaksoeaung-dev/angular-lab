import { Component } from '@angular/core';
import { SideMenu } from '../side-menu/side-menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-master-layout',
  imports: [MatIconModule, SideMenu],
  templateUrl: './master-layout.html',
})
export class MasterLayout {}
