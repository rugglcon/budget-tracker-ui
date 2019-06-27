import { Budget } from '../../../models/budget.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import { ExpenseService } from '../../../services/expense.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-budget',
    styleUrls: ['./budget.component.css'],
    templateUrl: './budget.component.html'
})
export class BudgetComponent implements OnInit, OnDestroy {
    budget!: Budget;
    underBudget = false;
    budgetSub$!: Subscription;

    constructor(private bService: BudgetService, private eService: ExpenseService,
        private router: Router, private title: Title) {}

    ngOnInit(): void {
        this.budgetSub$ = this.bService.currentBudget.subscribe(b => {
            if (!b) {
                return this.router.navigate(['/404']);
            }
            console.log('got the budget', b);
            this.budget = b;
            this.title.setTitle(`Budget - ${this.budget.name}`);
            if (this.budget.expenses.length > 0) {
                this.underBudget = (this.budget.expenses.map(x => x.cost).reduce((total, exp) => total += exp) < this.budget.total);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.budgetSub$) {
            this.budgetSub$.unsubscribe();
        }
    }
}
