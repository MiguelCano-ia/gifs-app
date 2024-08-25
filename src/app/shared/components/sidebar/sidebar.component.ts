import { GifsService } from './../../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {
  }

  get tags (): string[] { // Método que devuelve el historial de tags
    return this.gifsService.tagsHistory;
  };

  searchTag(tag: string) {
    this.gifsService.searchTag(tag);
  }
}
