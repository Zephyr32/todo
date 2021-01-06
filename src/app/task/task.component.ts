import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../model/task';
import { IAppState } from '../store/state/app.state';
import * as action from"../store/actions/task.actions";
import { EditDataDialogService } from '../edit-data-dialog/edit-data-dialog.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [EditDataDialogService]
})
export class TaskComponent implements OnInit {

  @Input() task:Task;
  @Output()edit: EventEmitter<any> = new EventEmitter();
  constructor(private editDataDialogService:EditDataDialogService,public store: Store<IAppState>) { }

  ngOnInit(): void {
  }
  
  removeTask() {
   this.store.dispatch(action.removeTask({id:this.task.id}));
  }
  edittask() {
   this.store.dispatch(action.getEditTaskId({id:this.task.id}));

   this.editDataDialogService.open()
  }
  check(){
    this.store.dispatch(action.editTask({
      task: new Task({
        id:this.task.id,
        title:this.task.title,
        description:this.task.description,
        checked:!this.task.checked,
        addingshit:this.task.addingshit
      })
    }));
  }
}
