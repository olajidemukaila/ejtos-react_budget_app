import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BUDGET':
            return { ...state, budget: action.payload };
            case 'ADD_EXPENSE':
                const existingExpense = state.expenses.find(
                  (expense) => expense.name === action.payload.name 
                );
                if (existingExpense) {
                  const updatedExpenses = state.expenses.map((expense) =>
                    expense.name === existingExpense.name? { ...expense, cost: expense.cost + action.payload.cost }
                    : expense
                  );
                  return {...state, expenses: updatedExpenses };
                } else {
                  const newExpense = {
                   ...action.payload,
                    expenses: [action.payload.expense]
                  };
                  return {...state, expenses: [...state.expenses, newExpense] };
                }
            //return { ...state, expenses: [...state.expenses, action.payload] };
            case 'DELETE_EXPENSE':
  const deleteExpensesCost = state.expenses.map((expense) => {
    if (expense.id === action.payload.id && expense.name === action.payload.name) {
      return { ...expense, cost: 0 };
    }
    return expense;
  });
  return { ...state, expenses: deleteExpensesCost };


            // return { ...state, expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
           case 'INCREASE_ALLOCATION':
            const increasedExpenses = state.expenses.map((expense) =>
              expense.id === action.payload ? { ...expense, cost: expense.cost } : expense
            );
            return { ...state, expenses: increasedExpenses };
          case 'DECREASE_ALLOCATION':
            const decreasedExpenses = state.expenses.map((expense) =>
              expense.id === action.payload ? { ...expense, cost: expense.cost } : expense
            );
            return { ...state, expenses: decreasedExpenses };
      
            case 'CHG_CURRENCY':
            return { ...state, currency: action.payload };
            case 'REDUCE_EXPENSE':
                const reducedExpenses = state.expenses.map((expense) =>
                  expense.name === action.payload.name &&
                  expense.department === action.payload.department
                    ? { ...expense, cost: expense.cost - action.payload.cost }
                    : expense
                );
                return { ...state, expenses: reducedExpenses };
              default:
                return state;
          
    }
};


// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    let remaining = 0;

    if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;
    }

    return (
        <AppContext.Provider
            value={{
            expenses: state.expenses,
            budget: state.budget,
            remaining: remaining,
            dispatch,
            currency: state.currency
        }}
    >
                {props.children}
        </AppContext.Provider>
    );
};

//export { AppContext, AppProvider };
