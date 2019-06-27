import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  allBudgets!: Observable<Budget[]>;

  constructor(private bService: BudgetService, private router: Router, private title: Title) { }

  ngOnInit() {
    this.allBudgets = this.bService.allBudgets;
    this.title.setTitle('All Budgets');
  }

  goToBudget(budget: Budget): void {
    console.log('navigating:', budget);
    this.router.navigate(['/budgets', budget.id]);
  }
}
