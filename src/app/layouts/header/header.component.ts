import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/auth/auth.models';
import { ImageLoadPipe } from 'app/filters/image-load.pipe';
import { Router } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.currentUser;
    }

  }

  logout() {
    this.authService.logout()
    this.router.navigate([AppRouteNames.Login])
  }

}