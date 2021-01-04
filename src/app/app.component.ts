import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditDataDialogComponent } from './edit-data-dialog/edit-data-dialog.component';
import { Task } from './model/task';
import { HttpClient } from '@angular/common/http';
import { filter, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Tasks: Task[] = [];
  etask: Task;
  search: string;
  fg: FormGroup;

  constructor(public dialog: MatDialog, fb: FormBuilder, private http: HttpClient) {

    this.fg = fb.group({
      search: ['']
    });
    this.fg.get('search').valueChanges.subscribe((value) => {
      this.search = value;
    });
    this.getTaskFromLocalStorage();
  }
  onChange(count) {
    this.getDataFromJSONplaceholder(count);
  }

  title = 'todo';

  removeTask(task) {
    this.Tasks.splice(this.Tasks.indexOf(task), 1);
    this.setTaskFromLocalStorage();
  }
  getTaskFromLocalStorage() {
    if (localStorage.getItem('task'))
      this.Tasks = JSON.parse(localStorage.getItem('task'));
  }
  setTaskFromLocalStorage() {
    localStorage.setItem('task', JSON.stringify(this.Tasks));
  }

  editTask(task) {
    this.etask = task;
    this.openDialog();
  }
  removealldata() {
    this.Tasks.splice(0, this.Tasks.length);
    this.setTaskFromLocalStorage();
  }
  
  getDataFromJSONplaceholder(count?: number) {
    //fetch('https://jsonplaceholder.typicode.com/todos').then(response=>response)
    this.http.get('https://jsonplaceholder.typicode.com/todos/')
      .pipe(
        map((value: Array<any>) => {
          return value.map((val: { id: number, title: string }) => {
            return new Task({
              id: val.id,
              title: val.title
            })
          }).filter((v, i) => {
            return i < (count ? count : 20)
          }
          );

        })).subscribe((data: Task[]) => this.Tasks.push.apply(this.Tasks, data), () => { }, () => {
          this.setTaskFromLocalStorage();
        });

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
        this.setTaskFromLocalStorage();
      });
  }
}
