import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './mycss.css';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import  {CurrencyProvider } from './context/CurrencyContext';
import ExpenseList from './components/ExpenseList';
import AllocationForm from './components/AllocationForm';
import { AppProvider } from './context/AppContext';


const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                <h1 className='mt-3'>Company's Budget Allocation</h1>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <Budget />
                    </div>
                    <div className='col-sm'>
                        <Remaining />
                    </div>
                    <div className='col-sm'>
                        <ExpenseTotal />
                    </div> 
                    <div className='col-sm'>
                        <CurrencyProvider />
                    </div> 
                </div>
                <div className='row mt-3'>
                    <h5 className='mt-3'>Allocation</h5>
                    <ExpenseList />
                </div>
                <div className='row mt-3'>
                    <h5 className='mt-3'>Change Allocation</h5>
                    <AllocationForm />
                </div>
            </div>
        </AppProvider>
    );
};

export default App;
