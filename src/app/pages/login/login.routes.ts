import {Routes} from '@angular/router';
import {LoginComponent} from './login.component';


export default class LoginRoutes {
  static routes: Routes = [
    {
      path: '',
      component: LoginComponent,
    }
  ]
}
