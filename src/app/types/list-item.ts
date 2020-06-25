import { ListItemStatus } from '../models/todo.model';

export type StatusItem = {
  name: string,
  status: ListItemStatus | string
}

var _statusItemList: Array<StatusItem> = [];
for(let key in ListItemStatus) {
  _statusItemList.push({
    name: ListItemStatus[key],
    status: key
  })
}
export const StatusItemList = _statusItemList;


