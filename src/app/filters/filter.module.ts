import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPipe } from './user.pipe';
import { ImageLoadPipe } from './image-load.pipe';
import { StationPipe } from './station.pipe';



@NgModule({
  declarations: [ImageLoadPipe, UserPipe, StationPipe],
  exports: [
    ImageLoadPipe,
    UserPipe,
    StationPipe
  ]
})
export class FilterModule { }
