import { initialTaskState } from "../state/task.state";
import * as action from "../actions/task.actions";
import { createReducer, on } from "@ngrx/store";
import { Task } from "src/app/model/task";
import { pipe } from "rxjs";



export const taskReducer=createReducer(

    initialTaskState,
//GET
    on(action.getTasks,(state)=>state),

    on(action.getEditTaskId,(state,{id})=>
    ({
        ...state,
        editedId:id
    })
    ),

    on(action.setTasks,(state,{tasks})=>
    ({
        ...state,
        tasks:tasks
        
    })
    ),
//ADD
    on(action.addTask,(state,{task})=>
    ({
        ...state,
         tasks:Array.prototype.concat(task,state.tasks)
    })
    ),
//REMOVE
    on(action.removeSelectTasks,(state)=>
    ({
        ...state,
        tasks:state.tasks
        .filter((val:Task)=>{
            console.log(val.checked);
            return !val.checked
        })
    })
    ),

    on(action.removeTask,(state,{id})=>
    ({
        ...state,
        tasks:state.tasks
        .filter(val => val.id != id)
    })
    ),
//EDIT
    on(action.editTask,(state,{task})=> { 
    return{
        ...state,
        tasks: state.tasks.map(val=> val.id==task.id ? task : val)
    }}),

//CLEAR
    on(action.clearStore,(state)=> ({
        ...state,
        tasks: []
    })
    )

)
