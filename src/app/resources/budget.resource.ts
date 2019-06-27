import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { Budget, NewBudget } from '../models/budget.model';
import { Injectable } from '@angular/core';

@Injectable()
export class BudgetResource {
    private url = Config.baseUrl + '/budgets';
    constructor(private http: HttpClient) {}

    delete(budget: Budget): Promise<void> {
        return this.http.delete<void>(`${this.url}/${budget.id}`).toPromise();
    }

    create(budget: NewBudget): Promise<Budget> {
        return this.http.post<Budget>(this.url, budget).toPromise();
    }

    update(id: number, budget: Budget): Promise<Budget> {
        return this.http.patch<Budget>(`${this.url}/${id}`, budget).toPromise();
    }

    getAll(): Promise<Budget[]> {
        return this.http.get<Budget[]>(this.url).toPromise();
    }

    getBudget(budget: number): Observable<Budget> {
        return this.http.get<Budget>(`${this.url}/${budget}`);
    }
}
