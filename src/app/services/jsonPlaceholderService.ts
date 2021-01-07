import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, map } from 'rxjs/operators';
import { Task } from '../model/task';
import { Store } from '@ngrx/store';
import {IAppState} from '../store/reducers/task.reducer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderService {

  constructor(private http: HttpClient, private store: Store<IAppState>) { }

  public getData(): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/todos/').pipe(
      map((value: Array<any>) => {
        return value.map((val: { id: number, title: string }) => {
          return new Task({
            id: val.id,
            title: val.title
          });
        });
      }));
  }

}
