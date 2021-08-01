import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPipe } from './user.pipe';
import { ImageLoadPipe } from './image-load.pipe';
import { StationPipe } from './station.pipe';
import { AccountGroupPipe } from './account-group.pipe';
import { AccountPipe } from './account.pipe';
import { SafePipe } from './safe.pipe';



@NgModule({
  declarations: [ImageLoadPipe, UserPipe, StationPipe, AccountGroupPipe, AccountPipe, SafePipe],
  exports: [
    ImageLoadPipe,
    UserPipe,
    StationPipe,
    AccountPipe,
    SafePipe,
  ]
})
export class FilterModule { }
