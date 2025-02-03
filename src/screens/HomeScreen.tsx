import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MONTHLY_INCOME, BUDGET_LIMITS, CATEGORY_DETAILS } from '../constants/categories';
import { useExpenses } from '../context/ExpenseContext';
import { ExpenseCategory } from '../types';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { state } = useExpenses();

  const calculateProgress = (category: ExpenseCategory) => {
    const spent = state.totalSpent[category];
    const limit = BUDGET_LIMITS[category];
    const percentage = (spent / limit) * 100;
    return Math.min(percentage, 100);
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 100) return '#e74c3c'; // Red for over budget
    if (percentage >= 80) return '#f1c40f';  // Yellow for close to budget
    return '#00b894';  // Green for normal
  };

  const renderCategoryCard = (category: ExpenseCategory) => {
    const spent = state.totalSpent[category];
    const limit = BUDGET_LIMITS[category];
    const progress = calculateProgress(category);
    const progressColor = getProgressBarColor(progress);

    return (
      <View style={styles.categoryContainer} key={category}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{CATEGORY_DETAILS[category].name}</Text>
          <Text style={styles.categoryAmount}>
            ₱{spent.toLocaleString()} / ₱{limit.toLocaleString()}
          </Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${progress}%`, backgroundColor: progressColor }
            ]} 
          />
        </View>

        <Text style={[styles.progressText, { color: progressColor }]}>
          {progress.toFixed(1)}% used
        </Text>
      </View>
    );
  };

  const totalSpent = Object.values(state.totalSpent).reduce((a, b) => a + b, 0);
  const remainingBudget = MONTHLY_INCOME - totalSpent;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Monthly Overview */}
        <View style={styles.section}>
          <Text style={styles.title}>Monthly Overview</Text>
          <View style={styles.overviewContainer}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Total Budget</Text>
              <Text style={styles.income}>₱{MONTHLY_INCOME.toLocaleString()}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>Remaining</Text>
              <Text style={[
                styles.income,
                { color: remainingBudget < 0 ? '#e74c3c' : '#00b894' }
              ]}>
                ₱{remainingBudget.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Budget Categories */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Budget Categories</Text>
          {(['ESSENTIAL', 'SAVINGS', 'FLEXIBLE'] as ExpenseCategory[]).map(category => 
            renderCategoryCard(category)
          )}
        </View>

        {/* Recent Expenses */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Recent Expenses</Text>
          {state.expenses.slice(-5).reverse().map(expense => (
            <View key={expense.id} style={styles.expenseItem}>
              <View>
                <Text style={styles.expenseDescription}>{expense.description}</Text>
                <Text style={styles.expenseCategory}>{CATEGORY_DETAILS[expense.category].name}</Text>
              </View>
              <Text style={styles.expenseAmount}>₱{expense.amount.toLocaleString()}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

       {/* Action Buttons */}
       <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.listButton]}
          onPress={() => navigation.navigate('ExpenseList')}
        >
          <Text style={styles.actionButtonText}>View All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.addButton]}
          onPress={() => navigation.navigate('AddExpense')}
        >
          <Text style={styles.actionButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  overviewItem: {
    flex: 1,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2d3436',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2d3436',
  },
  income: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00b894',
  },
  categoryContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f6fa',
    borderRadius: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#636e72',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#dfe6e9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f6fa',
  },
  expenseDescription: {
    fontSize: 16,
    color: '#2d3436',
  },
  expenseCategory: {
    fontSize: 12,
    color: '#636e72',
    marginTop: 2,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listButton: {
    backgroundColor: '#0984e3',
  },
  addButton: {
    backgroundColor: '#00b894',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;