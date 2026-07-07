import { Component, signal } from '@angular/core';
import { Progress } from './components/progress/progress';
import { Question } from './models/question.model';
import { QuestionPresenter } from './components/question-presenter/question-presenter';
import { Done } from './components/done/done';

@Component({
  selector: 'app-signal-base-service',
  imports: [Progress, QuestionPresenter, Done],
  templateUrl: './signal-base-service.html',
})
export class SignalBaseService {
  readonly question = signal<Question>({
    caption: 'How much is 4 + 4?',
    answers: ['4', '6', '8', '12'],
    correctAnswerIndex: 2,
  });
}
