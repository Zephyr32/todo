import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items:string[];
  newTask:string;
  constructor(){
    this.items=[];
  }
  title = 'todo';
 

  addTasks(){
    if(this.newTask==""){

    }else{
      this.items.push(this.newTask);
      this.newTask="";
    }
  }
  removeTask(task){
    this.items.splice(this.items.findIndex((val)=>{val=task.value}))
  }
}
