import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditDataDialogComponent } from './edit-data-dialog/edit-data-dialog.component';
import { Task } from './model/task';
import { HttpClient } from '@angular/common/http';
import { filter, take, map, takeUntil } from 'rxjs/operators';
import { IAppState } from './store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectTaskList } from 'src/app/store/selectors/task.selectors';
import * as action from "./store/actions/task.actions";
import { EditDataDialogService } from './edit-data-dialog/edit-data-dialog.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EditDataDialogService]
})
export class AppComponent implements OnInit {
  private asdasdasd = new EventEmitter();

  Tasks: Task[];
  etask: Task;
  search: string;
  fg: FormGroup;
  title = 'todo';
 

  constructor(
    public store: Store<IAppState>,
    public fb: FormBuilder,
    public editDataDialogService: EditDataDialogService
  ) {

    this.fg = fb.group({
      search: [''],
      Select: ['']
    });
    this.fg.get('search')
    .valueChanges
    .subscribe((value) => {
      this.search = value;
    });
    this.store.dispatch(action.getTasks());

  }
  ngOnInit(): void {
    this.getDataFromStore();
  }


  getDataFromStore() {
    this.store.pipe(
      select(selectTaskList),
      takeUntil(this.asdasdasd)
    )
    .subscribe((tasks: Task[]) => {
        this.Tasks = tasks?.filter((value, index) => {
          return this.fg.get('Select').value ? index < this.fg.get('Select').value : 10
        })
    });
  }

  onChange() {
    this.getDataFromStore();
  }

  editTask() {
    this.editDataDialogService.open()
  }

  removealldata() {
    this.Tasks = this.Tasks.filter(val => !val.checked);
    this.store.dispatch(action.removeSelectTasks());
  }
}
