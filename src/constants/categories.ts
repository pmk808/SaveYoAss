export const MONTHLY_INCOME = 29000;

export const BUDGET_LIMITS = {
  ESSENTIAL: 17400, // 60% of income
  SAVINGS: 7250,    // 25% of income
  FLEXIBLE: 4350    // 15% of income
};

export const CATEGORY_DETAILS = {
  ESSENTIAL: {
    name: 'Essential Expenses',
    subcategories: [
      { name: 'Food/Groceries', budget: 4500 },
      { name: 'Transportation', budget: 2000 },
      { name: 'Utilities', budget: 2500 },
      { name: 'Internet/Phone', budget: 1500 },
      { name: "Brother's College", budget: 3000 },
      { name: 'Personal Care', budget: 900 },
      { name: 'Healthcare', budget: 1000 },
      { name: 'Family Support', budget: 2000 }
    ]
  },
  SAVINGS: {
    name: 'Savings & Debt',
    subcategories: [
      { name: 'Emergency Fund', budget: 3000 },
      { name: 'Education Fund', budget: 2250 },
      { name: 'Long-term Savings', budget: 2000 }
    ]
  },
  FLEXIBLE: {
    name: 'Flexible Spending',
    subcategories: [
      { name: 'Entertainment', budget: 1500 },
      { name: 'Dining Out', budget: 1000 },
      { name: 'Shopping', budget: 1000 },
      { name: 'Miscellaneous', budget: 850 }
    ]
  }
} as const;