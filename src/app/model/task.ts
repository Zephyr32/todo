export class Task{
    public id?:number;
    public name:string;
    public description:string;
    constructor(init?: Partial<Task>){
        init ? Object.assign(this, init) : this.clear();
    }
    editName(name:string){
        this.name=name;
    }
    editDescriptions(description:string){
        this.description=description;
    }
    edit(init?: Partial<Task>){
        init ? Object.assign(this, init) : this.clear();
    }
    public clear() {
        this.name = null;
        this.description = null;
      }

}