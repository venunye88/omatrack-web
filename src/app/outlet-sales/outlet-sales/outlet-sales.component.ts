import { Component, OnInit } from '@angular/core';
import { WebUtils } from 'app/shared/web-utils';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-outlet-sales',
  templateUrl: './outlet-sales.component.html',
  styleUrls: ['./outlet-sales.component.scss']
})
export class OutletSalesComponent implements OnInit {
  maxDate = WebUtils.getIsoDateString(new Date());

  @BlockUI('loading') loading: NgBlockUI;

  constructor() { }

  ngOnInit(): void {
  }

}
