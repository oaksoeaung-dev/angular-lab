import { Component, effect, inject, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-effect-signal',
  imports: [MatChipsModule, MatButtonModule, PageHeader],
  templateUrl: './effect-signal.html',
})
export class EffectSignal {
  private toastService = inject(ToastService);

  protected number1 = signal(0);
  protected number2 = signal(0);

  protected run3Times() {
    this.number1.set(1000);
    this.number1.update((prev) => prev + 1000);
    this.number1.update((prev) => prev + 3000);
    this.number2.set(10);
  }

  protected run1Times() {
    this.number1.set(0);
    this.number2.update((prev) => prev * 100);
  }

  constructor() {
    effect(() => {
      this.toastService.show(`Number from effect ${this.number1()}`, 'success');
      this.toastService.show(`Number from effect ${this.number2()}`, 'success');
      /* Effect ထဲမှာ track လုပ်ထားတဲ့ signal တွေက event တစ်ခုမှာ ဘယ်နှစ်ခေါက်ပဲ changes ဖြစ််ဖြစ် changes အကုန်ပြီးမှ တစ်ခါပဲ run တယ် Task တွေအကုန်ပြီးပြီး idle ဖြစ်တော့မှ run တယ်။  */
    });
  }
}
