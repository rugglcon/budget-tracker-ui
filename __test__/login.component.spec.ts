import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent, BudgetsComponent } from '../src/app/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthResource } from 'src/app/resources/auth.resource';
import { RouterTestingModule } from '@angular/router/testing';
import { BudgetService } from 'src/app/services/budget.service';
import { BudgetResource } from 'src/app/resources/budget.resource';
import { ExpenseCache } from 'src/app/cache/expense.cache';
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let budgetService: BudgetService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        BudgetsComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbAlertModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'budgets', component: BudgetsComponent, canActivate: [AuthGuard] },
            { path: 'login', component: LoginComponent }
          ]
        )
      ],
      providers: [
        AuthService,
        HttpClient,
        HttpHandler,
        AuthResource,
        BudgetService,
        BudgetResource,
        ExpenseCache
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    budgetService = fixture.debugElement.injector.get<BudgetService>(BudgetService as Type<BudgetService>);
    authService = fixture.debugElement.injector.get<AuthService>(AuthService as Type<AuthService>);
    router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login and request budgets when form submitted', fakeAsync(() => {
    jest.spyOn(router, 'navigateByUrl');
    jest.spyOn(authService, 'login').mockImplementation((creds) => Promise.resolve(true));
    jest.spyOn(budgetService, 'getAll').mockImplementation(() => Promise.resolve());

    component.username.setValue('user');
    component.password.setValue('pass');

    component.login();
    tick();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/budgets');
  }));
});
