import { Pipe, PipeTransform } from '@angular/core';
import { Account } from 'app/models/account.model';

@Pipe({
  name: 'account'
})
export class AccountPipe implements PipeTransform {

  transform(value: Account[], filterBy: string): Account[] {
    filterBy = filterBy ? filterBy.toLowerCase() : null;
    return filterBy ? value.filter((account: Account) =>
      account.name.toLowerCase().indexOf(filterBy) !== -1 ||
      (<any>account)?.stationName.toLowerCase().indexOf(filterBy) !== -1 ||
      (<any>account)?.accountGroupName.toLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}
