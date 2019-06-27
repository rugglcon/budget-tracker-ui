import { OnInit, Component } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { NewBudget } from 'src/app/models/budget.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './budget-create.component.html',
    selector: 'app-budget-create'
})
export class BudgetCreateComponent implements OnInit {
    budgetCreateForm: FormGroup;
    error = '';
    creating = false;

    constructor(private budgetService: BudgetService, private router: Router,
        fb: FormBuilder, private authService: AuthService, private title: Title) {
        this.budgetCreateForm = fb.group({
            name: new FormControl('', Validators.required),
            total: new FormControl(null, [Validators.required, Validators.min(.01)])
        });
    }

    ngOnInit(): void {
        this.title.setTitle('Create a Budget');
    }

    handleSubmit(): void {
        if (this.creating) { return; }
        this.creating = true;
        const newBudget = this.budgetCreateForm.value as NewBudget;
        const currentUser = this.authService.getTokenDetails();
        if (currentUser) {
            newBudget.ownerId = currentUser.id;

            this.budgetService.create(newBudget).then(budget => {
                this.router.navigate(['/budgets', budget.id]);
            });
        } else {
            this.router.navigate(['/login']);
        }
    }

}
