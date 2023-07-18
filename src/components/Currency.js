import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const currencies = [
  {
    label: "Pound",
    value: "£",
  },
  {
    label: "Dollar",
    value: "$",
  },
  {
    label: "Euro",
    value: "€",
  },
  {
    label: "Rupee",
    value: "₹",
  },
];

const Currency = () => {
  const { dispatch } = useContext(AppContext);

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    const selectedSymbol = currencies[selectedCurrency].value;
    dispatch({
      type: 'CHG_CURRENCY',
      payload: selectedSymbol,
    });
  };

  return (
    <div>
      <div className='row mt-3'>
        <div className='col-sm order-last'>
          <select className='currency-selection'  onChange={handleCurrencyChange}>
            <option className='currency-label' value="">Currency (£ Pound)</option>
            {currencies.map((currency, index) => (
              <option className='currency-dropdown'  key={index} value={index}>
                {currency.value} {currency.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Currency;
