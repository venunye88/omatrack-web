import { Component, OnInit } from '@angular/core';
import { routeAnimations } from 'app/shared/animation';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  // styleUrls: ['./blank-layout.component.scss']
  animations: [routeAnimations]
})
export class BlankLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
