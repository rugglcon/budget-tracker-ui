import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/login-success.model';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
    templateUrl: './signup.component.html',
    selector: 'app-signup'
})
export class SignupComponent {
    error = '';
    signupForm: FormGroup;
    passwordMatch = true;

    constructor(private authService: AuthService, private router: Router,
        fb: FormBuilder, private budgetService: BudgetService) {
        if (this.authService.isAuthenticated()) {
            this.router.navigateByUrl(this.authService.redirectUrl ? this.authService.redirectUrl : '/budgets');
        }
        this.signupForm = fb.group({
            userName: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            retypePassword: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required)
        });

        this.signupForm.controls.retypePassword.valueChanges.subscribe((val: string) => {
            if (val !== this.signupForm.controls.password.value) {
                this.error = 'Passwords do not match.';
                this.passwordMatch = false;
            } else {
                if (this.error === 'Passwords do not match.') {
                    this.error = '';
                    this.passwordMatch = true;
                }
            }
        });
    }

    async signup(): Promise<void> {
        if (this.signupForm.invalid) {
            Object.keys(this.signupForm).forEach(key => {
                this.signupForm.controls[key].markAsDirty();
            });
            return;
        }

        const newUser = this.signupForm.value as NewUser;
        const success = await this.authService.signup(newUser);
        if (success) {
            this.requestBudgets();
            return;
        }

        this.error = 'Something went wrong, please try again.';
    }

    requestBudgets(): void {
        let budgetRequestPromise;
        if (!this.budgetService.hasSuccessfullyRequestedBudgets) {
          budgetRequestPromise = this.budgetService.getAll();
        } else {
          budgetRequestPromise = Promise.resolve();
        }
        budgetRequestPromise.then(() => this.doRedirect());
      }

      doRedirect(): void {
        this.router.navigateByUrl(this.authService.redirectUrl ? this.authService.redirectUrl : '/budgets');
      }
}
