import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListItem } from '../models/todo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() items: Array<ListItem>;
  @Input() name: string;
  @Output() showTaskPopup = new EventEmitter();
  @Output() showUpdatePopup = new EventEmitter<ListItem>();
  @Output() dragStart = new EventEmitter<ListItem>();

  constructor() { }

  ngOnInit(): void {
  }

  showAddTaskPopup() {
    this.showTaskPopup.emit("");
  }

  showEditItem(item:ListItem) {
    this.showUpdatePopup.emit(item);
  }

  itemDragStart(item:ListItem) {
    this.dragStart.emit(item);
  }
}
