import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { NewBudget, SimpleExpense, SimpleBudget } from '../models/budget.model';
import { Injectable } from '@angular/core';

@Injectable()
export class BudgetResource {
    private url = Config.baseUrl + '/budgets';
    constructor(private http: HttpClient) {}

    delete(budget: SimpleBudget): Promise<void> {
        return this.http.delete<void>(`${this.url}/${budget.id}`).toPromise();
    }

    create(budget: NewBudget): Promise<SimpleBudget> {
        return this.http.post<SimpleBudget>(this.url, budget).toPromise();
    }

    update(id: number, budget: SimpleBudget): Promise<SimpleBudget> {
        return this.http.patch<SimpleBudget>(`${this.url}/${id}`, budget).toPromise();
    }

    getAll(): Promise<SimpleBudget[]> {
        return this.http.get<SimpleBudget[]>(this.url).toPromise();
    }

    getBudget(budget: number): Observable<SimpleBudget> {
        return this.http.get<SimpleBudget>(`${this.url}/${budget}`);
    }

    getExpensesByBudgetId(budgetId: number): Promise<SimpleExpense[]> {
        return this.http.get<SimpleExpense[]>(`${this.url}/${budgetId}/expenses`).toPromise();
    }
}
