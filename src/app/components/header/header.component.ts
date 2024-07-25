import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title: string = 'Employees App';
  // isLoggedIn: boolean = false;
  public authService = inject(AuthService);

  private router = new Router();
  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }
}
