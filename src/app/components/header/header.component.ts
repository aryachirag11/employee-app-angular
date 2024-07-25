import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
//header component , common for all app
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title: string = 'Employees App';
  //injecting auth service
  public authService = inject(AuthService);

  //logout button handler
  private router = new Router();
  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }
}
