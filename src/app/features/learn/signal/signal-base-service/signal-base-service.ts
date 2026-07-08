import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Progress } from './components/progress/progress';
import { Question } from './models/question.model';
import { QuestionPresenter } from './components/question-presenter/question-presenter';
import { Done } from './components/done/done';
import { ExamService } from './services/exam.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-signal-base-service',
  imports: [Progress, QuestionPresenter, Done, MatButton],
  templateUrl: './signal-base-service.html',
})
export class SignalBaseService {
  readonly store = inject(ExamService);
}
