import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import ExpenseListScreen from './src/screens/ExpenseListScreen';
import { ExpenseProvider } from './src/context/ExpenseContext';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#00b894',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'SaveYoAss',
              }}
            />
            <Stack.Screen
              name="AddExpense"
              component={AddExpenseScreen}
              options={{
                title: 'Add Expense',
              }}
            />
            <Stack.Screen
              name="ExpenseList"
              component={ExpenseListScreen}
              options={{
                title: 'Expenses',
              }}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </ExpenseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});