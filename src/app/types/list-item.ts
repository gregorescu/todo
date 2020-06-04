export type ListItem = {
  name: string,
  status: ListItemStatus,
  id: string
}

export enum ListItemStatus {
  DONE = "Done",
  IN_PROGRESS = "In Progress",
  TO_DO = "To Do",
  BLOCKED = "Blocked"
}

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


