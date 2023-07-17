import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './AppReducer';


const currencies = {
    Dollar: '$',
    Pound: '£',
    Euro: '€',
    Rupee: '₹',
};

const AppContext = createContext();

const AppProvider = (props) => {
    const [state, dispatch, remaining] = useReducer(reducer, initialState);

    const handleCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        const selectedSymbol = currencies[selectedCurrency];
        dispatch({
            type: 'SET_CURRENCY',
            payload: selectedSymbol,
        });
    };

    return (
        <AppContext.Provider value={{ ...state, expenses: state.expenses,
          budget: state.budget,
          remaining: remaining,
          dispatch
          }}>
            <div>
                <div className='row mt3'>              
<div className='col-sm order-last' >
  <select id='currency' className='currency-dropdown'  onChange={handleCurrencyChange}>
    <label htmlFor='currency'>Currency:</label>
    <option value='default'>Currency (£ Pound)</option>
    {Object.keys(currencies).map((currency) => (
        <option key={currency} value={currency}>
            {currency}
        </option>
    ))}
  </select>
</div>
                </div>
                {props.children}
            </div>
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
