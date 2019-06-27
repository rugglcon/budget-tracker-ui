import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Budget } from '../models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BudgetService } from '../services/budget.service';

@Injectable()
export class BudgetResolver implements Resolve<Budget> {
    constructor(private budgetService: BudgetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Budget | Promise<Budget> | Observable<Budget> {
        const id = Number(route.paramMap.get('id'));
        if (isNaN(id)) {
            this.budgetService.currentBudget.next(null);
            return null as unknown as Budget;
        }

        const budget = this.budgetService.getBudget(id);
        this.budgetService.currentBudget.next(budget);
        return budget;
    }

}
