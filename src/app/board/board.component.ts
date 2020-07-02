import {
  Component,
  OnInit
} from '@angular/core';
import {
  ListItem,
  ListItemStatus
} from '../models/todo.model';
import {
  v4 as uuid
} from 'uuid';
import {
  TodoServiceService
} from '../todo-service.service';
import {
  Store, select
} from '@ngrx/store';
import {
  TodoListState
} from '../stores/board/todo.state';
import {
  Observable
} from 'rxjs';
import * as TodoAction from '../stores/board/todo.action';
import * as ListAction from '../stores/list/list.action';
import { ListState } from '../stores/list/list.state';
import { getBoardState } from '../selectors/board';

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
  providers: [TodoServiceService],
})
export class BoardComponent implements OnInit {
  isTaskFormVisible = false;
  showAddItem = false;
  itemForUpdate: ListItem = null;

  updatedList: ItemListType = null;

  draggedData: draggedDataType = null;

  // toDoItemList: ItemListType;
  // inProgressItemList: ItemListType;
  // doneItemList: ItemListType;

  todoListState$: Observable < TodoListState[] > ;

  constructor(private todoService: TodoServiceService, private store: Store < TodoListState[] >) {}

  ngOnInit(): void {
    this.todoListState$ = this.store.select(state => {
      let newState = state.lists.loaded ? state.lists : state.board; 
      
      return newState;
    });
    this.store.dispatch(TodoAction.GET_TODO_LISTS());
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

  addNewTask(newTaskData, index: number | null = null) {
    let board = this.store.pipe(select(getBoardState));
    board.subscribe((result) => {
      this.store.dispatch(ListAction.CREATE_TODO({todoData: newTaskData, listId: this.updatedList.id, index: index, oldLists: result.lists }));
    })

    this.hideTaskPopup();
  }

  updateTask(taskData) {
    this.store.dispatch(ListAction.UPDATE_TODO({
      name: taskData.name,
      status: taskData.status,
      id: taskData.id
    }, this.updatedList.id));

    this.hideTaskPopup();
  }

  deleteTask(deletableItem: ListItem) {
    this.store.dispatch(ListAction.DELETE_TODO(deletableItem.id, this.updatedList.id));

    this.hideTaskPopup();
  }

  itemDragStarted(draggedItem: ListItem, fromList: ItemListType) {
    this.draggedData = {
      item: draggedItem,
      fromList: fromList
    }
  }

  itemDragOver(event: DragEvent) {
    event.preventDefault();
  }

  itemDrop(event: DragEvent, toList: ItemListType) {
    event.preventDefault();

    let fromList: ItemListType = this.draggedData.fromList;
    let item: ListItem = this.draggedData.item;

    if (!toList) {
      return;
    }

    //Detectie pe index pe lista
    let children: HTMLCollection = (event.currentTarget as HTMLElement).children;
    let index: number = 0;
    for (let i = 0; i < children.length; i++) {
      let child: Element = children[i];
      let clientRect = child.getBoundingClientRect();

      if (clientRect.y < event.clientY) {
        index = i;
      }
    }

    let oldIndex = 0;

    if (fromList.id === toList.id) {
      oldIndex = this.getItemIndex(fromList, item);

      if (oldIndex < index) {
        index--;
      }
    }

    this.updatedList = fromList;
    this.deleteTask(item);

    this.updatedList = toList;
    this.addNewTask(item, index);

    this.updatedList = null;
  }

  getItemIndex(itemList: ItemListType, searchedItem: ListItem): number {
    let list: Array < ListItem > = itemList.list;

    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (item.id === searchedItem.id) {
        return i;
      }
    }

    return -1;
  }
}
