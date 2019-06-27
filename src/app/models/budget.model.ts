export interface NewBudget {
    name: string,
    total: number,
    ownerId: number
}

export interface Budget {
    /**
     * ID of the budget
     */
    id: number,
    /**
     * ID of the owner of this budget
     */
    ownerId: number,
    /**
     * title the owner gives the budget
     */
    name: string,
    /**
     * list of expenses in this budget
     */
    expenses: Expense[],
    /**
     * if this budget has sub-budgets, they go here
     */
    subBudget?: Budget[],
    /**
     * "budget" of the budget
     */
    total: number
}

export interface NewExpense {
    title: string,
    cost: number,
    budgetId: number
}

export interface Expense {
    id: number,
    /**
     * ID of the budget this Expense belongs to
     */
    budgetId: number,
    title: string,
    cost: number
}
