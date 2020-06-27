import { Directive, Renderer2, ElementRef, HostListener, asNativeElements } from '@angular/core';
import { isUndefined } from 'util';
import { HtmlTagDefinition } from '@angular/compiler';
import { element } from 'protractor';

@Directive({
  selector: '[appNavDropdownToggle]'
})
export class NavDropdownToggleDirective {

  constructor(private renderer: Renderer2, private el: ElementRef<HTMLElement>) {
  }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    // var ul = <HTMLElement>this.el.nativeElement.nextSibling // returns UL
    // ul.classList.toggle("close");
    // this.closeOthers(ul.parentElement.id)

    var ul = <HTMLElement>this.el.nativeElement.nextSibling // returns UL
    var caret = this.el.nativeElement.getElementsByClassName("caret-right"); //return i 
    ul.classList.toggle("close");
    if (caret.length > 0) caret[0].classList.toggle("caret-down")
    this.closeOthers(ul.parentElement.id)

  }

  private closeOthers(parentId: string) {
    var parent = this.el.nativeElement.parentNode.parentNode; //returns #side-menu element (grand parent)
    var ul = parent.querySelectorAll(".nav-dropdown-items")
    ul.forEach(element => {
      if (!element.classList.contains("close")) {
        if (element.parentElement.id != parentId) {
          this.renderer.addClass(element, "close")
          var aTag = element.previousElementSibling;
          var caret = (<HTMLElement>aTag.childNodes[2]);
          caret.classList?.remove("caret-down");
        }
      }
    })
  }
}

