import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interces';

const GIPHY_API_KEY = 'oUgY8q7qqpT35vJDaj55c2EhL1bJyKSp';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

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
    this.saveLocalStorage();
  };

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  };

  private loadLocalStorage(): void {
    if (localStorage.getItem('history')) {
      this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
      this.searchTag(this._tagsHistory[0]);
    }
  };

  searchTag (tag: string): void {
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( (res) => {
        this.gifList = res.data;
      });
  };
}

