import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
}).then(() => {
  // Configura el idioma inicial basado en la configuración del servicio
  const htmlElement = document.documentElement;
  htmlElement.lang = 'en'; // Idioma por defecto
});
