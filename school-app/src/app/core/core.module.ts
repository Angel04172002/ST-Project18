import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminComponent } from '../admin/admin/admin.component';
import { AdminRoutingModule } from '../admin/admin-routing.module';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavigationComponent, AdminHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    AdminRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent
  ]
})
export class CoreModule { }
