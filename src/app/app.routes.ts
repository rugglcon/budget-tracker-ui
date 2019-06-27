import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BudgetsComponent } from './components';
import { AuthGuard } from './guards/auth.guard';
import { BudgetComponent } from './components/budgets/budget/budget.component';
import { BudgetCreateComponent } from './components/budgets/budget-create/budget-create.component';
import { BudgetResolver } from './resolvers/budget.resolver';
import { NotFoundComponent } from './components/errors/not-found.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'budgets', pathMatch: 'full' },
    { path: '404', component: NotFoundComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    // { path: 'profile', component: ProfileComponent },
    { path: 'budgets/:id', component: BudgetComponent, canActivate: [AuthGuard], resolve: { budget: BudgetResolver } },
    { path: 'budgets', component: BudgetsComponent, canActivate: [AuthGuard] },
    { path: 'budget-create', component: BudgetCreateComponent, canActivate: [AuthGuard] }
  ];
