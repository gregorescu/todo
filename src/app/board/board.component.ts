import {
  Component,
  OnInit
} from '@angular/core';
import {
  ListItem,
  ListItemStatus
} from '../types/list-item';
import {
  v4 as uuid
} from 'uuid';

export type ItemListType = {
  id: string,
  list: Array < ListItem >
};

export type draggedDataType = {
  item: ListItem,
  fromList: ItemListType
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  isTaskFormVisible = false;
  showAddItem = false;
  itemForUpdate: ListItem = null;

  updatedList: ItemListType = null;

  draggedData: draggedDataType = null;


  toDoItemList: ItemListType = {
    id: uuid(),
    list: [{
      name: "Invata Angular",
      status: ListItemStatus.IN_PROGRESS,
      id: uuid()
    },{
      name: "Rezolva bug-urile de pe",
      status: ListItemStatus.TO_DO,
      id: uuid()
    }, {
      name: "Fa-i evaluarea lui x-ulescu",
      status: ListItemStatus.BLOCKED,
      id: uuid()
    }]
  }

  inProgressItemList: ItemListType = {
    id: uuid(),
    list: [{
      name: "Invata Angular",
      status: ListItemStatus.IN_PROGRESS,
      id: uuid()
    }, {
      name: "Cleopatra invata pentru facultate",
      status: ListItemStatus.TO_DO,
      id: uuid()
    }]
  }

  doneItemList: ItemListType = {
    id: uuid(),
    list: [{
      name: "Marcus Aurelius primeste o marire de salar",
      status: ListItemStatus.DONE,
      id: uuid()
    }, {
      name: "Rezolva bug-urile",
      status: ListItemStatus.TO_DO,
      id: uuid()
    }, {
      name: "Fa-i evaluarea",
      status: ListItemStatus.BLOCKED,
      id: uuid()
    }]
  }


  constructor() {}

  ngOnInit(): void {}

  showUpdatePopup(item: ListItem, updatedList: ItemListType) {
    this.updatedList = updatedList;
    this.itemForUpdate = item;
    this.showAddItem = false;
    this.isTaskFormVisible = true;
  }

  showTaskPopup(updatedList: ItemListType) {
    this.updatedList = updatedList;
    this.showAddItem = true;
    this.itemForUpdate = null;
    this.isTaskFormVisible = true;
  }

  hideTaskPopup() {
    this.isTaskFormVisible = false;
  }

  addNewTask(newTaskData) {
    let newTask: ListItem = {
      name: newTaskData.name,
      status: newTaskData.status,
      id: uuid()
    };

    this.updatedList.list.push(newTask);

    this.hideTaskPopup();
  }

  updateTask(taskData) {
    let newTask: ListItem = {
      name: taskData.name,
      status: taskData.status,
      id: taskData.id
    };

    let list: Array<ListItem> = this.updatedList.list;
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (item.id === taskData.id) {
        list.splice(i, 1, newTask);
      }
    }

    this.hideTaskPopup();
  }

  deleteTask(deletableItem: ListItem) {
    let list: Array<ListItem> = this.updatedList.list;
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (item.id === deletableItem.id) {
        list.splice(i, 1);
      }
    }
    this.hideTaskPopup();
  }

  itemDragStarted(draggedItem:ListItem, fromList: ItemListType) {
    this.draggedData = {
      item: draggedItem,
      fromList: fromList
    }
  }

  itemDragOver(event) {
    event.preventDefault();
  }

  itemDrop(event, toList:ItemListType) {
    event.preventDefault();

    let fromList: ItemListType = this.draggedData.fromList;
    let item: ListItem = this.draggedData.item;

    if(!toList) {
      return;
    }

    if(fromList.id === toList.id) {
      return;
    }

    this.updatedList = fromList;
    this.deleteTask(item);

    this.updatedList = toList;
    this.addNewTask(item);

    this.updatedList = null;
  }
}
