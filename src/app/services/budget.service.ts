import { Observable, BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { Budget } from './../models/budget.model';
import { BudgetResource } from './../resources/budget.resource';
import { Injectable } from '@angular/core';

@Injectable()
export class BudgetService {
    private _allBudgets: Budget[];
    private _budgetObservable: ReplaySubject<Budget[]> = new ReplaySubject(1);
    currentBudget: BehaviorSubject<Budget> = new BehaviorSubject(null);

    constructor(private budgetResource: BudgetResource) {
        if (this._allBudgets == null) {
            this.budgetResource.getAll().then(budgets => {
                this._allBudgets = [...budgets];
                this._budgetObservable.next(this._allBudgets);
            });
        }
    }

    get allBudgets(): Observable<Budget[]> {
        return this._budgetObservable.asObservable();
    }

    delete(budget: Budget): Promise<void> {
        return this.budgetResource.delete(budget);
    }

    async create(budget: Budget): Promise<Budget> {
        const budg = await this.budgetResource.create(budget);
        this._allBudgets.push(budg);
        this._budgetObservable.next(this._allBudgets);
        return budg;
    }

    update(oldId: number, newBudget: Budget): Promise<Budget> {
        return this.budgetResource.update(oldId, newBudget);
    }

    getAll(): void {
        this.budgetResource.getAll().then(budgets => {
            this._allBudgets = [...budgets];
            this._budgetObservable.next(budgets);
        });
    }

    getBudget(budget: number): Observable<Budget> {
        return this.budgetResource.getBudget(budget);
    }
}
