import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditDataDialogComponent } from './edit-data-dialog/edit-data-dialog.component';
import { Task } from './model/task';
import { HttpClient } from '@angular/common/http';
import { filter, take, map } from 'rxjs/operators';
import { IAppState } from './store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectTaskList } from 'src/app/store/selectors/task.selectors';
import { GetTasks, GetTasksSuccess, GetTask, GetTaskSuccess, DeleteTask, EditTask, DeleteTasks, } from './store/actions/task.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Tasks: Task[];
  etask: Task;
  search: string;
  fg: FormGroup;
  title = 'todo';
  //todo
  //переписать все на диспатчи

  constructor(
    public store: Store<IAppState>,
    public dialog: MatDialog,
    public fb: FormBuilder,
  ) {

    this.fg = fb.group({
      search: [''],
      Select: ['']
    });
    this.fg.get('search').valueChanges.subscribe((value) => {
      this.search = value;
    });
    this.store.dispatch(new GetTasks());
  }
  onChange() {
    this.getDataFromJSONplaceholder();
  }
  removeTask(task: Task) {
    this.store.dispatch(new DeleteTask(task.id));
  }
  editTask(task: Task) {
    this.store.dispatch(new EditTask(task))
    this.openDialog();
  }
  removealldata() {
    this.store.dispatch(new DeleteTasks());
  }

  getDataFromJSONplaceholder() {
    this.store.pipe(select(selectTaskList))
      .subscribe(
        (tasks: Task[]) => {
          this.Tasks = tasks?.filter((value, index) => {
            return this.fg.get('Select').value ? index < this.fg.get('Select').value : 10
          }
          )
        }
      );
  }

  openDialog() {
    this.dialog.open(EditDataDialogComponent, {
      width: '400px',
      data: this.etask ? this.etask : new Task()
    })
      .afterClosed()
      .subscribe(result => {
        if (result && result.id) {
          this.Tasks = this.Tasks.filter((task) => task.id != result.id);
          this.Tasks.push(result);
        } else if (result) {
          this.Tasks.push(new Task({
            id: this.Tasks.length + 1,
            title: result.title,
            description: result.description,
            addingshit: result.addingshit,
          }));
        }
        this.etask = null;
      });
  }
}
