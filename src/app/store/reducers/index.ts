import {
  ActionReducerMap,
} from '@ngrx/store';

import {IAppState, taskReducer} from './task.reducer';


export const reducers: ActionReducerMap< IAppState, any > = {
  tasks: taskReducer,
};

