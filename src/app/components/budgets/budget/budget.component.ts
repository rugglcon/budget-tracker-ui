import { Expense } from './../../../models/budget.model';
import { Budget } from '../../../models/budget.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../../services/budget.service';
import { ExpenseService } from '../../../services/expense.service';

@Component({
    selector: 'app-budget',
    styleUrls: ['./budget.component.css'],
    templateUrl: './budget.component.html'
})
export class BudgetComponent implements OnInit {
    budget: Budget;
    underBudget = false;
    constructor(private route: ActivatedRoute, private bService: BudgetService,
        private eService: ExpenseService) {
    }

    ngOnInit(): void {
        this.bService.getBudget(+this.route.snapshot.paramMap.get('id')).subscribe(b => {
            console.log('got the budget');
            this.bService.currentBudget.next(b);
            this.budget = b;
            this.underBudget = (this.budget.expenses.map(x => x.cost).reduce((total, exp) => total += exp) < this.budget.total);
        });
    }
}
