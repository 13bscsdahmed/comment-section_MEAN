import {Message} from "./message.model"
import {Http, Response} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Headers} from "@angular/http"
import {ErrorService} from "../errors/error.service";

@Injectable()       //can only inject services into classes with some metadata attached to them. In this case @Injectable. With component classes they have @Component metadata attached to them so no need to use @Injectable with them
export class MessageService {
    messages: Message []= [];
    messageIsEdit= new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService){}

    addMessage(message: Message) {

        const body= JSON.stringify(message);
        const headers= new Headers({'Content-Type': 'application/json' });
        const token= localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
            .map((response: Response) => {
            const result=response.json();
            const message= new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
            this.messages.push(message);
            return message;

            })  //.map tranforms response into a recognizable form. In this case to json and throws away redundant header fields etc and returns an observable
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })

    }

    getMessages(){
        return this.http.get('http://localhost:3000/message')
            .map((response: Response)=>{
                const messages= response.json().obj;
                let transformedMessages: Message[]= [];
                for(let message of messages){
                    transformedMessages.push(new Message
                        (message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id));
                }
                this.messages=transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })

    }

    editMessage(message: Message){
        this.messageIsEdit.emit(message);
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message),1);
        const token= localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete("http://localhost:3000/message/" + message.messageId+ token)
            .map((response: Response) => response.json())  //.map tranforms response into a recognizable form. In this case to json and throws away redundant header fields etc and returns an observable
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })

    }


    updateMessage(message: Message){
        const body= JSON.stringify(message);
        const headers= new Headers({'Content-Type': 'application/json' });
        const token= localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch("http://localhost:3000/message/" + message.messageId+token, body, {headers: headers})
            .map((response: Response) => response.json())  //.map tranforms response into a recognizable form. In this case to json and throws away redundant header fields etc and returns an observable
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }


}