import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsplashService } from '../unsplash.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  photos: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private unsplashService: UnsplashService, private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.fetchPhotos();
  }

  fetchPhotos(): void {
    this.unsplashService.getPhotos(this.currentPage, this.itemsPerPage).subscribe(
      (data: any[]) => {
        this.photos = data;
      },
      error => {
        console.error('Error al obtener datos de Unsplash:', error);
      }
    );
  }

  onItemClicked(photo: any): void {
    this.dataSharingService.setSelectedItem(photo);
  }

  changePage(increment: number): void {
    this.currentPage += increment;
    this.fetchPhotos();
  }
}
