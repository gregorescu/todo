import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StatusItemList, StatusItem } from '../types/list-item';
import { ListItem, ListItemStatus } from '../models/todo.model';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit {
  @Input() addItem:boolean = false;
  @Input() itemForUpdate:ListItem = null;

  @Output() close = new EventEmitter();
  @Output() addNewTask = new EventEmitter<{name: string, status: ListItemStatus}>();  
  @Output() updateTask = new EventEmitter<{name: string, status: ListItemStatus, id: string}>();  
  @Output() deleteTask = new EventEmitter<ListItem>();
  
  name:FormControl = new FormControl('');
  status:FormControl = new FormControl('');
  statusList:Array<StatusItem> = StatusItemList;


  constructor() { 
  }

  ngOnInit(): void {
    if(this.itemForUpdate && !this.addItem) {
      this.name.setValue(this.itemForUpdate.name);
      this.status.setValue(this.itemForUpdate.status);
    }
  }

  submit() {
    let name:string = this.name.value;
    let status:ListItemStatus = this.status.value;

    if(!name || name.length < 3) {
      alert("Insert a task name longer than 3 characters");
      return;
    }

    if(!status) {
      alert("Select a status for your task");
      return;
    }

    this.addNewTask.emit({name, status});
  }

  update() {
    let name:string = this.name.value;
    let status:ListItemStatus = this.status.value;

    if(!name || name.length < 3) {
      alert("Insert a task name longer than 3 characters");
      return;
    }

    if(!status) {
      alert("Select a status for your task");
      return;
    }

    this.updateTask.emit({name, status, id: this.itemForUpdate.id});
  }

  delete() {
    this.deleteTask.emit(this.itemForUpdate);
  }

  backgroundClicked() {
    this.close.emit();
  }
}
