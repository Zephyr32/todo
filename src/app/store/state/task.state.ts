import { from } from "rxjs";
import {Task}  from "../../model/task";

export interface ITaskState{
    tasks:Task[];
    deletedTask:Task[]
    selectedTask:Task;
    editTask:Task;
}
export const initialTaskState:ITaskState={
    tasks:null,
    selectedTask:null,
    editTask:null,
    deletedTask: new Array<Task>(),
}