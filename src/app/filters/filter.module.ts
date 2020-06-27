import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPipe } from './user.pipe';
import { ImageLoadPipe } from './image-load.pipe';



@NgModule({
  declarations: [ImageLoadPipe, UserPipe],
  exports: [
    ImageLoadPipe,
    UserPipe
  ]
})
export class FilterModule { }
