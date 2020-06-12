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
import { TodoServiceService } from '../todo-service.service';

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
  styleUrls: ['./board.component.css'],
  providers: [ TodoServiceService ],
})
export class BoardComponent implements OnInit {
  isTaskFormVisible = false;
  showAddItem = false;
  itemForUpdate: ListItem = null;

  updatedList: ItemListType = null;

  draggedData: draggedDataType = null;

  toDoItemList: ItemListType;
  inProgressItemList: ItemListType;
  doneItemList: ItemListType;


  constructor(private todoService: TodoServiceService) {}

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe((results: any) => {
        this.toDoItemList = results.todo;
        this.inProgressItemList = results.inProgress;
        this.doneItemList = results.done;
      })
      
  }

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

  addNewTask(newTaskData, index:number | null = null) {
    let newTask: ListItem = {
      name: newTaskData.name,
      status: newTaskData.status,
      id: uuid()
    };

    if(index !== null) {
      this.updatedList.list.splice(index, 0, newTask);
    } else {
      this.updatedList.list.push(newTask);
    }

    this.hideTaskPopup();
    this.todoService
      .addToList(this.updatedList.id, newTask)
      .subscribe((response) => {
        debugger
      }, (err) => {
        debugger
      })
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
      this.todoService
        .updateTaskInList(this.updatedList.id, taskData.id, newTask)
        .subscribe((response) => {
          debugger
        }, (err) => {
          debugger
        })

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

      this.todoService
        .removeFromList(this.updatedList.id, deletableItem.id)
        .subscribe((response) => {
          debugger
        }, (err) => {
          debugger
        })
  }

  itemDragStarted(draggedItem:ListItem, fromList: ItemListType) {
    this.draggedData = {
      item: draggedItem,
      fromList: fromList
    }
  }

  itemDragOver(event:DragEvent) {
    event.preventDefault();
  }

  itemDrop(event:DragEvent, toList:ItemListType) {
    event.preventDefault();

    let fromList: ItemListType = this.draggedData.fromList;
    let item: ListItem = this.draggedData.item;

    if(!toList) {
      return;
    }

    //Detectie pe index pe lista
    let children: HTMLCollection = (event.currentTarget as HTMLElement).children;
    let index:number = 0;
    for(let i = 0; i < children.length; i++) {
      let child: Element = children[i];
      let clientRect = child.getBoundingClientRect();

      if(clientRect.y < event.clientY){
        index = i;
      }
    }

    let oldIndex = 0;

    if(fromList.id === toList.id) {
      oldIndex = this.getItemIndex(fromList, item);

      if(oldIndex < index) {
        index--;
      }
    }

    this.updatedList = fromList;
    this.deleteTask(item);

    this.updatedList = toList;
    this.addNewTask(item, index);

    this.updatedList = null;
  }

  getItemIndex(itemList:ItemListType, searchedItem:ListItem): number {
    let list: Array<ListItem> = itemList.list;

    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (item.id === searchedItem.id) {
        return i;
      }
    }

    return -1;
  }
}
