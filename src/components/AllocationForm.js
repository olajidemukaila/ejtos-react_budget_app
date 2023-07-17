import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

const AllocationForm = () => {
    const { expenses, dispatch, remaining, budget, currency } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const getTotalExpenses = () => {
        return expenses.reduce((total, item) => total + item.cost, 0);
    };

    const submitEvent = () => {
        
        const maxBudget = 20000;

        if (!name) {
            alert('Please select a department');
            setCost('');
            return;
        }else
        if (!cost || cost.trim() === '') {
            setCost('');
            return;
          }else

        if (isNaN(cost) || cost < 0) {
            alert(`The cost value must be a positive number`);
            setCost('');
            return;
        }else

        if (cost > remaining || remaining < 0) {
            alert(`The value cannot exceed remaining funds ${currency}${remaining}`);
            setCost('');
            return;
        }else
        if (cost > budget) {
            alert(`The cost value cannot exceed budget ${currency}${budget}`);
            setCost('');
            return;
        }else

        if ((budget < 0) || (getTotalExpenses() > budget) || (budget > maxBudget) ){
            alert(`The total expenses value cannot exceed the maximum allocated budget value ${currency}${budget}`);
            //alert(`The value cannot exceed remaining funds ${currency}${remaining}`);
            setCost('');
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost, 10),
        };

        if (action === 'Reduce') {
            dispatch({
                type: 'REDUCE_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    return (
        <div>
            <div className='row'>
                <div className='input-group mb-3' style={{ marginLeft: '2rem' }}>
                    <div className='input-group-prepend'>
                        <label className='input-group-text' htmlFor='inputGroupSelect01'>
                            Department
                        </label>
                    </div>
                    <select className='custom-select' id='inputGroupSelect01' required='required' onChange={(e) => setName(e.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value='Marketing'>Marketing</option>
                        <option value='Sales'>Sales</option>
                        <option value='Finance'>Finance</option>
                        <option value='HR'>HR</option>
                        <option value='IT'>IT</option>
                        <option value='Admin'>Admin</option>
                    </select>
                    <div className='input-group-prepend' style={{ marginLeft: '2rem' }}>
                        <label className='input-group-text' htmlFor='inputGroupSelect02'>
                            Allocation
                        </label>
                    </div>
                    <select className='custom-select' id='inputGroupSelect02' onChange={(e) => setAction(e.target.value)}>
                        <option defaultValue value='Add'>
                            Add
                        </option>
                        <option value='Reduce'>Reduce</option>
                    </select>
                    <div className="d-flex align-items-center">
    <span style={{ marginLeft: '2rem' }}>{currency}</span>
    <input
        required="required"
        type="number"
        id="cost"
        value={cost}
        className="ml-2"
        onChange={(e) => setCost(e.target.value)}></input>
        
</div>
                    <button className='btn btn-primary' onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;
