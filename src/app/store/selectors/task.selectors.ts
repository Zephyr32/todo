import { createSelector } from '@ngrx/store';
import {IAppState, ITaskState} from '../reducers/task.reducer';

const selectTasks = ( state: IAppState ) => state.tasks;

export const selectTaskList = createSelector(
    selectTasks,
    (state: ITaskState ) => state.tasks
);

export const selectSelectedTask = createSelector(
    selectTasks,
    (state: ITaskState ) => state.selectedTask
);
export const selectLengthTask = createSelector(
    selectTasks,
    (state: ITaskState ) => state.tasks.length
);

export const selectEditTask = createSelector(
    selectTasks,
    (state: ITaskState ) => state.tasks
    .find(val => val.id === state.editedId
    )
);
