import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { LoginParams } from '../auth.models';
import { AppRouteNames } from 'app/shared/config-keys';
import { Toast } from 'app/shared/message-helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginParams = <LoginParams>{};
  loading: boolean = false;
  loginForm: FormGroup;
  @BlockUI('plain') blockUi: NgBlockUI;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login(credentials: LoginParams) {
    try {
      this.blockUi.start("Logging In..");
      let userData = await this.authService.login(credentials);
      // this.blockUi.stop()
      if (!userData) return;
      this.authService.setUser(userData);
      this.router.navigate(['/' + AppRouteNames.Dashboard])

    } catch (error) {
      this.blockUi.stop()
    }
  }

}
