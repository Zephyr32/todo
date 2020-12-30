import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditDataDialogComponent } from './edit-data-dialog/edit-data-dialog.component';
import { Task } from './model/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Tasks: Task[] = [];
  etask: Task;
  search:string;
  fg:FormGroup;
  
  constructor(public dialog: MatDialog,fb:FormBuilder) {
    this.fg=fb.group({
      search:['']
    });
    this.fg.get('search').valueChanges.subscribe((value)=>{
      this.search=value;
    });
  }

  title = 'todo';

  removeTask(task) {
    this.Tasks.splice(this.Tasks.indexOf(task), 1);
  }

  editTask(task) {
    this.etask = task;
    this.openDialog();
  }

  

  openDialog() {
    this.dialog.open(EditDataDialogComponent, {
      width: '400px',
      data: this.etask ? this.etask : new Task()
    })
      .afterClosed()
      .subscribe(result => {
        if (result && result.id) {
          this.Tasks = this.Tasks.filter((task)=>task.id!=result.id);
          this.Tasks.push(result);
        } else if (result) {
          this.Tasks.push(new Task({
            id: this.Tasks.length+ 1,
            name: result.name,
            description: result.description,
          }));
        }
      });
  }
}
