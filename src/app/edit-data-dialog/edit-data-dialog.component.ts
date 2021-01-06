import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../model/task';
import { select, Store } from '@ngrx/store';
import { selectEditTask, selectLenghtTask } from '../store/selectors/task.selectors';
import { IAppState } from '../store/state/app.state';
import { take, takeUntil } from 'rxjs/operators';
import * as action from "../store/actions/task.actions";

@Component({
  selector: 'app-edit-data-dialog',
  templateUrl: './edit-data-dialog.component.html',
  styleUrls: ['./edit-data-dialog.component.css']
})
export class EditDataDialogComponent implements OnInit, OnDestroy {
  taskFb: FormGroup;
  butt: MatButton;
  taskForStore:Task;
  tasksLenght:number;


  patternForSymbol="^[a-zA-Z0-9_]+$";

  private asdasdasd = new EventEmitter();

  get formarray() { return this.taskFb.get('inputs') as FormArray; }
  get formGrouparray() { return this.taskFb.get('groupArray') as FormArray; }
  get isValid() { return this.formGrouparray.controls; }

  
  constructor(
    public store: Store<IAppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Task
  ) {}

  ngOnInit(): void {
    this.store.pipe(
      select(selectLenghtTask),
      take(1)
    ).subscribe((length:number)=>{
      this.tasksLenght=length;
    })


    this.store.pipe(
      select(selectEditTask),
      takeUntil(this.asdasdasd)
    )
    .subscribe((task: Task) => {
      this.taskForStore=task
      this.createForm();
      this.setForm()

    });    


  }

  ngOnDestroy() {
    this.asdasdasd.emit(true);
  }

  createForm() {
    this.taskFb = this.fb.group({
      editTitleTask: [this.taskForStore ? this.taskForStore.title : '', 
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40)
        ]],
      editDescriptionTask: [this.taskForStore ? this.taskForStore.description : '',
       [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]],
      inputs: this.fb.array([]),
      groupArray: this.fb.array([]),
    });
  }

  // todo
  setForm(){
    
    for (const input of this.data.addingshit) {
      this.formGrouparray.push(this.fb.group({
        first:new FormControl(
          input['first'],
           [
             Validators.required,
             Validators.minLength(2),
             Validators.pattern(this.patternForSymbol)
           ]),
        second:new FormControl(
          input['second'],
           [
             Validators.required,
             Validators.minLength(2),
             Validators.pattern(this.patternForSymbol)
           ])
      }))
    }
  }


  delInput(index){
    this.formGrouparray.removeAt(index)
  }


  addGroupInput() {
    this.formGrouparray.push(this.fb.group({
      first:new FormControl('', Validators.required),
      second:new FormControl('', Validators.required)
    }));
  }

  // todo
  onClick(): void {
    if (this.taskFb.get('editTitleTask').valid && this.taskFb.get('editDescriptionTask').valid) {
      const asd=
        {
          id:this.data.id,
          title : this.taskFb.value['editTitleTask'],
          description : this.taskFb.value['editDescriptionTask'],
          addingshit:this.taskFb.value['groupArray'], 
        }
      console.log(asd);
      this.dialogRef.close(asd);
      if (asd && asd.id) {
        this.store.dispatch(action.editTask({ task: this.taskForStore }));
      } else if (this.taskForStore) {
        this.store.dispatch(action.addTask(
          {
            task: new Task({
              id: this.tasksLenght ? this.tasksLenght + 1 : 1,
              title: asd.title,
              description: asd.description,
              addingshit: asd.addingshit,
            })
          }
        ));
      }
    }



  
  }


}