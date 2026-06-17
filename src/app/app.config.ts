import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFormlyCore } from '@ngx-formly/core';
import { TypeAliases } from './core/formly/type-aliases';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFormlyCore(TypeAliases),
  ],
};
