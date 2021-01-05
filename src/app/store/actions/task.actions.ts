import {Action} from "@ngrx/store";
import {Task} from "../../model/task";



export enum ETaskActions{
    GetTasks='[Task] Load Tasks',
    GetTasksSuccess='[Task] Load Tasks Success',
    GetTask='[Task] Get Task',
    GetTaskSuccess='[Task] Get Task Success',
    DeleteTask='[Task] Delete Task',
    EditTask='[Task] Edit Task',
}
export class GetTasks implements Action{
    public readonly type= ETaskActions.GetTasks;
}
export class GetTasksSuccess implements Action{
    public readonly type= ETaskActions.GetTasksSuccess;
    constructor(public payload: Task[]){}
}
export class GetTask implements Action{
    public readonly type= ETaskActions.GetTask;
    constructor(public payload: number){}
}
export class DeleteTask implements Action{
    public readonly type= ETaskActions.DeleteTask;
    constructor(public payload: number){}
}
export class GetTaskSuccess implements Action{
    public readonly type= ETaskActions.GetTaskSuccess;
    constructor(public payload: Task){}
}
export class EditTask implements Action{
    public readonly type= ETaskActions.EditTask;
    constructor(public payload: Task){}
}

export type TaskActions=GetTasks|GetTask|GetTaskSuccess|GetTasksSuccess|DeleteTask|EditTask

