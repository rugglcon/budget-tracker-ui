import { ExpenseService } from './services/expense.service';
import { AuthResource } from './resources/auth.resource';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from './services/budget.service';
import { BudgetResource } from './resources/budget.resource';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BudgetComponent } from './components/budgets/budget/budget.component';
import { ExpenseResource } from './resources/expense.resource';
import { ExpenseListItemComponent } from './components/budgets/budget/expense-list-item/expense-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { BudgetCreateComponent } from './components/budgets/budget-create/budget-create.component';
import { SignupComponent } from './components/signup/signup.component';
import { Interceptor } from './interceptors/interceptor';
import { appRoutes } from './app.routes';
import { BudgetResolver } from './resolvers/budget.resolver';
import { NotFoundComponent } from './components/errors/not-found.component';

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
    SignupComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BudgetService,
    BudgetResource,
    AuthResource,
    AuthService,
    ExpenseResource,
    ExpenseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    BudgetResolver
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
