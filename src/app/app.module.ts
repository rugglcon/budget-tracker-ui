import { ExpenseService } from './services/expense.service';
import { AuthResource } from './resources/auth.resource';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from './services/budget.service';
import { BudgetResource } from './resources/budget.resource';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BudgetComponent } from './components/budgets/budget/budget.component';
import { ExpenseResource } from './resources/expense.resource';
import { ExpenseListItemComponent } from './components/budgets/budget/expense-list-item/expense-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { BudgetCreateComponent } from './components/budgets/budget-create/budget-create.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './components/signup/signup.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'budgets', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'profile', component: ProfileComponent },
  { path: 'budgets', component: BudgetsComponent, canActivate: [AuthGuard] },
  { path: 'budget/:id', component: BudgetComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    BudgetsComponent,
    LoginComponent,
    BudgetComponent,
    ExpenseListItemComponent,
    HeaderComponent,
    BudgetCreateComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BudgetService,
    BudgetResource,
    AuthResource,
    AuthService,
    ExpenseResource,
    ExpenseService
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
