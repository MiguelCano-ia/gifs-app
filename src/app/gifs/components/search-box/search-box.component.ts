import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    > <!-- #txtTagInput es una referencia al input -->
  `,
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput') // Referencia al input #txtInput
  public tagInput!: ElementRef<HTMLInputElement>; // ElementRef es un tipo de dato que permite acceder a la referencia del input

  constructor() {
  }

  // searchTag( newTag: string ) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value; // Accedemos al valor del input

    console.log(newTag);
  };
}
