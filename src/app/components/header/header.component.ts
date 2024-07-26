import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GlobalDataService } from '../../global-data.service';
import { combineLatest, map, Observable } from 'rxjs';

interface AdditionalInfo {
  username: string;
  firstName: string;
  lastName: string;
  contactNumber: number;
  address: string;
  bio: string;
}

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
  canShowLogoutButton$!: Observable<boolean>;

  constructor(
    public authService: AuthService,
    private globalDataService: GlobalDataService
  ) {}

  ngOnInit() {
    this.canShowLogoutButton$ = combineLatest([
      this.authService.isLoggedIn as Observable<boolean>,
      this.globalDataService.additionalInfo$ as Observable<any>, // Explicitly typing
    ]).pipe(
      map(
        ([isLoggedIn, additionalInfo]: [boolean, any]) =>
          isLoggedIn && !!additionalInfo
      )
    );
  }

  logout() {
    this.authService.logout();
  }
}
