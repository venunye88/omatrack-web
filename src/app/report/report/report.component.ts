import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';
import { findWhere, sortBy } from "underscore";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  selectedModelId: any;
  models: SetUpModel[];

  constructor(private router: Router) { this.models = sortBy(SetUps, 'name'); }


  ngOnInit(): void {
  }

  openSetUp(modelName: string) {
    if (modelName) {
      const model = <SetUpModel>findWhere(SetUps, { name: modelName });
      this.router.navigate([model.route]);
    }
  }

}

declare interface SetUpModel {
  label: string;
  name: string;
  route: string;
}

export const SetUps: SetUpModel[] = [
  { label: 'Transaction', name: "trans", route: `/${AppRouteNames.Reports}/${AppRouteNames.Transaction}` },
  // { label: 'Products', name: "product", route: `/${AppRouteNames.Settings}/${AppRouteNames.Product}` },
  // { label: 'Regions', name: "region", route: `/${AppRouteNames.Settings}/${AppRouteNames.Region}` },
]