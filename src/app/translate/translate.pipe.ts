import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) { }

  transform(value: string, params?: any): string {

    // Obtenemos la traduccion
    let translate = this.translateService.getTranslate(value);

    // Sino le damos parametros de traducciones, devolvemos la traduccion directamente
    if (!params) {
      return translate;
    }

    // intercambiamos el valor de {key} por el que lo vamos a intercambiar
    for (const key in params) {
      translate = translate.replaceAll('{' + key + '}', params[key])
    }
    // devolvemos la traduccion
    return translate;
  }

}
