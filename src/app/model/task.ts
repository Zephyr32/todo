export class Task {
  public id?: number;
  public title: string;
  public description: string;
  public addingShit: {
    firstControl: string,
    secondControl: string
  }[];
  public checked: boolean;

  constructor(init?: Partial<Task>) {
    this.addingShit = [];
    this.checked = false;
    init ? Object.assign(this, init) : this.clear();
    if (!this.description) {
      this.description = 'some default description';
    }
  }

  editTitle(title: string): void {
    this.title = title;
  }

  editDescriptions(description: string): void {
    this.description = description;
  }

  edit(init?: Partial<Task>): Task {
    init ? Object.assign(this, init) : this.clear();
    return this;
  }

  public clear(): void {
    this.title = null;
    this.description = null;
  }

}
