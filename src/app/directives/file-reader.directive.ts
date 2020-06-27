import { Directive, Input, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[file-reader]'
})
export class FileReaderDirective {
  @Input('file-reader') control: FormControl;

  @HostListener('change', ['$event']) onfileChange(event) {
    if (!this.control) return;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.control.patchValue(reader.result)
      };
    }
  }

}
