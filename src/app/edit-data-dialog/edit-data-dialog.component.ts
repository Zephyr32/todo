import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../model/task';
export interface DialogData {
  id: number;
  name: string;
  description: string;
}
@Component({
  selector: 'app-edit-data-dialog',
  templateUrl: './edit-data-dialog.component.html',
  styleUrls: ['./edit-data-dialog.component.css']
})
export class EditDataDialogComponent implements OnInit {
  editForm: FormGroup;
  
  butt: MatButton;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData
  ) { }

  onClick(): void {
    if (this.editForm.valid) {
      this.dialogRef.close({
        id: this.data.id,
        name: this.editForm.get("editNameTask").value,
        description: this.editForm.get("editDescriptionTask").value
      });
    }

  }
  ngOnInit(): void {
    this.editForm=this.fb.group({
      editNameTask : 
      [
        this.data.name,
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      editDescriptionTask : 
      [
        this.data.description,
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ]
    });
    
  }

}