import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { JsonPlaceholderService} from '../../services/jsonPlaceholderService';
import * as action from '../actions/task.actions';

@Injectable()
export class TasksEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(action.getTasks),
    mergeMap(() => this.tasksService.getData()
      .pipe(
        map(tasks => (action.setTasks({ tasks}))),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private tasksService: JsonPlaceholderService
  ) {}
}
