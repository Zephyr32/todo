import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Task } from '../model/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() search:string;
  @Input() Tasks:Task[];
  @Output() edit: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
 
}
