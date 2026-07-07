import { Service } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Question } from '../models/question.model';
import { generateQuiz } from '../utils/exam.helper';

@Service()
export class ExamGeneratorService {
  generateExam(level: number): Observable<Question[]> {
    return of(generateQuiz(level)).pipe(delay(3000));
  }
}
