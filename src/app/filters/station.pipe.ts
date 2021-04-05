import { Pipe, PipeTransform } from '@angular/core';
import { Outlet } from 'app/models/station.model';

@Pipe({
  name: 'station'
})
export class StationPipe implements PipeTransform {

  transform(value: Outlet[], filterBy: string): Outlet[] {
    filterBy = filterBy ? filterBy.toLowerCase() : null;
    return filterBy ? value.filter((outlet: Outlet) =>
      outlet.name.toLowerCase().indexOf(filterBy) !== -1 ||
      outlet.phoneNumber.toLowerCase().indexOf(filterBy) !== -1 ||
      (<any>outlet).regionName.toLowerCase().indexOf(filterBy) !== -1 ||
      // outlet.location.toLowerCase().indexOf(filterBy) !== -1 ||
      outlet.address.toLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }


}
