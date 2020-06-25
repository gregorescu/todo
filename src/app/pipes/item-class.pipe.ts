import { Pipe, PipeTransform } from '@angular/core';
import { ListItemStatus } from '../models/todo.model';

@Pipe({
  name: 'itemClass'
})
export class ItemClassPipe implements PipeTransform {
  transform(value: ListItemStatus): string {
    let result:string = "";
    switch(value) {
      case ListItemStatus.TO_DO:
        result = "list-item--todo";
        break;
      case ListItemStatus.IN_PROGRESS:
        result = "list-item--inprogress";
        break;
      case ListItemStatus.DONE:
        result = "list-item--done";
        break;
      case ListItemStatus.BLOCKED:
        result = "list-item--blocked";
        break;
    }

    return result;
  }
}
