export type ExpenseCategory = 'ESSENTIAL' | 'SAVINGS' | 'FLEXIBLE';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
}

export interface Budget {
  category: ExpenseCategory;
  limit: number;
  spent: number;
}

export interface BudgetSummary {
  essential: Budget;
  savings: Budget;
  flexible: Budget;
  totalBudget: number;
  totalSpent: number;
}

// Define the structure for subcategories
export interface Subcategory {
  name: string;
  budget: number;
}

// Define the structure for category details
export interface CategoryDetail {
  name: string;
  subcategories: Subcategory[];
}

// Define lookup object type for category details
export type CategoryDetailsType = Record<ExpenseCategory, CategoryDetail>;