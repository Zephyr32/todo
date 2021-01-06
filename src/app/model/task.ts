export class Task{
    public id?:number;
    public title:string;
    public description:string;
    public addingshit:[];
    public checked:boolean;
    constructor(init?: Partial<Task>){
        this.addingshit=[];
        this.checked=false;
        init ? Object.assign(this, init) : this.clear();
        if(!this.description){
            this.description='some default description';
        }
    }
    edittitle(title:string){
        this.title=title;
    }
    editDescriptions(description:string){
        this.description=description;
    }
    edit(init?: Partial<Task>){
        init ? Object.assign(this, init) : this.clear();
        return this;
    }
    public clear() {
        this.title = null;
        this.description = null;
      }

}
