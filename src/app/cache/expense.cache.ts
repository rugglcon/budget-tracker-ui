import { SimpleExpense } from '../models/budget.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ExpenseCache extends Map<number, SimpleExpense[]> {
}
