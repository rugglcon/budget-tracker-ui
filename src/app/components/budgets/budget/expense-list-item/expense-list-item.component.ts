import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ExpenseService } from '../../../../services/expense.service';
import { SimpleExpense } from '../../../../models/budget.model';
import { BudgetService } from '../../../../services/budget.service';

@Component({
    selector: 'app-expense-list-item',
    templateUrl: './expense-list-item.component.html'
})
export class ExpenseListItemComponent implements OnInit {
    @Input()
    expense!: SimpleExpense;

    editMode = false;
    @Output() edited = new EventEmitter<SimpleExpense>();
    @Output() delete = new EventEmitter<SimpleExpense>();

    constructor(private eService: ExpenseService, private bService: BudgetService) {}

    ngOnInit(): void {
        if (!this.expense) {
            throw new ReferenceError('An expense must be provided.');
        }
    }

    handleExpenseDelete(): void {
        this.delete.emit(this.expense);
    }

    handleExpenseEdit(): void {
        this.edited.emit(this.expense);
    }
}
