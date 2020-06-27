import { Component, Input } from "@angular/core";

// Template component
// Use block-ui-template class to center div if desired
@Component({
    template: `
    <div class="block-ui-template text-center">
      <img src="../assets/images/loading.svg" />
      <p>{{message}}</p>
    </div>
  `
})
export class LoadingTemplate {
    message: string
}