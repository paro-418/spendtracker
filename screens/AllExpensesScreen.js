import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expensesPeriod='Total'
      expenses={expensesCtx.expenses}
      fallbackText='No registered expenses found!'
    />
  );
};

export default AllExpensesScreen;
