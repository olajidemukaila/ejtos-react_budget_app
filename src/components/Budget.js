import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';


const Budget = () => {
    const { budget, expenses, dispatch, currency } = useContext(AppContext);
    const [editableBudget, setEditableBudget] = useState(budget);

    const handleBudgetChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 20000 && value >= getTotalExpenses()) {
            setEditableBudget(value);
        }
    };

    const increaseBudget = () => {
        const newBudget = editableBudget + 10;
        if (newBudget <= 20000 && newBudget >= getTotalExpenses()) {
            setEditableBudget(newBudget);
        }
    };

    const decreaseBudget = () => {
        const newBudget = editableBudget - 10;
        if (newBudget >= 0 && newBudget >= getTotalExpenses()) {
            setEditableBudget(newBudget);
        }
    };

    const getTotalExpenses = () => {
        return expenses.reduce((total, item) => total + item.cost, 0);
    };

    const handleBlur = () => {
        if (editableBudget > 20000) {
            alert('Budget cannot exceed 20,000');
            setEditableBudget(budget);
        } else {
            dispatch({
                type: 'SET_BUDGET',
                payload: editableBudget,
            });
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget {currency}</span>     
            <input
                type='number'
                value={editableBudget}
                onChange={handleBudgetChange}
                onBlur={handleBlur}
                min={getTotalExpenses()}
                max={20000}
                step={10}
                />    
        </div>
    );
};

export default Budget;
