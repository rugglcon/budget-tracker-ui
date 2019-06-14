import { Budget } from './../../../../models/budget.model';
import { Component, Input, OnInit } from '@angular/core';
import { ExpenseService } from '../../../../services/expense.service';
import { Expense } from '../../../../models/budget.model';
import { BudgetService } from '../../../../services/budget.service';

@Component({
    selector: 'app-expense-list-item',
    templateUrl: './expense-list-item.component.html'
})
export class ExpenseListItemComponent implements OnInit {
    @Input()
    expense: Expense;

    budget: Budget;
    editMode = false;

    constructor(private eService: ExpenseService, private bService: BudgetService) {}

    ngOnInit(): void {
        this.bService.currentBudget.subscribe(b => {
            this.budget = b;
        });
    }

    handleExpenseDelete(): void {
        this.eService.delete(this.expense).then(() => {
            const index = this.budget.expenses.map(e => e.id).find(id => this.expense.id === id);
            this.budget.expenses.splice(index, 1);
            this.bService.currentBudget.next(this.budget);
        });
    }

    handleExpenseEdit(): void {

    }
}
