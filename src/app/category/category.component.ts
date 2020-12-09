import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../project/project.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent{

  constructor(private http: HttpClient,
              public dialogRef: MatDialogRef<CategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { };

  categoryForm = new FormGroup({
    name: new FormControl('')
  })

  onNoClick(): void {
    this.dialogRef.close();
  }

  createCategory(){
    this.http.post('https://todoli-backend.herokuapp.com/category',
      {"name": this.categoryForm.value.name}).subscribe((res)=>{
      console.log(res);
    });
    this.dialogRef.close();
  }
}
