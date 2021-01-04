import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditDataDialogComponent } from './edit-data-dialog/edit-data-dialog.component';
import { Task } from './model/task';
import { HttpClient} from '@angular/common/http';

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
  
  constructor(public dialog: MatDialog,fb:FormBuilder,private http: HttpClient) {
    
    this.fg=fb.group({
      search:['']
    });
    this.fg.get('search').valueChanges.subscribe((value)=>{
      this.search=value;
    });
    this.getTaskFromLocalStorage();
  }

  title = 'todo';

  removeTask(task) {
    this.Tasks.splice(this.Tasks.indexOf(task), 1);
    this.setTaskFromLocalStorage();
  }
  getTaskFromLocalStorage(){
    if(localStorage.getItem('task'))
    this.Tasks=JSON.parse(localStorage.getItem('task'));
  }
  setTaskFromLocalStorage(){
    localStorage.setItem('task',JSON.stringify(this.Tasks));
  }

  editTask(task) {
    this.etask = task;
    this.openDialog();
  }
  removealldata(){
    this.Tasks.splice(0,this.Tasks.length);
    this.setTaskFromLocalStorage();
  }
  getDataFromJSONplaceholder(){
    //fetch('https://jsonplaceholder.typicode.com/todos').then(response=>response.json()).then(json=>console.log(json));
    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe((data:Task[]) => console.log(data));

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
            addingshit:result.addingshit,
          }));
        }
        this.etask=null;
        this.setTaskFromLocalStorage();
      });
  }
}
