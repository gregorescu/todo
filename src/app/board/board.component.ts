import { Component, OnInit } from '@angular/core';
import { ListItem, ListItemStatus } from '../types/list-item';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  isTaskFormVisible = false;
  showAddItem = false;
  itemForUpdate: ListItem = null;

  toDoItemList: Array<ListItem> = [
    {
      name: "Invata Angular",
      status: ListItemStatus.IN_PROGRESS,
      id: uuid()
    },{
      name: "Alex invata pentru facultate",
      status: ListItemStatus.TO_DO,
      id: uuid()
    },{
      name: "Mircea primeste o marire de salar",
      status: ListItemStatus.DONE,
      id: uuid()
    },{
      name: "Rezolva bug-urile de pe OTO_CUR",
      status: ListItemStatus.TO_DO,
      id: uuid()
    },{
      name: "Fa-i evaluarea Paulinei",
      status: ListItemStatus.BLOCKED,
      id: uuid()
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  showUpdatePopup(item:ListItem) {
    this.itemForUpdate = item;
    this.showAddItem = false;
    this.isTaskFormVisible = true;
  }

  showTaskPopup() {
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

    this.toDoItemList.push(newTask);
    this.hideTaskPopup();
  }

  updateTask(taskData) {
    let newTask: ListItem = {
      name: taskData.name,
      status: taskData.status,
      id: taskData.id
    };

    for(let i = 0; i < this.toDoItemList.length; i++) {
      let item = this.toDoItemList[i];
      if(item.id === taskData.id) {
        this.toDoItemList.splice(i, 1, newTask);
      }
    }

    this.hideTaskPopup();
  }

  deleteTask(deletableItem: ListItem) {
    for(let i = 0; i < this.toDoItemList.length; i++) {
      let item = this.toDoItemList[i];
      if(item.id === deletableItem.id) {
        this.toDoItemList.splice(i, 1);
      }
    }
    this.hideTaskPopup();
  }
}
