import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string | null = null;
  currentIndex = 0;
  selectedCard: any = null;
  selectedItem: any = null; 

  carouselImages = [
    { src: 'assets/images.jpg', caption: 'impresionismo' },
    { src: 'assets/image1.jpeg', caption: 'Arte surrealista' },
    { src: 'assets/image2.jpg', caption: 'Estilo barroco' },
    { src: 'assets/image3.jpeg', caption: 'paisaje natural' },
    { src: 'assets/image4.jpg', caption: 'Arte abstracto' },
    { src: 'assets/image5.jpg', caption: 'Neoimpresionista' },
    { src: 'assets/image6.jpg', caption: 'Arte digital' },
    { src: 'assets/image7.jpg', caption: 'Arte surrealista' }
  ];

  cards = [
    { image: 'assets/images.jpg', title: 'impresionismo', description: 'Este tipo de arte se caracteriza por el uso de pinceladas visibles, colores vivos y una representación subjetiva de la realidad, enfocándose más en la percepción y el ambiente del momento que en los detalles precisos.', expanded: false },
    { image: 'assets/image1.jpeg', title: 'Arte surrealista', description: 'Este estilo se caracteriza por la combinación de elementos realistas en contextos fantásticos o imposibles, jugando con la percepción y la interpretación del observador.', expanded: false },
    { image: 'assets/image2.jpg', title: 'Estilo barroco', description: 'Este movimiento artístico, que floreció en Europa durante los siglos XVII y XVIII, se caracteriza por su dramatismo, emoción y riqueza en los detalles.', expanded: false },
    { image: 'assets/image3.jpeg', title: 'paisaje natural', description: 'Este tipo de imagen puede estar influenciado por el uso de técnicas de fotografía HDR (High Dynamic Range) o una manipulación digital que resalta los colores y el contraste para crear una atmósfera más intensa y dramática.', expanded: false },
    { image: 'assets/image4.jpg', title: 'Arte abstracto', description: 'Este tipo de arte se caracteriza por el uso de formas geométricas y líneas fluidas que se combinan para crear una representación estilizada y no realista.', expanded: false },
    { image: 'assets/image5.jpg', title: 'Neoimpresionista', description: 'Este tipo de arte se caracteriza por el uso de colores intensos y vibrantes aplicados en pinceladas sueltas y texturizadas.', expanded: false },
    { image: 'assets/image6.jpg', title: 'Arte digital', description: 'Este tipo de estilo se caracteriza por el uso de colores vivos, formas geométricas y patrones dinámicos que se fusionan para crear una representación moderna y estilizada del rostro humano.', expanded: false },
    { image: 'assets/image7.jpg', title: 'Arte surrealista', description: 'Este estilo se caracteriza por la representación de escenas extrañas y oníricas que desafían la lógica y la realidad.', expanded: false }
  ];

  constructor(private authService: AuthService, private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.userName = isLoggedIn ? localStorage.getItem('userEmail') : null;
    });

    this.dataSharingService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    });
  }

  toggleCardExpansion(card: any): void {
    card.expanded = !card.expanded; 
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  openImageModal(card: any): void {
    this.selectedCard = card; 
  }

  closeImageModal(): void {
    this.selectedCard = null; 
  }
}
