import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { CreateForm } from './create-form/create-form';
import { ViewForm } from './view-form/view-form';

@Component({
  selector: 'app-formly',
  imports: [MatTabsModule, CreateForm, ViewForm],
  templateUrl: './formly.html',
  styles: `
    .shell {
      max-width: 760px;
      margin: 0 auto;
      padding: 24px 16px 64px;
    }

    .shell__title {
      font-size: 22px;
      font-weight: 600;
      margin: 0 0 16px;
    }

    .shell__tab {
      padding: 24px 4px;
    }
  `,
})
export class Formly {
  private readonly tabs = viewChild.required<MatTabGroup>('tabs');

  /**
   * Hook fired when a config is generated. Left as a no-op so you can
   * inspect the JSON preview on the editor tab first. If you'd rather
   * jump straight to the result, uncomment the line below.
   */
  protected goToViewer(): void {
    // this.tabs().selectedIndex = 1;
  }
}
