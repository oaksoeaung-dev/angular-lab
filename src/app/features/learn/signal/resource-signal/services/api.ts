import { inject, Service } from '@angular/core';
import { ToastService } from '@shared/services/toast.service';

@Service()
export class Api {
  private toast = inject(ToastService);
  public getRandomNumberAsync(abortSignal?: AbortSignal) {
    this.toast.show('[API] Getting a random number...', 'info');
    return new Promise<number>((resolve) => {
      let handle: number | null = null;
      handle = setTimeout(() => {
        const result = Math.floor(Math.random() * 100);
        this.toast.show(`[API] Random number received : ${result}`, 'success');
        resolve(result);
        handle = null;
      }, 3000);
      abortSignal?.addEventListener('abort', () => {
        if (handle) {
          clearTimeout(handle);
          this.toast.show('Random Number - Cancelled!!!', 'info');
        }
      });
    });
  }

  public multiplyByFiveAsync(value: number, abortSignal?: AbortSignal) {
    this.toast.show(`[API] Getting a multiplier for seed : ${value}`, 'info');
    return new Promise<number>((resolve) => {
      let handle: number | null = null;
      handle = setTimeout(() => {
        const result = value * 5;
        this.toast.show(`[API] Multiplier received : ${result}`, 'success');
        resolve(result);
        handle = null;
      }, 3000);
      abortSignal?.addEventListener('abort', () => {
        if (handle) {
          clearTimeout(handle);
          this.toast.show('Multiply Number - Cancelled!!!', 'info');
        }
      });
    });
  }
}
