import {Routes} from '@angular/router';
import {HomeComponent} from './home.component';


export default class HomeRoutes {
  static routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    }
  ]
}
