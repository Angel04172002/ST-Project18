import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000/chat/messages';

  sendMessage(message: any) {
    return this.http.post(this.url, message);
  }

  getMessages() {
    // let observable = new Observable<{ user: String, message: String }>(observer => {
    //   this.socket.on('new-message', (data: any) => {
    //     observer.next(data);
    //   });
    //   return () => { this.socket.disconnect(); };
    // });
    // return observable;
  }
}