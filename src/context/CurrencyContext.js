import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './AppReducer';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

const currencies = {
    Dollar: '$',
    Pound: '£',
    Euro: '€',
    Rupee: '₹',
};

const CurrencyContext = createContext();

const CurrencyProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        const selectedSymbol = currencies[selectedCurrency];
        dispatch({
            type: 'SET_CURRENCY',
            payload: selectedSymbol,
        });
    };

    return (
        <CurrencyContext.Provider value={{ ...state, dispatch }}>
            <div>
                <div className='row mt3'>
                    <div className='col-sm order-last'>
                        <select id='id: uuidv4()' className='currency-dropdown' onChange={handleCurrencyChange}>
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
        </CurrencyContext.Provider>
    );
};

export { CurrencyContext, CurrencyProvider };
