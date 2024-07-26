import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { contentRoute } from './shared/routes/content-routes';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: '', component: ContentLayoutComponent, children: contentRoute, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
