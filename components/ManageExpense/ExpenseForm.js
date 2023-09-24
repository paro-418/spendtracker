import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import Button from '../../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });
  const inputChangeHandler = (inputIdentifier, enteredAmount) => {
    setInputs((prev) => ({
      ...prev,
      [inputIdentifier]: {
        value: enteredAmount,
        isValid: true,
      },
    }));
  };

  const submitHandler = () => {
    // console.log(inputs.date.value);
    // console.log(new Date(inputs.date.value));
    // console.log(new Date(inputs.date.value));
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    // console.log('expenseData.date', expenseData.date);
    // console.log('expenseData.date.toString()', expenseData.date.toString());

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    // console.log(dateIsValid);
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      return setInputs((prev) => ({
        amount: { value: prev.amount.value, isValid: amountIsValid },
        date: { value: prev.date.value, isValid: dateIsValid },
        description: {
          value: prev.description.value,
          isValid: descriptionIsValid,
        },
      }));
    }

    onSubmit(expenseData);
  };

  const formIsInValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View>
      <Input
        label='Amount'
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: inputChangeHandler.bind(this, 'amount'),
          value: inputs.amount.value,
        }}
        invalid={!inputs.amount.isValid}
      />
      <Input
        label='Date'
        textInputConfig={{
          keyboardType: 'decimal-pad',
          placeholder: 'YYYY-MM-DD',
          onChangeText: inputChangeHandler.bind(this, 'date'),
          maxLength: 10,
          value: inputs.date.value,
        }}
        invalid={!inputs.date.isValid}
      />
      <Input
        label='Description'
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, 'description'),
          multiline: true,
          value: inputs.description.value,
          //   autoCorrect: false,
        }}
        invalid={!inputs.description.isValid}
      />

      {formIsInValid && (
        <Text style={styles.errorText}>
          Invalid input - Please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
