import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, map } from 'rxjs/operators';
import { Task } from '../model/task';
import { GetTasksSuccess } from '../store/actions/task.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderService {

  constructor(private http: HttpClient,private store: Store<IAppState>) { }

  public getData(){
    return this.http.get('https://jsonplaceholder.typicode.com/todos/')
      .pipe(
        map((value: Array<any>) => {
          return value.map((val: { id: number, title: string }) => {
            return new Task({
              id: val.id,
              title: val.title
            })
          });
        }))
  }

}