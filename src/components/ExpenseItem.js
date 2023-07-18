import React, { useContext } from 'react';
import { TiDelete} from 'react-icons/ti';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

    const ExpenseItem = (props) => {

   // const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

   // const ExpenseItem = ({ id, name, cost }) => {
      //  const { dispatch } = useContext(AppContext);

      const handleDeleteExpense = () => {
        const expense = {
            name: props.name,
            cost: props.cost,
            id:props.id
        };


        dispatch({
          type: 'DELETE_EXPENSE',
          payload:expense
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });

    };
    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'REDUCE_EXPENSE',
            payload: expense
        });
        
    };

    return (
        <tr>
        <td>{props.name}</td>
        <td>{currency}{props.cost}</td>
        <td><FaPlusCircle className="btn-containerinc increase" onClick={event=> increaseAllocation(props.name)}></FaPlusCircle></td>
        <td><FaMinusCircle className="btn-containerdec decrease" onClick={event=> decreaseAllocation(props.name)}>-</FaMinusCircle></td>
        <td><TiDelete size='3em'  onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;
