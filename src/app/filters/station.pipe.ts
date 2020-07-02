import { Pipe, PipeTransform } from '@angular/core';
import { Station } from 'app/models/station.model';

@Pipe({
  name: 'station'
})
export class StationPipe implements PipeTransform {

  transform(value: Station[], filterBy: string): Station[] {
    filterBy = filterBy ? filterBy.toLowerCase() : null;
    return filterBy ? value.filter((station: Station) =>
      station.name.toLowerCase().indexOf(filterBy) !== -1 ||
      station.phoneNumber.toLowerCase().indexOf(filterBy) !== -1 ||
      station.location.toLowerCase().indexOf(filterBy) !== -1 ||
      station.address.toLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }


}
