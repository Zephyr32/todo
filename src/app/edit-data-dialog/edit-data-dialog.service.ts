import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { EditDataDialogComponent } from './edit-data-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class EditDataDialogService {

  constructor(
    public dialog: MatDialog
   ) { }

  public openDialog(editTask?): void {
    this.dialog.open(EditDataDialogComponent, {
        width: '400px',
        data: editTask ? editTask : new Task()
      }).afterClosed()
      .subscribe();
  }

}