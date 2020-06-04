import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListItem } from '../types/list-item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() items: Array<ListItem>;
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
    console.log("click")
    this.showUpdatePopup.emit(item);
  }

  itemDragStart(item:ListItem) {
    this.dragStart.emit(item);
  }
}
