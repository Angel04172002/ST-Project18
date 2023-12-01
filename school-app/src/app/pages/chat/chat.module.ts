import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentMessageComponent } from './current-message/current-message.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ChatComponent } from './chat/chat.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CurrentMessageComponent,
    NewMessageComponent,
    GroupChatComponent,
    ChatComponent,
    JitsiComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ChatModule { }
