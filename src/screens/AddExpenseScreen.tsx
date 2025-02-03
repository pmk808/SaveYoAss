import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ExpenseInput from '../components/ExpenseInput';
import { useExpenses } from '../context/ExpenseContext';
import { Expense } from '../types';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExpense'>;

// Changed to regular function declaration
function AddExpenseScreen({ navigation }: Props) {
  const { addExpense } = useExpenses();

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    addExpense(expense);
    navigation.goBack();
  };

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <ExpenseInput onSubmit={handleAddExpense} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default AddExpenseScreen;  // Make sure this is at the end