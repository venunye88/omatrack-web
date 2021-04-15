import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { Observable, of } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Role, User } from 'app/auth/auth.models';
import { RoleService } from 'app/services/role.service';
import { LoadingMessages, Enums } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';
import { Enum, LookupService } from 'app/services/lookup.service';
import { Outlet, OutletService } from 'app/services/outlet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  filterText: string = "";
  showForm: boolean;
  userForm: FormGroup;
  roles: Observable<Role[]>;
  users: Observable<User[]>;
  outlets: Observable<Outlet[]>
  userTypes: Enum[]

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder, private userService: UserService, private roleService: RoleService, private lookUpService: LookupService, private outletService: OutletService) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchRoles();
    this.fetchUserTypes();
    this.fetchUsers();
    this.fetchStations();
  }

  async fetchStations() {
    this.outlets = this.outletService.get();
  }

  openForm(user?: User) {
    this.userForm.reset();
    this.showForm = true;
    if (user != null) { this.userForm.patchValue(user); }
  }

  closeForm() { this.showForm = false; }

  async fetchUserTypes() { this.userTypes = await this.lookUpService.fetchEnum(Enums.UserTypes); }

  async fetchRoles() { this.roles = this.roleService.get(); }

  async fetchUsers() {
    try {
      this.loading.start();
      this.users = of(await this.userService.get());
    } catch (error) { } finally { this.loading.stop(); }
  }

  async save(user: User) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.userService.save(user);
      if (res) {
        this.closeForm();
        this.fetchUsers();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  async delete(user: User) {
    let confirm = await MessageBox.confirm("Delete User", `Are you sure you want to delete ${user.name}?`);
    if (!confirm.value) return;

    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.userService.delete(user.username);
      if (res) {
        this.closeForm();
        this.fetchUsers();
      }
    } catch (err) { } finally { this.loading.stop(); }
  }

  private setUpForm() {
    this.userForm = this.fb.group({
      id: '',
      username: '',
      name: '',
      phoneNumber: '',
      email: '',
      password: null,
      confirmPassword: null,
      profileId: 0,
      type: null,
      outletId: null,
      // number: '',
      // picture: '',
      // file: null,
      // stations: []
    })

  }
}