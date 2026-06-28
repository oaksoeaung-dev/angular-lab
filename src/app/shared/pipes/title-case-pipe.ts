import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    return value
      .trim()
      .replace(/[_\-./]+/g, ' ')
      .replace(/([a-z\d])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map((word) => this.titleCaseWord(word))
      .join(' ');
  }

  private titleCaseWord(word: string): string {
    if (!word) return '';

    if (word.length > 1 && word === word.toUpperCase()) {
      return word;
    }

    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
