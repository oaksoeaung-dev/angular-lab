import { Type } from '@angular/core';

export type DialogLoader<T> = () => Promise<Type<T>>;
