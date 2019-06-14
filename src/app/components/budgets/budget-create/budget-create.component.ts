import { OnInit, Component } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { NewBudget } from 'src/app/models/budget.model';

@Component({
    templateUrl: './budget-create.component.html',
    selector: 'app-budget-create'
})
export class BudgetCreateComponent implements OnInit {
    budgetToCreate: NewBudget;

    constructor(private budgetService: BudgetService) {}

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}
