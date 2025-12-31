import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DollarSign, Plus, Trash2 } from 'lucide-react';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useLocalStorage('rex_expenses', []);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const addExpense = () => {
        if (!name || !amount) return;
        const newExpense = {
            id: Date.now(),
            name,
            amount: parseFloat(amount),
            date: new Date().toLocaleDateString()
        };
        setExpenses([newExpense, ...expenses]);
        setName('');
        setAmount('');
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(e => e.id !== id));
    };

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="widget-container expense-tracker-widget">
            <div className="widget-header">
                <h3><DollarSign size={18} /> Expenses</h3>
                <span className="total-badge">Total: ${totalSpent.toFixed(2)}</span>
            </div>

            <div className="add-expense-form">
                <input
                    type="text"
                    placeholder="Item"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="expense-input-name"
                />
                <input
                    type="number"
                    placeholder="$"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="expense-input-amount"
                />
                <button onClick={addExpense}><Plus size={16} /></button>
            </div>

            <div className="expenses-list">
                {expenses.length > 0 ? (
                    expenses.map(expense => (
                        <div key={expense.id} className="expense-item">
                            <div className="expense-info">
                                <span className="expense-name">{expense.name}</span>
                                <span className="expense-date">{expense.date}</span>
                            </div>
                            <div className="expense-right">
                                <span className="expense-amount">-${expense.amount.toFixed(2)}</span>
                                <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="empty-state">No expenses recorded.</p>
                )}
            </div>
        </div>
    );
};

export default ExpenseTracker;
