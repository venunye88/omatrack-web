import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountGroup'
})
export class AccountGroupPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
