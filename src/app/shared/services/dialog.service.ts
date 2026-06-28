import { inject, Service } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogLoader } from '../models/dialog.model';

@Service()
export class DialogService {
  private dialog = inject(MatDialog);

  async open<T = unknown, D = unknown, R = unknown>(loader: DialogLoader<T>, config?: MatDialogConfig<D>) {
    const component = await loader();
    return this.dialog.open<T, D, R>(component, {
      disableClose: true,
      width: '800px',
      maxWidth: '800px',
      exitAnimationDuration: 150,
      enterAnimationDuration: 150,
      autoFocus: false,
      ...config,
    });
  }
}
