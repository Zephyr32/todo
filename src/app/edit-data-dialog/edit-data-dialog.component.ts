import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../model/task';

@Component({
  selector: 'app-edit-data-dialog',
  templateUrl: './edit-data-dialog.component.html',
  styleUrls: ['./edit-data-dialog.component.css']
})
export class EditDataDialogComponent implements OnInit {
  taskFb: FormGroup;
  butt: MatButton;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Task
  ) {
    
  }
  delInput(index){
      this.formGrouparray.removeAt(index)
  }
  addInput() {
    this.formarray.push(new FormControl('', Validators.required));
  }
  addGroupInput() {
    this.formGrouparray.push(this.fb.group({
      first:new FormControl('', Validators.required),
      second:new FormControl('', Validators.required)
    }));
  }
  get formarray() { return this.taskFb.get('inputs') as FormArray; }
  get formGrouparray() { return this.taskFb.get('groupArray') as FormArray; }
  get isValid() { return this.formGrouparray.controls; }
  onClick(): void {
    if (this.taskFb.get('editTitleTask').valid && this.taskFb.get('editDescriptionTask').valid) {
      this.data.title = this.taskFb.value['editTitleTask'];
      this.data.description = this.taskFb.value['editDescriptionTask'];
      this.data.addingshit.splice(0, this.data.addingshit.length);
      Array.prototype.push.apply(this.data.addingshit, this.taskFb.value['groupArray']);
      console.log(this.data.addingshit);
      this.taskFb.reset();
      this.dialogRef.close(this.data);

    }

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.taskFb = this.fb.group({
      editTitleTask: [this.data ? this.data.title : '', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      editDescriptionTask: [this.data ? this.data.description : '', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      inputs: this.fb.array([]),
      groupArray: this.fb.array([
        // this.fb.group({
        //   first:new FormControl('', Validators.required),
        //   second:new FormControl('', Validators.required)
        // })
      ]),
    });
    console.log(this.formGrouparray);
    if (this.data.addingshit) {
      for (const input of this.data.addingshit) {
        this.formGrouparray.push(this.fb.group({
          first:new FormControl(input['first'], Validators.required),
          second:new FormControl(input['second'], Validators.required)
        }))
      }
    }
  }

}