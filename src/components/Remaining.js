import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { expenses, budget, currency } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const remainingBudget = budget - totalExpenses;

    return (
        <div className='alert alertsecondarycur' >
            <span>Remaining: {currency}{remainingBudget}</span>
        </div>
    );
};

export default Remaining;
