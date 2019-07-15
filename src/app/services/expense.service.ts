import { Injectable } from '@angular/core';
import { SimpleExpense, NewExpense } from '../models/budget.model';
import { ExpenseResource } from '../resources/expense.resource';

@Injectable()
export class ExpenseService {
    constructor(private expenseResource: ExpenseResource) {}

    delete(expense: SimpleExpense): Promise<void> {
        return this.expenseResource.delete(expense);
    }

    create(expense: NewExpense): Promise<SimpleExpense> {
        return this.expenseResource.create(expense);
    }

    update(id: number, expense: SimpleExpense): Promise<SimpleExpense> {
        return this.expenseResource.update(id, expense);
    }
}
