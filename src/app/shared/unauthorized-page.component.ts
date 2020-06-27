import { Component } from "@angular/core";

@Component({
    template: `<div id="page-wrapper" class='page text-center'><p class='mb-0'><i class='mdi mdi-warning mdi-3x text-danger'></i></p><h3 class='text-danger'>You are not authorized to perform this action.</h3><p>Contact your administrator to get authorized.</p></div>`
})
export class UnauthorizedPageComponent { }