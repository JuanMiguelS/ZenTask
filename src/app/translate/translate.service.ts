import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TranslateService {

  // Objeto donde guardaremos las traducciones
  private data: any;

  constructor(private http: HttpClient) { }

  /**
   * Obtenemos todos los datos de las traducciones de un idioma
   * @param path
   * @param language
   * @returns
   */
  getData(path: string, language?: string) {
    return new Promise((resolve, reject) => {

      // Si no le pasamos el lenguaje, cojemos el del navegador.
      if (!language) {
        language = navigator.language;
      }

      // Obtenemos las traducciones del idioma elegido
      this.http.get(path + language + ".json").subscribe({
        next: (data) => {
          this.data = data;
          resolve(true);
        }, error: (err) => {
          console.error(err);
          // Sino existe el idioma, cogemos el de por defecto
          this.http.get(path + "es.json").subscribe({
            next: (data) => {
              this.data = data;
              resolve(true);
            }, error: (err) => {
              resolve(false);
            }
          })
        }
      })
    })
  }

  /**
   * Obtenemos una traduccion concreta
   * @param key
   * @returns
   */
  getTranslate(key: string): string {
    return this.data ? this.data[key] : key;
  }

}
