import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'app/services/auth.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { User } from 'app/auth/auth.models';
import { ProfileService } from 'app/services/profile.service';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss']
})
export class ProfileAccountComponent implements OnInit {
  accountForm: FormGroup;
  @BlockUI('account') blockUi: NgBlockUI

  constructor(private fb: FormBuilder, private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      username: '',
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      picture: '',
      file: null
    });
    this.fetchProfile();
  }

  async fetchProfile() {
    try {
      this.blockUi.start();
      let data = await this.profileService.getAccount();
      if (data) this.accountForm.patchValue(data);

    } catch (error) { } finally { this.blockUi.stop(); }
  }

  async save(account: User) {
    try {
      this.blockUi.start(LoadingMessages.Saving);
      await this.profileService.updateAccount(account);
    } catch (error) { } finally { this.blockUi.stop(); }
  }

}
