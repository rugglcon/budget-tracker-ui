import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credentials } from '../../models/credentials.model';
import { Router } from '@angular/router';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required]);
  error = '';
  constructor(private authService: AuthService, private router: Router,
              private budgetService: BudgetService) {
    if (this.authService.isAuthenticated()) {
      this.requestBudgets();
    }
  }

  requestBudgets(): void {
    let budgetRequestPromise;
    if (!this.budgetService.hasSuccessfullyRequestedBudgets) {
      budgetRequestPromise = this.budgetService.getAll();
    } else {
      budgetRequestPromise = Promise.resolve();
    }
    budgetRequestPromise.then(() => { console.log('doing redirect'); this.doRedirect(); });
  }

  doRedirect(): void {
    this.router.navigateByUrl(this.authService.redirectUrl ? this.authService.redirectUrl : '/budgets');
  }

  login(): void {
    const creds: Credentials = {
      userName: this.username.value,
      password: this.password.value
    };
    console.log('credentials', creds);
    this.authService.login(creds).then(success => {
      if (success) {
        this.requestBudgets();
      } else {
        this.error = 'Invalid credentials';
      }
    });
  }
}
