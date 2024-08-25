import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory]; // Devuelve una copia del arreglo
  };

  private organizeHistory(tag: string): void {
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( oldtag => oldtag !== tag ); // Elimina el tag del arreglo
    }

    this._tagsHistory.unshift(tag); // Agrega el tag al inicio del arreglo
    this._tagsHistory = this._tagsHistory.splice(0, 10); // Limita el arreglo a 10 elementos
  }

  searchTag (tag: string): void {
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);
  };
}

