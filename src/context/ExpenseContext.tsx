import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Expense, ExpenseCategory } from '../types';

interface ExpenseState {
  expenses: Expense[];
  totalSpent: {
    ESSENTIAL: number;
    SAVINGS: number;
    FLEXIBLE: number;
  };
}

type ExpenseAction = 
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string };

const initialState: ExpenseState = {
  expenses: [],
  totalSpent: {
    ESSENTIAL: 0,
    SAVINGS: 0,
    FLEXIBLE: 0
  }
};

const calculateTotalSpent = (expenses: Expense[]) => {
  return expenses.reduce((acc, expense) => ({
    ...acc,
    [expense.category]: acc[expense.category] + expense.amount
  }), {
    ESSENTIAL: 0,
    SAVINGS: 0,
    FLEXIBLE: 0
  });
};

const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newExpenses = [...state.expenses, action.payload];
      return {
        expenses: newExpenses,
        totalSpent: calculateTotalSpent(newExpenses)
      };
    
    case 'DELETE_EXPENSE':
      const updatedExpenses = state.expenses.filter(exp => exp.id !== action.payload);
      return {
        expenses: updatedExpenses,
        totalSpent: calculateTotalSpent(updatedExpenses)
      };

    default:
      return state;
  }
};

interface ExpenseContextType {
  state: ExpenseState;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  return (
    <ExpenseContext.Provider value={{ state, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};