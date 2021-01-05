import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ITaskState } from '../state/task.state';

const selectTasks = (state:IAppState)=>state.tasks;

export const selectTaskList = createSelector(
    selectTasks,
    (state:ITaskState)=>state.tasks
);

export const selectSelectedTask = createSelector(
    selectTasks,
    (state:ITaskState)=>state.selectedTask
);