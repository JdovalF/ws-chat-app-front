import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatMessageDto } from '../models/chat-message-dto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  constructor() { 
  //  this.webSocket = new WebSocket('ws://localhost:8080/chat');
    this.webSocket = new WebSocket(environment.wsHost + '/chat');
  }

  public openWebSocket(){
    
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event)
    };
    
    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
      
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
    console.log(JSON.stringify(chatMessageDto));
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket(){
    this.webSocket.close();
  }

}
