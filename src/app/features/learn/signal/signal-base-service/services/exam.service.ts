import { computed, inject, Service, signal } from '@angular/core';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { ExamGeneratorService } from './exam-generator.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Service()
export class ExamService {
  readonly #generateExam$ = new BehaviorSubject<number>(1);
  readonly #questions = signal<Question[]>([
    {
      caption: 'How much is 4 + 4 ?',
      answers: ['4', '8', '12', '16'],
      correctAnswerIndex: 1,
    },
    {
      caption: 'How much is 5 + 5 ?',
      answers: ['5', '10', '15', '20'],
      correctAnswerIndex: 1,
    },
    {
      caption: 'How much is 6 + 6 ?',
      answers: ['6', '12', '18', '24'],
      correctAnswerIndex: 1,
    },
  ]);
  readonly #userAnswers = signal<number[]>([]);
  readonly #isBusy = signal<boolean>(false);

  public readonly userAnswers = computed(() =>
    this.#userAnswers().map<Answer>((ans, index) => ({
      userAnswerIndex: ans,
      isCorrect: ans === this.questions()[index].correctAnswerIndex,
    })),
  );
  public readonly questions = this.#questions.asReadonly();
  public readonly isBusy = this.#isBusy.asReadonly();
  public readonly currentQuestionIndex = computed(() => this.userAnswers().length);
  public readonly currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);
  public readonly questionsCount = computed(() => this.questions().length);
  public readonly isQuizDone = computed(() => this.userAnswers().length === this.questionsCount());
  public readonly correctAnswers = computed(() =>
    this.userAnswers().filter((ans) => ans.isCorrect),
  );
  public readonly correctAnswersCount = computed(() => this.correctAnswers().length);

  public answerCurrentQuestion(answerIndex: number) {
    this.#userAnswers.update((answers) => [...answers, answerIndex]);
  }
  readonly level = toSignal(this.#generateExam$);

  increaseLevel() {
    this.#generateExam$.next(this.#generateExam$.value + 1);
  }

  decreaseLevel() {
    if (this.#generateExam$.value > 1) {
      this.#generateExam$.next(this.#generateExam$.value - 1);
    }
  }

  repeatLevel() {
    this.#generateExam$.next(this.#generateExam$.value);
  }

  constructor() {
    const generator = inject(ExamGeneratorService);

    this.#generateExam$
      .pipe(
        tap((level) => this.#isBusy.set(true)),
        switchMap((level) => generator.generateExam(level)),
        tap((questions) => {
          this.#questions.set(questions);
          this.#userAnswers.set([]);
          this.#isBusy.set(false);
        }),
      )
      .subscribe();
  }
}
