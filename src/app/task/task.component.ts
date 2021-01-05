import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../model/task';
import { RemoveSelectDeleteTasks, SelectDeleteTasks } from '../store/actions/task.actions';
import { IAppState } from '../store/state/app.state';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task:Task;
  @Output()remove=new EventEmitter();
  @Output()edit: EventEmitter<any> = new EventEmitter();
  constructor(public store: Store<IAppState>) { }

  ngOnInit(): void {
  }
  change(event){
   event.checked? this.store.dispatch(new SelectDeleteTasks(this.task)):this.store.dispatch(new RemoveSelectDeleteTasks(this.task))
  }
  removeTask() {
   this.remove.emit(this.task);
  }
  edittask() {
   this.edit.emit(this.task);
  }
}
