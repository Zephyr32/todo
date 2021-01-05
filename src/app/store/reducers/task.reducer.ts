import { initialTaskState, ITaskState } from "../state/task.state";
import { TaskActions, ETaskActions } from "../actions/task.actions";
import { state } from "@angular/animations";
import { TasksEffects } from "../efects/task.effects";
import { Task } from "src/app/model/task";

export const taskReducers = (
    state = initialTaskState,
    action: TaskActions
): ITaskState => {

    switch (action.type) {
        case ETaskActions.GetTasksSuccess:
            return {
                ...state,
                tasks: action.payload
            };
        case ETaskActions.GetTaskSuccess:
            return {
                ...state,
                selectedTask: action.payload
            };
        case ETaskActions.DeleteTask:
            return {
                ...state,
                tasks: state.tasks.filter(val => val.id != action.payload)
            };
        case ETaskActions.DeleteTasks:
            return {
                ...state,
                tasks: state.tasks.filter((val,iter)=>{
                    
                    return !state.deletedTask.includes(val);
                    
                }),
                deletedTask:state.deletedTask.filter(()=>false)
            };
        case ETaskActions.EditTask:
            return {
                ...state,
                editTask: action.payload
            };
        case ETaskActions.SelectDeleteTasks:
            return {
                ...state,
                deletedTask: state.deletedTask.concat(action.payload)
            };
        case ETaskActions.RemoveSelectDeleteTasks:
            return {
                ...state,
                deletedTask: state.deletedTask.filter(val => val.id != action.payload.id)
            };

        default:
            return state;
    }
};
