import axios from 'axios';

const BACKEND_URL = 'https://react-native-b1c10-default-rtdb.firebaseio.com/';
export const storeExpense = async (expenseData) => {
  try {
    const res = await axios.post(BACKEND_URL + 'expenses.json', expenseData);
    const id = res.data.name;
    return id;
  } catch (error) {
    console.log('post error', error);
  }
};

export const fetchExpenses = async () => {
  try {
    const res = await axios.get(BACKEND_URL + 'expenses.json');
    // console.log('axios response', res);
    const expenses = [];
    for (const key in res.data) {
      const expenseObj = {
        id: key,
        amount: res.data[key].amount,
        description: res.data[key].description,
        date: new Date(res.data[key].date),
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {
    console.log('fetch error', error);
  }
};

export const updateExpense = async (id, expenseData) => {
  const res = axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};
export const deleteExpense = async (id) => {
  await axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
