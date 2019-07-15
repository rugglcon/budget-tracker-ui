import { SimpleExpense, NewExpense } from './../models/budget.model';
import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExpenseResource {
    private url = Config.baseUrl + '/expense';
    constructor(private http: HttpClient) {}

    delete(expense: SimpleExpense): Promise<void> {
        return this.http.delete<void>(`${this.url}/${expense.id}`).toPromise();
    }

    create(expense: NewExpense): Promise<SimpleExpense> {
        return this.http.post<SimpleExpense>(this.url, expense).toPromise();
    }

    update(id: number, expense: SimpleExpense): Promise<SimpleExpense> {
        return this.http.patch<SimpleExpense>(`${this.url}/${id}`, expense).toPromise();
    }
}
