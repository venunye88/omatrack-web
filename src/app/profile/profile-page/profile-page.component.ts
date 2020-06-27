import { Component, OnInit } from '@angular/core';
import { User } from 'app/auth/auth.models';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: User;
  isAccount: boolean = true;
  title: any = { icon: "", text: "" };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.currentUser;
    }
    if (this.router.url == '/profile/' + AppRouteNames.ProfileAccount) {
      this.navigate(true);
    } else {
      this.navigate(false);
    }
  }

  navigate(isAcc: boolean) {
    this.isAccount = !isAcc;
    if (!this.isAccount) {
      this.router.navigate(['/profile/' + AppRouteNames.ProfileAccount]);
      this.title = { icon: "fas fa-user-edit", text: "Account" };
    }
    else {
      this.router.navigate(['/profile/' + AppRouteNames.ChangePassword]);
      this.title = { icon: "fas fa-unlock-alt", text: "Change Password" };
    }
    this.isAccount = !this.isAccount;
  }

}
