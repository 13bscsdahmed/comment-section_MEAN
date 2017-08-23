import {Component} from "@angular/core"

@Component({

    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
              <ul class="nav nav-pills">
                  <li routerLinkActive="active"><a [routerLink]="['/messages']"> Messenger</a></li> <!-- using /messages mean go to absolute path not 
                   append messages to end of existing path as in case when we use only messages!-->
                  <li routerLinkActive="active"><a [routerLink]="['/auth']"> Authentication</a></li>
              </ul>  
            </nav>
        </header>
    `

})
export class HeaderComponent{


}