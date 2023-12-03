import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminComponent } from "./admin/admin.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { AdminSubjectComponent } from "./admin-subject/admin-subject.component";
import { AdminTeacherComponent } from "./admin-teacher/admin-teacher.component";
import { CalendarComponent } from "../pages/calendar/calendar.component";
import { ChatComponent } from "../pages/chat/chat/chat.component";
import { GroupChatComponent } from "../pages/chat/group-chat/group-chat.component";

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
    },
    {
        path: 'calendar',
        component: CalendarComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    },
    {
        path: 'group-chat',
        component: GroupChatComponent
    }
]
  
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }