import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();
  constructor() { }
  

  sendMessage(messages: string[]) {
      this.subject.next({ text: messages });
  }

  clearMessages() {
      this.subject.next();
  }

  onMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
