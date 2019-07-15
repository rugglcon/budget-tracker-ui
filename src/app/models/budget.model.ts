export interface NewBudget {
    name: string,
    total: number,
    ownerId: number
}

export interface SimpleBudget {
    /**
     * ID of the budget
     */
    id: number,
    /**
     * title the owner gives the budget
     */
    name: string,
    /**
     * "budget" of the budget
     */
    total: number,
    /**
     * owner of this budget
     */
    ownerId: number
}

export interface NewExpense {
    title: string,
    cost: number,
    budgetId: number
}

export interface SimpleExpense {
    id: number,
    /**
     * ID of the budget this Expense belongs to
     */
    budgetId: number,
    title: string,
    cost: number
}

export interface BudgetPair {
    budget?: SimpleBudget,
    expenses?: SimpleExpense[]
}
