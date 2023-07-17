// 1. Sets the initial state when the app loads
export const initialState = {
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


export const reducer = (state, action) => {
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
      
        case 'SET_CURRENCY':
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
