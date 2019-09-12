import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { SimpleBudget } from 'src/app/models';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
    selector: 'app-budget-edit',
    templateUrl: './budget-edit.component.html'
})
export class BudgetEditComponent implements OnInit {
    budget!: SimpleBudget;
    @Input() spent = 0;
    editing = new EventEmitter();

    constructor(private budgetService: BudgetService) {}

    ngOnInit(): void {
        this.budgetService.currentBudget.subscribe(b => {
            if (b) { this.budget = b; }
        });
    }

    submit(): void {
        this.budgetService.update(this.budget.id, this.budget).then(b => {
            this.editing.emit();
        });
    }
}
