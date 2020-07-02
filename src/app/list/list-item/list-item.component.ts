import { Component, OnInit, Input } from '@angular/core';
import { ListItem } from 'src/app/models/todo.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})


export class ListItemComponent implements OnInit {
  @Input() model:ListItem;

  constructor() { }

  ngOnInit(): void {
  }

}
