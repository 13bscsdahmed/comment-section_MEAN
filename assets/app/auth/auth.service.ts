import {User} from './user.model';
import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable"
import {ErrorService} from "../errors/error.service";

@Injectable()
export class AuthService{
    constructor(private http: Http, private errorService:ErrorService){

    }

    signup(user: User){
        const body= JSON.stringify(user);
        const headers= new Headers({'Content-Type': 'application/json' });

        return this.http.post('http://localhost:3000/user', body, {headers:headers})
            .map((response: Response) => response.json())
              //.map tranforms response into a recognizable form. In this case to json and throws away redundant header fields etc and returns an observable
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }


    signin(user: User){
        const body= JSON.stringify(user);
        const headers= new Headers({'Content-Type': 'application/json' });

        return this.http.post('http://localhost:3000/user/signin', body, {headers:headers})
            .map((response: Response) => response.json())
            //.map tranforms response into a recognizable form. In this case to json and throws away redundant header fields etc and returns an observable
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !==null;
    }



}