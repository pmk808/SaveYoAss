import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Expense, ExpenseCategory } from '../types';
import { CATEGORY_DETAILS } from '../constants/categories';

interface ExpenseInputProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseInput: React.FC<ExpenseInputProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('ESSENTIAL');

  const handleAmountChange = (text: string) => {
    // Only allow numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    setAmount(cleaned);
  };

  const handleSubmit = () => {
    if (!amount || !description) return;

    const expense = {
      amount: parseFloat(amount),
      description,
      category,
      date: new Date()
    };

    onSubmit(expense);
    setAmount('');
    setDescription('');
    setCategory('ESSENTIAL');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Expense</Text>

      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={handleAmountChange}
        placeholder="Enter amount"
        keyboardType="numeric"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor="#666"
      />

      <View style={styles.categoryContainer}>
        {Object.keys(CATEGORY_DETAILS).map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              category === cat && styles.selectedCategory
            ]}
            onPress={() => setCategory(cat as ExpenseCategory)}
          >
            <Text style={[
              styles.categoryText,
              category === cat && styles.selectedCategoryText
            ]}>
              {CATEGORY_DETAILS[cat as ExpenseCategory].name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[
          styles.submitButton,
          (!amount || !description) && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={!amount || !description}
      >
        <Text style={styles.submitText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2d3436',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#2d3436',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#f5f6fa',
  },
  selectedCategory: {
    backgroundColor: '#00b894',
  },
  categoryText: {
    color: '#2d3436',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#00b894',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#b2bec3',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseInput;