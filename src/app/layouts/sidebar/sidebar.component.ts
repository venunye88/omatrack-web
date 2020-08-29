import { Component, OnInit } from '@angular/core';
import { AppRouteNames, Privileges } from 'app/shared/config-keys';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: MenuInfo[];
  constructor() {
    this.menuItems = DROPDOWNROUTES.filter(menuItem => menuItem);
  }

  ngOnInit(): void {
  }

}



declare interface MenuInfo {
  route: string;
  title: string;
  icon: string;
  privilege: string;
  subMenus: MenuInfo[];
}

export const DROPDOWNROUTES: MenuInfo[] = [
  { title: "Dashboard", icon: "fas fa-tachometer-alt", route: "/dashboard", privilege: Privileges.Dashboard, subMenus: [] },
  // {
  //   title: "Station Operations", icon: "fas fa-file-invoice-dollar", route: "#",
  //   privilege: Privileges.Administration,
  //   subMenus: [
  //     { title: "Sales", icon: "fas fa-hand-holding-usd", route: "/stationmgt/stations", privilege: Privileges.StationRead, subMenus: [] },
  //     { title: "Product Recieved", icon: "fas fa-money-check-alt", route: "/stationmgt/pricegroups", privilege: Privileges.PriceGroupRead, subMenus: [] },
  //     { title: "Journal Voucher", icon: "fas fa-receipt", route: "/stationmgt/pricegroups", privilege: Privileges.PriceGroupRead, subMenus: [] },
  //     { title: "Reversal", icon: "fas fa-funnel-dollar", route: "/stationmgt/pricegroups", privilege: Privileges.PriceGroupRead, subMenus: [] },
  //     { title: "Stock Transfer", icon: "fas fa-exchange-alt", route: "/stationmgt/pricegroups", privilege: Privileges.PriceGroupRead, subMenus: [] },
  //   ]
  // },
  {
    title: "Station Mgt", icon: "fas fa-store-alt", route: "#",
    privilege: Privileges.Administration,
    subMenus: [
      { title: "Product Received", icon: "fas fa-hand-holding-water", route: "/productreceived/transaction", privilege: Privileges.ProductReceivedRead, subMenus: [] },
      { title: "Stations", icon: "fa fa-gas-pump", route: "/stationmgt/stations", privilege: Privileges.StationRead, subMenus: [] },
      { title: "Price Groups", icon: "fa fa-tags", route: "/stationmgt/pricegroups", privilege: Privileges.PriceGroupRead, subMenus: [] },
    ]
  },
  {
    title: "Settings", icon: "fas fa-cogs", route: "/settings",
    privilege: Privileges.Setting,
    subMenus: []
  },
  {
    title: "Reports", icon: "fas fa-chart-bar", route: "/settings",
    privilege: Privileges.Report,
    subMenus: []
  },
  {
    title: "Admin", icon: "fas fa-user-cog", route: "#",
    privilege: Privileges.Administration,
    subMenus: [
      { title: "Configure Roles", icon: "fas fa-user-shield", route: "/admin/roles", privilege: Privileges.RoleRead, subMenus: [] },
      { title: "Manage Users", icon: "fa fa-users", route: "/admin/users", privilege: Privileges.UserRead, subMenus: [] },
    ]
  },

  {
    title: "Form", icon: "fa fa-bars", route: "#", privilege: Privileges.Administration, subMenus: [
      { title: "Form Child 1", icon: "fa fa-home", route: "/forms", privilege: Privileges.Administration, subMenus: [] },
      { title: "Form Child 2", icon: "fa fa-home", route: "/ui-elements", privilege: Privileges.Administration, subMenus: [] }
    ]
  },
  { title: "UI Elements", icon: "fa fa-edit", route: "/ui-elements", privilege: Privileges.Administration, subMenus: [] },
];
