import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RouterModule, Routes} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'project', component: ProjectComponent },
  { path: 'category', component: CategoryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    CategoryComponent
  ],
  entryComponents:[
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule, MatDialogModule, MatButtonModule, MatInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes), MatSelectModule
  ],
  exports: [RouterModule],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef,useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
