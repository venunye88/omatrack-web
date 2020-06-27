import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProfileService, IChangePasswordParams } from 'app/services/profile.service';
import { LoadingMessages } from 'app/shared/config-keys';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup
  @BlockUI('changePassword') blockUi: NgBlockUI

  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      newPassword: '',
      confirmPassword: '',
      currentPassword: ''
    })
  }

  async save(params: IChangePasswordParams) {
    this.blockUi.start(LoadingMessages.Saving)
    let success = await this.profileService.changePassword(params)
    this.blockUi.stop()
    if (success) this.changePasswordForm.reset()
  }

}
