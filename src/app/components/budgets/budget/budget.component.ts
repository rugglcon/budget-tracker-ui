import { SimpleBudget, SimpleExpense, NewExpense } from '../../../models/budget.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import { ExpenseService } from '../../../services/expense.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';

@Component({
    selector: 'app-budget',
    styleUrls: ['./budget.component.css'],
    templateUrl: './budget.component.html'
})
export class BudgetComponent implements OnInit, OnDestroy {
    budget!: SimpleBudget;
    expenses!: SimpleExpense[];
    underBudget = true;
    budgetSub$!: Subscription;
    addingExpense = false;
    spent = 0;

    constructor(private bService: BudgetService, private eService: ExpenseService,
        private router: Router, private title: Title, private route: ActivatedRoute,
        private modalService: NgbModal) {}

    ngOnInit(): void {
        this.budgetSub$ = this.route.data.subscribe(async b => {
            if (b) {
                console.log('got the budget', b);
                this.budget = b.budget;
                this.title.setTitle(`Budget - ${this.budget.name}`);
                this.expenses = await this.bService.getExpensesByBudgetId(this.budget.id);
                this.checkUnderBudget();
            } else {
                return this.router.navigate(['/404']);
            }
        });
    }

    checkUnderBudget(): boolean {
        if (this.expenses.length > 0) {
            console.log('have expenses', this.expenses);
            this.spent = this.expenses.map(x => x.cost).reduce((x, y) => x + y, 0);
            console.log('got spent', this.spent);
            return this.underBudget = this.spent < this.budget.total;
        }
        return true;
    }

    openModal(): void {
        const modalRef = this.modalService.open(ExpenseCreateComponent);
        modalRef.componentInstance.budgetId = this.budget.id;
        modalRef.result.then(result => {
            this.handleAddExpense(result);
        });
    }

    handleAddExpense(newExpense: NewExpense): void {
        this.addingExpense = true;
        console.log('creating expense', newExpense);
        this.eService.create(newExpense).then(createdExpense => {
            this.addingExpense = false;
            this.expenses = [...this.expenses, createdExpense];
            this.bService.updateExpensesByBudgetId(this.budget.id, this.expenses);
            this.checkUnderBudget();
        });
    }

    handleExpenseDelete(expense: SimpleExpense): void {
        this.eService.delete(expense).then(() => {
            const index = this.expenses.findIndex(x => x.id === expense.id);
            if (index) {
                this.expenses.splice(index, 1);
                this.expenses = [...this.expenses];
                this.bService.updateExpensesByBudgetId(this.budget.id, this.expenses);
                this.checkUnderBudget();
            }
        });
    }

    handleEditExpense(expense: SimpleExpense): void {
        this.eService.update(expense.id, expense).then(updated => {
            const index = this.expenses.findIndex(x => x.id === expense.id);
            if (index) {
                this.expenses[index] = updated;
                this.expenses = [...this.expenses];
                this.bService.updateExpensesByBudgetId(this.budget.id, this.expenses);
                this.checkUnderBudget();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.budgetSub$) {
            this.budgetSub$.unsubscribe();
        }
    }
}
