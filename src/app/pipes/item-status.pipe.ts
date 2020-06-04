import { Pipe, PipeTransform } from '@angular/core';
import { ListItemStatus } from '../types/list-item';

@Pipe({
  name: 'itemStatus'
})


export class ItemStatusPipe implements PipeTransform {

  transform(value: ListItemStatus): string {
    let result:string = "";
    switch(value) {
      case ListItemStatus.TO_DO:
        result = ListItemStatus.TO_DO;
        break;
      case ListItemStatus.IN_PROGRESS:
        result = ListItemStatus.IN_PROGRESS;
        break;
      case ListItemStatus.DONE:
        result = ListItemStatus.DONE;
        break;
      case ListItemStatus.BLOCKED:
        result = ListItemStatus.BLOCKED;
        break;
    }

    return result;
  }

}
