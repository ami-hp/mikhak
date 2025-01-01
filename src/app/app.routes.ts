import {RouterModule, Routes} from '@angular/router';
import LoginRoutes from './pages/login/login.routes';
import {NgModule} from '@angular/core';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
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
