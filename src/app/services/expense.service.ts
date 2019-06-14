import { Injectable } from '@angular/core';
import { Expense } from '../models/budget.model';
import { ExpenseResource } from '../resources/expense.resource';

@Injectable()
export class ExpenseService {
    constructor(private expenseResource: ExpenseResource) {}

    delete(expense: Expense): Promise<void> {
        return this.expenseResource.delete(expense);
    }
}
