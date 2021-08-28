import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from '../models/chat-message-dto';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(
    public webSocketService: WebSocketService,
  ) { }

  
  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
  
  sendMessage(sendFrom: NgForm){
    const chatMessageDto = new ChatMessageDto(sendFrom.value.user, sendFrom.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    sendFrom.controls.message.reset();

  }

}
