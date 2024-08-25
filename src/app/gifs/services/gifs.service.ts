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

  constructor( private http: HttpClient ) { }

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

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag)

    // Observable: Es un objeto en el cual a lo largo del tiempo, puede estar emitiendo diferentes valores

    /* Usualmente cuando hablamos de "suscribirnos a los observables", significa estar escuchando las emisiones que este objeto estara emitiendo a lo largo de su vida. */
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( (res) => {
        this.gifList = res.data;
        // console.log(this.gifList);
      });
  };
}

