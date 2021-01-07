import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Task} from './model/task';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectTaskList} from 'src/app/store/selectors/task.selectors';
import * as action from './store/actions/task.actions';
import {EditDataDialogService} from './edit-data-dialog/edit-data-dialog.service';
import {IAppState} from './store/reducers/task.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EditDataDialogService]
})
export class AppComponent implements OnInit {
  private unsubscribe = new EventEmitter();

  Tasks: Task[];
  search: string;
  formGroup: FormGroup;
  title = 'todo';


  constructor(
    public store: Store<IAppState>,
    public formBuilder: FormBuilder,
    public editDataDialogService: EditDataDialogService
  ) {

    this.formGroup = formBuilder.group({
      search: [''],
      Select: ['']
    });
    this.formGroup.get('search')
      .valueChanges
      .subscribe((value) => {
        this.search = value;
      });
    this.store.dispatch(action.getTasks());

  }

  ngOnInit(): void {
    this.getTaskFromStore();
  }


  getTaskFromStore(): void{
    this.store.pipe(
      select(selectTaskList),
      takeUntil(this.unsubscribe)
    )
      .subscribe((tasks: Task[]) => {
        this.Tasks = tasks?.filter((value, index) => {
          return this.formGroup.get('Select').value ? index < this.formGroup.get('Select').value : 10;
        });
      });
  }

  selectTasks(): void{
    this.getTaskFromStore();
  }

  removeSelectData(): void{
    this.Tasks = this.Tasks.filter(val => !val.checked);
    this.store.dispatch(action.removeSelectTasks());
  }
}
