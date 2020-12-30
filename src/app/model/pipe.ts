import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({name: 'pipefilter'})
export class FilterPipe implements PipeTransform {

 transform(items:Task[], searchText:string){
   if(!items){
     return[];
   }
   if(!searchText)
   {
     return items;
   }
   return items.filter(it=>{
     return it.name.toLocaleLowerCase().includes(searchText);
   });
    }
}