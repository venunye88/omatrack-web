import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Directive({
  selector: '[authorize]'
})
export class AuthorizeDirective implements AfterViewInit {
  @Input('authorize') privileges: string;

  constructor(private el: ElementRef, private authServie: AuthService) { }

  ngAfterViewInit() {
    if (!this.authServie.isAuthorize(this.privileges)) {
      this.el.nativeElement.remove();
    }
  }

}
