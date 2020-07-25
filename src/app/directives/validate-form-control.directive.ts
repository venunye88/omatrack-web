import { Directive, Renderer2, ElementRef, Input, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[validate-form-control]'
})
export class ValidateFormControlDirective implements AfterViewInit {
  errorControlClass = "is-invalid";
  errorTextClass = "invalid-feedback";

  @Input("error-message") errorMessage: string;
  @Input("validate-form-control") control: FormControl;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit() {
    this.control.valueChanges.subscribe(() => this.validate());
  }

  validate() {
    if (this.control.invalid && this.control.dirty) {
      this.renderer.addClass(this.el.nativeElement, this.errorControlClass)
      if (this.errorMessage && !this.errorMessageExist()) {
        this.renderer.appendChild(this.el.nativeElement.parentNode, this.createErrorMsgSpan())
      }
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.errorControlClass)
      if (this.errorMessage) { this.removeErrorMsgSpan() }
    }
  }

  createErrorMsgSpan() {

    let span = this.renderer.createElement('span')
    const text = this.renderer.createText(this.errorMessage)
    this.renderer.addClass(span, this.errorTextClass)
    this.renderer.setProperty(span, 'id', `${this.el.nativeElement.id}ES`)
    this.renderer.appendChild(span, text)
    return span
  }

  removeErrorMsgSpan() {
    let children: HTMLCollection = this.el.nativeElement.parentNode.children
    let item = children.item(children.length - 1)
    if (item.id == `${this.el.nativeElement.id}ES`) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, item)
    }
  }

  errorMessageExist() {
    let children: HTMLCollection = this.el.nativeElement.parentNode.children
    let item = children.item(children.length - 1)
    return (item.id == `${this.el.nativeElement.id}ES`)
  }

}
