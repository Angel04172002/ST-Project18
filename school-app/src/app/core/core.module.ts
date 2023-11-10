import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CoreRoutingModule } from './core-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
