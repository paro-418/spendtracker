import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      return [action.payload, ...state];
    }
    case 'UPDATE': {
      const updateAbleExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateAbleExpense = state[updateAbleExpenseIndex];
      const updatedItem = { ...updateAbleExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateAbleExpenseIndex] = updatedItem;
      return updatedExpenses;
    }
    case 'DELETE': {
      return state.filter((expense) => expense.id !== action.payload);
    }
    case 'SET': {
      const inverted = action.payload.reverse();
      return inverted;
    }
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses });
  };
  const addExpense = (expenseData) => {
    dispatch({
      type: 'ADD',
      payload: expenseData,
    });
  };

  const deleteExpense = (id) => {
    dispatch({
      type: 'DELETE',
      payload: id,
    });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({
      type: 'UPDATE',
      payload: { id, data: expenseData },
    });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
