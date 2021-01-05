import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { JsonPlaceholderService} from '../../services/jsonPlaceholderService'

@Injectable()
export class TasksEffects {
 
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType('[Task] Load Tasks'),
    mergeMap(() => this.tasksService.getData()
      .pipe(
        map(tasks => ({ type: '[Task] Load Tasks Success', payload: tasks })),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private tasksService: JsonPlaceholderService
  ) {}
}