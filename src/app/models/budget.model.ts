export interface Budget {
    id: number,
    name: string,
    expenses: Expense[],
    subBudget?: Budget[],
    total: number
}

export interface Expense {
    id: number,
    title: string,
    cost: number
}
