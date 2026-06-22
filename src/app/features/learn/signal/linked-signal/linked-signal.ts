import { Component, computed, linkedSignal, signal } from '@angular/core';
import { PRODUCTS } from './data/products';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-linked-signal',
  imports: [PageHeader, MatChipsModule, MatButtonModule],
  templateUrl: './linked-signal.html',
})
export class LinkedSignal {
  protected readonly products = signal(['Apple', 'Banana', 'Cherry']);

  //readonly selectedProduct = linkedSignal(() => this.products()[0]);

  // linkedSignal မှာ ပထမ type က source ဒုတိယ type က  current ရှိနေတဲ့ value ရဲ့  type
  readonly selectedProduct = linkedSignal<string[], string>({
    source: this.products, // track လုပ်မယ့် signal
    computation: (latestSourceValue, previous) => {
      if (!previous) return latestSourceValue[0];
      if (latestSourceValue.includes(previous.value)) return previous.value;
      return latestSourceValue[0];
    },
  });

  protected disableAdd = computed<boolean>(() => {
    return this.products().length >= PRODUCTS.length;
  });

  protected disableRemove = computed<boolean>(() => {
    return this.products().length <= 0;
  });

  addProduct() {
    this.products.update((prods) => [...prods, PRODUCTS[prods.length]]);
  }

  removeProduct() {
    this.products.update((prods) => prods.slice(0, -1));
  }

  nextProduct() {
    this.selectedProduct.update((selected) => {
      const index = this.products().indexOf(selected);
      return this.products()[(index + 1) % this.products().length];
    });
  }

  prevProduct() {
    this.selectedProduct.update((selected) => {
      const index = this.products().indexOf(selected);
      return this.products()[(index - 1 + this.products().length) % this.products().length];
    });
  }
}
