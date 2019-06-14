import { Expense } from './../models/budget.model';
import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExpenseResource {
    private url = Config.baseUrl + '/expense';
    constructor(private http: HttpClient) {}

    delete(expense: Expense): Promise<void> {
        return this.http.delete<void>(`${this.url}/${expense.id}`).toPromise();
    }

    create(expense: Expense): Promise<Expense> {
        return this.http.post<Expense>(this.url, expense).toPromise();
    }
}
