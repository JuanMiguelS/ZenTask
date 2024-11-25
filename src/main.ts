/// <reference types="@angular/localize" />
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appConfig } from './app/app.config';  // Importa tu appConfig

// Factory para cargar los archivos de traducción
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Llamada a bootstrapApplication con todos los providers necesarios
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Para las peticiones HTTP
    TranslateService,     // Se asegura de que TranslateService sea proporcionado
    ...(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }).providers || []), // Asegura que los providers de TranslateModule se agreguen correctamente
    ...appConfig.providers, // Mantén los providers existentes en appConfig
  ],
}).catch(err => console.error(err));
