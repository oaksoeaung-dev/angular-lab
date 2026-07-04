import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { ToastDataModel, ToastTone } from '../models/toast-data.model';
import { Toast } from '../components/toast/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast = inject(HotToastService);

  show(message: string, tone: ToastTone) {
    this.toast.show<ToastDataModel>(Toast, {
      data: {
        message,
        tone,
      },
      style: {
        '--hot-toast-padding': '0',
        '--hot-toast-message-margin': '0',
        '--hot-toast-border-radius': 'var(--radius-card)',
        '--hot-toast-shadow': 'none',
      },
      position: 'top-right',
    });
  }
}
