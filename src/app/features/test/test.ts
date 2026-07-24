import { Component, inject, signal } from '@angular/core';
import { PageHeader } from '@shared/components/page-header/page-header';
import { LucideCircleQuestionMark, LucideSendHorizontal } from '@lucide/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatRipple } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-test',
  imports: [
    PageHeader,
    LucideCircleQuestionMark,
    OverlayModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LucideSendHorizontal,
    MatRipple,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './test.html',
  styleUrl: 'test.css',
})
export class Test {
  isOpen = false;
  private readonly http = inject(HttpClient);
  protected messages = signal<{ from: 'user' | 'ai'; message: string }[]>([]);
  protected userMessage = signal<string>('');
  protected isLoading = signal<boolean>(false);

  send() {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { from: 'user', message: this.userMessage() }]);
    this.http
      .post('/api/chat', { message: this.userMessage() })
      .subscribe((x: any) => {
        x.output
          .filter((f: any) => f.type === 'message')
          .forEach((c: any) => {
            c.content.forEach((t: any) => {
              this.messages.update((prev) => [...prev, { from: 'ai', message: t.text }]);
            });
          });

        this.userMessage.set('');
        this.isLoading.set(false);
      });
  }
}
