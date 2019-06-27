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
    expense!: Expense;

    budget!: Budget;
    editMode = false;

    constructor(private eService: ExpenseService, private bService: BudgetService) {}

    ngOnInit(): void {
        this.bService.currentBudget.subscribe(b => {
            if (b) {
                this.budget = b;
            }
        });
    }

    handleExpenseDelete(): void {
        this.eService.delete(this.expense).then(() => {
            const index = this.budget.expenses.map(e => e.id).indexOf(this.expense.id);
            if (index !== -1) {
                this.budget.expenses.splice(index, 1);
                const updated = this.bService.updateInCache(this.budget);
                this.bService.currentBudget.next(updated);
            }
        });
    }

    handleExpenseEdit(): void {

    }
}
