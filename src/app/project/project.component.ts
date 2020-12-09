import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog'
import {CategoryComponent} from "../category/category.component";
import {AppComponent} from "../app.component";


export interface DialogData {
  category: any;
  title: string;
}

interface Category{
  id: number;
  name: string;
  projects: object;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent{

  categories: Category[] = this.data.category;
  name!: string;

  constructor(private http: HttpClient, private fb: FormBuilder,
              public categoryDialog: MatDialog,
              public dialogRef: MatDialogRef<ProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  createProjectFrom = new FormGroup({
    category: new FormControl(this.categories),
    title: new FormControl(this.data.title)
  })

  createProject(){
    this.http.post('https://todoli-backend.herokuapp.com/todos',
      {"category_id": this.createProjectFrom.value.category,
      "title": this.createProjectFrom.value.title}).subscribe((res)=>{
    });
    this.dialogRef.close();

  }

  openCategoryForm(): void {
    const catalogDialogRef = this.categoryDialog.open(CategoryComponent, {
      data: {name: this.name }
    });
    catalogDialogRef.afterClosed().subscribe(result => {
      this.http.get('https://todoli-backend.herokuapp.com/projects')
        // @ts-ignore
        .subscribe((responce: Category[])=>{
          this.categories = responce;
        })
    });
  }

}
