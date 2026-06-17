import { Component, computed, signal } from '@angular/core';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-computed-signal',
  imports: [MatChipsModule, NgOptimizedImage, MatButtonModule, PageHeader],
  templateUrl: './computed-signal.html',
})
export class ComputedSignal {
  protected person1 = signal<string>('Tun Tun');
  protected person2 = signal<string>('Kyaw Kyaw');

  protected person1Amount = signal<number>(1000);
  protected person2Amount = signal<number>(1000);

  protected total = computed(() => this.person1Amount() + this.person2Amount());
  /*protected total = computed(() => this.person1Amount() + untracked(this.person2Amount));*/ // person2Amount change ရင် re-calculate မလုပ်ဘူး person1Amount change မှ re-calculate ပြန်လုပ်တယ် re-calculate ပြန်လုပ်တဲ့အခါ signal value ကဘယ်ထဲမှာပဲရှိရှိ လက်ရှိ ရဲ့ latest ကိုယူတယ်။

  increasePerson1Amount() {
    this.person1Amount.update((prev) => prev + 1000);
  }

  increasePerson2Amount() {
    this.person2Amount.update((prev) => prev + 1000);
  }
}
