import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('headerScroll', [
      state('top', style({
        backgroundColor: 'transparent',
        boxShadow: 'none'
      })),
      state('scrolled', style({
        backgroundColor: 'rgba(255,255,255,0.95)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      })),
      transition('top <=> scrolled', animate('300ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isMenuOpen: boolean = false;
  isScrolled: boolean = false;
  isSearchFocused: boolean = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout(): void {
    this.authService.logout();
    this.isMenuOpen = false;
  }
}