export class Task{
    public id?:number;
    public name:string;
    public description:string;
    public addingshit:[];
    constructor(init?: Partial<Task>){
        this.addingshit=[];
        init ? Object.assign(this, init) : this.clear();
        if(!this.description){
            this.description='some default description'
        }
    }
    editName(name:string){
        this.name=name;
    }
    editDescriptions(description:string){
        this.description=description;
    }
    edit(init?: Partial<Task>){
        init ? Object.assign(this, init) : this.clear();
        return this;
    }
    public clear() {
        this.name = null;
        this.description = null;
      }

}