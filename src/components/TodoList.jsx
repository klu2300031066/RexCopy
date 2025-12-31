import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useLocalStorage('rex_tasks', []);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') addTask();
    };

    return (
        <div className="todo-widget">
            <div className="widget-header">
                <h3>My Tasks</h3>
            </div>

            <div className="add-task-row">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={addTask} className="add-btn">
                    <Plus size={20} />
                </button>
            </div>

            <div className="task-list">
                {tasks.length === 0 && <div className="empty-state">No tasks for today!</div>}

                {tasks.map(task => (
                    <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <button onClick={() => toggleTask(task.id)} className="check-btn">
                            {task.completed ? <CheckCircle size={20} color="#10b981" /> : <Circle size={20} />}
                        </button>
                        <span className="task-text">{task.text}</span>
                        <button onClick={() => deleteTask(task.id)} className="delete-btn">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
