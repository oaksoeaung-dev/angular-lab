import { Component, inject, signal } from '@angular/core';
import { HotToastRef } from '@ngxpert/hot-toast';
import { ToastDataModel, ToastTone } from '../../models/toast-data.model';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
})
export class Toast {
  toastRef: HotToastRef<ToastDataModel> = inject(HotToastRef<ToastDataModel>);
  message = signal<string | undefined>(undefined);

  colorMapper: Record<ToastTone, string> = {
    success: 'text-emerald-800 bg-emerald-50',
    danger: 'text-rose-800 bg-rose-50',
    info: 'text-blue-800 bg-blue-50',
  };

  ngOnInit() {
    this.message.set(this.toastRef.data.message);
  }
}
