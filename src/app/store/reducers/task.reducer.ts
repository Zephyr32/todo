 import {initialTaskState ,ITaskState} from "../state/task.state";
 import {TaskActions,ETaskActions} from "../actions/task.actions";
import { state } from "@angular/animations";
import { TasksEffects } from "../efects/task.effects";

 export const taskReducers=(
     state=initialTaskState,
     action:TaskActions
 ):ITaskState=>{

    switch (action.type) {
        case ETaskActions.GetTasksSuccess:
            return{
                ...state,
                tasks: action.payload
            };
        case ETaskActions.GetTaskSuccess:
            return{
               ...state,
                 selectedTask: action.payload
            };
        case ETaskActions.DeleteTask:
            return{
            ...state,
            tasks: state.tasks.filter(val=>val.id!=action.payload)
            };
        case ETaskActions.EditTask:
                return{
                ...state,
                editTask: action.payload
                };
    
        default:
            return state;
    }
 };
 