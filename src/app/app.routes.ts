import {RouterModule, Routes} from '@angular/router';
import LoginRoutes from './pages/login/login.routes';
import {NgModule} from '@angular/core';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {MasterComponent} from './layouts/master/master.component';
import HomeRoutes from './pages/home/home.routes';

export const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    loadChildren: () => HomeRoutes.routes
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    loadChildren: () => LoginRoutes.routes
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
