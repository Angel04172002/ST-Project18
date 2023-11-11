import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppLoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AppLoaderComponent
  ]
})
export class SharedModule { }
