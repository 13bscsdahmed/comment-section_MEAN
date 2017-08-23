import {Component, OnInit} from "@angular/core";
import {Message} from "./message.model"
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message
                    [message]="message"
                    
                    *ngFor="let message of messages">

            </app-message> <!--first in [] is name of property in in other component
                 @event means message passed by event emitter is assigned to message content!-->
        </div>
    `

})
export class MessageListComponent implements OnInit{
    messages: Message [] = [];

    ngOnInit(){
        this.messageService.getMessages().
            subscribe(
            (messages: Message[]) => {
                this.messages=messages;

            }
        );
    }

    constructor(private messageService: MessageService){}
}