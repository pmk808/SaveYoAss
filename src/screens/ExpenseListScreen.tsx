import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useExpenses } from '../context/ExpenseContext';
import { CATEGORY_DETAILS } from '../constants/categories';
import { ExpenseCategory, Expense } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseList'>;

function ExpenseListScreen() {
  const { state } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'ALL'>('ALL');

  const filteredExpenses = state.expenses.filter(expense => 
    selectedCategory === 'ALL' ? true : expense.category === selectedCategory
  );

  const getCategoryName = (category: ExpenseCategory) => {
    return CATEGORY_DETAILS[category]?.name || category;
  };

  return (
    <View style={styles.container}>
      {/* Filter Section */}
      <ScrollView horizontal style={styles.filterContainer} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity 
          style={[
            styles.filterButton,
            selectedCategory === 'ALL' && styles.filterButtonActive
          ]}
          onPress={() => setSelectedCategory('ALL')}
        >
          <Text style={selectedCategory === 'ALL' ? styles.filterTextActive : styles.filterText}>
            All
          </Text>
        </TouchableOpacity>
        {(['ESSENTIAL', 'SAVINGS', 'FLEXIBLE'] as ExpenseCategory[]).map((category) => (
          <TouchableOpacity 
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.filterButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={selectedCategory === category ? styles.filterTextActive : styles.filterText}>
              {getCategoryName(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Expenses List */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={styles.expenseDescription}>{item.description}</Text>
              <Text style={styles.expenseCategory}>{getCategoryName(item.category)}</Text>
              <Text style={styles.expenseDate}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.expenseAmount}>₱{item.amount.toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No expenses found</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f6fa',
  },
  filterButtonActive: {
    backgroundColor: '#00b894',
  },
  filterText: {
    color: '#2d3436',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f6fa',
  },
  expenseDescription: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '500',
  },
  expenseCategory: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 2,
  },
  expenseDate: {
    fontSize: 12,
    color: '#b2bec3',
    marginTop: 2,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#b2bec3',
  },
});

export default ExpenseListScreen;