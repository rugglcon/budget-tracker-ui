import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NewExpense } from 'src/app/models/budget.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-expense-create',
    templateUrl: './expense-create.component.html'
})
export class ExpenseCreateComponent implements OnInit {
    @Input() budgetId!: number;
    isCreating = false;
    createForm!: FormGroup;

    constructor(private fb: FormBuilder, private ngbActiveModal: NgbActiveModal) {}

    ngOnInit(): void {
        if (!this.budgetId) {
            throw new ReferenceError('A budget id is required.');
        }

        this.createForm = this.fb.group({
            title: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
            cost: new FormControl(null, [Validators.required, Validators.min(.01)]),
            budgetId: new FormControl(this.budgetId)
        });
    }

    handleSubmit(): void {
        if (this.isCreating) { return; }
        if (this.createForm.invalid) {
            Object.keys(this.createForm.controls).forEach(key => {
                this.createForm.controls[key].markAsTouched();
            });
            return;
        }

        if (isNaN(Number(this.createForm.value.cost))) {
            return;
        }

        this.ngbActiveModal.close(this.createForm.value);
    }
}
