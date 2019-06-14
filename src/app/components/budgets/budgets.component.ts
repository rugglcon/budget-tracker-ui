import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  allBudgets: Observable<Budget[]>;
  selectedBudget: Budget;

  constructor(private bService: BudgetService, private router: Router) { }

  ngOnInit() {
    console.log('hi');
    this.allBudgets = this.bService.allBudgets;
  }

  goToBudget(budget: Budget): void {
    console.log('navigating:', budget);
    this.router.navigate(['/budget', budget.id]);
  }
}
