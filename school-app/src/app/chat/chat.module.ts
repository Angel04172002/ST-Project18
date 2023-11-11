import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentMessageComponent } from './current-message/current-message.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ChatComponent } from './chat/chat.component';
import { JitsiComponent } from './jitsi/jitsi.component';



@NgModule({
  declarations: [
    CurrentMessageComponent,
    NewMessageComponent,
    GroupChatComponent,
    ChatComponent,
    JitsiComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChatModule { }