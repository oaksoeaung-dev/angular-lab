import { Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-test',
  imports: [PageHeader],
  templateUrl: './test.html',
})
export class Test {}
