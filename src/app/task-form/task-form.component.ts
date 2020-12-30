import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { Task } from '../model/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskFb:FormGroup;
  @Output() send= new EventEmitter();
  @Input() task:Task;

  constructor(private fb: FormBuilder) {
  
    this._createForm();
  }
  _createForm(){
    this.taskFb=this.fb.group({
      nameTask:[this.task ?'':this.task.name,[Validators.required,Validators.minLength(3)]],
      descriptionTask:[this.task ?'':this.task.description,[Validators.required,Validators.minLength(5)]]
    })
  }

  addTasks() {

    if (this.taskFb.get('nameTask').valid && this.taskFb.valid) {
       this.send.emit(new Task({ 
        id: this.task ? this.task.id:Math.random() * (100 - 1) + 1,
        name: this.taskFb.value['nameTask'],
        description: this.taskFb.value['descriptionTask']
      }))
      this.taskFb.reset();
    }
  }

  ngOnInit(): void {
    
  }
  ngOnChanges(){
    this._createForm();
  }

}
