import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminComponent } from "./admin/admin.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { AdminSubjectComponent } from "./admin-subject/admin-subject.component";
import { AdminTeacherComponent } from "./admin-teacher/admin-teacher.component";

const routes : Routes = [
    {
        path: 'admin-panel',
        component: AdminPanelComponent
    },
    {
        path: 'admin-subjects',
        component: AdminSubjectComponent
    },
    {
        path: 'admin-teachers',
        component: AdminTeacherComponent
    },
    {
        path: 'admin-students',
        component: AdminComponent
    }
]
  
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }