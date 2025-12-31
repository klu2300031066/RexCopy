import React from 'react';
import { useUser } from '../context/UserContext';
import TodoList from '../components/TodoList';
import { getFormattedDate } from '../utils/dateutils';
import Clock from '../components/Clock';
import StudyTimer from '../components/StudyTimer';
import ExpenseTracker from '../components/ExpenseTracker';
import './DashboardHome.css';

const DashboardHome = () => {
    const { userName } = useUser();

    return (
        <div className="dashboard-home">
            <div className="dashboard-grid">
                {/* 1. Clock Widget */}
                <div className="grid-item clock-section">
                    <Clock />
                </div>

                {/* 2. Todo List */}
                <div className="grid-item todo-section">
                    <TodoList />
                </div>

                {/* 3. Study Timer (Replaces Notes) */}
                <div className="grid-item timer-section">
                    <StudyTimer />
                </div>

                {/* 4. Expense Tracker (Last) */}
                <div className="grid-item expense-section">
                    <ExpenseTracker />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
