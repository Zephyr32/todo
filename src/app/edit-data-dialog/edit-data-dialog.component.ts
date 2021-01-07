import { Component, EventEmitter, Inject, OnDestroy, OnInit, } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../model/task';
import { select, Store } from '@ngrx/store';
import { selectEditTask, selectLengthTask } from '../store/selectors/task.selectors';
import { take, takeUntil } from 'rxjs/operators';
import * as action from '../store/actions/task.actions';
import {IAppState} from '../store/reducers/task.reducer';

@Component({
  selector: 'app-edit-data-dialog',
  templateUrl: './edit-data-dialog.component.html',
  styleUrls: ['./edit-data-dialog.component.css']
})
export class EditDataDialogComponent implements OnInit, OnDestroy {
  taskFormGroup: FormGroup;
  butt: MatButton;
  taskFromStore: Task;
  tasksLength: number;


  patternForSymbol = '^[a-zA-Z0-9_ ]+$';
  validationMessage = {
    minLength : 'поле должно содержать минимум 2 символа',
    required : 'поле должно быть заполнено',
    pattern : 'введены неразрешенные символы'
  };

  private unSubscriber = new EventEmitter();

  get formArray(): FormArray { return this.taskFormGroup.get('inputs') as FormArray; }
  get formGroupArray(): FormArray { return this.taskFormGroup.get('groupArray') as FormArray; }
  get isValid(): AbstractControl[] { return this.formGroupArray.controls; }
  get controlTitle(): AbstractControl { return this.taskFormGroup.get('editTitleTask') as FormControl; }
  get controlDescription(): AbstractControl { return this.taskFormGroup.get('editDescriptionTask') as FormControl; }

  constructor(
    public store: Store<IAppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Task
  ) {}

  ngOnInit(): void {
    this.store.pipe(
      select(selectLengthTask),
      take(1)
    ).subscribe((length: number) => {
      this.tasksLength = length;
    });


    this.store.pipe(
      select(selectEditTask),
      takeUntil(this.unSubscriber)
    )
    .subscribe((task: Task) => {
      this.taskFromStore = task;
      this.createForm();
      if (this.taskFromStore) {
      this.setForm();
      }

    });


  }

  ngOnDestroy(): void {
    this.unSubscriber.emit(true);
  }

  createForm(): void {
    this.taskFormGroup = this.formBuilder.group({
      editTitleTask: [this.taskFromStore ? this.taskFromStore.title : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.pattern(this.patternForSymbol)
        ]],
      editDescriptionTask: [this.taskFromStore ? this.taskFromStore.description : '',
       [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
         Validators.pattern(this.patternForSymbol)
        ]],
      inputs: this.formBuilder.array([]),
      groupArray: this.formBuilder.array([]),
    });
    console.log(this.taskFormGroup);
  }


  setForm(): void{
    for (const input of this.taskFromStore.addingShit) {
      this.formGroupArray.push(this.formBuilder.group({
        firstControl: new FormControl(
          input.firstControl,
           [
             Validators.required,
             Validators.minLength(2),
             Validators.pattern(this.patternForSymbol)
           ]),
        secondControl: new FormControl(
          input.secondControl,
           [
             Validators.required,
             Validators.minLength(2),
             Validators.pattern(this.patternForSymbol)
           ])
      }));
    }
  }


  deleteInput(index: number): void{
    this.formGroupArray.removeAt(index);
  }


  addGroupInput(): void {
    this.formGroupArray.push(this.formBuilder.group({
      firstControl: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(this.patternForSymbol)
      ]),
      secondControl: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(this.patternForSymbol)
      ])
    }));
  }

  finishDialog(): void {
    if (this.taskFormGroup.get('editTitleTask').valid && this.taskFormGroup.get('editDescriptionTask').valid) {
      const newTask: Task = new Task( {
          id : this.taskFromStore ? this.taskFromStore.id : this.tasksLength + 1,
          title : this.taskFormGroup.value.editTitleTask,
          description : this.taskFormGroup.value.editDescriptionTask,
          addingShit : this.taskFormGroup.value.groupArray,
          checked:  this.taskFromStore ? this.taskFromStore.checked : false,
        });
      if (this.taskFromStore && this.taskFromStore.id) {
        this.store.dispatch(action.editTask({ task: newTask }));
      } else {
        this.store.dispatch(action.addTask({ task: newTask }
        ));
      }
      this.dialogRef.close();
    }




  }


}
