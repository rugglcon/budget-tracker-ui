import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsComponent } from '../src/app/components';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BudgetService } from 'src/app/services/budget.service';
import { BudgetResource } from 'src/app/resources/budget.resource';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ExpenseCache } from 'src/app/cache/expense.cache';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResource } from 'src/app/resources/auth.resource';

describe('BudgetsComponent', () => {
  let component: BudgetsComponent;
  let fixture: ComponentFixture<BudgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetsComponent ],
      imports: [
        NgbAlertModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        BudgetService,
        BudgetResource,
        HttpClient,
        HttpHandler,
        ExpenseCache,
        AuthService,
        AuthResource
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
