import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';
import { findWhere, sortBy } from "underscore";

declare interface SetUpModel {
  label: string;
  name: string;
  route: string;
}

export const SetUps: SetUpModel[] = [
  { label: 'Account Group', name: "accountgroup", route: `/${AppRouteNames.Settings}/${AppRouteNames.AccountGroup}` },
  { label: 'Account', name: "account", route: `/${AppRouteNames.Settings}/${AppRouteNames.Account}` },
  { label: 'Fuel Product', name: "fuelproduct", route: `/${AppRouteNames.Settings}/${AppRouteNames.FuelProduct}` },
  { label: 'Region', name: "region", route: `/${AppRouteNames.Settings}/${AppRouteNames.Region}` },
  { label: 'Financial Year', name: "financialyear", route: `/${AppRouteNames.Settings}/${AppRouteNames.FinancialYear}` }
]


@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss']
})
export class SettingPageComponent implements OnInit {
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
