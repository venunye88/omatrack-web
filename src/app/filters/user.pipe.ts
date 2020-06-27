import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'app/auth/auth.models';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(value: User[], filterBy: string): User[] {
    filterBy = filterBy ? filterBy.toLowerCase() : null;
    return filterBy ? value.filter((user: User) =>
      user.name.toLowerCase().indexOf(filterBy) !== -1 ||
      user.phoneNumber.toLowerCase().indexOf(filterBy) !== -1 ||
      user.username.toLowerCase().indexOf(filterBy) !== -1 ||
      (<any>user)?.stationName.toLowerCase().indexOf(filterBy) !== -1 ||
      (<any>user)?.profileName.toLowerCase().indexOf(filterBy) !== -1 ||
      user.type.toLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

