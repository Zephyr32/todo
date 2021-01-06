import {createAction, props} from "@ngrx/store";
import {Task} from "../../model/task";





export const getTasks=createAction('[Task] GetTasks');

export const setTasks=createAction('[Task] SetTasks',props<{tasks:Task[]}>());

export const addTask=createAction('[Task] AddTask',props<{task:Task}>());

export const removeSelectTasks=createAction('[Task] RemoveSelectTasks');

export const removeTask=createAction('[Task] RemoveTask',props<{id:number}>());

export const getEditTaskId=createAction('[Task] getEditTaskId',props<{id:number}>());

export const editTask=createAction('[Task] EditTask',props<{task:Task}>());

export const editCheckTask=createAction('[Task] EditCheckTask',props<{id:number}>());

export const Ta=createAction('[Task] clearTasks');


