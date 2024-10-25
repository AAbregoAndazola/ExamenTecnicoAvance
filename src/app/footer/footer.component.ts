import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  newsletterForm: FormGroup;
  isSubscribing = false;
  socialLinks = [
    { icon: 'facebook', url: '#' },
    { icon: 'twitter', url: '#' },
    { icon: 'instagram', url: '#' },
    { icon: 'linkedin', url: '#' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  async onSubmitNewsletter(): Promise<void> {
    if (this.newsletterForm.valid && !this.isSubscribing) {
      this.isSubscribing = true;
      
      try {
        // Simular llamada al servidor
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.snackBar.open(
          '¡Gracias por suscribirte! Recibirás nuestras novedades muy pronto.',
          'Cerrar',
          { duration: 5000 }
        );
        
        this.newsletterForm.reset();
      } catch (error) {
        this.snackBar.open(
          'Hubo un error al procesar tu suscripción. Por favor, intenta de nuevo.',
          'Cerrar',
          { duration: 5000 }
        );
      } finally {
        this.isSubscribing = false;
      }
    }
  }

  getErrorMessage(): string {
    const emailControl = this.newsletterForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'El correo electrónico es requerido';
    }
    if (emailControl?.hasError('email')) {
      return 'Por favor, ingresa un correo electrónico válido';
    }
    return '';
  }
}
