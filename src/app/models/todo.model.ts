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

export default class Todo {
  name: string;
  status: ListItemStatus;
  id: string;

  constructor() {
    this.name = "";
    this.status = ListItemStatus.TO_DO;
    this.id = "";
  }

  static generateMockTodo(): Todo {
    return {
      id: "new",
      name: "",
      status: ListItemStatus.TO_DO
    }
  }
}
