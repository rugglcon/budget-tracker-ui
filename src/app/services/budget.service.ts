import { Observable, BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { SimpleBudget, NewBudget, SimpleExpense } from './../models/budget.model';
import { BudgetResource } from './../resources/budget.resource';
import { Injectable } from '@angular/core';
import { ExpenseCache } from '../cache/expense.cache';
import { DataCache } from '../models/data-cache.model';
import { AuthService } from './auth.service';

@Injectable()
export class BudgetService implements DataCache {

    private _allBudgets: SimpleBudget[] = [];
    private _budgetObservable: ReplaySubject<SimpleBudget[]> = new ReplaySubject(1);
    private _hasSuccessfullyRequestedBudgets = false;
    currentBudget: BehaviorSubject<SimpleBudget | null> = new BehaviorSubject<SimpleBudget | null>(null);

    constructor(private budgetResource: BudgetResource, private expenseCache: ExpenseCache,
                private authService: AuthService) {
        this.authService.registerDataCache(this);
    }

    get allBudgets(): Observable<SimpleBudget[]> {
        return this._budgetObservable.asObservable();
    }

    get hasSuccessfullyRequestedBudgets(): boolean {
        return this._hasSuccessfullyRequestedBudgets;
    }

    async delete(budget: SimpleBudget): Promise<void> {
        await this.budgetResource.delete(budget);
        const index = this._allBudgets.findIndex(x => x.id === budget.id);
        if (index === -1) {
            return;
        }
        this._allBudgets.splice(index, 1);
        this._allBudgets = [...this._allBudgets];
        this._budgetObservable.next(this._allBudgets);
    }

    async create(budget: NewBudget): Promise<SimpleBudget> {
        const budg = await this.budgetResource.create(budget);
        this._allBudgets.push(budg);
        this._budgetObservable.next(this._allBudgets);
        return budg;
    }

    async update(oldId: number, newBudget: SimpleBudget): Promise<SimpleBudget> {
        const updated = await this.budgetResource.update(oldId, newBudget);
        const current = this._allBudgets.findIndex(x => x.id === oldId);
        if (current !== -1) {
            this._allBudgets[current] = updated;
        } else {
            this._allBudgets.push(updated);
        }
        this._allBudgets = [...this._allBudgets];
        this._budgetObservable.next(this._allBudgets);
        return updated;
    }

    updateInCache(budget: SimpleBudget): SimpleBudget {
        const current = this._allBudgets.findIndex(x => x.id === budget.id);
        const newBudget = {...budget};
        if (current === -1) {
            throw new Error(`Budget with id [${newBudget.id}] was not found!`);
        }
        this._allBudgets[current] = newBudget;

        return newBudget;
    }

    async getAll(): Promise<void> {
        try {
            const budgets = await this.budgetResource.getAll();
            this._hasSuccessfullyRequestedBudgets = true;
            this._allBudgets = [...budgets];
            this._budgetObservable.next(budgets);
        } catch (e) {
            this._hasSuccessfullyRequestedBudgets = false;
        }
    }

    getBudget(budget: number): SimpleBudget {
        return this._allBudgets.find(b => b.id === budget) as SimpleBudget;
    }

    async getExpensesByBudgetId(budgetId: number): Promise<SimpleExpense[]> {
        let expenses: SimpleExpense[] = [];
        if (this.expenseCache.has(budgetId)) {
            expenses = this.expenseCache.get(budgetId) as SimpleExpense[];
        } else {
            expenses = await this.budgetResource.getExpensesByBudgetId(budgetId);
            this.expenseCache.set(budgetId, expenses);
        }
        return expenses;
    }

    updateExpensesByBudgetId(budgetId: number, expenses: SimpleExpense[]): SimpleExpense[] {
        if (!this.expenseCache.has(budgetId)) {
            throw new ReferenceError(`Trying to update an expense cache that doesn\'t exist for budget id ${budgetId}.`);
        }

        this.expenseCache.set(budgetId, expenses);
        return expenses;
    }

    clearExpenses(): void {
        this.expenseCache.clear();
    }

    clearData(): void {
        this._budgetObservable = new ReplaySubject(1);
        this._allBudgets = [];
        this._hasSuccessfullyRequestedBudgets = false;
        this.currentBudget = new BehaviorSubject<SimpleBudget | null>(null);
        this.clearExpenses();
    }
}
