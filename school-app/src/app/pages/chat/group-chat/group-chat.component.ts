import { ChatService } from './../../../chat/chat.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import Pusher from 'pusher-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css'],
})
export class GroupChatComponent implements OnInit {
  @ViewChild('endOfChat')

  endOfChat!: ElementRef;

  // user$ = this.usersService.currentUserProfile$;
  // myChats$ = this.chatsService.myChats$;

  searchControl = new FormControl('');
  messageControl = new FormControl('');
  chatListControl = new FormControl('');

  messages: any | undefined;
  message: any = "";
  user: any;
  openChat = false;

  // otherUsers$ = combineLatest([this.usersService.allUsers$, this.user$]).pipe(
  //   // map(([users, user]) => users.filter((u) => u.uid !== user?.uid))
  // );

  // users$ = combineLatest([
  //   this.otherUsers$,
  //   this.searchControl.valueChanges.pipe(startWith('')),
  // ]).pipe(
  //   map(([users, searchString]) => {
  //     return users.filter((u) =>
  //       u.displayName?.toLowerCase().includes(searchString.toLowerCase())
  //     );
  //   })
  // );

  // selectedChat$ = combineLatest([
  //   this.chatListControl.valueChanges,
  //   this.myChats$,
  // ]).pipe(map(([value, chats]) => chats.find((c) => c.id === value[0])));

  constructor(
    private router: Router,
    private chatsService: ChatService
  ) { }

  ngOnInit(): void {

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('2a207a46ea3f96109427', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      alert(JSON.stringify(data));
      this.messages.push(data);
    });
    // this.messages$ = this.chatListControl.valueChanges.pipe(
    //   map((value) => value[0]),
    //   switchMap((chatId) => this.chatsService.getChatMessages$(chatId)),
    //   tap(() => {
    //     this.scrollToBottom();
    //   })
    // );
  }

  createChat(user: any) {
    // this.chatsService
    //   .isExistingChat(user.uid)
    //   .pipe(
    //     switchMap((chatId) => {
    //       if (!chatId) {
    //         return this.chatsService.createChat(user);
    //       } else {
    //         return of(chatId);
    //       }
    //     })
    //   )
    //   .subscribe((chatId) => {
    //     this.chatListControl.setValue([chatId]);
    //   });
  }

  sendMessage() {
    const message = { username: this.user, message: this.message };
    console.log(message);

    this.chatsService.sendMessage(message).subscribe(r => this.messages.push(message));
    console.log(this.messages);
  }

  openVideoChatComponent() {
    this.router.navigate(['/chat']);
  }
}