import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SimpleBudget } from '../models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BudgetService } from '../services/budget.service';

@Injectable()
export class BudgetResolver implements Resolve<SimpleBudget> {
    constructor(private budgetService: BudgetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SimpleBudget | Promise<SimpleBudget> | Observable<SimpleBudget> {
        const id = Number(route.paramMap.get('id'));
        if (isNaN(id)) {
            this.budgetService.currentBudget.next(null);
            return null as unknown as SimpleBudget;
        }

        const budget = this.budgetService.getBudget(id);
        this.budgetService.currentBudget.next(budget);
        return budget;
    }

}
