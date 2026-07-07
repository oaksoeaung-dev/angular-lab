import { Component, input, output } from '@angular/core';
import { Question } from '../../models/question.model';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-question-presenter',
  imports: [MatRipple],
  templateUrl: './question-presenter.html',
  host: {
    style: 'display: block',
  },
})
export class QuestionPresenter {
  readonly question = input.required<Question>();
  readonly answered = output<number>();

  onAnswer(answerIndex: number) {
    this.answered.emit(answerIndex);
  }
}
