import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
  
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { IAppState } from '../state/app.state';
import { taskReducers } from './task.reducer'

export interface State {

}

export const reducers: ActionReducerMap<IAppState,any> = {
  tasks:taskReducers,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
