import { from } from "rxjs";
import {Task}  from "../../model/task";

export interface ITaskState{
    tasks:Task[];
    selectedTask:Task;
    editTask:Task;
    editedId:number;
}

export const initialTaskState:ITaskState={
    tasks:null,
    editedId:null,
    selectedTask:null,
    editTask:null,
}
awdawdwadg
//перенести это в редьюс
