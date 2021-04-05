import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateFormControlDirective } from 'app/directives/validate-form-control.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';
import { LoadingTemplate } from './loading-template';
import { ImageLoadPipe } from '../filters/image-load.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileReaderDirective } from 'app/directives/file-reader.directive';
import { UserPipe } from 'app/filters/user.pipe';
import { FilterModule } from 'app/filters/filter.module';
import { AuthorizeDirective } from 'app/directives/authorize.directive';
import { UnauthorizedPageComponent } from './unauthorized-page.component';
import { ValidateFormDirective } from 'app/directives/validate-form.directive';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbTooltipModule, NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ValidateFormDirective,
    ValidateFormControlDirective,
    FileReaderDirective,
    AuthorizeDirective,
    UnauthorizedPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
    NgbModalModule,
    NgbNavModule,
    FilterModule,
    BlockUIModule.forRoot({ template: LoadingTemplate })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidateFormDirective,
    ValidateFormControlDirective,
    NgSelectModule,
    NgbTooltipModule,
    NgbModalModule,
    NgbNavModule,
    BlockUIModule,
    FilterModule,
    FileReaderDirective,
    AuthorizeDirective,
    UnauthorizedPageComponent
  ],
  entryComponents: [LoadingTemplate]
})
export class SharedModule { }
