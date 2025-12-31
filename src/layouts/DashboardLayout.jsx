import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
    LayoutDashboard,
    LogOut,
    Search,
    User,
    ChevronLeft,
    ChevronRight,
    PanelLeft
} from 'lucide-react';
import './DashboardLayout.css';

const Sidebar = ({ isOpen }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <div className="logo-icon">
                    ⚡
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-item active">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </div>
                {/* Placeholder for future links */}
                <div className="nav-spacer"></div>

                <div className="nav-item logout">
                    <LogOut size={20} />
                    <span>Logout</span>
                </div>
            </nav>
        </aside>
    );
};

const Header = () => {
    const { userName } = useUser();

    return (
        <header className="dashboard-header">
            <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Search..." />
            </div>

            <div className="user-profile">
                <div className="user-info">
                    <span className="user-name">{userName}</span>
                    <span className="user-role">Student</span>
                </div>
                <div className="avatar">
                    <User size={24} />
                </div>
            </div>
        </header>
    );
};

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-layout">
            <div className="bg-glow"></div>

            <Sidebar isOpen={isSidebarOpen} />

            {/* Float Toggle Button separately or overlapping */}
            <button
                className={`sidebar-toggle ${isSidebarOpen ? 'open' : 'closed'}`}
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>

            <main className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Header />
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
