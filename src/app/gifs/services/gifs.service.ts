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

  searchTag (tag: string) {
    this._tagsHistory.unshift(tag); // Agrega el tag al inicio del arreglo
  };
}

