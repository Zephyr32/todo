import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogData, EditDataDialogComponent } from './edit-data-dialog/edit-data-dialog.component';
import { Task } from './model/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Tasks: Task[] = [];
  newTask: Task = new Task({ id: 1 });
  taskFb:FormGroup;

  constructor(public dialog: MatDialog,private fb: FormBuilder) {
  
    this._createForm();
  }
  _createForm(){
    this.taskFb=this.fb.group({
      nameTask:['',[Validators.required,Validators.minLength(3)]],
      descriptionTask:['',[Validators.required,Validators.minLength(5)]]
    })
  }
  title = 'todo';

  addTasks() {
    if (this.taskFb.get('nameTask').valid && this.taskFb.valid) {
      this.newTask = new Task({ 
        id: this.Tasks.length + 1,
        name: this.taskFb.value['nameTask'],
        description: this.taskFb.value['descriptionTask']
      });
      this.Tasks.push(this.newTask);
      this.taskFb.reset();
    }
  }

  removeTask(task: Task) {
    this.Tasks.splice(this.Tasks.indexOf(task), 1);
  }

  edittask(task: DialogData): void {
    const dublicat: DialogData = {
      id: task.id,
      name: task.name,
      description: task.description
    }
    this.dialog.open(EditDataDialogComponent, {
      width: '400px',
      data: dublicat
    })
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.Tasks.find((task) => {
          if (task.id == result.id) {
            task.edit({
              name:result.name,
              description:result.description
            });
          }
        });
      }
    });
  }
}
