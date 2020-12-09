import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import {MatDialog} from '@angular/material/dialog';
import {ProjectComponent} from "./project/project.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  responce: any;
  title!: string;

  categoryForm = new FormGroup({
      completed: new FormControl()
    }
  )


  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.takeCategories();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectComponent, {
      data: {title: this.title, category: this.responce }
    });
    console.log(this.responce)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.takeCategories();
      this.title = result;
    });
  }

  sendUpdates(project_id: number, category_id: number){
    this.http.patch('https://todoli-backend.herokuapp.com/projects/' + category_id +
      "/todos/" + project_id, {"completed":this.categoryForm.value.completed})
              .subscribe((val) => { console.log(val);
    })
  }

  takeCategories(){
    this.http.get('https://todoli-backend.herokuapp.com/projects')
      .subscribe((responce)=>{
        this.responce = responce;
        console.log(this.responce)
      })
  }
}
