import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Task } from '../model/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task:Task;
  @Output()remove=new EventEmitter();
  @Output()edit: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  removeTask() {
   this.remove.emit(this.task);
  }
  edittask() {
   this.edit.emit(this.task);
  }
}
