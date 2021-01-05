import { ITaskState,initialTaskState } from "./task.state";

export interface IAppState{
    tasks:ITaskState,
}
export const initialAppState:IAppState={
    tasks:initialTaskState,
};
export function getInitialState():IAppState{
    return initialAppState;
}