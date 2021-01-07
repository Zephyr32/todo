import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({name: 'pipefilter'})
export class FilterPipe implements PipeTransform {

 transform(tasks: Task[], searchText: string): Task[]{
   if (tasks && searchText) {
     return tasks.filter(it => {
       return it.title.toLocaleLowerCase().includes(searchText);
     });
   }
   else{
     return tasks;
   }
    }
}
