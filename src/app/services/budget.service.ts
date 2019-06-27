import { Observable, BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { Budget, NewBudget } from './../models/budget.model';
import { BudgetResource } from './../resources/budget.resource';
import { Injectable } from '@angular/core';

@Injectable()
export class BudgetService {

    private _allBudgets: Budget[] = [];
    private _budgetObservable: ReplaySubject<Budget[]> = new ReplaySubject(1);
    currentBudget: BehaviorSubject<Budget | null> = new BehaviorSubject<Budget | null>(null);

    constructor(private budgetResource: BudgetResource) {
        this.budgetResource.getAll().then(budgets => {
            console.log('got all budgets for user', budgets);
            this._allBudgets = [...budgets];
            this._budgetObservable.next(this._allBudgets);
        });
    }

    get allBudgets(): Observable<Budget[]> {
        return this._budgetObservable.asObservable();
    }

    delete(budget: Budget): Promise<void> {
        return this.budgetResource.delete(budget);
    }

    async create(budget: NewBudget): Promise<Budget> {
        const budg = await this.budgetResource.create(budget);
        this._allBudgets.push(budg);
        this._budgetObservable.next(this._allBudgets);
        return budg;
    }

    async update(oldId: number, newBudget: Budget): Promise<Budget> {
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

    updateInCache(budget: Budget): Budget {
        const current = this._allBudgets.findIndex(x => x.id === budget.id);
        const newBudget = {...budget};
        if (current === -1) {
            throw new Error(`Budget with id [${newBudget.id}] was not found!`);
        }
        this._allBudgets[current] = newBudget;

        return newBudget;
    }

    getAll(): void {
        this.budgetResource.getAll().then(budgets => {
            this._allBudgets = [...budgets];
            this._budgetObservable.next(budgets);
        });
    }

    getBudget(budget: number): Budget {
        return this._allBudgets.find(b => b.id === budget) as Budget;
    }
}
