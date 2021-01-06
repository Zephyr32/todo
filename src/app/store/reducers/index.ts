import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
  
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { IAppState } from '../state/app.state';
import { taskReducer } from './task.reducer'

export interface State {

}

export const reducers: ActionReducerMap<IAppState,any> = {
  tasks:taskReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
